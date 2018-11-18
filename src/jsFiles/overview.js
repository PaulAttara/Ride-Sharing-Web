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
      errorRoute: '',
      response: []
    }
  },
  created: function () {
    AXIOS.get('/api/route/getAllRoutes/', {}, {})
      .then(response => {
        // JSON responses are automatically parsed.
        this.response = response.data;
        //console.log(this.response.length)
        for (var i = 0; i < this.response.length; i++) {
          var newDate = response.data[0].date.toString();
          var route = new RouteDto(response.data[i].routeId, response.data[i].car.driver.username, response.data[i].seatsAvailable, response.data[i].startLocation, "", newDate.split('T')[0], "en route");
          this.routes.push(route);
        }
      })
      .catch(e => {
        var errorMsg = e.message;
        console.log(errorMsg);
        this.errorRoute = errorMsg;
      });
  },
  methods: {
    getRoutes: function () {
    }
  }
}
