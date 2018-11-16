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
    login: function (username, password) {
      AXIOS.get('/api/user/login/'+username+'/'+password+'/', {}, {})
        .then(response => {
          // JSON responses are automatically parsed.
          //this.response.push(response.data)
          this.response = response.data.toString();
          //console.log(this.response.includes("false"));
          if (this.response === "false") {
            this.errorLogin = "Incorrect username and password!"
          }else {
            this.$router.push('/app');
            this.errorLogin = "";
          }
        })
        .catch(e => {
          var errorMsg = e.message;
          console.log(errorMsg);
          this.errorLogin = errorMsg;
        });
    }
  }
}
