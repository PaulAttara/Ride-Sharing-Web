<template>
  <div id="eventregistration">
    <div class="sidenav">
      <router-link to="/app">Fleet Overview</router-link>
      <router-link to="/app/login">Rankings</router-link>
      <router-link to="/app/about">About</router-link>
      <router-link to="/app/login">Log Out</router-link>
    </div>
  </div>
</template>

<script src="./registration.js">
</script>

<style>
  #eventregistration {
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
    width: 160px; /* Set the width of the sidebar */
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color:rgba(0, 16, 71, 0.83); /* Black */
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px;
  }

  /* The navigation menu links */
  .sidenav a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
  }

  /* When you mouse over the navigation links, change their color */
  .sidenav a:hover {
    color: #f1f1f1;
  }
</style>
