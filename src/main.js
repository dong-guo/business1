
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'


//修改招商设备低版本问题
// import '@babel/polyfill';
// import Es6Promise from 'es6-promise'
// Es6Promise.polyfill()
//修改招商设备低版本问题


// import axios from 'axios'
//  Vue.prototype.$http=axios
//  axios.defaults.baseURL = '/api'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


