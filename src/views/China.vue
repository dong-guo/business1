<template>
<div class="country">
   <div class="countryTitleBox">
      <!-- <div class="countryTitleLeftPic"></div> -->
      <div class="countryTitleText">
        <div class="countryTitleLeftPic"></div>
        <p>{{showCountry}}地图</p>
        <div class="countryTitleRightPic"></div>
      </div>
      <!-- <div class="countryTitleRightPic"></div> -->
   </div>
   <country-map-box class="chinaMapBox" v-if="key"></country-map-box>
   <Other-Country class="otherMapBox" v-else></Other-Country>
   <global-country class="GlobalCountryBox"></global-country>
   <!-- <div id='stars'></div>
   <div id='stars2'></div>
   <div id='stars3'></div> -->
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
       drawCountryBoxMapKey:state=>state.country.countryBoxMapKey
    })
  },
  wathc:{
  },
  mounted(){
    console.log('盒子开关drawCountryBoxMapKey:',this.drawCountryBoxMapKey)
    this.selectCountry()
    // this.openKey()
    this.matchingCountry()
    this.getCountryList()
  },
  methods:{
    //vuex地图开关盒子控制
    openKey(){
      if(this.drawCountryBoxMapKey == false){
         this.key = !this.key
      }
    },
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
    //请求数据
    getCountryList(){
      let [contentType,Authorization,country] = ['text/plain','token','']
      //中文名和英文名国家匹配转换
      for(let i = 0; i<this.drawCountry.length; i++){
        if(this.drawCountryChange == this.drawCountry[i].EnglishName){
           country = this.drawCountry[i].ChinaName
        }
      }
      console.log('country',country)
      indexModel.getProvincialList(country)
      .then(res=>{
        let [provincialList,otherList] = [res.data.data.provinceDataList,res.data.data]        
        // console.log('国家主页请求的数据.provinceDataList:',provincialList)
        // console.log('国家主页请求的数据.otherList:',otherList)
        this.content = provincialList
        this.$store.commit("country/setProvincialList",provincialList)
        //此值只在非中国国家使用
        this.$store.commit("country/setOtherList",otherList)
        // this.getCountryMap()
      })
    },
  }


}
</script>

<style scoped>
@import '../styleCss/background.css';
.country{
  /* background-color:yellow; */
  width:1920px;
  height:984px;
  overflow:hidden;
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
.countryBox{
  position:absolute;
  top:123px;
  left:404px;
}
.countryTitleBox{
  width:350px;
  height:11px;
  position:absolute;
  top:38px;
  left:41%;
}
.countryTitleText{
  /* width:300px; */
  /* width:auto; */
  height:35px;
  /* background-color:yellowgreen; */
  position:relative;
  left:50%;
  transform:translateX(-50%);
  display:inline-block;
  /* align-items:center; */
}
.countryTitleText p{
  color:rgba(255,255,255,1);
  font-size:30px;
  font-weight:400;
  line-height:35px;
  letter-spacing:5px; 
  white-space:nowrap;
  text-align:center;
  padding-left:6px;
  box-sizing:border-box;
  float:left;
  margin-top:-13px;
  /* background:red; */
  
}
.countryTitleLeftPic{
  float:left;
  /* margin-top:13px; */
  vertical-align:middle;
  height:11px;
  width:40px;
  /* background:yellowgreen; */
  background-image:url(../assets/images/country_title_left@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
}
.countryTitleRightPic{
  float:left;
  /* margin-top:13px; */
  height:11px;
  width:40px;
  /* background:rgb(205, 169, 50); */
  background-image:url(../assets/images/country_title_right@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  /* position:absolute;
  right:0;
  top:0; */
}
.clearfix:after{
  content:'';
  height:0;
  line-height:0;
  display:block;
  clear:both;
}
.clearfix{
  zoom:1;
}
.GlobalCountryBox{
  position:absolute;
  left:44px;
  bottom:0;
}
</style>