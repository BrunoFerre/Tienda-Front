<template>
  <Carousel />

  <h1 class="text-3xl font-bold text-center w-full mb-4">Nuestros productos</h1>
  <section class="w-full py-10 flex flex-wrap justify-center">
    <Spinner v-if="isLoading" />
    <ProductVue
      v-else
      v-for="product in productos"
      :key="product.id"
      :product="product"
    />
  </section>
</template>
<script>
import axios from "axios";
import Carousel from "../components/Carousel.vue";
import ProductVue from "../components/Product.vue";
import Spinner from "../components/Spinner.vue";
export default {
  components: { ProductVue, Carousel, Spinner },
  name: "Home",
  data() {
    return {
      productos: [],
      isLoading: true,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {

      for (let i = 11; i <= 14; i++) {
        axios
          .get("http://localhost:9090/api/products/" + i)
          .then((response) => {
            this.productos.push(response.data);
          })
          .catch((error) => {
            console.log(error);
          }).finally(() => {
            setTimeout(() => {
              this.isLoading = false
            }, 1000)
          })
      }
    },
  },
};
</script>
