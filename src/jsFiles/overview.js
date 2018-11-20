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

function UserDto(firstname, lastname, city, address, phonenumber, avgrating, username, numTrips){
  this.firstname = firstname;
  this.lastname = lastname;
  this.city = city;
  this.address = address;
  this.phonenumber = phonenumber;
  this.avgRating = Math.round(avgrating * 10)/10;
  this.username = username;
  this.numTrips = numTrips;
}

export default {
  name: 'fleet-overview',
  data () {
    return {
      view: '',
      routes: [],
      destination: [],
      errorRoute: '',
      response: [],
      filter: 'searchby',
      drivers: [],
      passengers: []
    }
  },
  created: function () {
    this.routeView();
  },
  methods: {
    search: function (filter) {
      console.log(filter);
    },
    onChange: function(){
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
      this.destination=[];
      try{
        let response = await AXIOS.get('/api/route/getAllRoutes/', {}, {});
        this.response = response.data;
        for (var i = 0; i < this.response.length; i++) {
          var newDate = response.data[i].date.toString();
          var route = new RouteDto(response.data[i].routeId, response.data[i].car.driver.username, response.data[i].seatsAvailable, response.data[i].startLocation, "", newDate.split('T')[0], response.data[i].status);
          this.routes.push(route);
        }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
      //new axios get
      try{
        for (var i = 0; i < this.routes.length; i++) {
          let response = await AXIOS.get('/api/location/getDestination/'+this.routes[i].id+'/', {}, {});
          this.destination.push(response.data);
          this.routes[i].dest = this.destination[i].city.toString();
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
        var driver = new UserDto(response.data[i].firstName,response.data[i].lastName,response.data[i].city,
                                  response.data[i].address,response.data[i].phoneNumber,response.data[i].avgRating,
                                   response.data[i].username, response.data[i].numTrips);
        this.passengers.push(driver);
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
                                   response.data[i].username, response.data[i].numTrips);
        this.drivers.push(driver);
      }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
    }
  }
}
