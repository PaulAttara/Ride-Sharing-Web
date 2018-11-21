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

export default {
  name: 'fleet-overview',
  data () {
    return {
      view: '',
      routes: [],
      drivers: [],
      passengers: [],
      errorRoute: '',
      response: [],
      filter: 'searchby',
      searchTerm: '',

    }
  },
  created: function () {
    this.routeView();
  },
  methods: {
    search: function (filter, searchTerm) {
      this.errorRoute = '';

      if (filter === 'searchby'){
        this.onChange();
        this.errorRoute = "No filter selected"
        return;
      }
      console.log(filter);

      if (searchTerm === '') {
        this.onChange();
        this.errorRoute = "No search term entered"
        this.filter = filter;
        return;
      }

      if (this.view === 'routes') {
        this.filteredRouteView(filter, searchTerm.toLowerCase());
      }else if(this.view === 'passengers'){
        this.filteredPassengerView(filter, searchTerm.toLowerCase());
      }else if(this.view === 'drivers'){
        this.filteredDriverView(filter, searchTerm.toLowerCase());
      }
    },

    onChange: function(){
      this.errorRoute = '';
      this.filter = 'searchby';
      this.searchTerm = '';

      if (this.view === 'routes') {
        this.routeView();
      }else if(this.view === 'passengers'){
        this.passengerView();
      }else if(this.view === 'drivers'){
        this.driverView();
      }
    },

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

    passengerView: async function(){
      this.passengers = [];

      try{
      let response = await AXIOS.get('/api/user/getAllUsers/passenger', {}, {});
      this.response = response.data;
      for (var i = 0; i < this.response.length; i++) {
        var passenger = new UserDto(response.data[i].firstName,response.data[i].lastName,response.data[i].city,
                                  response.data[i].address,response.data[i].phoneNumber,response.data[i].avgRating,
                                   response.data[i].username, response.data[i].numTrips, response.data[i].userStatus);
        this.passengers.push(passenger);
      }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
    },

    driverView: async function(){
      this.drivers = [];

      try{
      let response = await AXIOS.get('/api/user/getAllUsers/driver', {}, {});
      this.response = response.data;
      for (var i = 0; i < this.response.length; i++) {
        var driver = new UserDto(response.data[i].firstName,response.data[i].lastName,response.data[i].city,
                                  response.data[i].address,response.data[i].phoneNumber,response.data[i].avgRating,
                                   response.data[i].username, response.data[i].numTrips, response.data[i].userStatus);
        this.drivers.push(driver);
      }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
    },

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

    filteredPassengerView: async function(filter, searchTerm) {
      this.passengers = [];
      try{
      let response = await AXIOS.get('/api/user/getAllUsers/passenger', {}, {});
      this.response = response.data;
      for (var i = 0; i < this.response.length; i++) {
        var passenger = new UserDto(response.data[i].firstName,response.data[i].lastName,response.data[i].city,
                                 response.data[i].address,response.data[i].phoneNumber,response.data[i].avgRating,
                                 response.data[i].username, response.data[i].numTrips, response.data[i].userStatus);
        switch (filter) {
          case "username":
            if (response.data[i].username.toString().toLowerCase().toLowerCase().includes(searchTerm)){
              this.passengers.push(passenger);
            }
            break;
          case "status":
            if (response.data[i].userStatus.toString().toLowerCase().toLowerCase().includes(searchTerm)){
              this.passengers.push(passenger);
            }
            break;
          case "trips":
            if (response.data[i].numTrips.toString().includes(searchTerm)){
              this.passengers.push(passenger);
            }
            break;
          case "lastname":
            if (response.data[i].lastName.toString().toLowerCase().includes(searchTerm)){
              this.passengers.push(passenger);
            }
            break;
          case "city":
            if (response.data[i].city.toString().toLowerCase().includes(searchTerm)){
              this.passengers.push(passenger);
            }
            break;
          case "address":
            if (response.data[i].address.toString().toLowerCase().includes(searchTerm)){
              this.passengers.push(passenger);
            }
            break;
          case "number":
            if (response.data[i].phoneNumber.toString().includes(searchTerm)){
              this.passengers.push(passenger);
            }
            break;
          case "rating":
            if (response.data[i].avgRating.toString().includes(searchTerm)){
              this.passengers.push(passenger);
            }
            break;
          default:
              this.passengers.push(passenger);
        }
      }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
    },

    filteredDriverView: async function(filter, searchTerm) {
      this.drivers = [];
      try{
      let response = await AXIOS.get('/api/user/getAllUsers/driver', {}, {});
      this.response = response.data;
      for (var i = 0; i < this.response.length; i++) {
        var driver = new UserDto(response.data[i].firstName,response.data[i].lastName,response.data[i].city,
                                 response.data[i].address,response.data[i].phoneNumber,response.data[i].avgRating,
                                 response.data[i].username, response.data[i].numTrips, response.data[i].userStatus);

        switch (filter) {
          case "username":
            if (response.data[i].username.toString().toLowerCase().includes(searchTerm)){
              this.drivers.push(driver);
            }
            break;
          case "status":
            if (response.data[i].userStatus.toString().toLowerCase().toLowerCase().includes(searchTerm)){
              this.passengers.push(driver);
            }
            break;
          case "trips":
            if (response.data[i].numTrips.toString().includes(searchTerm)){
              this.drivers.push(driver);
            }
            break;
          case "lastname":
            if (response.data[i].lastName.toString().toLowerCase().includes(searchTerm)){
              this.drivers.push(driver);
            }
            break;
          case "city":
            if (response.data[i].city.toString().toLowerCase().includes(searchTerm)){
              this.drivers.push(driver);
            }
            break;
          case "address":
            if (response.data[i].address.toString().toLowerCase().includes(searchTerm)){
              this.drivers.push(driver);
            }
            break;
          case "number":
            if (response.data[i].phoneNumber.toString().includes(searchTerm)){
              this.drivers.push(driver);
            }
            break;
          case "rating":
            if (response.data[i].avgRating.toString().includes(searchTerm)){
              this.drivers.push(driver);
            }
            break;
          default:
              this.drivers.push(driver);
        }
      }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
    },

  }
}
