import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home.js'
import succession from './modules/succession.js'
import shopList from './modules/shopList.js'
Vue.use(Vuex)


export default new Vuex.Store({
  modules:{
    home,
    succession,
    shopList,
  }
})