<template>
<div id="otherCountry">
</div>

</template>
<script>
import axios from "axios";
import echarts from "echarts";

import { mapState } from "vuex";


export default {
  name:'othercountry',
  data(){
    return{

    }
  },
  computed:{
    ...mapState({
      drawCountryChange: state => state.home.countryChange,
    })
  },
  mounted() {
    let country = this.drawCountryChange
    // console.log(110,country)
    axios.get(`./geoJson/country/${country}.json`).then(res => {
      let countryJson = res.data;
      echarts.registerMap("China", countryJson);
      this.myEcharts = echarts.init(document.getElementById("otherCountry"));
      let option = this.countryOption();
      this.myEcharts.setOption(option);
    });
  },
  methods:{
    countryOption() {
      return {
        geo: {
          type: "map",
          map: "China",
          zoom: 1,
          right: "1px",
          top: "50px",
          left: "1px",
          bottom: "1px",
          itemStyle: {
            areaColor: "#010933",
            borderColor: "#2B3A7C",
            borderType:'solid',
            borderWidth:3,
          },
          label:{
            show:true,
            fontSize:12,
            align:'center',
            color:'white',
            position:[10,10],
            distance:55,
          },
          emphasis:{
            label:{
              show:true,
              color:'green'
            },
            itemStyle:{
              areaColor:'rgba(51,216,250,1)',
            }
          }
        }
      };
    }    
  }
}
</script>

<style scoped>
#otherCountry{
  background-color:linear-gradient(0deg,rgba(1,9,40,1),rgba(0,8,73,1));
  width: 1412px;
  height: 736px;
  /* border:1px solid green; */
}
</style>