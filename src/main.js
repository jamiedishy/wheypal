import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// import VueNativeSock from 'vue-native-websocket'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
// Vue.use(VueNativeSock, 'ws://localhost:8081/recommend', {
//   format: 'json',
//   reconnection: true, // (Boolean) whether to reconnect automatically (false)
//   reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
//   reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
// });
// Vue.use(VueSocketIO, 'ws://localhost:8081/recommend')
//  var socket = io()
// let socket = new WebSocket("ws://localhost:8081/recommend");
// socket.onopen = function () {
//   socket.send('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImV4cCI6MTYwNTE1MDM3NX0.bEBE6lFoyCpztpShTR3_rrDC4wXc5Nn4-HSFdPyShCs');
//   console.log("connected")
// };
// socket.onmessage = function (e) {
//    console.log("on message", e.data)
// };

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
