<template>
    <section class="w-full flex justify-around items-center my-10 bg-[#ebdbc8] p-10 mt-0 h-min-[10vh]">
        <article class="flex flex-col gap-1 justify-center">
            <strong class="text-[18px] font-bold text-black">Bienvenido a la tienda</strong>
            <h1 class="text-[3rem] font-bold text-green-700">Cafetera</h1>
            <p class="text-[1.5rem]">Encontra todos los productos que necesitas</p>
            <button class="text-[1rem] bg-green-700 text-white font-bold py-2 px-4 rounded self-center mt-5">Inciar sesion</button>
        </article>
        <img src="../assets/cafetera.png" alt="Cafetera" class="w-[400px]">
    </section>
</template>

<script>
export default {
    name: "Carousel"
}
</script>
<style scoped>
img {
    animation: linear infinite;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: none;
    animation-play-state: running;
    animation-name: animate;
    animation-timeline: auto;
    animation-range-end: normal;
    animation-range-start: normal;
    
}
@keyframes animate{
    0%{
        transform: translate(-11px,0);
    }
    50%{
        transform: translate(0,-11px);
    }
    100%{
        transform: translate(-11px,0);
    }
}
</style>