<template>
  <div id="login">
    <ul>
      <li><input type="text" v-model="username" placeholder="Username"></li>
      <li><input type="password" v-model="password" placeholder="Password"></li>
      <li><button class="loginbutton" @click="login(username, password)" name="loginbutton">Login</button></li>
    </ul>
    <p>
      <span v-if="errorLogin" style="color:red">Error: {{errorLogin}} </span>
    </p>
    <p>
      <router-link to="/" id="back">Back to Home</router-link>
    </p>
  </div>
</template>

<script src="../jsFiles/login.js">
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
  margin: 0 0 20px 0;
}

button {
font-size: 24px;
background-color: #ffffff;
border-radius: 10px;

}

.loginbutton:hover {
 color: #ffffff; /* Light Blue */
 background-color: #0590fa; /* Light Blue */

}

</style>
