<template>
  <div id="world_box"></div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";
import balloonIcon from "../base64/balloon";

import { mapState } from "vuex";

import { IndexModel } from '../untils/index'
const indexModel = new IndexModel()

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
      drawCountry: state => state.home.country,

    })
  },
  created(){
    this.getCountryList()
  },
  mounted() {
    // this.getCountryList()
  },
  methods: {
    //请求后台国家数据
    getCountryList(){
      // axios.get('https://mobiletest.derucci.net/consumer-admin/api/merchants/getCountryDataList')
      indexModel.getCountry()
      .then(res =>{
        let countryName = res.data.data
        this.$store.commit("home/setAllTotal",countryName.total)
        console.log('countryName1',countryName.country,countryName.total)
        //将国家前十名存入VUEX中
        for(let i = 0; i< countryName.country.length-1 && i<10; i++){
          let index = i
          let franchiseStoreNum = countryName.country[i].franchiseStore
          let directSaleStoreNum = countryName.country[i].directSaleStore
          let totalNum = countryName.country[i].total
          this.$store.commit("home/setCountryNumberName",{'idx':index,'val':countryName.country[i].country})
          this.$store.commit("home/setCountryShopNum",{'idx':index,'franchiseStoreNum':franchiseStoreNum,'directSaleStoreNum':directSaleStoreNum,'totalNum':totalNum})
        }
        this.worldeSet();
        console.log('drawCountryNumber',this.drawCountryNumber)
      })
    },
    //设置散点气球样式
    worldeSet() {
      let dcn = this.drawCountryNumber;
      let coordinate = this.drawCountry
      // console.log('dcn-46',dcn)
      let countryShopNum = [];
      let otherStyle = [];
      let countryBigBall = [];
      let countryMidBall = [];
      let countrySmallBall = [];
      //显示浅蓝色国家
      for (let i = 0; i < dcn.length; i++) {
        countryShopNum.push(String(dcn[i].total));
        otherStyle.push({
          name: dcn[i].name,
          selected: false,
          itemStyle: { areaColor: "#33D8FA" }
        });
        // console.log('颜色国家otherStyle',otherStyle)
        //气泡大小分级
        let countryCoordinate = []
        for(let index = 0; index < coordinate.length; index++){
          if(dcn[i].name == coordinate[index].ChinaName){
             countryCoordinate = coordinate[index].jindu
          }
        }
        if (dcn[i].total > 30) {
          countryBigBall.push({
            // name: dcn[i].name,
            // value: dcn[i].jindu,
            value:countryCoordinate,
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
              formatter: [
                "{a| " + countryShopNum[i] + "}{b| 家}" + "\n" + "{c| " + dcn[i].name + "}"
              ].join("\n")
            }
          });
        } else if (dcn[i].total > 1 && dcn[i].total <= 30) {
          countryMidBall.push({
            name: dcn[i].name,
            // value: dcn[i].jindu,
            value:countryCoordinate,
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
                  fontSize: 20,
                  align:'center',
                }
              },
              formatter: [
                "{a| " + countryShopNum[i] +"}{b| 家}" + "\n" +"{c| " + dcn[i].name + "}"
              ].join("\n")
            }
          });
        } else {
          countrySmallBall.push({
            name: dcn[i].name,
            // value: dcn[i].jindu,
            value:countryCoordinate,
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
                  align: "center",
                }
              },
              formatter: [
                "{a| " + countryShopNum[i] + "}{b| 家}" + "\n" + "{c| " + dcn[i].name + "}"
              ].join("\n")
            }
          });
        }
      }
      axios.get("./geoJson/world.json").then(res => {
        let worldJson = res.data;
        echarts.registerMap("world", worldJson);
        this.myEcharts = echarts.init(document.getElementById("world_box"));
        let option = this.worldOption(otherStyle,countryBigBall,countryMidBall,countrySmallBall);
        this.myEcharts.setOption(option);
        //跳转国家地图
        let country = this.drawCountry;
        this.myEcharts.on("click", params => {
          console.log('跳转名字',params.name)
          //取得亮蓝色国家
          for (let i = 0; i < dcn.length; i++) {
            if (params.name == dcn[i].name) {
              //取得中英文名称对于数据
              for(let i = 0; i < country.length; i++){
                if(params.name ==country[i].ChinaName){
                  this.$store.commit("home/setCountryChange", country[i].EnglishName);
                  this.$router.push({ name: "china" });
                }
              }
              break;
            }
          }
        });
      });
    },
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
            Austria: "奥地利",
            Canada:'加拿大',
            "South Korea":'韩国',
            Malaysia:'马来西亚',
            Dubai:'迪拜',
            "New Zealand":'新西兰',
            Cambodia:'柬埔寨',
            "United Arab Emirates":'迪拜'
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