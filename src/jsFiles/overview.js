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
    // // Test participants
    // const p1 = new ParticipantDto('John')
    // const p2 = new ParticipantDto('Jill')
    // const event = new EventDto('Gala', '2018-10-31', '18:00', '23:00')
    // const event1 = new EventDto('Coachella', '2018-11-31', '17:00', '23:59')
    // p2.events.push(event)
    // p2.events.push(event1)
    // // Test event for p2 participant
    // // Sample initial content
    // this.participants = [p1, p2]
    AXIOS.get('/api/route/getAllRoutes/', {}, {})
      .then(response => {
        // JSON responses are automatically parsed.
        this.response = response.data;
        for (var resp in this.response) {
          console.log(resp.routeId);
          var route = new RouteDto(resp.routeId,"",resp.seatAvailable,resp.startLocation, "", resp.date, "active");
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
