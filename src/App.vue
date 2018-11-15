<template>
  <div id="app" :style="{padding: $route.path === '/' ? '172px' : '10px'}">
    <div>
      <img src="./assets/logo4.png" align="center">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: hsla(269, 96%, 50%, 0.73);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height: inherit;
}

body{
  height: inherit;
}

html{
  height: 100%;
}
</style>
