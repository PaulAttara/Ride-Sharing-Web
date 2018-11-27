import axios from 'axios'
var config = require('../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = 'http://' + config.dev.backendHost + ':' + config.dev.backendPort

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})


function RouteDto(id, dName, seats, start, dest, date, status){
  this.id = id;
  this.dName = dName;
  this.seats = seats;
  this.start = start;
  this.dest = dest;
  this.date = date;
  this.status = status;
}

function UserDto(firstname, lastname, city, address, phonenumber, avgrating, username, numTrips, status){
  this.firstname = firstname;
  this.lastname = lastname;
  this.city = city;
  this.address = address;
  this.phonenumber = phonenumber;
  this.avgRating = Math.round(avgrating * 10)/10;
  this.username = username;
  this.numTrips = numTrips;
  this.status = status;
}

function calculateAndDisplayRoute(context, directionsService, directionsDisplay) {
  var origin, dest;
  for (var i=0; i<context.routes.length; i++) {
    //console.log(route)
    if(context.routes[i].id == context.filter){
      origin = context.routes[i].start;
      dest = context.routes[i].dest;
    }
  }
  directionsService.route({
    origin: origin,
    destination: dest,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

export default {
  name: 'fleet-overview',
  data () {
    return {
      view: '',
      routes: [],
      users: [],
      errorRoute: '',
      response: [],
      filter: 'searchby',
      searchTerm: '',
      users: [],

    }
  },


  created: function () {

    this.routeView();


  },
  methods: {
      initMap: function(){
        this.$nextTick(function(){
          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer;
          var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 45.49, lng: -73.61},
            zoom: 9
          });
          directionsDisplay.setMap(map);
          var thisContext = this;
          var onChangeHandler = function() {
            calculateAndDisplayRoute(thisContext, directionsService, directionsDisplay);
          };
          document.getElementById('filterselect').addEventListener('change', onChangeHandler);
        })
      },
    //on input change
    change: function(){
      if(this.filter === 'searchby'){
        this.errorRoute = "No filter selected";
        return;
      }
      if (this.view === 'routes') {
        this.filteredRouteView(this.filter, this.searchTerm.toLowerCase());
        this.errorRoute = '';
      }else if(this.view === 'passengers' || this.view === 'drivers'){
        this.filteredUserView(this.filter, this.searchTerm.toLowerCase());
        this.errorRoute = '';
      }
      
    },

    //function to seach for match based on filter and entry
    search: function () {
      this.errorRoute = '';

console.log(this.searchTerm);
console.log(this.filter);


      if (this.filter === 'searchby'){
        this.onChange();
        this.errorRoute = "No filter selected"
        return;
      }

      if (this.searchTerm === '') {
        this.onChange();
        this.errorRoute = "No search term entered"
        //this.filter = filter;
        return;
      }

      if (this.view === 'routes') {
        this.filteredRouteView(this.filter, this.searchTerm.toLowerCase());
      }else if(this.view === 'passengers' || this.view === 'drivers'){
        this.filteredUserView(this.filter, this.searchTerm.toLowerCase());
      }
    },
    //function to switch table views
    onChange: function(){
      this.errorRoute = '';
      this.filter = 'searchby';
      this.searchTerm = '';

      if (this.view === 'routes') {
        this.routeView();
      }else if(this.view === 'passengers' || this.view === 'drivers'){
        this.userView();
      }else if(this.view === 'rMap'){
        this.initMap();
      }

    },
    //function to display route data
    routeView: async function(){
      this.view='routes';
      this.routes = [];
      try{
        let response = await AXIOS.get('/api/route/getAllRoutes/', {}, {});
        this.response = response.data;
        for (var i = 0; i < this.response.length; i++) {
          var newDate = response.data[i].date.toString();
          var route = new RouteDto(response.data[i].routeId, response.data[i].car.driver.username, response.data[i].seatsAvailable, response.data[i].startLocation, "", newDate.split('T')[0], response.data[i].status);

          let destinationResponse = await AXIOS.get('/api/location/getDestination/'+ response.data[i].routeId.toString() + '/', {}, {});
          route.dest = destinationResponse.data.city.toString();

          this.routes.push(route);
        }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
    },
    //function to display user data
    userView: async function(){
      this.users = [];
      var role = this.view.slice(0, -1); // passengers -> passenger

      try{
        let response = await AXIOS.get('/api/user/getAllUsers/' + role, {}, {});
        this.response = response.data;
        for (var i = 0; i < this.response.length; i++) {
        var user = new UserDto(response.data[i].firstName,response.data[i].lastName,response.data[i].city,
                                  response.data[i].address,response.data[i].phoneNumber,response.data[i].avgRating,
                                   response.data[i].username, response.data[i].numTrips, response.data[i].userStatus);
        this.users.push(user);
      }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
    },
    //function that displays filtered routes based on search entry
    filteredRouteView: async function(filter, searchTerm) {
      this.view='routes';
      this.routes = [];
      try{
        let response = await AXIOS.get('/api/route/getAllRoutes/', {}, {});
        this.response = response.data;
        for (var i = 0; i < this.response.length; i++) {
          var newDate = response.data[i].date.toString();
          var route = new RouteDto(response.data[i].routeId, response.data[i].car.driver.username, response.data[i].seatsAvailable, response.data[i].startLocation, "", newDate.split('T')[0], response.data[i].status);

          let destinationResponse = await AXIOS.get('/api/location/getDestination/'+ response.data[i].routeId.toString() + '/', {}, {});
          route.dest = destinationResponse.data.city.toString();

          switch (filter) {
            case "routeid":
              if (response.data[i].routeId.toString().includes(searchTerm)){
                this.routes.push(route);
              }
              break;
            case "username":
              if (response.data[i].car.driver.username.toString().includes(searchTerm)){
                this.routes.push(route);
              }
              break;
            case "startlocation":
              if (response.data[i].startLocation.toString().toLowerCase().includes(searchTerm)){
                this.routes.push(route);
              }
              break;
            case "destination":
              if (route.dest.toLowerCase().includes(searchTerm)) {
                this.routes.push(route);
              }
              break;
            case "date":
              if (response.data[i].date.toString().includes(searchTerm)){
                  this.routes.push(route);
              }
              break;
            case "status":
              if (response.data[i].status.toString().toLowerCase().includes(searchTerm)){
                  this.routes.push(route);
              }
              break;
            default:
              this.routes.push(route);
          }
        }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
    },
    //function that displays filtered users (either passenger, or driver) based on search entry
    filteredUserView: async function(filter, searchTerm) {
      this.users = [];
      var role = this.view.slice(0, -1);

      try{
      let response = await AXIOS.get('/api/user/getAllUsers/' + role, {}, {});
      this.response = response.data;
      for (var i = 0; i < this.response.length; i++) {
        var user = new UserDto(response.data[i].firstName,response.data[i].lastName,response.data[i].city,
                                 response.data[i].address,response.data[i].phoneNumber,response.data[i].avgRating,
                                 response.data[i].username, response.data[i].numTrips, response.data[i].userStatus);
        switch (filter) {
          case "username":
            if (response.data[i].username.toString().toLowerCase().toLowerCase().includes(searchTerm)){
              this.users.push(user);
            }
            break;
          case "status":
            if (response.data[i].userStatus.toString().toLowerCase().toLowerCase().includes(searchTerm)){
              this.users.push(user);
            }
            break;
          case "trips":
            if (response.data[i].numTrips.toString().includes(searchTerm)){
              this.users.push(user);
            }
            break;
          case "lastname":
            if (response.data[i].lastName.toString().toLowerCase().includes(searchTerm)){
              this.users.push(user);
            }
            break;
          case "city":
            if (response.data[i].city.toString().toLowerCase().includes(searchTerm)){
              this.users.push(user);
            }
            break;
          case "address":
            if (response.data[i].address.toString().toLowerCase().includes(searchTerm)){
              this.users.push(user);
            }
            break;
          case "number":
            if (response.data[i].phoneNumber.toString().includes(searchTerm)){
              this.users.push(user);
            }
            break;
          case "rating":
            if (response.data[i].avgRating.toString().includes(searchTerm)){
              this.users.push(user);
            }
            break;
          default:
          this.users.push(user);
        }
      }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
    },
  }
}
