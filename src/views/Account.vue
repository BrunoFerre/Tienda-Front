<template>
  <div v-if="datos.id" class="container mx-auto flex gap-5 items-center p-10">
    <Person
      :name="datos.firstName"
      :lastName="datos.lastName"
      :email="datos.username"
    />
    <table class="self-start">
      <caption class="text-2xl font-bold mb-5">
        Mis compras
      </caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Monto</th>
          <th>Ticket</th>
          <th>Date</th>
          <th>Descargar</th>
        </tr>
      </thead>
      <tbody v-for="compra in compras" :key="compra">
        <tr>
          <td>{{ compra.id }}</td>
          <td>$ {{ compra.amount.toFixed(2) }}</td>
          <td>{{ compra.ticket }}</td>
          <td>{{ compra.date.split("T")[0] }}</td>
          <td>
            <button
              @click.prevent="descargarFactura(compra.ticket)"
              class="text-white font-bold bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm p-2 text-center"
            >
              Descargar Factura
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="container mx-auto flex justify-center items-center p-10">
    <h1 class="text-3xl font-bold">Por favor inicia sesion</h1>
  </div>
</template>

<script>
import axios from "axios";
import Person from "../components/Person.vue";
export default {
  name: "Account",
  components: { Person },
  data() {
    return {
      compras: [],
      datos: [],
    };
  },
  created() {
    this.misDatos();
  },
  methods: {
    misCompras() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url:
          "http://localhost:9090/api/buy/all?username=" + this.datos.username,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        maxRedirects: 0,
      };
      axios
        .request(config)
        .then((response) => {
          this.compras = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    descargarFactura(nro) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:9090/api/tickets/generate/"+nro,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        responseType: "blob",
      };
      console.log(config);
      axios
        .request(config)
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          console.log(blob);
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Factura Nro. " + nro + ".pdf";
          a.click();
          window.URL.revokeObjectURL(url);
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    misDatos() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:9090/auth/person",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          this.datos = response.data;
          console.log(this.datos);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.misCompras();
        });
    },
  },
};
</script>
<style scoped>
table {
  @apply border-collapse;
  @apply text-sm;
  @apply border-black;
  @apply border-2;
  @apply text-center;
  @apply w-[100%];
}
thead {
  @apply text-lg;
  @apply font-bold;
  @apply h-[65px];
}

tr,
td,
th {
  @apply border-b;
  @apply border-black;
  @apply border-2;
  @apply h-[50px];
}
</style>
