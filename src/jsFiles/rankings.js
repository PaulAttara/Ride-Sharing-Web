import axios from 'axios'
var config = require('../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = 'http://' + config.dev.backendHost + ':' + config.dev.backendPort

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})

function RouteDto(routeId, start, dest){
  this.routeId = routeId;
  this.start = start;
  this.dest = dest;
}
function DriverDto(id, driverName, driverRanking, numTrips){
  this.driverId = driverId;
  this.driverName = driverName;
  this.driverRanking = driverRanking;
  this.numTrips = numTrips;
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

export default {
  name: 'rankings',
  data () {
    return {
      routes: [],
      errorRoute: '',
      response: [],
      commonStart:[],
      commonEnd: [],
      sortedRoutes: [],
      counter: []
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
        for (var i = 0; i < this.response.length; i++) {
          var route = new RouteDto(response.data[i].routeId, response.data[i].startLocation, response.data[i].endLocation,);
          this.routes.push(route);
        }



        for (var i = 0; i < this.routes.length; i++) {
          console.log(this.routes[i].start);
          console.log(this.routes[i].dest);
          // go through the array so far and compare the new value to all existing values
          var occurence=0; // set occurence to zero after every route
          for (var x=0; x <= commonEnd.lenth; x++) {
            // if the current start and end date exist at the current x value
            if (this.routes[i].start === this.commonStart[x] && this.routes[i].dest === this.commonEnd[x]) {
              occurence=1;
              counter[i]=counter[i]+occurence; // increment the counter array at the position i, which is the same position as the current route
            }
            else {
              this.commonStart.push(route[i].start);
              this.commonEnd.push(route[i].dest);
            }
          }
        }
          // print the routes start and end location in order based on the counter:
          // first get position of max number in counter, then make it equal to zero
          // add the corresponding route from routes to new array to print
          //get the next max number...
          while (true) {
            var index = indexOfMax(counter);
            this.sortedRoutes.push(routes[index])
            if (counter[index]==-1) {
              break;
            }
            else {
              counter[index]=-1;
            }
          }



      }).catch(e => {
        var errorMsg = e.message;
        console.log(errorMsg);
        this.errorRoute = errorMsg;
      });
      // AXIOS.get('/api/route/getAllDrivers/', {}, {}) // method not created yet
      //   .then(response => {
      //     // JSON responses are automatically parsed.
      //     this.response = response.data;
      //     for (var i = 0;i <this.response.lenth; i++) {
      //       var driver = new DriverDto(resp.data[i].driverId,resp.data[i].driverName, resp.data[i].driverRanking, resp.data[i].numTrips);
      //       this.driver.push(driver);
      //     }
      //   })


  },
  methods: {
    getRoutes: function () {
    }
  }
}
