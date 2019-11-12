<template>
<div class="globalCityBox">
    <router-link :to="{name:'home'}">
      <div class="globalWorld">
        <p>全球</p>
      </div>
    </router-link>  
    <router-link :to="{name:'china'}">
       <div class="chooseCountry">
         <p>中国</p>
       </div>
    </router-link>
    <router-link :to="{name:'provincial'}">
       <div class="chooseProvincial">
         <p>{{drawProvincialChinaChange}}</p>
       </div>
    </router-link>
    <router-link :to="{name:'city'}">
       <div class="chooseCity">
         <p>{{drawCityChinaChange}}</p>
       </div>
    </router-link>
</div>

</template>
<script>

import { mapState } from "vuex"

export default {
    name:'globalcity',
    data(){
      return{}
    },
    computed:{
      ...mapState({
        drawProvincialChinaChange :state => state.home.provincialChinaChange,
        drawCityChinaChange: state => state.home.cityChinaChange
      })
    },
    mounted(){
      console.log('drawCityChinaChange',this.drawCityChinaChange)
    }
}
</script>

<style scoped>
.globalCityBox{
  width:644px;
  height:173px;
  /* background-color:violet; */
  display:flex;
  justify-content:space-between;
}
.globalWorld {
  height: 173px;
  width: 208px;
  background-image: url(../../assets/images/superior@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  /* border:1px solid gold; */
}
.globalWorld p {
  color: rgba(255, 255, 255, 1);
  font-size: 36px;
  font-weight: 400;
  line-height: 38px;
  padding-left: 74px;
  padding-top: 68px;
  letter-spacing:10px;
  background:linear-gradient(0deg,rgba(255,255,255,1) 0%, rgba(51,216,250,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  /* margin-left:74px;
  margin-top:46px; */
}
.chooseCountry{
  height: 173px;
  width: 208px;
  background-image: url(../../assets/images/superior@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  /* border:1px solid green; */
}
.chooseCountry p {
  /* color: rgba(255, 255, 255, 1); */
  font-size: 36px;
  font-weight: 400;
  line-height: 38px;
  padding-left: 74px;
  padding-top: 68px;
  letter-spacing:10px;
  background:linear-gradient(0deg,rgba(255,255,255,1) 0%, rgba(51,216,250,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.chooseProvincial{
  height: 173px;
  width: 208px;
  background-image: url(../../assets/images/superior@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  /* border:1px solid green; */
}
.chooseProvincial p {
  /* color: rgba(255, 255, 255, 1); */
  font-size: 36px;
  font-weight: 400;
  line-height: 38px;
  padding-left: 74px;
  padding-top: 68px;
  letter-spacing:10px;
  background:linear-gradient(0deg,rgba(255,255,255,1) 0%, rgba(51,216,250,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.chooseCity{
  height: 173px;
  width: 208px;
  background-image: url(../../assets/images/choose@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;  
}
.chooseCity p{
  color: rgba(255, 255, 255, 1);
  font-size: 36px;
  font-weight: 400;
  line-height: 38px;
  padding-left: 74px;
  padding-top: 68px;
  letter-spacing:10px;  
}
</style>