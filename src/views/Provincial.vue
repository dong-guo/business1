<template>
<div id="provincial">
  <reach-provincial></reach-provincial>
  <div class="provincialTitleBox">
      <div class="provincialTitleLeftPic"></div>
      <div class="provincialTitleText">{{drawProvincialChinaChange}}加盟商分布</div>
      <div class="provincialTitleRightPic"></div>
   </div>
   <provincial-box class="provincialMapBox"></provincial-box>
   <global-provincial class="globalProvincial"></global-provincial>
</div>

</template>
<script>

import axios from "axios";
import echarts from "echarts";

import ProvincialBox from "../components/ProvincialBox.vue"
import GlobalProvincial from "../components/GlobalProvincial"
import ReachProvincial from "../components/ReachProvincial"

import { mapState } from "vuex";

export default {
  name:'provincial',
  data(){
    return{}
  },
  components:{
    ProvincialBox,
    GlobalProvincial,
    ReachProvincial,
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
#provincial{
  width:1920px;
  height:984px;
  /* background-color:yellowgreen; */
  position:relative;
}
.provincialMapBox{
  position:absolute;
  top:85px;
  left:496px;
}
.provincialTitleBox{
  width:349px;
  height:11px;
  /* background-color:pink; */
  position:absolute;
  top:26px;
  left:785px;
  display:flex;
}
.provincialTitleText{
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
  position:absolute;
  right:0;
  top:0;
}
.globalProvincial{
  position:absolute;
  top:807px;
  left:44px;
}
</style>