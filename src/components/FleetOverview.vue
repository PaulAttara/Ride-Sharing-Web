
<template>
  <div id="fleet-overview">
      <div class="sidenav">
        <router-link to="/app/my-account">My Account</router-link>
        <router-link to="/app/fleet-overview"><b>Fleet Overview</b></router-link>
        <router-link to="/app/rankings">Rankings</router-link>
        <router-link to="/app/login">Log Out</router-link>
      </div>
      <div id="searchField">
        <select>
          <option value="" hidden>Search By...</option>
          <option value="">Route Id</option>
          <option value="">Driver Name</option>
          <option value="">Start Location</option>
          <option value="">Destination</option>
          <option value="">Date</option>
          <option value="">Status</option>
        </select>
        <input type="text" placeholder="Search...">
        <button class="searchButton">Search</button>
      </div>
      <div id="cont">
        <table>
          <thead>
          <tr id="header">
            <th class="th">Route Id</th>
            <th class="th">Driver Name</th>
            <th class="th">Seats Avail.</th>
            <th class="th">Start Location</th>
            <th class="th">Destination</th>
            <th class="th">Date</th>
            <th class="th">Status</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="route in routes">
            <td>{{route.id}}</td>
            <td>{{route.dName}}</td>
            <td>{{route.seats}}</td>
            <td>{{route.start}}</td>
            <td>{{route.dest}}</td>
            <td>{{route.date}}</td>
            <td>{{route.status}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <p>
        <span v-if="errorRoute" style="color:red">Error: {{errorRoute}} </span>
      </p>
  </div>
</template>

<script src="../jsFiles/overview.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #cont {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    width: 71.7%;
    height: 60%;
    margin-left: 20.8%;
    position: absolute;
    border: 1px solid black;
    background-color: #c9c9c4;
    overflow: auto;
  }

  tr:nth-child(even) {
      background-color: #babab5;
  }

  #searchField{
    margin: 30px 0px 30px 0px;
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
