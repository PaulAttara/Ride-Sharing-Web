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
      response: [],
      filter: '',
      content: ''
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
        search: function (filter, content) {
          console.log(filter);
          console.log(content);
      // AXIOS.get('/api/user/login/'+username+'/'+password+'/', {}, {})
      //   .then(response => {
      //     // JSON responses are automatically parsed.
      //     //this.response.push(response.data)
      //     this.response = response.data.toString();
      //     //console.log(this.response.includes("false"));
      //     if (this.response === "false") {
      //       this.errorLogin = "Incorrect username and password!"
      //     }else {
      //       this.$router.push('/app/my-account');
      //       this.errorLogin = "";
      //     }
      //   })
      //   .catch(e => {
      //     var errorMsg = e.message;
      //     console.log(errorMsg);
      //     this.errorLogin = errorMsg;
      //   });
    }

  }
}
