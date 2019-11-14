const state = {
  boxKey:false,
  allTotal:'',
  country:[
    {EnglishName:'China',ChinaName:'中国',jindu:[100.5, 50.48]},
    {EnglishName:'USA',ChinaName:'美国',jindu:[-100.5, 48.48]},
    {EnglishName:'Japan',ChinaName:'日本',jindu:[140.54,54.5]},
    {EnglishName:'India',ChinaName:'印度',jindu:[79.5,35.4]},
    {EnglishName:'United Arab Emirates',ChinaName:'迪拜',jindu:[53.13, 32.8]},
    {EnglishName:'Australia',ChinaName:'澳大利亚',jindu:[134.53,-15]},
    {EnglishName:'Canada',ChinaName:'加拿大',jindu:[-80.39,65.01]},
    {EnglishName:'Cambodia',ChinaName:'柬埔寨',jindu:[-90.22,45.13]},
    {EnglishName:'Malaysia',ChinaName:'马来西亚',jindu:[53.5, 32.7]},
    {EnglishName:"New Zealand",ChinaName:'新西兰',jindu:[127.39,45.01]},
    {EnglishName:"South Korea",ChinaName:'韩国',jindu:[127.45,45.37]},
  ],
  // number:[5700,223,45,67,17,133,65,72,8,10,55],
  countryNumber:[
    {name:'',amount:5788,directSaleStore:1,franchiseStore:0,total:1},
    {name:'',amount:330,directSaleStore:1,franchiseStore:0,total:1},
    {name:'',amount:17,directSaleStore:1,franchiseStore:0,total:1},
    {name:'',amount:45,directSaleStore:1,franchiseStore:0,total:1},
    {name:'',amount:67,directSaleStore:1,franchiseStore:0,total:1},
    {name:'',amount:133,directSaleStore:1,franchiseStore:0,total:1},
    {name:'',amount:65,directSaleStore:1,franchiseStore:0,total:1},
    {name:'',amount:72,directSaleStore:1,franchiseStore:0,total:1},
    {name:'',amount:8,directSaleStore:1,franchiseStore:0,total:1},
    {name:'',amount:10,directSaleStore:1,franchiseStore:0,total:1},
    // {name:'',amount:55,jindu:[113.45,11.37],directSaleStore:1,franchiseStore:0,total:1}
  ],
  selectCountry:[],
  countryChange:'Australia',
  letterName:['anhui','aomen','fujian','gansu','guangdong','guangxi','guizhou','hainan','hebei','heilongjiang','henan','hubei','hunan','jiangsu','jiangxi','jilin','liaoning','neimenggu','ningxia','qinghai','shandong','shanxi','shanxi1','sichuan','xinjiang','xizang','yunnan','zhejiang','beijing','shanghai','chongqing','tianjin','xianggang'],
  chinaName:['安徽','澳门','福建','甘肃','广东','广西','贵州','海南','河北','黑龙江','河南','湖北','湖南','江苏','江西','吉林','辽宁','内蒙古','宁夏','青海','山东','山西','陕西','四川','新疆','西藏','云南','浙江','北京','上海','重庆','天津','香港'],
  provincialChange:'guangdong',
  provincialChinaChange:'广东',
  provincialZoom:'0.9',
  cityZoom:'1.2',
  cityChange:'441300',
  cityChinaChange:'惠州',
}
const mutations = {
  setBoxKey: (state, boolean) => {
    state.boxKey = boolean
  },
  setCountryNumberName:(state,payload) =>{
    state.countryNumber[payload.idx].name = payload.val
  },
  setCountryShopNum:(state,payload) => {
    state.countryNumber[payload.idx].franchiseStore = payload.franchiseStoreNum
    state.countryNumber[payload.idx].directSaleStore = payload.directSaleStoreNum
    state.countryNumber[payload.idx].total = payload.totalNum
  },
  setAllTotal:(state,number) => {
    state.allTotal = number
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