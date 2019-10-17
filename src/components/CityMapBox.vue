<template>
<div id="cityMap">

</div>

</template>
<script>
import axios from "axios";
import echarts from "echarts";

import { mapState } from "vuex";

export default {
  name:'citymapbox',
  data(){
    return{}
  },
  computed:{
    ...mapState({
      drawCityChange: state => state.home.cityChange
    })
  },
  mounted(){
     console.log('城市代号',this.drawCityChange)
     let cityChange = this.drawCityChange
      axios.get(`./geoJson/city/${cityChange}.json`)
        .then(res => {
          let cityChangeJson = res.data;
          echarts.registerMap("cityChange", cityChangeJson);
          this.myEcharts = echarts.init(document.getElementById("cityMap"));
          let option = this.cityChangeOption();
          this.myEcharts.setOption(option); 
      })
  },
  methods:{
   cityChangeOption(){
     return{
        tooltip:{
            show:true,
            triger:'item',
            borderWidth:2,
            formatter:'{a}',
            textStyle:{
                  color:'#fff',
                  fontSize:20,
            }
        },
        geo: {
            type: "map",
            map: "cityChange",
            zoom:1.2,
            top: "60px",
            itemStyle: {
              areaColor: "#00083C",
              borderColor: "#2B3A7C",
              borderType:'solid',
              borderWidth:1,
            },
            label:{
              show:true,
              fontSize:16,
              align:'center',
              color:'#33D8FA',
              position:[10,10],
              distance:55,
            },
            emphasis:{
              label:{
                show:true,
                color:'white'
              },
              itemStyle:{
                areaColor:'rgba(51,216,250,1)',
              }
            },
          },
     }
   }

  },

}
</script>

<style scoped>
#cityMap{
  width:743px;
  height:548px;
  border:1px solid yellowgreen;
}
</style>