<template>
<div class="scalingContent">
  <div class="enlarge" @click="enlargeMap"></div>
  <div class="reduce"></div>
</div>

</template>
<script>

import { mapState } from "vuex"

export default {
  name:'scalingbox',
  data(){
    return{}
  },
  computed:{
    ...mapState({
      drawProvincialZoom: state => state.home.provincialZoom
    })
  },
  mounted(){
  },
  methods:{
    enlargeMap(){
      console.log('类型',typeof(this.drawProvincialZoom))
      let zoom =Number(this.drawProvincialZoom)
      zoom += 0.05
      this.$store.commit("home/setProvincialZoom",zoom);
      console.log('vuexzoom',this.drawProvincialZoom)
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