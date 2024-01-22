<template>
  <div class="container mx-auto flex flex-col gap-5 items-center p-10">
    {{ actualizarsession }}
    <table class="self-start">
      <caption class="text-2xl font-bold mb-5">
        Carrito de compras
      </caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Restar</th>
          <th>Cantidad</th>
          <th>Añadir</th>
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
          <td>
            <button type="submit" @click="restar(index)">
              <Minus />
            </button>
          </td>
          <td>{{ product.quantity }}</td>
          <td>
            <button type="submit" @click="sumar(product)">
              <Plus />
            </button>
          </td>
          <td>$ {{ product.price * product.quantity }}</td>
          <td>
            <button
              @click.prevent="removerDelCarrito(product.id)"
              class="text-white font-bold bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg p-1 text-center"
            >
              Eliminar
            </button>
          </td>
          <td>
            <button
              @click.prevent="this.$router.push(`/products:${product.id}`)"
              class="text-white font-bold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-m p-1 text-center"
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
                  .toFixed()
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
import Minus from "../components/Icons/Minus.vue";
import Plus from "../components/Icons/Plus.vue";
export default {
  name: "Cart",
  components: { Swal,Minus,Plus },
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
      location.reload();
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
          Authorization: "Bearer " + localStorage.getItem("token"),
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
      const existe = this.carrito.findIndex((p) => p.id == producto.id);
      if (existe !== -1) {
        this.carrito[existe].quantity++;
      } else {
        this.carrito.push(producto);
      }
      sessionStorage.setItem("carrito", JSON.stringify(this.carrito));
      location.reload();
    },
    restar(index) {
      const existe = this.carrito[index];
      if (existe.quantity > 1) {
        this.carrito[index].quantity--;
      } else if (existe.quantity === 1) {
        this.removerDelCarrito(existe.id);
      }
      sessionStorage.setItem("carrito", JSON.stringify(this.carrito));
      location.reload();
    },
  },
  computed: {
        actualizarsession() {
            window.addEventListener('storage', (event) => {
                if (event.key === 'carrito') {
                    this.carrito = JSON.parse(sessionStorage.getItem('carrito')) ?? [];
                }
            })
        }
    }
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
