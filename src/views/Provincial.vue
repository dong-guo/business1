<template>
<div id="provincial">
  <reach-provincial></reach-provincial>
    <div class="provincialTitleBox">
      <div class="provincialTitleLeftPic"></div>
      <div class="provincialTitleText">{{drawProvincialChinaChange}}加盟商分布</div>
      <div class="provincialTitleRightPic"></div>
  </div>
   <provincial-map-box class="provincialMapBox"></provincial-map-box>
   <global-provincial class="globalProvincial"></global-provincial>
   <provincialnews-box class="provincialnewsBox"></provincialnews-box>
   <scaling-box class="scalingBox"></scaling-box>
   <provincialshop-num class="provincialshopNum"></provincialshop-num>
   <div id='stars'></div>
   <div id='stars2'></div>
   <div id='stars3'></div>
</div>

</template>
<script>

import axios from "axios";
import echarts from "echarts";

import ProvincialMapBox from "../components/ProvincialMapBox.vue"
import GlobalProvincial from "../components/GlobalProvincial"
import ReachProvincial from "../components/ReachProvincial"
import ProvincialnewsBox from  "../components/ProvincialnewsBox"
import ProvincialshopNum from  "../components/ProvincialshopNum"
import ScalingBox from "../components/ScalingBox"

import { mapState } from "vuex";

export default {
  name:'provincial',
  data(){
    return{}
  },
  components:{
    ProvincialMapBox,
    GlobalProvincial,
    ReachProvincial,
    ProvincialnewsBox,
    ProvincialshopNum,
    ScalingBox
  },
  computed:{
    ...mapState({
      drawProvincialChange: state => state.home.provincialChange,
      drawProvincialChinaChange: state => state.home.provincialChinaChange
    })    
  },
  mounted(){
  },
  methods:{

  }

}
</script>

<style scoped>
@import '../styleCss/background.css';
#provincial{
  width:1920px;
  height:984px;
  /* background-color:yellowgreen; */
  position:relative;
  overflow:hidden;
}
.provincialMapBox{
  position:absolute;
  top:85px;
  /* left:496px; */
  left:296px;
}
.provincialTitleBox{
  width:349px;
  max-width:450px;
  height:11px;
  /* background-color:pink; */
  margin:0 auto;
  margin-top:26px;
  position:relative;
  /* position:absolute; */
  /* top:26px;
  left:785px; */
  display:flex;
  justify-content:space-between;
}
.provincialTitleText{
  /* width:140px; */
  height:35px;
  /* float:left; */
  /* background-color:yellowgreen; */
  /* position:absolute; */
  /* top:-12px;
  left:58px; */
  /* margin:0 auto; */
  margin-top:-12px;
  color:rgba(255,255,255,1);
  font-size:30px;
  font-weight:400;
  line-height:35px;
  letter-spacing:5px;
  white-space:nowrap;
  text-align:center;
}
.provincialTitleLeftPic{
  height:11px;
  width:40px;
  /* background:yellowgreen; */
  background-image:url(../assets/images/country_title_left@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
}
.provincialTitleRightPic{
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
.globalProvincial{
  position:absolute;
  top:807px;
  left:44px;
}
.provincialnewsBox{
  position:absolute;
  left:1499px;
  top:27px;
}
.scalingBox{
  position:absolute;
  left:1739px;
  top:744px;
}
.provincialshopNum{
  position:absolute;
  /* left:1676px; */
  right:50px;
  top:827px;
}
</style>