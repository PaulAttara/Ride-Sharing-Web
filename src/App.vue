<template>
  <div id="app" :style="{padding: ($route.path === '/' ? '165px' : '10px')}">
    <div id="img" :style="{margin: (($route.path === '/app/my-account') || ($route.path ==='/app/fleet-overview') || ($route.path ==='/app/rankings')) ?'0% 0% 0% 12%':'0% 0% 0% 0%'}">
      <img src="./assets/logo4.png" align="center">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-image: linear-gradient(to bottom right, rgba(35, 156, 251, 0.99), rgba(35, 156, 251, 0.99));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height: inherit;
  overflow: auto;
}

body{
  height: inherit;
  margin:0;
  padding:0;
}

html{
  margin:0;
  padding:0;
  height: 105%;
  background-image: linear-gradient(to bottom right, rgba(35, 156, 251, 0.99), rgba(35, 156, 251, 0.99));
}
</style>
