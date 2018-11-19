
<template>
  <div id="rankings">
      <div class="sidenav">
        <router-link to="/app/my-account">My Account</router-link>
        <router-link to="/app/fleet-overview">Fleet Overview</router-link>
        <router-link to="/app/rankings"><b>Rankings</b></router-link>
        <router-link to="/app/login">Log Out</router-link>
      </div>
      <div id="searchField">


        <label for="start">Start date:</label>
          <input type="date" id="start" name="trip-start"
            value="2018-07-22"
            min="2000-01-01" max="2999-12-31">

            <label for="end"> End date:</label>
              <input type="date" id="start" name="trip-start"
                value="2018-07-22"
                min="2000-01-01" max="2999-12-31">


      </div>
      <div id="routes">
        <table>
          <thead>
          <tr id="header">
            <th class="th">Route Id</th>
            <th class="th">Start Location</th>
            <th class="th">Destination</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="route in sortedRoutes">
            <td>{{route.id}}</td>
            <td>{{route.start}}</td>
            <td>{{route.dest}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div id="passenger">
        <table>
          <thead>
          <tr id="header">
            <th class="th">Ranking</th>
            <th class="th">Passenger username</th>
            <th class="th">Trips completed</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>something</td>
            <td>something</td>
            <td>something</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div id="driver">
        <table>
          <thead>
          <tr id="header">
            <th class="th">Ranking</th>
            <th class="th">Driver Username</th>
            <th class="th">Trips Completed</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>something</td>
            <td>something</td>
            <td>something</td>
          </tr>
          </tbody>
        </table>
      </div>
      <p>
        <span v-if="errorRoute" style="color:red">Error: {{errorRoute}} </span>
      </p>
  </div>
</template>

<script src="../jsFiles/rankings.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #routes {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    width: 40%;
    height: 26%;
    margin-left: 16%;
    position: absolute;
    border: 1px solid black;
    background-color: #c9c9c4;
    overflow: auto;
    overflow-x: hidden;
    margin-bottom: 2%;
  }

  #passenger {
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     color: #2c3e50;
     width: 40%;
     height: 26%;
     margin-left: 57.7%;
     margin-bottom: 2%;
     position: absolute;
     border: 1px solid black;
     background-color: #c9c9c4;
     overflow: auto;
     overflow-x: hidden;

   }

   #driver {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      color: #2c3e50;
      width: 40%;
      height: 26%;
      margin-top: 19%;
      margin-left: 37%;
      position: absolute;
      border: 1px solid black;
      background-color: #c9c9c4;
      overflow: auto;
      overflow-x: hidden;

    }
  tr:nth-child(even) {
      background-color: #babab5;
  }

  #searchField{
    margin: 30px 0px 30px 0px;
    margin-left: 10%;
  }

  table{
    table-layout: fixed;
    width: 100.25%;
    height: auto;
  }

  p{
    margin-top: 17.5%;
    margin-left: 12%;
  }

  .th{
    background-color: #1B93F7;
    position: sticky;
    top:0;
  }

  input{
    border: 1px solid black;
    border-radius: 5px;
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
