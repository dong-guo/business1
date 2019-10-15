<template>
<div class="city">
  <city-map-box class="cityMapBox"></city-map-box>
</div>

</template>
<script>
import CityMapBox from "../components/CityMapBox.vue"

import axios from "axios";
import echarts from "echarts";

export default {
    name:'city',
    data(){
      return{}
    },
    components:{
      CityMapBox,
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
</style>