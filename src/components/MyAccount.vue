<template>
  <div id="account">
    <div id="cont">
      <div class="sidenav">
        <router-link to="/app/my-account" id="bmyaccount"><b>Admin</b></router-link>
        <router-link to="/app/fleet-overview" id="bfleet">Fleet Overview</router-link>
        <router-link to="/app/rankings" id="brankings">Rankings</router-link>
        <router-link to="/app/login" id="blogout">Log Out</router-link>
      </div>
      <p> Welcome, Admin</p>
    </div>

    <div id="drivers">
        <table>
          <thead>
          <tr id="header">
            <th class="th">Driver</th>
            <th class="th">First Name</th>
            <th class="th">Last Name</th>
            <th class="th">Status</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="driver in drivers">
            <td>{{driver.username}}</td>
            <td>{{driver.firstname}}</td>
            <td>{{driver.lastname}}</td>
            <td v-if="driver.status === 'Active'" style="color: Green">{{driver.status}}</td>
            <td v-else-if="driver.status === 'Inactive'" style="color: Red">{{driver.status}}</td>
            <td v-else>{{driver.status}}</td>
          </tr>
          </tbody>
        </table>
    </div>
    <div id="passengers">
        <table>
          <thead>
          <tr id="header">
            <th class="th">Passenger</th>
            <th class="th">First Name</th>
            <th class="th">Last Name</th>
            <th class="th">Status</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="passenger in passengers">
            <td>{{passenger.username}}</td>
            <td>{{passenger.firstname}}</td>
            <td>{{passenger.lastname}}</td>
            <td v-if="passenger.status === 'Active'" style="color: Green">{{passenger.status}}</td>
            <td v-else-if="passenger.status === 'Inactive'" style="color: Red">{{passenger.status}}</td>
            <td v-else>{{passenger.status}}</td>
          </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<script src="../jsFiles/account.js">
</script>

<style>
  #cont {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    //width: 71.7%;
    //height: 54%;
    //margin-left: 20.8%;
    //position: absolute;
    //border: 1px solid black;
    //background-color: #c9c9c4;
    overflow: auto;
  }
 tr:nth-child(even) {
      background-color: #babab5;
  }

  #drivers{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
      color: #2c3e50;
      width: 40%;
      height: 50%;
      //margin-top: 19%;
      margin-left: 17%;
      position: absolute;
      border: 1px solid black;
      background-color: #c9c9c4;
      overflow: auto;
      overflow-x: hidden;
  }

  #passengers{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
     color: #2c3e50;
     width: 40%;
     height: 50%;
     margin-left: 57.7%;
     margin-bottom: 2%;
     position: absolute;
     border: 1px solid black;
     background-color: #c9c9c4;
     overflow: auto;
     overflow-x: hidden;
  }

  p{
    //margin-left: 14%;
    //font-size: 36px;
  }

  table{
    table-layout: fixed;
    width: 100.25%;
    height: auto;
  }

  .th{
    background-color: #1B93F7;
    position: sticky;
    top:0;
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
