const state ={
    provincialList:[],
    otherList:[],
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