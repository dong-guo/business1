<template>
  <div class="city">
    <div class="shade" v-if="drawShadeBoxKey"></div>
    <city-map-box class="cityMapBox"></city-map-box>
    <reach class="reach"></reach>
    <div class="cityTitleBox">
      <div class="cityTitleLeftPic"></div>
      <div class="cityTitleText">{{drawCityChinaChange}}市加盟商分布</div>
      <div class="cityTitleRightPic"></div>
    </div>
    <shop-list class="shopList"></shop-list>
    <city-news-box class="cityNewsBox"></city-news-box>
    <global-city class="golbalCity"></global-city>
    <scaling-box class="scalingBox"></scaling-box>
    <city-shop-num class="cityShopNum"></city-shop-num>
    <div id='stars'></div>
    <div id='stars2'></div>
    <div id='stars3'></div>    
  </div>
</template>
<script>
import Reach from "../components/Reach.vue";
import CityMapBox from "./../components/cityModul/CityMapBox.vue";
import GlobalCity from "./../components/cityModul/GlobalCity.vue";
import ShopList from "../components/ShopList.vue";
import CityShopNum from "../components/CityShopNum.vue";
import CityNewsBox from "../components/CityNewsBox.vue";
import ScalingBox from "../components/ScalingBox";

import axios from "axios";
import echarts from "echarts";

import { mapState,mapMutations } from "vuex";

import { IndexModel } from "../untils/index";
const indexModel = new IndexModel();


export default {
  name: "city",
  data() {
    return {
      showChinaCountry: ""
    };
  },
  components: {
    CityMapBox,
    Reach,
    GlobalCity,
    ShopList,
    CityShopNum,
    CityNewsBox,
    ScalingBox
  },
  computed: {
    ...mapState({
      drawProvincialChinaChange: state => state.home.provincialChinaChange,
      drawCountryChange: state => state.home.countryChange,
      drawCityChinaChange: state => state.home.cityChinaChange,
      drawCountry: state => state.home.country,
      drawShadeBoxKey: state => state.city.shadeBoxKey,
    })
  },
  created(){
      // window.addEventListener("beforeunload",()=>{
      //   localStorage.setItem("messageStore",JSON.stringify(this.$store.state))
      // })
      // localStorage.getItem("messageStore") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));
  },
  mounted() {
    this.matchingCountry()
    console.log("city-showChinaCountry", this.showChinaCountry,this.drawProvincialChinaChange,this.drawCityChinaChange);
    this.requestDistrict()
  },
  watch:{
     
  },
  methods: {
    

    //請求县区参数
    requestDistrict() {
      let [country,provincial,city] = [this.showChinaCountry,this.drawProvincialChinaChange + '省',this.drawCityChinaChange + '市']
      indexModel.getDistrictList(country,provincial,city)
      .then(res => {
        //求得数据拆分存入VUEX
        let district = res.data.data
        console.log("总数据district", district);
        let [districtList,manager,shopList,shopTypeCount] = [res.data.data.districtList,res.data.data.manager,district.shopList,res.data.data.shopTypeCount[0]]
        this.$store.commit("city/setCityDistrictList",districtList)
        this.$store.commit("city/setCityManager",manager)
        this.$store.commit("city/setCityShopList",shopList)
        this.$store.commit("city/setCityShopTypeCount",shopTypeCount)
        // this.sendCommit()
      });
    },
    sendCommit(){
      return {
        ...mapMutations({
          "city/setCityDistrictList":districtList,
          "city/setCityManager":manager,
          "city/setCityShopList":shopList,
          "city/setCityShopTypeCount":shopTypeCount
        })
      }
    },
    matchingCountry() {
      for (let i = 0; i < this.drawCountry.length; i++) {
        if (this.drawCountryChange == this.drawCountry[i].EnglishName) {
          this.showChinaCountry = this.drawCountry[i].ChinaName;
        }
      }
    },
  }
};
</script>


<style scoped lang="scss">
@import '../styleCss/background.css';
.city {
  width: 1920px;
  height: 984px;
  overflow: hidden;
  position: relative;
  .cityMapBox {
    position: absolute;
    left: 389px;
    top: 73px;
    // border-color: red!important;
  }
}
.cityTitleBox {
  width: 400px;
  height: 11px;
  /* background-color:pink; */
  position: absolute;
  top: 26px;
  left: 765px;
  display: flex;
}
.cityTitleText {
  /* width:140px; */
  height: 35px;
  /* background-color:yellowgreen; */
  position: absolute;
  top: -12px;
  left: 58px;
  color: rgba(255, 255, 255, 1);
  font-size: 30px;
  font-weight: 400;
  line-height: 35px;
  letter-spacing: 5px;
  text-align: center;
}
.cityTitleLeftPic {
  height: 11px;
  width: 40px;
  /* background:yellowgreen; */
  background-image: url(../assets/images/country_title_left@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.cityTitleRightPic {
  height: 11px;
  width: 40px;
  /* background:rgb(205, 169, 50); */
  background-image: url(../assets/images/country_title_right@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  right: 0;
  top: 0;
}
.reach {
  position: absolute;
  top: 28px;
  left: 60px;
}
.golbalCity {
  position: absolute;
  top: 807px;
  left: 44px;
}
// .shopList {
//   /* position:absolute;
//   top:249px;
//   left:0; 
// }
.cityNewsBox {
  position: absolute;
  left: 1499px;
  top: 81px;
}
.scalingBox {
  position: absolute;
  left: 1739px;
  top: 744px;
  /* background:red; */
}
.cityShopNum {
  position: absolute;
  left: 1676px;
  top: 827px;
}
//遮罩层
.shade{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:1;
    background: rgba(0,0,0,0.8);
}
</style>