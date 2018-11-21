<template>
  <div id="account">
    <div id="cont">
      <div class="sidenav">
        <router-link to="/app/my-account" id="bmyaccount"><b>My Account</b></router-link>
        <router-link to="/app/fleet-overview" id="bfleet">Fleet Overview</router-link>
        <router-link to="/app/rankings" id="brankings">Rankings</router-link>
        <router-link to="/app/login" id="blogout">Log Out</router-link>
      </div>
      <p> YOU ARE LOGGED IN, MAIN LOGIN PAGE, PLACE DEFAULT USER INFO, PAGE SEPARATE FROM SIDEBAR MENUS</p>
    </div>
  </div>
</template>

<script src="../jsFiles/account.js">
</script>

<style>
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
    background-color:#0590fa; /* Black */
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
