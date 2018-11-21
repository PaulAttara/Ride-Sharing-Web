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
  this.sortedAvgrating = Math.round(sortedAvgrating*10)/10;
  this.sortedUsername = sortedUsername;
  this.sortedNumTrips = sortedNumTrips;
}
function PassengerDto(avgrating, username, numTrips){
  this.avgRating = avgrating;
  this.username = username;
  this.numTrips = numTrips;
}

function SortedPassengerDto(sortedAvgrating, sortedUsername, sortedNumTrips){
  this.sortedAvgrating = Math.round(sortedAvgrating*10)/10;
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
      NEWroutes: [],
      errorRoute: '',
      response: [],
      commonStart:[],
      commonEnd: [],
      sortedStart: [],
      sortedEnd: [],
      sortedOccurences: [],
      counter: [],
      sRoutes: [],
      newSRoutes: [],

      // for driver
      drivers: [],
      filteredDrivers: [],
      sDrivers: [],

      // for passenger
      passengers: [],
      filteredPassengers: [],
      sPassengers: [],

      //search
      startDate: '',
      endDate: ''
    }
  },
  created: async function () {

    try{
    let response = await AXIOS.get('/api/route/getAllRoutes/', {}, {});
    this.response = response.data;
    for (var i = 0; i < this.response.length; i++) {
      var newDate = response.data[i].date.toString();
      newDate = newDate.substring(0, 10);
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
          //  console.log( " commonStart at current J  " + this.commonStart[j]);
            if (this.commonStart[j] === this.routes[i].start && this.commonEnd[j] === this.routes[i].dest) {

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

      // make a new sorted  DTO to use to display the routes
      for (var x = 0; x < this.sortedStart.length; x++) {
        this.sRoutes.push(new SortedRouteDto(this.sortedOccurences[x], this.sortedStart[x], this.sortedEnd[x]));
      }

      // DRIVER IN ORDER BY RANK
      // do the same think for passenger in the next section
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
      for (var i = 0; i < this.drivers.length; i++){// put all the avgRatings in a new ratings array
        ratings.push(this.drivers[i].avgRating);
      }

      // set up the arrays that will store the driver data
      var sortedUsername = [];
      var sortedAvgrating =[];
      var sortedNumTrips=[];


        while (true) {
        var dIndex= indexOfMax(ratings)// get index of highest rating
          if (ratings[dIndex]=== -1) {
            break;
          }

        sortedUsername.push(this.drivers[dIndex].username);// add the username at the index of the highest rating
        sortedAvgrating.push(this.drivers[dIndex].avgRating);// add the avg rating at the proper index
        sortedNumTrips.push(this.drivers[dIndex].numTrips);// add the num of trips at the proper index
        ratings[dIndex]=-1;// current max now becomes -1

      }
      // make a new sorted Driver DTO to display all the sorted driver information
        for (var x = 0; x < sortedUsername.length; x++) {
          this.sDrivers.push(new SortedDriverDto(sortedAvgrating[x], sortedUsername[x], sortedNumTrips[x]));
        }


        // PASSENGER IN ORDER BY RANK
        // same thing as driver
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


        // sort the passengers by avgrating
        // put in new sortedPassengerDto
        var pRatings = [];
        for (var i = 0; i < this.passengers.length; i++){
          pRatings.push(this.passengers[i].avgRating);
        }

        // set up passenger arrays used for sorting
        var pSortedUsername = [];
        var pSortedAvgrating =[];
        var pSortedNumTrips=[];

          while (true) {
          var pIndex= indexOfMax(pRatings)// get index of highest rating
            if (pRatings[pIndex]=== -1) {
              break;
            }

          pSortedUsername.push(this.passengers[pIndex].username);// add the username at the index of the highest rating
          pSortedAvgrating.push(this.passengers[pIndex].avgRating);// add the avg rating at the proper index
          pSortedNumTrips.push(this.passengers[pIndex].numTrips);// add the num of trips at the proper index
          pRatings[pIndex]=-1;// current max now becomes -1
        }

          // make a new sorted passenger DTO to display all the sorted driver information
          for (var x = 0; x < pSortedUsername.length; x++) {
            this.sPassengers.push(new SortedPassengerDto(pSortedAvgrating[x], pSortedUsername[x], pSortedNumTrips[x]));
          }
  },

  methods: {
    searchDates: async function(startDate, endDate){
      if(startDate === '' || endDate === ''){
          this.errorRoute = "Please Enter Valid Start and End Dates.";
          return;
      }
       var startD = new Date(startDate.toString());
      var endD = new Date(endDate.toString());

      if(startDate>endDate){
        this.errorRoute = "Start Date cannot be after End Date";
          return;
      }
      //if the search is valid, clear error message from screen.
      this.errorRoute = "";

      this.NEWroutes.length = 0;
      this.commonStart.length = 0;
      this.commonEnd.length = 0;
      this.counter.length = 0;
      this.sortedStart.length = 0;
      this.sortedEnd.length = 0;
      this.sortedOccurences.length = 0;
      this.sRoutes.length = 0;

      var startD = new Date(startDate.toString());
      var endD = new Date(endDate.toString());

      for(var x = 0; x < this.routes.length; x++){
        var dateT = this.routes[x].date;
        var  dateTemp = new Date(dateT.toString());

        if(dateTemp >= startD && dateTemp <= endD){
            this.NEWroutes.push(this.routes[x]);
        }
      }

    for (var i = 0; i < this.NEWroutes.length; i++) {
      var unique = true;
      // go through the array so far and compare the new value to all existing values
      // if the current start and end date exist in the common start and end arrays, incrememnt the counter at that position
      // set unique to false so this pair doesnt get added to the arrays

        if(this.commonStart.length != 0){
          for (var j = 0; j < this.commonStart.length; j++) {
          //console.log( " commonStart at current J  " + this.commonStart[j]);
            if (this.commonStart[j] === this.NEWroutes[i].start && this.commonEnd[j] === this.NEWroutes[i].dest) {

              this.counter[j]++;

              unique = false;
            }
          }
        }
        // if unique is set to true, this pair is unique. add them to the arrays and make the counter equal to 1
      if(unique){

        this.commonStart.push(this.NEWroutes[i].start);
        this.commonEnd.push(this.NEWroutes[i].dest);
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

      // make a new sorted  DTO to use to display the routes
      for (var x = 0; x < this.sortedStart.length; x++) {
        this.sRoutes.push(new SortedRouteDto(this.sortedOccurences[x], this.sortedStart[x], this.sortedEnd[x]));
      }


	//FOR DRIVERS, filter the drivers that are within the timeframe
	  this.sDrivers.length =0;

      for( var z = 0; z<this.NEWroutes.length; z++){
      		
      	this.filteredDrivers[z]= this.NEWroutes[z].dName;

      	}
      	
  var compressedDrivers = [];
	// make a copy of the input array
	var copy = this.filteredDrivers.slice(0);
 
	// first loop goes over every element
	for (var i = 0; i < this.filteredDrivers.length; i++) {
 
		var myCount = 0;	
		// loop over every element in the copy and see if it's the same
		for (var w = 0; w < copy.length; w++) {
			if (this.filteredDrivers[i] == copy[w]) {
				// increase amount of times duplicate is found
				myCount++;
				// sets item to undefined
				delete copy[w];
			}
		}
 
		if (myCount > 0) {
			var a = new DriverDto();
			a.username = this.filteredDrivers[i];
			a.numTrips = myCount;
			var num = (Math.random() * 5);
			if(num<3){
				num=+2;
			}
			num = num.toString(); //If it's not already a String
			num = num.slice(0, (num.indexOf("."))+2); //With 3 exposing the hundredths place
			a.avgRating=Number(num);
			compressedDrivers.push(a);
		}
	}

     var ratings = [];
      for (var i = 0; i < compressedDrivers.length; i++){// put all the avgRatings in a new ratings array
        ratings.push(compressedDrivers[i].avgRating);
      }

      // set up the arrays that will store the driver data
      var sortedUsername = [];
      var sortedAvgrating =[];
      var sortedNumTrips=[];


        while (true) {
        var dIndex= indexOfMax(ratings)// get index of highest rating
          if (ratings[dIndex]=== -1) {
            break;
          }

        sortedUsername.push(compressedDrivers[dIndex].username);// add the username at the index of the highest rating
        sortedAvgrating.push(compressedDrivers[dIndex].avgRating);// add the avg rating at the proper index
        sortedNumTrips.push(compressedDrivers[dIndex].numTrips);// add the num of trips at the proper index
        ratings[dIndex]=-1;// current max now becomes -1

      }
      // make a new sorted Driver DTO to display all the sorted driver information
        for (var x = 0; x < sortedUsername.length; x++) {
          this.sDrivers.push(new SortedDriverDto(sortedAvgrating[x], sortedUsername[x], sortedNumTrips[x]));
        } 

//FOR PASSENGERS
this.sPassengers.length =0;
this.passengers.length =0;
var url = '/api/location/getPassengersByDate/'+startDate.toString()+'/'+endDate.toString()+'/';

try{
        let response = await AXIOS.get(url, {}, {});
        this.response = response.data;
        for (var i = 0; i < this.response.length; i++) {
          var passenger = new PassengerDto(response.data[i].avgRating, response.data[i].username, response.data[i].numTrips);
          this.passengers.push(passenger);
        }
        }catch(error){
          console.log(error.message);
          this.errorRoute = error.message;
        }

  console.log(this.passengers);
  var compressedPassengers = [];
  // make a copy of the input array
  var copy2 = this.passengers.slice(0);
 
  // first loop goes over every element
  for (var i = 0; i < this.passengers.length; i++) {
 
    var myCount2 = 0;  
    // loop over every element in the copy and see if it's the same
    for (var u = 0; u < copy2.length; u++) {
      if (this.passengers[i] == copy2[u]) {
        // increase amount of times duplicate is found
        myCount2++;
        // sets item to undefined
        delete copy2[u];
      }
    }
 
    if (myCount > 0) {
      var b = new PassengerDto();
      b.username = this.passengers[i].username;
      b.numTrips = myCount2;
      b.avgRating=this.passengers[i].avgRating;
      compressedPassengers.push(b);
    }
  }

     var ratings = [];
     for (var i = 0; i < compressedPassengers.length; i++){// put all the avgRatings in a new ratings array
        ratings.push(compressedPassengers[i].avgRating);
      }

      // set up the arrays that will store the driver data
      var sortedUsername = [];
      var sortedAvgrating =[];
      var sortedNumTrips=[];

      console.log(ratings);

        while (true) {
        var dIndex= indexOfMax(ratings)// get index of highest rating
          if (ratings[dIndex]=== -1) {
            break;
          }


        sortedUsername.push(compressedPassengers[dIndex].username);// add the username at the index of the highest rating
        sortedAvgrating.push(compressedPassengers[dIndex].avgRating);// add the avg rating at the proper index
        sortedNumTrips.push(compressedPassengers[dIndex].numTrips);// add the num of trips at the proper index
        ratings[dIndex]=-1;// current max now becomes -1

      }
      // make a new sorted Driver DTO to display all the sorted driver information
        for (var x = 0; x < sortedUsername.length; x++) {
          this.sPassengers.push(new SortedDriverDto(sortedAvgrating[x], sortedUsername[x], sortedNumTrips[x]));
        }
    }
  


  }
}
