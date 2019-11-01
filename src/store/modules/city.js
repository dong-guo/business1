const state ={
   cityDistrictList:[],
   cityManager:{},
   cityShopList:[],
   cityShopTypeCount:{}
}
const mutations = {
   setCityDistrictList:(state,array) => {
     state.cityDistrictList = array
   },
   setCityManager:(state,obj) => {
     state.cityManager = obj
   },
   setCityShopList:(state,array) => {
     state.cityShopList = array
   },
   setCityShopTypeCount:(state,obj) => {
     state.cityShopTypeCount = obj
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