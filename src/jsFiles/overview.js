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

export default {
  name: 'fleet-overview',
  data () {
    return {
      routes: [],
      destination: [],
      errorRoute: '',
      response: []
    }
  },
  created: async function () {
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
      this.destination = response.data;
      this.routes[i].dest = this.destination.city.toString();
    }
  }catch(error){
    console.log(error.message);
    this.errorRoute = error.message;
  }
  },
  methods: {
  }
}
