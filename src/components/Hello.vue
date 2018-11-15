<template>
  <div class="hello">
    <h1 id="msg">{{ msg }}</h1>
    <ul>
      <li><h2><router-link to="/app/login">Login</router-link></h2></li>
      <li><h2><router-link to="/app/about">About Us</router-link></h2></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to ShareFare'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#msg{
  color: rgba(240, 169, 11, 0.84);
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: rgba(224, 199, 27, 0.72);
}
</style>
