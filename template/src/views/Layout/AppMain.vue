<template>
  <section class="app-main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="key"></router-view>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'AppMain',
    computed: {
      ...mapGetters(['fullscreenLoading']),
      key() {
        return this.$route.name !== undefined
          ? this.$route.name + +new Date()
          : this.$route + +new Date()
      }
    }
  }
</script>

<style rel='stylesheet'>
  .app-main {
    min-width: 1110px;
    padding: 20px 20px 0 20px;
  }
</style>
