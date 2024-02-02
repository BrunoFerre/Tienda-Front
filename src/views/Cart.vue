<template>
  <div class="container mx-auto flex flex-col gap-5 items-center p-10">
    <table class="self-start">
      <caption class="text-2xl font-bold mb-5">
        Carrito de compras
      </caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Total</th>
          <th>Eliminar del carrito</th>
          <th>Ver Detalles</th>
        </tr>
      </thead>
      <tbody v-for="(product, index) in productos" :key="product">
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>$ {{ product.price }}</td>
          <td> <strong class="text-2xl font-bold p-5 cursor-pointer" @click="restar(index)">-</strong>{{ product.quantity }} <strong class="text-2xl font-bold p-5 cursor-pointer" @click="sumar(product)">+</strong></td>
          <td>$ {{ product.price * product.quantity }}</td>
          <td>
            <button
              @click.prevent="removerDelCarrito(product.id)"
              class="text-white font-bold bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm p-2 text-center"
            >
              Eliminar del Carrito
            </button>
          </td>
          <td>
            <button
              @click.prevent="this.$router.push(`/products/${product.id}`)"
              class="text-white font-bold bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm p-2 text-center"
            >
              Ver Detalles
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>
            <strong class="text-2xl p-5"
              >Total: $
              {{
                productos
                  .reduce((a, b) => a + b.price * b.quantity, 0)
                  .toFixed(2)
              }}</strong
            >
          </th>
        </tr>
      </tfoot>
    </table>
    <button
      v-if="carrito.length > 0"
      class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
      @click.prevent="comprar"
    >
      Comprar
    </button>
    <strong v-else class="text-2xl p-5">No hay productos en el carrito</strong>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "Cart",
  components: { Swal },
  data() {
    return {
      carrito: [],
      productos: [],
    };
  },
  created() {
    this.traerCarrito();
  },
  methods: {
    traerCarrito() {
      this.carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
      for (const producto of this.carrito) {
        axios
          .get(`http://localhost:9090/api/products/${producto.id}`)
          .then((response) => {
            this.productos.push({
              ...response.data,
              quantity: producto.quantity,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    removerDelCarrito(id) {
      this.carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
      this.carrito = this.carrito.filter((producto) => producto.id !== id);
      sessionStorage.setItem("carrito", JSON.stringify(this.carrito));
    },
    comprar() {
      let data = JSON.stringify([...this.carrito]);
      console.log(data);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:9090/api/buy",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        maxRedirects: 0,
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Comprado! Su numero de compra es: " + response.data,
            confirmButtonText: "Ok",
          }).then(() => {
            sessionStorage.removeItem("carrito");
            this.traerCarrito();
            location.reload();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sumar(producto) {
      const existe = this.carrito.findIndex(
        (item) => item.id === producto.id
      )
      if (existe !== -1) {
        this.carrito[existe].quantity++
      }else{
        this.carrito.push({...producto, quantity: 1})
      }
      sessionStorage.setItem('carrito',JSON.stringify(this.carrito))
    },
    restar(index) {
      const producto = this.carrito[index]
      if (producto.quantity > 1) {
        this.carrito[index].quantity--
      }else if (producto.quantity === 1){
        this.removerDelCarrito(producto.id)
      }
      sessionStorage.setItem('carrito',JSON.stringify(this.carrito))
    }
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
