<template>
  <footer class="min-h-[10vh] grid grid-cols-4 items-center footer bg-[#1e393280] text-white p-10">
    <img src="../assets/logo.png" alt="Logo" class="w-32" />
    <section class="flex flex-col gap-2">
      <h3 class="font-bold text-2xl text-black">Contacto</h3>
      <ul class="text-black underline">
        <li>
          <a href="https://www.gmail.com">Gmail</a>
        </li>
        <li>
          <a href="https://www.whatsapp.com">Whatsapp</a>
        </li>
        <li>
          <strong>Horarios de atención </strong>
          <p>Lunes a Viernes de 9:00 a 18:00</p>

        </li>
      </ul>
    </section>
    <section class="flex flex-col gap-2">
      <h3 class="font-bold text-2xl text-black">Nuestras redes</h3>
      <ul class="text-black underline">
        <li>
          <a href="https://www.facebook.com">Facebook</a>
        </li>
        <li>
          <a href="https://www.instagram.com">Instagram</a>
        </li>
        <li>
          <a href="https://www.twitter.com">Twitter</a>
        </li>
        <li>
          <a href="https://www.linkedin.com">Linkedin</a>
        </li>
      </ul>
    </section>
    <strong class="text-black"> &copy; Todos los derechos reservados</strong>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
