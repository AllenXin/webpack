<!--suppress ALL -->
<template>
  <div class="app-wrapper" v-loading="fullscreenLoading">
    <div class="main-container">
      <div class="sidebar-wrapper">
        <sidebar class="sidebar-container"></sidebar>
      </div>
      <navbar v-if="!isBlack"></navbar>
      <app-main :class="isBlack?'':'app-container'"></app-main>
    </div>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import { Navbar, Sidebar, AppMain } from '@/views/Layout'

  export default {
    name: 'Layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    data() {
      return {
        blacklist: ['/homepage'] // 无需navbar页面列表
      }
    },
    computed: {
      ...mapGetters([
        'fullscreenLoading'
      ]),
      sidebar() {
        return this.$store.state.app.sidebar
      },
      isBlack() {
        return this.blacklist.some(item => item === this.$route.path)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~styles/mixin.scss";

  /* 全屏容器，app下的 */
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    .main-container {
      /*min-height: calc(100% - 50px);*/
      transition: all .28s ease-out;
      margin-left: 198px;

      /* 侧边栏 */
      .sidebar-wrapper {
        width: 200px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        transition: all .28s ease-out;
        /* 侧边sidebar */
        .sidebar-container {
          transition: all .28s ease-out;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          overflow-x: hidden;
          &::-webkit-scrollbar {
            display: none
          }
        }
      }
      .app-container{
        padding-top: 105px;
      }
    }
  }
</style>
