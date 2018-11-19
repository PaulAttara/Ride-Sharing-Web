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

function SortedRouteDto(sortedOccurences, sortedStart, sortedEnd){
  this.sortedOccurences = sortedOccurences;
  this.sortedStart = sortedStart;
  this.sortedEnd = sortedEnd;
}

function DriverDto(avgrating, username, numTrips){
  this.avgRating = avgrating;
  this.username = username;
  this.numTrips = numTrips;
}

function SortedDriverDto(sortedAvgrating, sortedUsername, sortedNumTrips){
  this.sortedAvgrating = sortedAvgrating;
  this.sortedUsername = sortedUsername;
  this.sortedNumTrips = sortedNumTrips;
}
function PassengerDto(avgrating, username, numTrips){
  this.avgRating = avgrating;
  this.username = username;
  this.numTrips = numTrips;
}

function SortedPassengerDto(sortedAvgrating, sortedUsername, sortedNumTrips){
  this.sortedAvgrating = sortedAvgrating;
  this.sortedUsername = sortedUsername;
  this.sortedNumTrips = sortedNumTrips;
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
      // for routes
      routes: [],
      errorRoute: '',
      response: [],
      commonStart:[],
      commonEnd: [],
      sortedStart: [],
      sortedEnd: [],
      sortedOccurences: [],
      counter: [],
      sRoutes: [],

      // for driver
      drivers: [],
      sDrivers: [],

      // for passenger
      passengers: [],
      sPassengers: []
    }
  },
  created: async function () {
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


    try{
    let response = await AXIOS.get('/api/route/getAllRoutes/', {}, {});
    this.response = response.data;
    for (var i = 0; i < this.response.length; i++) {
      var newDate = response.data[i].date.toString();
      var route = new RouteDto(response.data[i].routeId, response.data[i].car.driver.username, response.data[i].seatsAvailable, response.data[i].startLocation, "", newDate.split('T')[0], "en route");
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

    for (var i = 0; i < this.routes.length; i++) {
      var unique = true;
      // go through the array so far and compare the new value to all existing values

        // if the current start and end date exist in the common start and end arrays, incrememnt the counter at that position
        // set unique to false so this pair doesnt get added to the arrays

        if(this.commonStart.length != 0){
          for (var j = 0; j < this.commonStart.length; j++) {
            console.log(i + " " + j +this.commonStart[i-1] );
            console.log(i + " " + j +this.commonStart[j] );
            if (this.commonStart[j] === this.commonStart[i-1] && this.commonEnd[j] === this.commonEnd[i-1]) {

              this.counter[j]++;

              unique = false;
            }
          }
        }
        // if unique is set to true, this pair is unique. add them to the arrays and make the counter equal to 1
      if(unique){
          this.commonStart.push(this.routes[i].start);
        this.commonEnd.push(this.routes[i].dest);
        this.counter.push(1);
      }

      }
      // print the routes start and end location in order based on the counter:
      // first get position of max number in counter, then make it equal to minus one
      // add the corresponding route from routes to new array to print
      //get the next max number...
      while (true) {
        var index = indexOfMax(this.counter); // the index is the place in the array with the most occurences
        if (this.counter[index]=== -1) {
          break;
        }
        this.sortedStart.push(this.commonStart[index]); // add the route start with the most occurences to the sorted list
        this.sortedEnd.push(this.commonEnd[index]); // add the route end with the most occurences to the sorted list
        this.sortedOccurences.push(this.counter[index]);// add the number of occurences to the sorted list
        this.counter[index]=-1; // the current max now becomes -1

      }
      for (var x = 0; x < this.sortedStart.length; x++) {
        this.sRoutes.push(new SortedRouteDto(this.sortedOccurences[x], this.sortedStart[x], this.sortedEnd[x]));
      }
      // DRIVER IN ORDER BY RANK
      try{
      let response = await AXIOS.get('/api/user/getAllUsers/driver', {}, {});
      this.response = response.data;
      for (var i = 0; i < this.response.length; i++) {
        var driver = new DriverDto(response.data[i].avgRating, response.data[i].username, response.data[i].numTrips);
        this.drivers.push(driver);
      }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
      // sort the drivers by avgrating
      // put in new sortedDriverDto

      var ratings = [];
      for (var i = 0; i < this.drivers.length; i++){
        ratings.push(this.drivers[i].avgRating);
      }
      var sortedUsername = [];
      var sortedAvgrating =[];
      var sortedNumTrips=[];
        while (true) {
        var dIndex= indexOfMax(ratings)// get index of highest rating
        if (ratings[dIndex]=== -1) {
          break;
        }
        sortedUsername.push(this.drivers[dIndex].username);// add the username at the index of the highest rating
        sortedAvgrating.push(this.drivers[dIndex].avgRating);
        sortedNumTrips.push(this.drivers[dIndex].numTrips);
        ratings[dIndex]=-1;// current max now becomes -1
      }

        for (var x = 0; x < sortedUsername.length; x++) {
          this.sDrivers.push(new SortedDriverDto(sortedUsername[x], sortedAvgrating[x], sortedNumTrips[x]));
        }

        // PASSENGER IN ORDER BY RANK
        try{
        let response = await AXIOS.get('/api/user/getAllUsers/passenger', {}, {});
        this.response = response.data;
        for (var i = 0; i < this.response.length; i++) {
          var passenger = new PassengerDto(response.data[i].avgRating, response.data[i].username, response.data[i].numTrips);
          this.passengers.push(passenger);
        }
        }catch(error){
          console.log(error.message);
          this.errorRoute = error.message;
        }
        // sort the drivers by avgrating
        // put in new sortedDriverDto

        var pRatings = [];
        for (var i = 0; i < this.passengers.length; i++){
          pRatings.push(this.passengers[i].avgRating);
        }
        var pSortedUsername = [];
        var pSortedAvgrating =[];
        var pSortedNumTrips=[];
          while (true) {
          var pIndex= indexOfMax(pRatings)// get index of highest rating
          if (pRatings[pIndex]=== -1) {
            break;
          }
          pSortedUsername.push(this.passengers[pIndex].username);// add the username at the index of the highest rating
          pSortedAvgrating.push(this.passengers[pIndex].avgRating);
          pSortedNumTrips.push(this.passengers[pIndex].numTrips);
          pRatings[pIndex]=-1;// current max now becomes -1
        }
          for (var x = 0; x < pSortedUsername.length; x++) {
            this.sPassengers.push(new SortedPassengerDto(pSortedUsername[x], pSortedAvgrating[x], pSortedNumTrips[x]));

          }


  },
  methods: {

  }
}
