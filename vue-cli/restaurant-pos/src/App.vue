<template>
  <div id="app">
    <!-- 左侧导航 -->
    <left-nav></left-nav>

    <!-- 左侧导航 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftNav from '@/components/common/LeftNav'
export default {
  name: 'App',
  components: {
    LeftNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: 100%;
}
.main {
  float: left;
  width: 95%;
  background-color: #eef2f7;
  height: 100%;
  overflow: auto;
}
</style>
