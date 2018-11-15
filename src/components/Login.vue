<template>
  <div id="login">
    <ul>
      <li><input type="text" v-model="username" placeholder="Username"></li>
      <li><input type="password" v-model="password" placeholder="Password"></li>
      <li><button @click="login(username, password)">Login</button></li>
    </ul>
  </div>
</template>

<script src="./login.js">
</script>

<style scoped>

#login{
  padding-top: 100px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
