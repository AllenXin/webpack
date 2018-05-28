<template>
  <div>
    <template v-for="item in routes">

      <!--无下拉菜单-->
      <router-link v-if="!item.hidden && item.noDropdown&&item.children.length>0"
                   :to="item.path === '/' ? item.path+item.children[0].path : item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path === '/' ? item.path+item.children[0].path : item.path+'/'+item.children[0].path">
          <i v-if='item.icon' :class="item.icon" class='sidebar-item-icon'></i>
          <img class="icon-item" v-if='item.icon' :src="require('assets/'+item.icon+'.png')"/>
          <span class='title'>{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>

      <!--有下拉菜单-->
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <img v-if='item.icon' :src="require('assets/'+item.icon+'.png')"/>
          <span class='title'>{{item.name}}</span>
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'></sidebar-item>
          <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path" class='sub-subtitle'>
              <span class='subtitle'>{{child.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    data() {
      return {
        home: require('assets/home.png')
      }
    },
    props: {
      routes: {
        type: Array
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sidebar-item-icon {
    color: #fff;
    font-size: 18px;
    width: 10px;
    height: 10px;
    z-index: 1000;
  }

  .title {
    font-size: 16px;
  }

  .subtitle {
    font-size: 16px;
    margin-left: 20px;
  }

  .sub-subtitle {
    background-color: rgba(23,26,31,0.70) !important;
    &:hover {
      background-color: rgba(0,0,0,0.70) !important;
    }
  }

  .el-menu-item.sub-subtitle.is-active{
    background-color: rgba(0,0,0,0.70) !important;
  }

  .router-link-exact-active .is-active {
    .subtitle {
      color: #37B9FF;
    }
    .title {
      color: #37B9FF;
    }
  }

  .icon-item{
    padding-top: 5px;
    width: 35px;
    height: 40px;
  }
</style>

