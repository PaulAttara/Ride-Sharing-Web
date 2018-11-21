import axios from 'axios'
var config = require('../../config')

var frontendUrl = 'http://' + config.dev.host + ':' + config.dev.port
var backendUrl = 'http://' + config.dev.backendHost + ':' + config.dev.backendPort

var AXIOS = axios.create({
  baseURL: backendUrl,
  headers: { 'Access-Control-Allow-Origin': frontendUrl }
})

export default {
  name: 'login',
  data () {
    return {
      username: [],
      password: '',
      errorLogin: '',
      response: ""
    }
  },
  created: function () {
  },
  methods: {
    login: async function (username, password) {
      try{
      let response = await   AXIOS.get('/api/user/getUser/'+username+'/', {}, {});
      console.log(response.data.role);
      if (!(response.data.role === "admin")) {
        this.errorLogin = "Administrator access only!"
        return;
      }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }

      try{
      let response = await   AXIOS.get('/api/user/login/'+username+'/'+password+'/', {}, {});
      this.response = response.data.toString();
      //console.log(this.response.includes("false"));
      if (this.response === "false") {
        this.errorLogin = "Incorrect username and password!"
      }else {
        this.$router.push('/app/my-account');
        this.errorLogin = "";
      }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
    }
  }
}
