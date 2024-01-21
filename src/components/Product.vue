<template>
  <div
    class="m-2 group px-8 py-5 bg-white rounded-lg flex flex-col items-center justify-center gap-4 relative after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden  after:-translate-y-full after:hover:translate-y-0 [&amp;_p]:delay-200 [&amp;_p]:transition-all"
    :id="product.id"
  >
    <img :src="product.image" alt="Producto" class="object-center w-[250px] cursor-pointer" title="Ir a los detalles" @click="this.$router.push(`/products/${product.id}`)">
    <p
      class="text-[22px] font-bold text-green-700 tracking-wider group-hover:text-gray-700 text-xl"
    >
      {{cortarTexto(product.name, 25)}}
    </p>
    <p class="text-[12px] font-bold text-gray-700 text-xs">
      {{cortarTexto(product.description, 30)}}
    </p>
    <div class="flex items-center justify-around  gap-3 w-full ">
      <p
        class="text-lg text-green-900 font-bold group-hover:text-gray-800"
      >
        $ {{ product.price }}
      </p>
      <button 
        v-if="!carrito.some((iteam)=>iteam.id === product.id)"
        type="submit" 
        class="btun4 z-10 lg:inline-flex items-center gap-3 hover:text-white hover:bg-green-700  shadow-[10px_10px_150px_#ff9f0d] cursor-pointer py-2 px-4 text-sm font-semibold rounded-full butn "
        @click.prevent="añadirAlCarrito(product.id,'agregar')"
      >
        Añadir al carrito
    </button>
    <button v-else class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-lg text-sm p-2 text-center" @click.prevent="removerDelCarrito(product.id)">Elminar del carrito</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      carrito: [],
    };
  },
  created() {
    this.carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
  },
  methods: {
    cortarTexto(texto, limite) {
      if (texto.length > limite) {
        return texto.substring(0, limite) + "...";
      } else {
        return texto;
      }
    },
    irADetalles() {
      this.$router.push('/product/' + this.product.id)
    },
    añadirAlCarrito(id,accion) {
      this.carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
      if(accion == 'agregar'){
        this.carrito.push({id, quantity:1})
      }
      sessionStorage.setItem('carrito',JSON.stringify(this.carrito))
    },
    removerDelCarrito(id){
      this.carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
      this.carrito = this.carrito.filter(producto => producto.id !== id)
      sessionStorage.setItem('carrito',JSON.stringify(this.carrito))
    }
  }
};
</script>
