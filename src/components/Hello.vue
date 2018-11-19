<template>
  <div class="hello">
    <ul>
      <li><h2><router-link to="/app/login">Login</router-link></h2></li>
      <li><h2><router-link to="/app/about">About Us</router-link></h2></li>
    </ul>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#msg{
  color: rgba(255,255,255, 0.9);
}

h1, h2 {
  font-weight: normal;
  color: rgba(255,255,255, 0.9);

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
  <!--color: rgba(224, 199, 27, 0.72);-->
  color: rgba(255,255,255, 0.9);
}

</style>
