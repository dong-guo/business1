<template>
  <div id="world_box"></div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";

import balloonIcon from "../base64/balloon";

import { mapState } from "vuex";

export default {
  name: "world",
  data() {
    return {
      myEcharts: null
    };
  },
  computed: {
    ...mapState({
      drawCountry: state => state.home.country,
      drawNum: state => state.home.number,
      drawJw: state => state.home.jw
    })
  },
  mounted() {
    let obj = this.drawCountry;
    let num = this.drawNum;
    let jw = this.drawJw;
    let ob = [];
    let countryBg = [];
    let countryZg =[];
    let countrySg =[];
    for (let i = 0; i < obj.length; i++) {
      ob.push({ name: obj[i], selected: true, emphasis:{itemStyle:{areaColor:'#33D8FA'}}});
      if (num[i] > 500) {
        countryBg.push({
          name: obj[i],
          value: jw[i],
          label: {
            show: true,
            position: [50, 80],
            color: "#333333",
            formatter: `{b}`
          }
        });
      } else if (num[i] > 100 && num[i] <=500) {
        countryZg.push({
          name: obj[i],
          value: jw[i],
          label: {
            show: true,
            position: ['40%', '40%'],
            color: "#333333",
            formatter: `{b}`
          }
        });
      } else {
          countrySg.push({
            name: obj[i],
            value: jw[i],
            label: {
              show: true,
              position: ['20%', '40%'],
              color: "#333333",
              formatter: `{b}`
            }
          });        
      }
    }
    console.log(333, ob);
    console.log(444, countryBg);
    console.log(445, countryZg);
    console.log(446, countrySg);

    axios.get("./geoJson/world.json").then(res => {
      let worldJson = res.data;
      echarts.registerMap("world", worldJson);
      this.myEcharts = echarts.init(document.getElementById("world_box"));
      let option = this.worldOption(ob, countryBg, countryZg, countrySg);
      this.myEcharts.setOption(option);
    });
  },
  methods: {
    worldOption(ob, countryBg, countryZg, countrySg) {
      return {
        geo: {
          type: "map",
          map: "world",
          right: "550px",
          top: "200px",
          left: "50px",
          bottom: "50px",
          zoom: 1,
          itemStyle: {
            areaColor: "#000001",
            bordercolor: "#2A3879",
            shadowColor: "#2A3879",
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          },
          nameMap: {
            China: "中国",
            "United States of America": "美国",
            Australia: "澳大利亚",
            Japan: "日本",
            Germany: "德国",
            India: "印度",
            "South Africa": "南非",
            Brazil: "巴西",
            Argentina: "阿根廷",
            Slovakia: "斯洛伐克",
            Mexico: "墨西哥",
            Russia: "俄罗斯"
          },
          emphasis: {
            itemStyle: {
              areaColor: "#dcf5fa"
            },
            label: {
              color: "green"
              // show:false
            }
          },
          label: {
            fontSize: 16
            // color: "white"
          },
          regions: ob
          // {
          //   name: obj1,
          //   selected: true,
          // },
          // {
          //   name: "澳大利亚",
          //   selected: true
          // },
        },
        series: [
          {
            coordinateSystem: "geo",
            type: "scatter",
            symbol: `image://${balloonIcon}`,
            symbolSize: [173, 200],
            // formatter: `{a}`,
            label:{
              fontSize:18,
            },
            data: countryBg
            // {
            //   name: "中国",
            //   value: [100.5, 40.48],
            //   label: {
            //     show: true,
            //     position: [50, 80],
            //     color: "#333333",
            //     formatter: `{b}`
            //   }
            // }
          },
          {
            coordinateSystem: "geo",
            type: "scatter",
            symbol: `image://${balloonIcon}`,
            symbolSize: [129, 149],
            label:{
              fontSize:18,
            },
            data: countryZg
              // {
              //   name: "美国",
              //   value: [-100.5, 40.48],
              //   label: {
              //     show: true,
              //     position: [20, 30],
              //     color: "#333333",
              //     formatter: `{b}`
              //   }
              // }

          },
          {
            coordinateSystem: "geo",
            type: "scatter",
            symbol: `image://${balloonIcon}`,
            symbolSize: [86, 100],
            label:{
              fontSize:18,
            },
            data: countrySg
              // {
              //   name: "澳大利亚",
              //   value: [133.13, -20.3],
              //   label: {
              //     show: true,
              //     position: [20, 50],
              //     color: "#333333",
              //     formatter: `{b}`
              //   }
              // }
            
          }
        ]
      };
    }
  }
};
</script>


<style scoped>
#world_box {
  height: 984px;
  width: 1920px;
  /* background-color:yellow; */
}
</style>