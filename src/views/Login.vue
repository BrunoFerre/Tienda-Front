<template>
  <h2>Acceder</h2>
  <div class="flex flex-col items-center justify-center gap-10">
    <div
      class="container mx-auto max-w-md relative flex flex-col justify-center p-4 rounded-md text-black bg-white"
    >
      <RegisterForm v-if="register" />
      <LoginForm v-else />
    </div>
    <button
      class="w-[200px] text-white font-bold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none rounded-lg text-sm p-2 text-center"
      @click.prevent="cambiarFormulario"
    >
      {{ texto }}
    </button>
  </div>
</template>
<script>
import RegisterForm from "../components/RegisterForm.vue";
import LoginForm from "../components/LoginForm.vue";
export default {
  name: "Login",
  components: {
    RegisterForm,
    LoginForm,
  },
  data() {
    return {
      register: false,
      texto: "Registrarse",
      class: "flex flex-col gap-3 bg-blue-500",
    };
  },
  methods: {
    cambiarFormulario() {
      this.register = !this.register;
      if (this.register) {
        this.texto = "Iniciar sesión";
      } else {
        this.texto = "Registrarse";
      }
    },
  },
};
</script>
