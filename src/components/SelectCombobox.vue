<template>
  <div class="select_combobox">
    <div class="select_combobox_box">
      <div class="combobox" @click="openValueCountry">
        <!-- <input type="text" v-model="valueCountry" placeholder="国家" /> -->
        <span>{{valueCountry}}</span>
        <img src="../assets/images/iconfont-xiasanjiao@2x.png" alt />
      </div>
      <div class="list" v-show="showCountry">
        <ul>
          <li
            @click="getValueCountry(index,item)"
            v-for="(item,index) in drawCountry"
            :key="item.index"
          >{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="select_combobox_box">
      <div class="combobox" @click="openProvincial" id="combobox2">
        <!-- <input type="text" v-model="valueProvincial" :placeholder="showPlaceHoleder" /> -->
        <span v-if="valueProvincial">{{valueProvincial}}</span>
        <span v-else>省</span>
        <img src="../assets/images/iconfont-xiasanjiao@2x.png" alt />
      </div>
      <div class="list" v-show="showProvincial">
        <ul>
          <li
            @click="getProvincial(index,item)"
            v-for="(item,index) in drawProvincial"
            :key="item.index"
            class="provincialLi"
          >{{item}}
          </li>
        </ul>
      </div>
    </div>
    <div class="select_combobox_box">
      <div class="combobox" @click="openCity" id="combobox3">
        <!-- <input type="text" v-model="valueCity" placeholder="市" /> -->
        <span v-if="valueCity">{{valueCity}}</span>
        <span v-else>市</span>
        <img src="../assets/images/iconfont-xiasanjiao@2x.png" alt />
      </div>
      <div class="list" v-show="showCity">
        <ul>
          <li @click="getCity(index,item)" v-for="(item,index) in drawCity" :key="item.index">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import { mapState } from "vuex";

import { IndexModel } from '../untils/index'
const indexModel = new IndexModel()

export default {
  name: "selectCombobox",
  data() {
    return {
      showPlaceHoleder:'省',
      showCountry: false,
      showProvincial: false,
      showCity: false,
      type:'country',
      valueCountry: "中国",
      valueProvincial: "",
      valueCity: "",
      yList:"",
      provincialCode:''
    };
  },
  mounted(){
    let  [type,country,province,city] = [this.type,this.drawValueCountry,this.valueProvincial,this.valueCity]
    this.getBrand(type,country,province,city)
    this.requestCountry()
    this.requestProvincial()
  },
  computed:{
    ...mapState({
      drawCountry: state => state.succession.country,
      drawProvincial: state => state.succession.provincial,
      drawCity: state => state.succession.city,
      drawValueCountry: state => state.succession.valueCountry,
      drawYList: state => state.succession.yList,
      drawProvincialCode: state => state.succession.provincialCode
    })
  },
  watch:{
    //监视国家下拉框变化
    valueCountry(newValue,oldValue){
      console.log('valueCountry',newValue)
      this.requestProvincial()
    },
    //监视省份下拉框变化
    valueProvincial(newValue,oldValue){
      console.log('75行valueProvincial',newValue)
      this.requestCity()
      this.valueCity =''
    },
  },
  methods: {
    //请求国家
    requestCountry(){
      indexModel.selectCountry()
      .then(res =>{
       let country = res.data.data
        this.$store.commit("succession/setCountryChange",country)
      })
    },
    //请求中国省份
    requestProvincial(){
      if(this.valueCountry == '中国'){
        // let country = this.valueCountry
        // console.log('请求省份所在国家',country)
        // indexModel.selectProvincial(country)
        let type = 'PROVINCE'
        indexModel.selectProvincialOrCity(type)
        .then(res =>{
          // let provincial =res.data.data
          let arr = res.data.data
          // console.log('省份下拉框数据',arr)
          let provincial = []
          let provincialCode =[]
          for(let i=0; i<arr.length;i++){
            provincial.push(arr[i].name)
            provincialCode.push(arr[i].code)
          }
          this.$store.commit("succession/setProvincialChange",provincial)
          this.$store.commit("succession/setProvincialCode",provincialCode)
          // console.log('中国省份列表provincial-109',provincial)
          // console.log('中国省份列表码数provincialCode-110',provincialCode)
        }) 
      } else{
        this.valueProvincial=''
        this.valueCity=''
        let [provincial,country] = ['',this.valueCountry]
        indexModel.selectProvincial(country)
        .then(res =>{
          let provincial =res.data.data
          this.$store.commit("succession/setProvincialChange",provincial)
          console.log('provincial-119',provincial)
        }) 
      }    
    },
    //请求城市列表
    requestCity(){
      console.log('城市请求数据所属省份code',this.provincialCode)
      let [type,parentCode] = ['CITY',this.provincialCode]
      indexModel.selectProvincialOrCity(type,parentCode) 
      .then(res =>{
         let cityBox = res.data.data
         let city = []
         for(let i=0;i<cityBox.length;i++){
            city.push(cityBox[i].name)
         }
         this.$store.commit("succession/setCityChange",city)
        //  this.$store.commit("succession/setYList",city)
         console.log('city-请求回来城市列表',city)
      })    
    },
    //打开国家下拉列表
    openValueCountry() {
      this.showCountry = !this.showCountry;
      this.showProvincial = false;
      this.showCity = false;
    },
    //选择下拉列表国家
    getValueCountry(index, item) {
      this.valueCountry = item;
      this.$store.commit("succession/setValueCountry",this.valueCountry)
      this.showCountry = false;
      this.valueProvincial = ''
      this.type = 'country'
      this.$store.commit("succession/setChangeType",this.type)
      let  [type,country,province,city] = [this.type,this.drawValueCountry,this.valueProvincial,this.valueCity]
      console.log('国家更改',type,country,province,city)
      this.getBrand(type,country,province,city)
    },
    //打开省份下拉列表
    openProvincial() {
      if(this.valueCountry=='中国'){
        this.showProvincial = !this.showProvincial;
        this.showCountry = false;
        this.showCity = false;
      } else{
        this.showProvincial = false
      }
    },
    //选择省份下拉列表省份
    getProvincial(index, item) {
      this.valueProvincial = item;
      this.provincialCode = this.drawProvincialCode[index]
      console.log('code代码',this.provincialCode,item)
      this.$store.commit("succession/setValueProvincial",this.valueProvincial)
      this.showProvincial = false;
      this.valueCity = ''
      //容器echartY轴数据
      this.type = 'province'
      this.$store.commit("succession/setChangeType",this.type)
      let [type,country,province,city] = [this.type,this.drawValueCountry,this.valueProvincial,this.valueCity]
      console.log('country,province,city')
      this.getBrand(type,country,province,city)
      // this.$store.commit("succession/setYList",this.drawCity)
    },
    //打开城市下拉列表
    openCity() {
      if(this.valueCountry=='中国' && this.valueProvincial){
        this.showCity = !this.showCity;
        this.showCountry = false;
        this.showProvincial = false;        
      }else{
        this.showCity = false
      }
    },
    //选择城市下拉框城市
    getCity(index, item) {
      this.valueCity = item;
      let undevelopedCity = this.valueCity
      console.log('未开发undevelopedCity',undevelopedCity)
      if(this.valueCountry == '中国'){
        this.$store.commit("succession/setValueCity",undevelopedCity)
        this.showCity = !this.showCity;
        this.type = 'city'
        this.$store.commit("succession/setChangeType",this.type)
        let  [type,country,province,city] = [this.type,this.drawValueCountry,this.valueProvincial,this.valueCity]
        this.getBrand(type,country,province,city)
      }else{
        undevelopedCity = ''
        this.$store.commit("succession/setValueCity",undevelopedCity)
      }
    },
    //请求后台品牌
    getBrand(type,country,province,city){
        indexModel.getChartList(country,type,province,city)
        .then(res=>{
          let all = res.data
          console.log('请求原始值',all)
          let date = res.data.data.brand
          let chartBrandList = []
          for(let i =0; i< date.length; i++){
            chartBrandList.push({name:date[i].alias_brand})
          }
          this.$store.commit("succession/setBrandList",chartBrandList)
          let provincialTotal = res.data.data.developedProvince
          let list =[]
          for(let i=0; i<provincialTotal.length;i++){
            list.push(provincialTotal[i].province)
          }
          //容器echartY轴数据
          // this.$store.commit({
          //   "succession/setYList":list,
          //   "succession/setEchartRequestList":provincialTotal
          // })
          this.$store.commit("succession/setYList",list)
          this.$store.commit("succession/setEchartRequestList",provincialTotal)
        })     
    },
  }
};
</script>

<style scoped>
.select_combobox {
  position: relative;
  display: flex;
  z-index: 1;
  /* background-color: deeppink; */
}
.select_combobox_box {
  /* display:inline-block; */
  margin-right: 20px;
}
.combobox {
  width: 204px;
  height: 74px;
  border: 1px solid rgba(14, 109, 233, 1);
  box-sizing: border-box;
  position: relative;
  /* background:yellow; */
  /* display:inline-block; */
  /* margin-right: 20px; */
}
.combobox span{
  width: 100%;
  height: 100%;
  display:inline-block;
  font-size: 26px;
  line-height: 74px;
  text-indent: 18px;
  border-radius: 4px;
  background-color: rgba(14, 109, 233, 0.2);
  color: rgba(0, 150, 255, 1);
}
.combobox input {
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  font-size: 26px;
  line-height: 74px;
  text-indent: 18px;
  border-radius: 4px;
  background-color: rgba(14, 109, 233, 0.2);
  color: rgba(0, 150, 255, 1);
}
.combobox ::-webkit-input-placeholder {
  color: rgba(0, 150, 255, 1);
}
.combobox img {
  position: absolute;
  top: 29px;
  left: 160px;
  width: 24px;
  height: 16px;
}
.list {
  width: 204px;
  overflow: auto;
  border: 1px solid rgba(14, 109, 233, 1);
  margin-top: 6px;
  border-radius: 4px;
  box-sizing: border-box;
  height: 360px;
}
.list::-webkit-scrollbar {
  display: none;
}
.list ul li {
  /* width: 100%; */
  /* width:auto; */
  height: 73px;
  font-size: 26px;
  text-indent: 18px;
  font-weight: 500;
  color: rgba(224, 230, 246, 1);
  line-height: 73px;
  background-color: rgba(14, 109, 233, 0.9);
  border-bottom: 1px solid rgba(14, 109, 233, 1);
  box-sizing: border-box;
  word-break:keep-all;
  overflow-x:scroll;
  overflow-y:hidden;
}
.list ul li::-webkit-scrollbar{
   display: none; 
}
.list ul li:hover {
  background-color: rgb(95, 160, 245);
}
</style>