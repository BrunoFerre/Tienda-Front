<template>
  <header
    class="header shadow-lg flex justify-between px-10 items-center bg-slate-100 m:grid m:grid-cols-2 m:px-2 sm:gap-10"
  >
    <div class="flex items-center m:flex-col">
      <Logo @click="$router.push('/')" />
      <h1 class="text-3xl font-bold m:hidden sm:hidden">Tienda</h1>
    </div>
    <nav>
      <ul
        class="flex items-center flex-wrap gap-5 font-bold m:grid m:grid-cols-2 m:gap-2"
      >
        <li>
          <a href="/">Incio</a>
        </li>
        <li>
          <a href="/shop">Tienda</a>
        </li>
        <li>
          <a href="/about">Nosotros</a>
        </li>
        <li>
          <a href="/account">Cuenta</a>
        </li>
        <li>
          <a href="/cart">Carrito</a>
        </li>
        <li>
          <a href="/contact">Contacto</a>
        </li>
        <li v-if="!token">
          <a href="/login">Login</a>
        </li>
        <li v-else class="cursor-pointer">
          <a @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import Logo from "./Logo.vue";
export default {
  name: "Header",
  components: {
    Logo,
    axios,
    Swal,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
    }
  },
  methods: {
    logout() {
      this.$swal.fire({
        title: "Desea cerrar sesión?",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Si",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            this.$swal.fire({
              icon: "success",
              title: "Sesión cerrada!",
              confirmButtonText: "Ok",
            });
            localStorage.removeItem("token");
            setTimeout(() => {
              location.href = "/";
            }, 1000);

        },
      });
    },
  },
};
</script>
<style scoped>
.header {
  min-height: 10vh;
}
</style>
