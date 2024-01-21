<script setup>
import {initFlowbite} from 'flowbite'
import Header from "./components/Header.vue";
import Carousel from "./components/Carousel.vue";
import Footer from "./components/Footer.vue";
import { onMounted } from 'vue';
onMounted(() => {
  initFlowbite();
})
components: {
  Header, Carousel, Footer
}
</script>
<template>
  <Header />
  <main class="min-h-[80vh] bg-slate-200">
    <RouterView />
  </main>

  <Footer />
</template>
