const state = {
  boxKey:false,
  allNum:'5788',
  country:['中国','美国','日本','德国','印度','南非','巴西','阿根廷','奥地利','澳大利亚','俄罗斯'],
  number:[5700,223,45,67,17,133,65,72,8,10,55],
  jw:[
    [100.5, 50.48],
    [-100.5, 40.48],
    [138.54,43.4],
    [10.13, 58.3],
    [75.54,26.5],
    [24.13, -22.3],
    [-48.5,-12.54],
    [-66.22,-30.13],
    [21.13, 62.3],
    [128.39,-20.01],
    [49.45,64.37]
  ]
}
const mutations = {
  setBoxKey: (state, boolean) => {
    state.boxKey = boolean
  },
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