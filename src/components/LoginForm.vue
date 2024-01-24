<template>
  <div
    class="container mx-auto max-w-md relative flex flex-col p-4 rounded-md text-black bg-white"
  >
    <div class="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
      Bienvenido a nuestra <span class="text-[#7747ff]">Tienda</span>
    </div>
    <div class="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
      Inicie sesión para continuar
    </div>
    <form class="flex flex-col gap-3">
      <div class="block relative">
        <label
          for="email"
          class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
          >Email</label
        >
        <input
          type="text"
          id="email"
          class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          v-model="email"
        />
      </div>
      <div class="block relative" v-if="activar">
        <label
          for="password"
          class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
          >Contraseña</label
        >
        <input
          type="password"
          id="password"
          class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          v-model="password"
        />
      </div>
      <div>
        <a
          v-if="activar"
          @click="activar = !activar"
          href="#"
          class="text-[#7747ff]"
          >Recuperar contraseña</a
        >
      </div>
      <button
        v-if="activar"
        @click.prevent="login"
        type="submit"
        class="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
      >
        Iniciar sesión
      </button>
      <button
        v-else
        class="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
        type="submit"
        @click.prevent="recuperar"
      >
        Enviar email de recuperación
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import RegisterForm from "../components/RegisterForm.vue";
export default {
  name: "LoginForm",
  components: {
    RegisterForm,
    Swal,
  },
  data() {
    return {
      email: "",
      password: "",
      register: true,
      activar: true,
    };
  },
  methods: {
    login() {
      let data = JSON.stringify({
        username: this.email,
        password: this.password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:9090/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      this.$swal.fire({
        title: "Desea iniciar sesión?",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Si",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          axios
            .request(config)
            .then((response) => {
              localStorage.setItem("token", response.data.token);
              location.href = "/shop";
            })
            .catch((error) => {
              this.$swal.fire({
                icon: "error",
                title: "Hubo un error!",
                text: "El usuario o la contraseña son incorrectos",
              });
            });
        },
      });
    },
    recuperar() {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:9090/auth/password?email=" + this.email,
        headers: {},
      };
      Swal.fire({
        title: "Desea enviar el email?",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Si",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          axios
            .request(config)
            .then((response) => {
              this.$swal.fire({
                icon: "success",

                title: "Email enviado!",
              })
            })
            .catch((error) => {
              this.$swal.fire({
                icon: "error",
                title: "Hubo un error!",
              })
            });
        },
      });
    },
  },
};
</script>
