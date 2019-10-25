const state ={
     country:[],
     city:[],
     provincial:[],
     valueCountry:'',
     valueProvincial:'',
     valueCity:'',
     brandList:[],  
}
const mutations = {
   setCountryChange(state,array){
      state.country = array
   },
   setProvincialChange(state,array){
      state.provincial = array
   },
   setCityChange(state,array){
     state.city = array
   },
   setValueCountry(state,string){
     state.valueCountry = string
   },
   setValueProvincial(state,string){
     state.valueProvincial = string
   },
   setValueCity(state,string){
     state.valueCity = string
   },
   setBrandList(state,array){
     state.brandList = array
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