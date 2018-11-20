
<template>
  <div id="fleet-overview">
      <div class="sidenav">
        <router-link to="/app/my-account">My Account</router-link>
        <router-link to="/app/fleet-overview"><b>Fleet Overview</b></router-link>
        <router-link to="/app/rankings">Rankings</router-link>
        <router-link to="/app/login">Log Out</router-link>
      </div>
      <div id="searchField">
        <select @change="onChange()" v-model="view">
          <option value="routes">Routes</option>
          <option value="passengers">Passengers</option>
          <option value="drivers">Drivers</option>
        </select>
        <select v-model="filter" v-if="view === 'routes'">
          <option value="searchby" hidden>Search By...</option>
          <option value="routeid">Route Id</option>
          <option value="username">Username</option>
          <option value="startlocation">Start Location</option>
          <option value="destination">Destination</option>
          <option value="date">Date</option>
          <option value="status">Status</option>
        </select>
        <select v-model="filter" v-if="(view === 'passengers') || (view === 'drivers')">
          <option value="searchby" hidden>Search By...</option>
          <option value="username">Username</option>
          <option value="trips">Num Trips</option>
          <option value="lastname">Last Name</option>
          <option value="city">City</option>
          <option value="address">Address</option>
          <option value="number">Phone Number</option>
          <option value="rating">Rating</option>
        </select>
        <input type="text" v-model="searchTerm" placeholder="Search...">
        <button class="searchButton" @click="search(filter, searchTerm)">Search</button>
      </div>
      <p>
        <span v-if="errorRoute" style="color:red">Error: {{errorRoute}} </span>
      </p>
      <div id="cont">
        <table v-if="view === 'routes'">
          <thead>
          <tr id="header">
            <th class="th">Route Id</th>
            <th class="th">Driver User</th>
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
              <td v-if="route.status === 'Scheduled'" style="color: blue">{{route.status}}</td>
              <td v-else-if="route.status === 'EnRoute'" style="color: green">{{route.status}}</td>
              <td v-else-if="route.status === 'Ended'" style="color: red">{{route.status}}</td>
              <td v-else="route.status === ''">{{route.status}}</td>

            </tr>
          </tbody>
        </table>
        <table v-else-if="view === 'passengers'">
          <thead>
          <tr id="header">
            <th class="th">Username</th>
            <th class="th">Trips</th>
            <th class="th">First Name</th>
            <th class="th">Last Name</th>
            <th class="th">City</th>
            <th class="th">Address</th>
            <th class="th">Phone Number</th>
            <th class="th">Avg Rating</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="pass in passengers">
            <td>{{pass.username}}</td>
            <td>{{pass.numTrips}}</td>
            <td>{{pass.firstname}}</td>
            <td>{{pass.lastname}}</td>
            <td>{{pass.city}}</td>
            <td>{{pass.address}}</td>
            <td>{{pass.phonenumber}}</td>
            <td>{{pass.avgRating}}</td>
          </tr>
          </tbody>
        </table>
        <table v-else-if="view === 'drivers'">
          <thead>
            <tr id="header">
              <th class="th">Username</th>
              <th class="th">Trips</th>
              <th class="th">First Name</th>
              <th class="th">Last Name</th>
              <th class="th">City</th>
              <th class="th">Address</th>
              <th class="th">Phone Number</th>
              <th class="th">Avg Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="driver in drivers">
              <td>{{driver.username}}</td>
              <td>{{driver.numTrips}}</td>
              <td>{{driver.firstname}}</td>
              <td>{{driver.lastname}}</td>
              <td>{{driver.city}}</td>
              <td>{{driver.address}}</td>
              <td>{{driver.phonenumber}}</td>
              <td>{{driver.avgRating}}</td>
            </tr>
          </tbody>
        </table>
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
    width: 71.7%;
    height: 54%;
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
    margin: 15px 0px 15px 0px;
    margin-left: 14%;
  }

  p{
    margin-left: 14%;
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
