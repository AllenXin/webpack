/**
* 创建于 2018/5/28
* 作者: PandaCIMS
* 功能: 首页
*/

<template>
  <div class="card-container">
    <div class="panda-gif"></div>
  </div>
</template>

<script>

export default {
  name: 'Homepage',
  components: {
    mapInfo
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.panda-gif{
  background: url("~assets/timg.gif") no-repeat;
  margin: auto;
}
</style>
