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
      drawCountryNumber: state => state.home.countryNumber,
      drawCountry: state => state.home.country
    })
  },
  mounted() {
    let dcn = this.drawCountryNumber;
    let countryNum = [];
    let otherStyle = [];
    let countryBigBall = [];
    let countryMidBall = [];
    let countrySmallBall = [];
    //显示浅蓝色国家
    for (let i = 0; i < dcn.length; i++) {
      countryNum.push(String(dcn[i].amount));
      otherStyle.push({
        name: dcn[i].name,
        selected: false,
        itemStyle: { areaColor: "#33D8FA" }
      });
      //气泡大小分级
      if (dcn[i].amount > 500) {
        countryBigBall.push({
          name: dcn[i].name,
          value: dcn[i].jindu,
          color: "#333333",
          label: {
            show: true,
            position: ["20%", "35%"],
            fontSize: 16,
            rich: {
              a: {
                fontSize: 30
              },
              b: {
                fontSize: 15,
                verticalAlign: "middle"
              },
              c: {
                fontSize: 20,
                align: "center"
              }
            },
            // formatter: `{b}`
            formatter: ["{a| " + countryNum[i] +"}{b| 家}" + "\n" + "{c| " + dcn[i].name +"}"
            ].join("\n")
          }
        });
      } else if (dcn[i].amount > 100 && dcn[i].amount <= 500) {
        countryMidBall.push({
          name: dcn[i].name,
          value: dcn[i].jindu,
          label: {
            show: true,
            position: ["20%", "30%"],
            color: "#333333",
            fontSize: 16,
            rich: {
              a: {
                fontSize: 28
              },
              b: {
                fontSize: 14,
                verticalAlign: "middle"
              },
              c: {
                fontSize: 20
              }
            },
            // formatter: `{b}`
            formatter: [
              "{a| " + countryNum[i] +"}{b| 家}" + "\n" + "{c| " + dcn[i].name +"}"
            ].join("\n")
          }
        });
      } else {
        countrySmallBall.push({
          name: dcn[i].name,
          value: dcn[i].jindu,
          label: {
            show: true,
            position: ["15%", "25%"],
            color: "#333333",
            fontSize: 16,
            rich: {
              a: {
                fontSize: 28
              },
              b: {
                fontSize: 14
              },
              c: {
                align: "center"
              }
            },
            // formatter: `{b}`
            formatter: [
              "{a| " + countryNum[i] +"}{b| 家}" + "\n" + "{c| " + dcn[i].name +"}"
            ].join("\n")
          }
        });
      }
    }
    axios.get("./geoJson/world.json").then(res => {
      let worldJson = res.data;
      echarts.registerMap("world", worldJson);
      this.myEcharts = echarts.init(document.getElementById("world_box"));
      let option = this.worldOption(
        otherStyle,
        countryBigBall,
        countryMidBall,
        countrySmallBall
      );
      this.myEcharts.setOption(option);
      //跳转中国地图
      let country = this.drawCountry;
      this.myEcharts.on("click", param => {
        for (let i = 0; i < dcn.length; i++) {
          if (param.name == dcn[i].name) {
            this.$store.commit("home/setCountryChange", country[i]);
            this.$router.push({ name: "china" });
            break;
          }
        }
      });
    });
  },
  methods: {
    worldOption(otherStyle, countryBigBall, countryMidBall, countrySmallBall) {
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
            Russia: "俄罗斯",
            Austria: "奥地利"
          },
          regions: otherStyle,
          emphasis: {
            itemStyle: {
              areaColor: "#dcf5fa"
            },
            label: {
              color: "green"
            }
          },
          label: {
            fontSize: 16
          }
        },
        series: [
          {
            coordinateSystem: "geo",
            type: "scatter",
            symbol: `image://${balloonIcon}`,
            symbolSize: [173, 200],
            // formatter: `{a}`,
            label: {
              fontSize: 18
            },
            data: countryBigBall
          },
          {
            coordinateSystem: "geo",
            type: "scatter",
            symbol: `image://${balloonIcon}`,
            symbolSize: [129, 149],
            label: {
              fontSize: 18
            },
            data: countryMidBall
          },
          {
            coordinateSystem: "geo",
            type: "scatter",
            symbol: `image://${balloonIcon}`,
            symbolSize: [86, 100],
            label: {
              fontSize: 18
            },
            data: countrySmallBall
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