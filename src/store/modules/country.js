const state ={
    provincialList:[],
    otherList:[],
    otherShopList:[],
    countryBoxMapKey:true,
}
const mutations = {
    setProvincialList:(state,array) => {
      state.provincialList = array
    },
    setOtherList:(state,obj)=>{
      state.otherList = obj
    },
    setcountryBoxMapKey:(state,boolean) => {
      state.countryBoxMapKey = boolean
    },
    setOtherShopList:(state,array) => {
      state.otherShopList = array
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