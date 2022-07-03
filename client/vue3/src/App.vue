<script setup lang="ts">
import Header from './layouts/Header.vue'
import Footer from './layouts/Footer.vue'
import Audio from './components/Audio.vue'

</script>

<template>
  <Header />
  <div class="relative w-full min-h-full px-4 pt-[60px] pb-10 sm:w-[800px] sm:m-auto">
    <router-view />
    <Footer />
  </div>
  <Audio />
</template>
