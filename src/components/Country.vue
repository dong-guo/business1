<template>
  <div id="country_box">
</div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";

import { mapState } from "vuex";

export default {
  name: "country",
  data() {
    return {};
  },
  computed:{
    ...mapState({
      drawCountryChange: state => state.home.countryChange,
    })
  },
  mounted() {
    let country = this.drawCountryChange
    console.log(110,country)
    axios.get(`./geoJson/country/${country}.json`).then(res => {
      let countryJson = res.data;
      echarts.registerMap("China", countryJson);
      this.myEcharts = echarts.init(document.getElementById("country_box"));
      let option = this.countryOption();
      this.myEcharts.setOption(option);
    });
  },
  methods: {
    countryOption() {
      return {
        geo: {
          type: "map",
          map: "China",
          zoom: 1,
          right: "1px",
          top: "1px",
          left: "1px",
          bottom: "1px",
          itemStyle: {
            areaColor: "#010933",
            borderColor: "#2B3A7C",
            borderType:'solid',
            borderWidth:2,
          },
          label:{
            show:true,
            fontSize:16,
            align:'center',
            // position:'inside',
            // distance:55,
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
};
</script>

<style scoped>
#country_box {
  background-color:linear-gradient(0deg,rgba(1,9,40,1),rgba(0,8,73,1));
  width: 1012px;
  height: 836px;
  /* border:1px solid yellow; */
}
</style>