<template>
<div class="country">
   <div class="countryTitleBox">
      <div class="countryTitleLeftPic"></div>
      <div class="countryTitleText">{{showCountry}}地图</div>
      <div class="countryTitleRightPic"></div>
   </div>
   <country-map-box class="chinaMapBox" v-show="key"></country-map-box>
   <Other-Country class="otherMapBox" v-show="!key"></Other-Country>
   <global-country class="GlobalCountryBox"></global-country>
</div>

</template>

<script>

import axios from "axios";
import echarts from "echarts";
import { mapState } from "vuex"

import CountryMapBox from "../components/CountryMapBox.vue"
import OtherCountry from "../components/OtherCountry.vue"

import GlobalCountry from "../components/GlobalCountry.vue"

import { IndexModel } from '../untils/index'
const indexModel = new IndexModel()

export default {
  name:'china',
  data(){
    return{
      key:true,
      showCountry:'',
      content:[],
    }
  },
  components:{
    CountryMapBox,
    OtherCountry,
    GlobalCountry
  },
  computed:{
    ...mapState({
       drawCountryChange: state => state.home.countryChange,
       drawCountry: state => state.home.country,
    })
  },
  mounted(){
    this.selectCountry()
    this.matchingCountry()
    this.getCountryList()
  },
  methods:{
    //通过v-if切换中国与其他国家样式地图
    selectCountry(){
      //  console.log('drawCountryChange',this.drawCountryChange,this.drawCountry)
       let country = this.drawCountryChange
       if(country !== 'China'){
         this.key = !this.key
        //  console.log('key',this.key)
       }
    },
    //将得到英文名字国家变成中文名称
    matchingCountry(){
        for(let i = 0; i<this.drawCountry.length; i++){
            if(this.drawCountryChange==this.drawCountry[i].EnglishName){
              this.showCountry = this.drawCountry[i].ChinaName
            }
        }
    },
    getCountryList(){
      let [contentType,Authorization,country] = ['text/plain','token','']
      for(let i = 0; i<this.drawCountry.length; i++){
        if(this.drawCountryChange == this.drawCountry[i].EnglishName){
           country = this.drawCountry[i].ChinaName
        }
      }
      console.log('country',country)
      indexModel.getProvincialList(country)
      .then(res=>{
        let provincialList = res.data.data
        console.log('国家主页请求的数据',provincialList)
        this.content = provincialList
        this.$store.commit("country/setProvincialList",provincialList)
        // this.getCountryMap()
      })
    },
  }


}
</script>

<style scoped>
.country{
  /* background-color:yellow; */
  width:1920px;
  height:984px;
  position:relative;
}
.chinaMapBox{
  position:absolute;
  top:23px;
  left:454px;
  /* border:1px solid yellow; */
}
.otherMapBox{
  position:absolute;
  top:123px;
  left:254px;
  /* border:1px solid red; */
}
.countryTitleBox{
  width:250px;
  height:11px;
  /* background-color:pink; */
  position:absolute;
  top:38px;
  left:835px;
  display:flex;
}
.countryTitleText{
  /* width:140px; */
  height:35px;
  /* background-color:yellowgreen; */
  position:absolute;
  top:-12px;
  left:58px;
  color:rgba(255,255,255,1);
  font-size:30px;
  font-weight:400;
  line-height:35px;
  letter-spacing:5px;
  text-align:center;
}
.countryTitleLeftPic{
  height:11px;
  width:40px;
  /* background:yellowgreen; */
  background-image:url(../assets/images/country_title_left@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
}
.countryTitleRightPic{
  height:11px;
  width:40px;
  /* background:rgb(205, 169, 50); */
  background-image:url(../assets/images/country_title_right@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  position:absolute;
  right:0;
  top:0;
}
.GlobalCountryBox{
  position:absolute;
  left:44px;
  bottom:0;
}
</style>