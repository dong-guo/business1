const state = {
  cityShopNumber:{},
  cityManager:{},
  allcityList:{},
}
const mutations = {
  setCityShopNumber(state,obj){
    state.cityShopNumber = obj
  },
  setAllCityList(state,obj){
    state.allCityList = obj
  },
  setCityManager(state,obj){
    state.cityManager = obj
  }
}
const action = {

}
const getters = {

}
export default {
namespaced: true,
state,
getters,
action,
mutations,
}