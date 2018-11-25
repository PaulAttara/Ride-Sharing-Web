import axios from 'axios'
import { LoginEvent } from '../jsFiles/LogInEvent.js'
var config = require('../../config')


var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = 'http://' + config.dev.backendHost + ':' + config.dev.backendPort


var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})


function Driver(username, firstname, lastname, status){
  this.username = username;
  this.firstname = firstname;
  this.lastname = lastname;
  this.status = status;
}


function Passenger(username, firstname, lastname, status){
  this.username = username;
  this.firstname = firstname;
  this.lastname = lastname;
  this.status = status;
}

export default {
  name: 'account',
  data () {
    return {
      // for routes
      drivers: [],
      passengers: [],
      errorRoute: '',
      response: [],
      loggedIn: false
    }
  },
  created: async function () {

    // LoginEvent.$on('logIn', isLoggedIn => {
    // console.log(`Oh, that's nice. It's gotten clicks! ${isLoggedIn} :)`);this.logIn();
    // });


      //Get Drivers
      try{
      let response = await AXIOS.get('/api/user/getAllUsers/driver', {}, {});
      this.response = response.data;
      for (var i = 0; i < this.response.length; i++) {
        var driver = new Driver(response.data[i].username, response.data[i].firstName, response.data[i].lastName, response.data[i].userStatus);
        this.drivers.push(driver);
      }

      }catch(error){
        console.log(error.message);
        //this.errorRoute = error.message;
      }

      //Get Passengers
      try{
      let response = await AXIOS.get('/api/user/getAllUsers/passenger', {}, {});
      this.response = response.data;
      for (var i = 0; i < this.response.length; i++) {
        var passenger = new Passenger(response.data[i].username, response.data[i].firstName, response.data[i].lastName, response.data[i].userStatus);
        this.passengers.push(passenger);
      }

      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }

  },

  methods: {
    logIn: function () {
      this.loggedIn = true;
      console.log("IT WORKED");
    }

  }
}
