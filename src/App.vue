<template>
  <div id="app">
    <div class="app-home">
      <div class="home_head">
        <p>
          <span :class="{'home_head_change':drawBoxKey}">慕思招商系统</span>
        </p>
      </div>
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState({
      drawBoxKey: state => state.home.boxKey,
      drawCountryChange: state => state.home.countryChange,
      drawOtherCountryChange: state => state.home.otherCountryChange,

      drawProvincialChinaChange: state => state.home.provincialChinaChange,
      drawProvincialChange: state => state.home.provincialChange,
      
      drawCityChange: state => state.home.cityChange,
      drawCityChinaChange: state => state.home.cityChinaChange
    })
  },
  created(){
      //  if(sessionStorage.getItem("enkey")){
      //    this.$store.commit("home/setProvincialChinaChange", sessionStorage.getItem("key"));
      //    this.$store.commit("home/setProvincialChange", sessionStorage.getItem("Enkey"));
      //  }
       window.addEventListener("beforeunload",()=>{
         sessionStorage.setItem("key",this.drawProvincialChinaChange)
         sessionStorage.setItem("Enkey",this.drawProvincialChange)
         sessionStorage.setItem("cityNum",this.drawCityChange)
         sessionStorage.setItem("cityChina",this.drawCityChinaChange)
         sessionStorage.setItem("otherCountry",this.drawOtherCountryChange)
       })
  },
  beforeMount(){
       this.$store.commit("home/setProvincialChinaChange", sessionStorage.getItem("key"));
       this.$store.commit("home/setProvincialChange", sessionStorage.getItem("Enkey"));
       this.$store.commit("home/setCityChange", sessionStorage.getItem("cityNum"));
       this.$store.commit("home/setCityChinaChange", sessionStorage.getItem("cityChina"));
       this.$store.commit("home/setOtherCountryChange", sessionStorage.getItem("otherCountry"));
  },
  watch:{
  },
  methods:{
  }
};
</script>
<style lang="scss">
html {
  margin: 0;
  padding: 0;
  height: 1080px;
  width: 1920px;
}
#app {
  margin: 0;
  padding: 0;
}
.app-home{
  background-image: url(./assets/images/background@2x.png);
  height: 1080px;
  width: 1920px;
}
.home_head {
  height: 96px;
  width: 1920px;
  background-image: url(./assets/images/home_head@2x.png);
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
  background-image: url(./assets/images/home_head_change@2x.png);
  background-repeat: no-repeat;
  background-size: 100%;
}
.home_head_change {
  text-shadow: 2px 2px 9px rgba(1, 21, 59, 1);
}
</style>
