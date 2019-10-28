import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'

// import axios from 'axios'
 //将axios挂载在Vue扩展上
//  Vue.prototype.$http=axios
 //在其他地方使用只需使用 this.$http来代替axios;
 //配置baseUrl
//  axios.defaults.baseURL = '/api'

// import Swiper from 'swiper';
// import 'swiper/css/swiper.css';

// import axios from "axios"
// Vue.prototype.$axios = axios;
// Vue.use(Swiper)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
