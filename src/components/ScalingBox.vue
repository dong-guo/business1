<template>
<div class="scalingContent">
  <div class="enlarge" @click="enlargeMap"></div>
  <div class="reduce" @click="reduceMap"></div>
</div>

</template>
<script>

import { mapState } from "vuex"

import axios from "axios";
import echarts from "echarts";

export default {
  name:'scalingbox',
  data(){
    return{}
  },
  computed:{
    ...mapState({
      drawProvincialZoom: state => state.home.provincialZoom,
      drawCityZoom: state => state.home.cityZoom
    })
  },
  mounted(){
    // console.log('路由地址',this.$route.name)
  },
  methods:{
    //放大地图
    enlargeMap(){
      //判断路由地址是省级还是城市级别
      if(this.$route.name =='provincial'){
          let provincialzoom =Number(this.drawProvincialZoom)
          provincialzoom += 2
          if(provincialzoom > 9.9){
            provincialzoom = 9.9
          }
          this.$store.commit("home/setProvincialZoom",provincialzoom);
          console.log('provincialzoom',this.drawProvincialZoom)
      } else{
          let cityzoom =Number(this.drawCityZoom)
          cityzoom += 2
          if(cityzoom>10.2){
            cityzoom = 10.2
          }
          this.$store.commit("home/setCityZoom",cityzoom);
          console.log('cityzoom',this.drawCityZoom)        
      }
    },
    //缩小地图
    reduceMap(){
      //判断路由地址是省级还是城市级别
      if (this.$route.name == 'provincial'){
          let provincialzoom =Number(this.drawProvincialZoom)
          //以原始设定值每次变大0.5倍
          provincialzoom -= 2
          if(provincialzoom < 1){
            provincialzoom = 1
          }
          this.$store.commit("home/setProvincialZoom",provincialzoom);
          console.log('provincialzoom',this.drawProvincialZoom) 
      }  else{
        //以原始设定值每次缩小0.5倍
          let cityzoom =Number(this.drawCityZoom)
          cityzoom -= 2
          if(cityzoom < 1.2){
            cityzoom = 1.2
          }
          this.$store.commit("home/setCityZoom",cityzoom);
          console.log('cityzoom',this.drawCityZoom)         
      }   
    }
  },

}
</script>

<style scoped>
.scalingContent{
  width: 120px;
  height:50px;
  background-color:#0A0F5F;
  border-radius:6px;
  display:flex;
}
.enlarge{
  width:60px;
  height:50px;
  border-radius:6px 0 0 6px;
  border-right:1px solid #141973;
  box-sizing:border-box;
  background-image:url(../assets/images/enlarge@2x.png);
  background-repeat:no-repeat;
  background-position:center center;
  background-size:60%;
}
.reduce{
  width:60px;
  height:50px;
  border-radius:0 6px 6px 0;
  border-left:1px solid #141973;
  box-sizing:border-box;
  background-image:url(../assets/images/reduce@2x.png);
  background-repeat:no-repeat;
  background-position:center center;
  background-size:60%;
}
</style>