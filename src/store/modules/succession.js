const state ={
     country:[],
     city:[],
     provincial:[],
     valueCountry:'中国',
     valueProvincial:'',
     valueCity:'',
     brandList:[],
     yList:[],
     echartRequestList:[]  
}
const mutations = {
   setCountryChange:(state,array)=>{
      state.country = array
   },
   setProvincialChange:(state,array)=>{
      state.provincial = array
   },
   setCityChange:(state,array)=>{
     state.city = array
   },
   setValueCountry:(state,string)=>{
     state.valueCountry = string
   },
   setValueProvincial:(state,string)=>{
     state.valueProvincial = string
   },
   setValueCity:(state,string)=>{
     state.valueCity = string
   },
   setBrandList:(state,array)=>{
     state.brandList = array
   },
   setYList:(state,array)=>{
     state.yList = array
   },
   setEchartRequestList:(state,array)=>{
     state.echartRequestList = array
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