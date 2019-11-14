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
      indexModel.getCountry()
      .then(res =>{
        let countryName = res.data.data
        // countryName = this.deleteSpace(countryName)
        this.$store.commit("home/setAllTotal",countryName.total)
        // console.log('countryName数据',countryName.country,countryName.total)
        //将国家前十名存入VUEX中
        for(let i = 0; i< countryName.country.length; i++){
          let [index,franchiseStoreNum,directSaleStoreNum,totalNum] = [i,countryName.country[i].franchiseStore,countryName.country[i].directSaleStore,countryName.country[i].total]
          //对国家名字左右两边去除空格
          let deleteSpaceName = countryName.country[i].country.replace(/(^\s*)|(\s*$)/g,"")
          this.$store.commit("home/setCountryNumberName",{'idx':index,'val':deleteSpaceName})
          this.$store.commit("home/setCountryShopNum",{'idx':index,'franchiseStoreNum':franchiseStoreNum,'directSaleStoreNum':directSaleStoreNum,'totalNum':totalNum})
        }
        this.worldeSet();
        // console.log('drawCountryNumber',this.drawCountryNumber)
      })
    },
    //设置气泡图样式
    worldeSet() {
      let [dcn,coordinate] =[this.drawCountryNumber,this.drawCountry]
      let [countryShopNum,otherStyle,countryBigBall,countryMidBall,countrySmallBall] = [[],[],[],[],[]]
      //显示浅蓝色国家
      for (let i = 0; i < dcn.length && dcn[i].name!=''; i++) {
        countryShopNum.push(String(dcn[i].total));
        otherStyle.push({
          name: dcn[i].name,
          selected: false,
          itemStyle: { areaColor: "#33D8FA" }
        });
        // console.log('颜色国家otherStyle',otherStyle)
        //气泡中英文名字大小匹对
        let countryCoordinate = []
        for(let index = 0; index < coordinate.length; index++){
          if(dcn[i].name == coordinate[index].ChinaName){
             countryCoordinate = coordinate[index].jindu
          }
        }
        //气泡图样式设置
        let [obj,arr]=[dcn[i],countryShopNum[i]]
        this.setBallnoonStyle(obj,countryBigBall,countryMidBall,countrySmallBall,countryCoordinate,arr,otherStyle)
      }
      //请求世界地图
      this.requestWorld(otherStyle,countryBigBall,countryMidBall,countrySmallBall,dcn)
    },
    //世界地图请求
    requestWorld(otherStyle,countryBigBall,countryMidBall,countrySmallBall,dcn){
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
    //世界地图配置
    worldOption(otherStyle, countryBigBall, countryMidBall, countrySmallBall) {
      // console.log('otherStyle',otherStyle)
      // console.log('气泡图',countryBigBall, countryMidBall, countrySmallBall)
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
            // Germany: "德国",
            India: "印度",
            // "South Africa": "南非",
            // Brazil: "巴西",
            // Argentina: "阿根廷",
            // Slovakia: "斯洛伐克",
            // Mexico: "墨西哥",
            // Russia: "俄罗斯",
            // Austria: "奥地利",
            Canada:'加拿大',
            "South Korea":'韩国',
            Malaysia:'马来西亚',
            Dubai:'迪拜',
            "New Zealand":'新西兰',
            Cambodia:'柬埔寨',
            "United Arab Emirates":'迪拜'
          },
          regions: otherStyle,
          // regions:[
          //   {itemStyle: {areaColor: "#33D8FA"},name: "美国",selected: false}
          // ],
          emphasis: {
            itemStyle: {
              areaColor: "#dcf5fa"
            },
            label: {
              color: "blue"
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
            data: countryBigBall
          },
          {
            coordinateSystem: "geo",
            type: "scatter",
            symbol: `image://${balloonIcon}`,
            symbolSize: [129, 149],
            data: countryMidBall
          },
          {
            coordinateSystem: "geo",
            type: "scatter",
            symbol: `image://${balloonIcon}`,
            symbolSize: [86, 100],
            data: countrySmallBall
          }
        ]
      };
    },
    //气泡图样式设置函数
    setBallnoonStyle(obj,countryBigBall,countryMidBall,countrySmallBall,countryCoordinate,arr,otherStyle){
        if (obj.total > 30) {
          countryBigBall.push({
            name: obj.name,
            // value: dcn[i].jindu,
            value:countryCoordinate,
            label: {
              show: true,
              position: ["25%", "35%"],
              fontSize: 16,
              rich: {
                a: {
                  fontSize: 30,
                  align:'center',
                  color:'#333333',
                },
                b: {
                  fontSize: 15,
                  verticalAlign: "middle",
                  color:'#333333',
                },
                c: {
                  fontSize: 20,
                  align: "center",
                  color:'#333333',
                }
              },
              formatter: [
                "{a| " + arr + "}{b| 家}" + "\n" + "{c| " + obj.name + "}"
              ].join("\n")
            }
          });
        } else if (obj.total > 1 && obj.total <= 30) {
          countryMidBall.push({
            name: obj.name,
            // value: dcn[i].jindu,
            value:countryCoordinate,
            label: {
              show: true,
              position: ["10%", "30%"],
              fontSize: 16,
              width:100,
              height:100,
              rich: {
                a: {
                  fontSize: 28,
                  align: "center"
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
                "{a| " + arr +"}{b| 家}" + "\n" +"{c| " + obj.name + "}"
              ].join("\n")
            }
          });
        } else {
          countrySmallBall.push({
            name: obj.name,
            // value: dcn[i].jindu,
            value:countryCoordinate,
            label: {
              show: true,
              position: ["0%", "25%"],
              width:80,
              height:80,
              fontSize: 16,
              rich: {
                a: {
                  fontSize: 28,
                  align: "center",
                  color:'#333333',
                },
                b: {
                  fontSize: 14,
                  color:'#333333',
                },
                c: {
                  align: "center",
                  color:'#333333',
                }
              },
              formatter: [
                "{a| " + arr + "}{b| 家}" + "\n" + "{c| " + obj.name + "}"
              ].join("\n")
            }
          });
        }
        return{countryBigBall,countryMidBall,countrySmallBall}          
    },
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