<template>
  <h2 class="m-5 text-3xl text-center font-bold pt-3">Tienda</h2>
  <Spinner v-if="isLoading" class="container mx-auto" />
  <div v-else class="flex justify-around p-5 lg:gap-5 xl:gap-10">
    <section
      class="sticky top-6 self-start p-4 bg-gradient-to-tl from-emerald-300 rounded-lg shadow-lg border-l-green-400 border-l-8 w-1/4 m:hidden sm:hidden md:hidden"
    >
      <h4 class="text-2xl font-bold">Categorias</h4>
      <div class="form-control p-2 flex flex-col gap-4">
        <CheckBox
          
          :value="'Todas las categorias'"
          :text="'Todas las categorias'"
          @change="filtrar('Todas las categorias')"
        />
        <CheckBox
          v-for="category in categorias"
          :key="category"
          :text="category.replace('_', ' ')"
          :value="category"
          @change="filtrar($event.target.value)"
        />
      </div>
    </section>
    <div class="container gap-5">
      <div
        class="mx-auto rounded-lg bg-green-700 p-5 flex items-center justify-around gap-10 max-w-[99%]"
      >
        <select
          class="h-[40px] m:hidden text-lg text-black border-gray-200 rounded-lg"
          @change="ordenar($event.target.value)"
        >
          <Option texto="Ordenar Precio" selected value="ordenar" />
          <Option texto="Mayor a menor" value="mayor" />
          <Option texto="Menor a mayor" value="menor" />
        </select>
        <select
          class="h-[40px] m:hidden text-lg text-black border-gray-200 rounded-lg"
          @change="ordenarPorNombre($event.target.value)"
        >
          <Option texto="Ordenar Nombre" selected value="ordenar" />
          <Option texto="A-Z" value="a-z" />
          <Option texto="Z-A" value="z-a" />
        </select>
        <button
          type="submit"
          class="m:hidden sm:hidden font-semibold h-[40px] text-black bg-[#abd373] p-2 rounded-md md:hidden lg:min-w-[200px] text-center"
          @click.prevent="this.$router.push('/cart')"
        >
          Carrito de compras
        </button>
      </div>
      <div class="productos">
        <Product
          v-for="product in productos"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Option from "../components/Option.vue";
import Product from "../components/Product.vue";
import Search from "../components/Search.vue";
import CheckBox from "../components/CheckBox.vue";
import Spinner from "../components/Spinner.vue";
export default {
  name: "Shop",
  components: { Product, Search, CheckBox, Option, Spinner },
  data() {
    return {
      filtro: [],
      productos: [],
      categorias: [],
      selectedCategories: [],
      search: "",
      carrito: [],
      isLoading: true,
      filtro: [],
    };
  },
  created() {
    this.carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    this.obtenerDatos();
    this.obtenerCategorias();
  },
  methods: {
    obtenerDatos() {
      axios
        .get("http://localhost:9090/api/products?page=0")
        .then((response) => {
          this.productos = response.data;
          console.log(this.productos);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        });
    },
    ordenar(texto) {
      if (texto === "ordenar") {
        this.productos.sort((a, b) => a.id - b.id);
      }
      if (texto === "mayor") {
        this.productos.sort((a, b) => b.price - a.price);
      }
      if (texto === "menor") {
        this.productos.sort((a, b) => a.price - b.price);
      }
    },
    ordenarPorNombre(texto) {
      if (texto === "ordenar") {
        this.productos.sort((a, b) => a.id - b.id);
      }
      if (texto === "a-z") {
        this.productos.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (texto === "z-a") {
        this.productos.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
    obtenerCategorias() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:9090/api/products/categories",
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          const data = response.data;
          this.categorias = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filtrar(text = "") {
      if (text === "Todas las categorias") {
        this.obtenerDatos();
      }
      if (text == "") {
        this.obtenerDatos();
      } else {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `http://localhost:9090/api/products/category?category=${text}&page=0`,
          headers: {},
          maxRedirects: 0,
        };

        axios
          .request(config)
          .then((response) => {
            this.productos = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
<style scoped>
.productos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
}
</style>