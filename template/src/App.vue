<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    Vue.config.errorHandler = (err, vm, info) => {
      console.error(`<strong>${err}</strong><p>${info}</p>`)
    }
  }
}
</script>

<style>

</style>
