<!--suppress HtmlUnknownTarget -->
<template>
  <el-menu mode="vertical"
           :default-active="$route.path"
           background-color='#1F2837'
           :unique-opened="true"
           active-text-color='#fff'
           hover-background='#fff'
           text-color='#fff'>
    <sidebar-item :routes="permission_routers" class="sidb-item"></sidebar-item>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'permission_routers',
        'username',
        'photo'
      ])
    },
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  .el-menu {
    min-height: 100%;
    position: relative;
    .menu-logo {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      left: -10px;
    }
    .sidb-dropdown{
      display: block;
      align-items: center;
      justify-content: center;
      position: absolute;
      background: #293446;
      box-shadow: 0 2px 5px 0 rgba(0,0,0,0.20);
      border-radius: 15px;
      margin: 0 auto;
      width: 160px;
      height: 30px;
      left: 20px;
      overflow: hidden;
      z-index: 5;
    }
    .sidb-dropdown:hover{
      height: 120px;
    }
    .sidb-dropdown-content{
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #9CA7B8;
      .sidb-caret{
        color: #F5A623;
        width: 13px;
        height: 7px;
      }
    }
    .sidb-item{
      margin-top: 45px;
    }
  }

</style>
