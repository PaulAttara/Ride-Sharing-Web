import axios from 'axios'
import { LoginEvent } from '../jsFiles/LogInEvent.js'
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
      response: "",
      loggedIn: false
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
      if (this.response === "false") {
        this.errorLogin = "Incorrect username and password!"
      }else {
        this.$router.push('/app/my-account');
        this.errorLogin = "";
        LoginEvent.$emit('logIn', true);
      }
      }catch(error){
        console.log(error.message);
        this.errorRoute = error.message;
      }
    }

  }
}
