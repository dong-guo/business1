<template>
<div class="succession_body">
  <div class="select">
    <div class="select_left">
      <div class="select_left_sign"></div>
      <p>慕思经销商网店列表</p>
    </div>
     <div class="select_right">
       <select-combobox></select-combobox>
    </div>
  </div>
  <div class="development">
    <div class="developed">
      <div class="developed_img"></div>
      <p>已开发地区</p>
    </div>
    <div class="undeveloped">
      <div class="undeveloped_img"></div>
      <p>未开发地区</p>
    </div>
  </div>
  <chart class="chart"></chart>
  <undeveloped-content class="undevelopedContent"></undeveloped-content>
  <canvass></canvass>
  <global class="succession_link"></global>
</div>

</template>
<script>

import Global from "../components/Global.vue";
import Chart from "../components/Chart.vue";
import SelectCombobox from "../components/SelectCombobox.vue"
import Canvass from "../components/Canvass.vue"
import UndevelopedContent from "../components/UndevelopedContent.vue"

// import axios from "axios";
// import echarts from "echarts";

export default {
   name:'succession',
   components:{
     Global,
     Chart,
     SelectCombobox,
     Canvass,
     UndevelopedContent
   }
}
</script>

<style scoped>
.succession_body{
  height: 984px;
  width:1920px;
  position:absolute;
  /* background-color:lawngreen; */
  /* border:1px solid #3B5AC8;
  box-sizing: border-box; */
}
.select{
  height:74px;
  width:100%;
  /* background-color:grey; */
  margin-top:28px;
  display:inline-block;
}
.select_left{
  height:36px;
  width:600px;
  margin-left:36px;
  margin-top:19px;
  float:left;
  /* position:relative; */
  /* top:19px; */
}
.select_left_sign{
  width:6px;
  height:36px;
  background-color:rgba(0,175,109,1);
  float:left;
}
.select_left p{
  color:#ffffff;
  font-size:36px;
  font-weight:400;
  height:36px;
  width:400px;
  line-height:34px;
  left:16px;
  margin-left:10px;
  /* background-color:rgb(167, 167, 32); */
}
.select_right{
  height:74px;
  width:700px;
  margin-left:1218px;
}
.development{
  clear:both;
  height:34px;
  width:100%;
  position:absolute;
  top:147px;
}
.developed{
  /* background-color:rgb(110, 193, 214); */
  width:300px;
  height:34px;
  display:inline-block;
  margin-left:36px;
}
.developed_img{
  display:inline-block;
  vertical-align:middle;
  width:34px;
  height:34px;
  background-image:url(../assets/images/1-1@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  -webkit-transform:rotate(360deg);
  animation:rotation 1s linear infinite;
  -moz-animation:rotation 1s linear infinite;
  -webkit-animation:rotation 1s linear infinite;
  -o-animation:rotation 1s linear infinite;
  /* background-color:rgb(219, 126, 72); */
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.developed p{
  display:inline-block;
  line-height:34px;
  font-size:28px;
  color:rgba(32,253,250,1);
  vertical-align:middle;
  height:34px;
  width:200px;
  margin-left:20px;
  /* background-color:pink; */
}
.undeveloped{
  display:inline-block;
  /* background-color:red; */
  margin-left:882px;
  width:300px;
  height:34px;
}
.undeveloped_img{
  display:inline-block;
  width:34px;
  height:34px;
  background-image:url(../assets/images/2-1@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  /* background-color:rgb(219, 126, 72);  */
  vertical-align:middle; 
  -webkit-transform:rotate(360deg);
  animation:unRotation 1s linear infinite;
  -moz-animation:rotation 1s linear infinite;
  -webkit-animation:rotation 1s linear infinite;
  -o-animation:rotation 1s linear infinite;  
}
@-webkit-keyframes unRotation{
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.undeveloped p{
  display:inline-block;
  line-height:34px;
  font-size:28px;
  color:rgba(255,255,255,1);
  vertical-align:middle;
  height:34px;
  width:200px;
  margin-left:20px;
  /* background-color:rgb(32, 184, 184); */
}
.chart{
  position:absolute;
  top:225px;
  left:38px;
}
.undevelopedContent{
  position:absolute;
  top:220px;
  left:1218px;
}
.succession_link{
  /* position:absolute; */
  left:1611px;
  top:734px;
  /* border:1px solid yellow; */

}
</style>