<template>
  <div>
    <SideNav />
    <Nuxt />
  </div>
</template>

<script>
import SideNav from '~/components/sidenav.vue'

export default {
  components: {
    SideNav
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}
</style>

