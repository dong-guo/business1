<template>
  <div class="home">
    <div class="home_head">
      <p>慕思招商系统</p>
    </div>
    <div class="home_body">
      <div id="world_box"></div>
      <reach></reach>
      <global></global>
      <div class="home_body_top">
        <p>
           截止目前,全球共有门店<span>(家)</span>
        </p>
        <ul>
          <li class="li_one">5</li>
          <li>7</li>
          <li>8</li>
          <li>8</li>
        </ul>
      </div>
      <body-right></body-right>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import echarts from "echarts"
import Reach from "../components/Reach.vue"
import BodyRight from "../components/BodyRight.vue"
import Global from "../components/Global.vue"

import balloonIcon from "../base64/balloon"

export default {
  name: "home",
  data(){
    return {
      myEcharts:null,
      country:[
        {name:'中国',value:2700},
        {name:'英国',value:2200},
        {name:'美国',value:200},
        {name:'澳大利亚',value:20},
        ]
    }
  },
  components:{
    BodyRight,
    Reach,
    Global,
  },
  mounted() {
    axios.get('./geoJson/world.json').then((res) => {
      let worldJson = res.data
      echarts.registerMap('world',worldJson)
      this.myEcharts = echarts.init(document.getElementById("world_box"))
      let option = this.worldOption()
      this.myEcharts.setOption(option)
    })
  },
  methods: {
    worldOption() {
      return {
        geo: {
          type: "map",
          map: "world",
          right:'550px',
          top:'200px',
          left:'50px',
          bottom:'50px',
          zoom: 1,
          itemStyle: {
            areaColor: "#000001",
            bordercolor:'#2A3879',
            shadowColor:'#2A3879',
            shadowBlur: 10,
            shadowOffsetX:2,
            shadowOffsetY:2,
          },
          emphasis: {
            itemStyle:{
              areaColor:'#33D8FA'
            },
            label:{
              color:'green'
            }
          },
          label: {
            fontSize: 16,
            // color: "white"
          }
        },
        series: [
          {
            coordinateSystem: "geo",
            type: "scatter",
            symbol:`image://${balloonIcon}`,
            symbolSize:[100,100],
            
            data:[
              {
                name:'中国',
                value:[100.5, 40.48],
                label: {
                    show: true,
                    position: [40, 40],
                    color: '#fff',
                    formatter: `{b}`
                }
              }
            ]
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
.home {
  height: 1080px;
  width: 1920px;
  background-image: url(../assets/images/background@2x.png);
}
.home_head {
  height: 96px;
  width: 1920px;
  background-image: url(../assets/images/home_head@2x.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.home_head p {
  width: 797px;
  height: 228px;
  margin: 0 auto;
  text-align: center;
  font-size: 46px;
  font-weight: medium;
  color: #fff;
  background-image: url(../assets/images/home_head_change@2x.png);
  background-repeat: no-repeat;
  background-size: 100%;
}
.home_body {
  height: 984px;
  width: 1920px;
  /* background-color: yellow; */
}
.home_body_top{
 height:132px;
 width:432px;
 position:absolute;
 top:126px;
 left:747px;
 /* top:-954px;
 left:747px; */
}
.home_body_top p{
  width:432px;
  color:rgba(255,255,255,1);
  font-weight:400;
  font-size:36px;
  line-height:40px;
  text-align:center;
  /* border:1px solid red; */
}
.home_body_top span{
  font-size:24px;
  color:red;
}
.home_body_top ul{
  list-style-type:none;
  height:28px;
  width:380px;
  background-image:url(../assets/images/two_border@2x.png);
  background-repeat:no-repeat;
  background-size:100%;
  /* margin-top:46px; */
  position:relative;
  top:46px;
}
.home_body_top li{
  float:left;
  height:73px;
  width:50px;
  background-image:url(../assets/images/number_border@2x.png);
  background-size:100%;
  margin-left:20px;
  margin-top:-23px;
  text-align:center;
  line-height:64px;
  font-size:43px;
  font-weight:400;
  color:#5FBBF0;
}
.home_body_top .li_one{
  margin-left:59px;
}
#world_box{
  height: 984px;
  width: 1920px;
  /* background-color:yellow; */
}
</style>