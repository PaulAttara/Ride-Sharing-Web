
<template>
  <div class="fleet-overview">
    <div id="cont">
      <div class="sidenav">
        <router-link to="/app/my-account">My Account</router-link>
        <router-link to="/app/fleet-overview"><b>Fleet Overview</b></router-link>
        <router-link to="/app/rankings">Rankings</router-link>
        <router-link to="/app/login">Log Out</router-link>
      </div>
      <p>FLEET OVERVIEW PAGE</p>
    </div>
  </div>
</template>

<script src="../jsFiles/overview.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #cont {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    background-color: rgba(224, 199, 27, 0.72)
  }
  #txt{
    padding-left: 10px;
  }
  /* The sidebar menu */
  .sidenav {
    height: 100%; /* Full-height: remove this if you want "auto" height */
    width: 15%; /* Set the width of the sidebar */
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color:#0590fa; /* Light Blue */
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px;
    border-radius: 10px;

  }

  /* The navigation menu links */
  .sidenav a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #ffffff;
    display: block;
  }

  /* When you mouse over the navigation links, change their color */
  .sidenav a:hover {
    color: black;
  }
</style>
