const state = {
  boxKey:false,
  allNum:'5788',
  country:['China','USA','Japan','Germany','India','South Africa','Brazil',' Argentina','Austria','Australia','Russia'],
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
  ],
  countryNumber:[
    {name:'中国',amount:5788,jindu:[100.5, 50.48]},
    {name:'美国',amount:330,jindu:[-100.5, 40.48]},
    {name:'日本',amount:45,jindu:[138.54,43.4]},
    {name:'德国',amount:67,jindu:[10.13, 58.3]},
    {name:'印度',amount:17,jindu:[75.54,26.5]},
    {name:'南非',amount:133,jindu:[24.13, -22.3]},
    {name:'巴西',amount:65,jindu:[-48.5,-12.54]},
    {name:'阿根廷',amount:72,jindu:[-66.22,-30.13]},
    {name:'奥地利',amount:8,jindu:[15.13, 57.3]},
    {name:'澳大利亚',amount:10,jindu:[128.39,-20.01]},
    {name:'俄罗斯',amount:55,jindu:[49.45,64.37]}
  ],
  countryChange:'China',
  letterName:['anhui','aomen','fujian','gansu','guangdong','guangxi','guizhou','hainan','hebei','heilongjiang','henan','hubei','hunan','jiangsu','jiangxi','jilin','liaoning','neimenggu','ningxia','qinghai','shandong','shanxi','shanxi1','sichuan','xinjiang','xizang','yunnan','zhejiang'],
  chinaName:['安徽','澳门','福建','甘肃','广东','广西','贵州','海南','河北','黑龙江','河南','湖北','湖南','江苏','江西','吉林','辽宁','内蒙古','宁夏','青海','山东','山西','陕西','四川','新疆','西藏','云南','浙江'],
  provincialChange:'guangdong',
  provincialChinaChange:'广东',
  provincialZoom:'0.9',
  cityZoom:'1.2',
  cityChange:'441900',
  cityChinaChange:'',
}
const mutations = {
  setBoxKey: (state, boolean) => {
    state.boxKey = boolean
  },
  setCountryChange:(state,string) => {
    state.countryChange = string
  },
  setProvincialChange:(state,string) => {
    state.provincialChange = string
  },
  setProvincialChinaChange:(state,string) => {
    state.provincialChinaChange = string
  },
  setProvincialZoom:(state,number) => {
    state.provincialZoom = number
  },
  setCityZoom:(state,number) => {
    state.cityZoom = number
  },
  setCityChange:(state,string) => {
    state.cityChange = string
  },
  setCityChinaChange:(state,string) => {
    state.cityChinaChange = string
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