
<template>
  <div id="fleet-overview">
      <div class="sidenav">
        <router-link to="/app/my-account" id="bmyaccount">Admin</router-link>
        <router-link to="/app/fleet-overview" id="bfleet"><b>Fleet Overview</b></router-link>
        <router-link to="/app/rankings" id="brankings">Rankings</router-link>
        <router-link to="/app/login" id="blogout">Log Out</router-link>
      </div>
      <div id="searchField">
        <select @change="onChange()" v-model="view">
          <option value="routes">Routes</option>
          <option value="passengers">Passengers</option>
          <option value="drivers">Drivers</option>
          <option value="rMap">Map</option>
        </select>
        <select v-model="filter" v-if="view === 'routes'" id="filterselect">
          <option value="searchby" hidden>Search By...</option>
          <option value="routeid">Route Id</option>
          <option value="username">Username</option>
          <option value="startlocation">Start Location</option>
          <option value="destination">Destination</option>
          <option value="date">Date</option>
          <option value="status">Status</option>
        </select>
        <select v-model="filter" v-if="view === 'rMap'" id="filterselect">
          <option value="searchby" hidden>View Route...</option>
          <option v-for="route in routes" :value="route.id">{{route.id}}</option>
        </select>
        <select v-model="filter" v-if="(view === 'passengers') || (view === 'drivers')" id="filterselect">
          <option value="searchby" hidden>Search By...</option>
          <option value="username">Username</option>
          <option value="trips">Num Trips</option>
          <option value="lastname">Last Name</option>
          <option value="city">City</option>
          <option value="address">Address</option>
          <option value="number">Phone Number</option>
          <option value="rating">Rating</option>
          <option value="status">Status</option>
        </select>
        <input v-if="!(view==='rMap')" type="text" v-model="searchTerm" placeholder="Search..." id="searchbox" ref="searchref" v-on:input="change">
        <button v-if="!(view==='rMap')" class="searchButton" @click="search(filter, searchTerm)" name="searchButton">Search</button>
      </div>
      <p>
        <span v-if="errorRoute" style="color:red" id="errorMessage">Error: {{errorRoute}} </span>
      </p>
      <div id="cont">
        <div id="map" v-if="view==='rMap'"></div>
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
        <table v-else-if="view === 'passengers' || view === 'drivers'">
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
            <th class="th">Status</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users">
            <td>{{user.username}}</td>
            <td>{{user.numTrips}}</td>
            <td>{{user.firstname}}</td>
            <td>{{user.lastname}}</td>
            <td>{{user.city}}</td>
            <td>{{user.address}}</td>
            <td>{{user.phonenumber}}</td>
            <td>{{user.avgRating}}</td>
            <td v-if="user.status === 'Active'" style="color: Green">{{user.status}}</td>
            <td v-else-if="user.status === 'Inactive'" style="color: Red">{{user.status}}</td>
            <td v-else>{{user.status}}</td>
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
#map{
  width: 100.25%;
  height: 100%;
}

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
