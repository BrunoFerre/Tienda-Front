<template>
  <form class="px-7 grid justify-center items-center h-[300px]">
    <div class="grid gap-6" id="form">
      <div class="w-full flex gap-3">
        <input
          class="capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black"
          type="text"
          placeholder="Nombre"
          id="First-Name"
          name="First-Name"
          required="true"
          v-model="name"
        />
        <input
          class="p-3 capitalize shadow-2xl glass w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
          type="text"
          placeholder="Apellido"
          id="Last-Name"
          name="Last-Name"
          v-model="lastName"
        />
      </div>
      <div class="grid gap-6 w-full">
        <input
          class="p-3 shadow-2xl glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
          type="Email"
          placeholder="Email"
          id="Email"
          name="email"
          v-model="email"
        />
      </div>
      <div class="flex gap-3">
        <input
          class="p-3 glass shadow-2xl w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
          type="password"
          placeholder="Contraseña"
          id="password"
          name="password"
          required="true"
          v-model="password"
        />
        <input
          class="p-3 glass shadow-2xl w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
          type="password"
          placeholder="Confirmar"
          required="true"
          v-model="confirmPassword"
        />
      </div>
      <button
        @click.prevent="registrarse"
        class="outline-none glass shadow-2xl w-full p-3 bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px] hover:text-[#035ec5] font-bold"
        type="submit"
      >
        Registrase
      </button>
    </div>
  </form>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "RegisterForm",
  components: {
    Swal,
  },
  data() {
    return {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  created() {},
  methods: {
    registrarse() {
      let data = {
        username: this.email,
        firstName: this.name,
        lastName: this.lastName,
        password: this.password,
      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:9090/auth/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      
        this.$swal.fire({
          title: "Desea registrar?",
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
                  title: "Registrado!",
                  confirmButtonText: "Ok",
                });
                location.reload();
              })
              .catch((error) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Hubo un error!",
                  text: "El usuario o la contraseña son incorrectos",
                });
                location.reload();
              });
          },
        });
      }
  },
};
</script>
