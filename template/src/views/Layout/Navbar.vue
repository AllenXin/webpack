<template>
  <div class="navbar">
    <div class="view-name">\{{viewNmae}}</div>
  </div>
</template>

<script>
  import Levelbar from './Levelbar'

  export default {
    name: 'Navbar',
    components: { Levelbar },
    computed: {
      viewNmae() {
        return this.$route.name
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 70px;
    width: calc(100% - 200px);
    min-width: 600px;
    background: #FFFFFF;
    box-shadow: 0 1px 2px 0 #CCCFD3;
    position: fixed;
    top: 0;
    z-index: 4;
    padding: 40px 0 10px 40px;
    .view-name{
      font-family: "Microsoft YaHei UI Light";
      font-size: 16px;
      color: #0077FF;
      font-weight: bolder
    }
  }
</style>

