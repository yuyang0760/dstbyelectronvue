<template>
 <div id="app">
    <router-link to="/first_page">
      <div>个人中心</div>
    </router-link>
    <router-link to="/second_page">
      <div>个人中心2</div>
    </router-link>
    <router-view> </router-view>

  </div>
</template>

<script>
  export default {
    name: 'dstbyelectronvue'
  }
</script>

<style>
  /* CSS */
  /* CSS 主页*/
/* @import url("I:/dont-starve-together-electron-vue-typescript/node_modules/bootstrap/dist/css/bootstrap.css");
@import url("I:/dont-starve-together-electron-vue-typescript/node_modules/bootstrap/dist/css/bootstrap-theme.css"); */
</style>