const state = {
  boxKey:false,
  allTotal:'',
  country:[
    {EnglishName:'China',ChinaName:'中国',jindu:[100.5, 31.104306]},
    {EnglishName:'USA',ChinaName:'美国',jindu:[-100.5, 33.48]},
    {EnglishName:'Japan',ChinaName:'日本',jindu:[140.54,39.874413]},
    {EnglishName:'India',ChinaName:'印度',jindu:[78.101672,21.158496]},
    {EnglishName:'United Arab Emirates',ChinaName:'阿联酋',jindu:[54.923952, 24.624583]},
    {EnglishName:'Australia',ChinaName:'澳大利亚',jindu:[133.882276,-25.588435]},
    {EnglishName:'Canada',ChinaName:'加拿大',jindu:[-108.078972,56.819742]},
    {EnglishName:'Cambodia',ChinaName:'柬埔寨',jindu:[105.476849,12.666345]},
    {EnglishName:'Malaysia',ChinaName:'马来西亚',jindu:[53.5, 32.7]},
    {EnglishName:"New Zealand",ChinaName:'新西兰',jindu:[171.707118,-43.149482]},
    {EnglishName:"South Korea",ChinaName:'韩国',jindu:[127.450696,36.623652]},
    {EnglishName:"Hong Kong",ChinaName:'香港',jindu:[114.123579,22.419289]},
    {EnglishName:"Taiwan",ChinaName:'台湾',jindu:[121.077757,24.833727]},
    {EnglishName:"Federation of Malaysia",ChinaName:'马来西亚',jindu:[113.188191,2.775801]},
    {EnglishName:"Germany",ChinaName:'德国',jindu:[9.298656,51.44174]},
    {EnglishName:"France",ChinaName:'法国',jindu:[2.822808,46.50583]},
    {EnglishName:"Italy",ChinaName:'意大利',jindu:[13.714007,41.766297]},
    {EnglishName:"Georgia",ChinaName:'格鲁吉亚',jindu:[43.444039,42.096014]},
    {EnglishName:"Vietnam",ChinaName:'越南',jindu:[108.494006,12.689209]},
    {EnglishName:"Philippines",ChinaName:'菲律宾',jindu:[121.114552,14.453012]},
    {EnglishName:"Brunei",ChinaName:'文莱',jindu:[115.176103,4.887877]},
    {EnglishName:"Morocco",ChinaName:'摩洛哥',jindu:[-6.335313,31.942948]},
  ],
  countryNumber:[],
  // countryNumber:[
  //   {name:'',amount:5788,directSaleStore:1,franchiseStore:0,total:1},
  //   {name:'',amount:330,directSaleStore:1,franchiseStore:0,total:1},
  //   {name:'',amount:17,directSaleStore:1,franchiseStore:0,total:1},
  //   {name:'',amount:45,directSaleStore:1,franchiseStore:0,total:1},
  //   {name:'',amount:67,directSaleStore:1,franchiseStore:0,total:1},
  //   {name:'',amount:133,directSaleStore:1,franchiseStore:0,total:1},
  //   {name:'',amount:65,directSaleStore:1,franchiseStore:0,total:1},
  //   {name:'',amount:72,directSaleStore:1,franchiseStore:0,total:1},
  //   {name:'',amount:8,directSaleStore:1,franchiseStore:0,total:1},
  //   {name:'',amount:10,directSaleStore:1,franchiseStore:0,total:1},
  //   // {name:'',amount:55,jindu:[113.45,11.37],directSaleStore:1,franchiseStore:0,total:1}
  // ],
  selectCountry:[],
  countryChange:'China',
  otherCountryChange:'USA',
  letterName:['anhui','aomen','fujian','gansu','guangdong','guangxi','guizhou','hainan','hebei','heilongjiang','henan','hubei','hunan','jiangsu','jiangxi','jilin','liaoning','neimenggu','ningxia','qinghai','shandong','shanxi','shanxi1','sichuan','xinjiang','xizang','yunnan','zhejiang','beijing','shanghai','chongqing','tianjin','xianggang','taiwan'],
  chinaName:['安徽','澳门','福建','甘肃','广东','广西','贵州','海南','河北','黑龙江','河南','湖北','湖南','江苏','江西','吉林','辽宁','内蒙古','宁夏','青海','山东','山西','陕西','四川','新疆','西藏','云南','浙江','北京','上海','重庆','天津','香港','台湾'],
  provincialChange:'guangdong',
  provincialChinaChange:'广东',
  countryZoom:'1.25',
  provincialZoom:'0.9',
  cityZoom:'1.2',
  cityChange:'441900',
  cityChinaChange:'东莞',
}
const mutations = {
  setBoxKey: (state, boolean) => {
    state.boxKey = boolean
  },
  // setCountryNumberName:(state,payload) =>{
  //   state.countryNumber[payload.idx].name = payload.val
  // },
  setCountryNumber:(state,array) => {
    state.countryNumber = array
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
  setOtherCountryChange:(state,string) => {
    state.otherCountryChange = string
  },
  setProvincialChange:(state,string) => {
    state.provincialChange = string
  },
  setProvincialChinaChange:(state,string) => {
    state.provincialChinaChange = string
  },
  setCountryZoom:(state,number) => {
    state.countryZoom = number
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