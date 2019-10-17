<template>
<div class="city">
  <city-map-box class="cityMapBox"></city-map-box>
  <reach class="reach"></reach>
  <div class="cityTitleBox">
      <div class="cityTitleLeftPic"></div>
      <div class="cityTitleText">东莞市加盟商分布</div>
      <div class="cityTitleRightPic"></div>
  </div>
  <shop-list class="shopList"></shop-list>
  <city-news-box class="cityNewsBox"></city-news-box>
  <global-city class="golbalCity"></global-city>
  <city-shop-num class="cityShopNum"></city-shop-num>
</div>

</template>
<script>
import Reach from "../components/Reach.vue"
import CityMapBox from "../components/CityMapBox.vue"
import GlobalCity from "../components/GlobalCity.vue"
import ShopList from "../components/ShopList.vue"
import CityShopNum from "../components/CityShopNum.vue"
import CityNewsBox from "../components/CityNewsBox.vue"

import axios from "axios";
import echarts from "echarts";

export default {
    name:'city',
    data(){
      return{}
    },
    components:{
      CityMapBox,
      Reach,
      GlobalCity,
      ShopList,
      CityShopNum,
      CityNewsBox
    }
}
</script>


<style scoped>
.city{
  width:1920px;
  height:984px;
  /* background-color:yellowgreen; */
  position:relative;
}
.cityMapBox{
  position:absolute;
  left:589px;
  top:173px;
}
.cityTitleBox{
  width:400px;
  height:11px;
  /* background-color:pink; */
  position:absolute;
  top:26px;
  left:765px;
  display:flex; 
}
.cityTitleText{
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
.cityTitleLeftPic{
  height:11px;
  width:40px;
  /* background:yellowgreen; */
  background-image:url(../assets/images/country_title_left@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
}
.cityTitleRightPic{
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
.reach{
  position:absolute;
  top:28px;
  left:60px;
}
.golbalCity{
  position:absolute;
  top:807px;
  left:44px;  
}
.shopList{
  /* position:absolute;
  top:249px;
  left:0; */
}
.cityNewsBox{
  position:absolute;
  left:1499px;
  top:81px;
}
.cityShopNum{
  position:absolute;
  left:1676px;
  top:827px;  
}
</style>