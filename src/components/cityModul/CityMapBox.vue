<template>
  <div id="cityMap"></div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";

import { mapState } from "vuex";

import newsIcon from "../../base64/news";
import greenballoonIcon from "../../base64/greenballoon";
import yellowballoonIcon from "../../base64/yellowballoon";
import formatterleftIcon from "../../base64/formatterleft";
import formatterrightIcon from "../../base64/formatterright";

export default {
  name: "citymapbox",
  data() {
    return {
      cityDistrictList: []
    };
  },
  computed: {
    ...mapState({
      drawCityChange: state => state.home.cityChange,
      drawCityZoom: state => state.home.cityZoom,
      drawCityDistrictList: state => state.city.cityDistrictList
    })
  },
  watch: {
    //监测地图缩放更新
    drawCityZoom: {
      handler(newVal, oldVal) {
        this.actionCity();
      },
      deep: true
    },
    drawCityDistrictList(newValue, oldValue) {
      console.log(
        "city-map-box-drawCityDistrictList监测",
        this.drawCityDistrictList
      );
      this.actionCity();
    }
  },
  mounted() {
    console.log("城市代号", this.drawCityChange);
    // console.log("city-map-box-drawCityDistrictList", this.drawCityDistrictList);
    this.actionCity();
    this.gradeDistrictBalloon();
  },
  methods: {
    //初始化地图
    actionCity() {
      let [cityZoom,cityChange,cityDistrictList] = [this.drawCityZoom,this.drawCityChange,this.drawCityDistrictList]
      //区分开发县区等级
      let developDistrict = this.gradeDistrict();
      //区分气球颜色
      let gradeBalloon = this.gradeDistrictBalloon();
      console.log("developDistrict-气球",gradeBalloon);
      let gradeDistrictBalloon = this.gradeDistrictBalloon;
      axios.get(`./geoJson/city/${cityChange}.json`).then(res => {
        let cityChangeJson = res.data;
        echarts.registerMap("cityChange", cityChangeJson);
        this.myEcharts = echarts.init(document.getElementById("cityMap"));
        let option = this.cityChangeOption(cityZoom,developDistrict,cityDistrictList,gradeBalloon);
        this.myEcharts.setOption(option);
      });
    },
    //配置城市地图
    cityChangeOption(cityZoom,developDistrict,cityDistrictList,gradeBalloon){
      return {
        tooltip: {
          show: true,
          triger: "item",
          borderWidth: 2,
          textStyle: {
            color: "#fff",
            fontSize: 20
          },
          formatter: function(params) {
            if (params.componentSubType == "map") {
              // console.log('formatter-cityDistrictList',cityDistrictList)
              let list = [];
              for (let i = 0; i < cityDistrictList.length; i++) {
                if (params.name == cityDistrictList[i].district) {
                  let res = `<img style='width:200px; height:50px;margin:-10px -10px -10px -10px; display:block;' src='${newsIcon}'/>`;
                  res += `<div style ='position:absolute; letf:0px; top:0px; width:200px; height:50px;padding-top:10px; font-size:20px;' >
                                    <p style ='margin-left:5px;height:36px;'>${params.name}</p>
                              </div>`;
                  return res;
                }
              }
            } else {
              let res = `<div style ='width:auto; height:74px;padding-top:10px; margin:-8px -8px -8px -8px; border-radius:4px; background:rgba(14,109,233,0.5); font-size:20px;' >
                            <p style ='margin-left:5px;height:36px;'>${params.name}</p>
                            <p style ='margin-left:5px;height:36px;'>地址：${params.name}</p>
                      </div>`;
              res += `<img style='width:21px; height:94px; position:absolute; top:-8px; left:-15px;' src='${formatterleftIcon}'/>`;
              res += `<img style='width:21px; height:94px; position:absolute; top:-8px; right:-15px;' src='${formatterrightIcon}'/>`;
              return res;
            }
          }
        },
        geo: {
          type: "map",
          map: "cityChange",
          roam: "move",
          zoom: cityZoom,
          top: "60px",
          itemStyle: {
            areaColor: "#00083C",
            borderColor: "#2B3A7C",
            // borderColor:'yellow',
            borderType: "solid",
            borderWidth: 3,
            // shadowBlur:2,
            // shadowOffsetX:2,
            // shadowOffsetY:2,
          },
          label: {
            show: true,
            fontSize: 16,
            align: "center",
            color: "#33D8FA",
            position: [10, 10],
            distance: 55
          },
          emphasis: {
            label: {
              show: true,
              color: "white"
            },
            itemStyle: {
              // areaColor:'rgba(51,216,250,1)',
              areaColor: "rgba(56,166,200,1)"
            }
          },
          regions: developDistrict
          // regions:[
          //     {
          //       name:'惠东县',
          //       itemStyle:{
          //         areaColor:'#33D8FA',
          //       },
          //       label:{
          //         color:'#000001',
          //       }
          //     }
          // ]
        },
        series: [
          {
            // name:'provincialChange',
            type: "scatter",
            coordinateSystem: "geo",
            symbolOffset:[0,'-50%'],
            itemStyle:{
              opacity:0.5
            },
            emphasis:{
              itemStyle:{
                opacity:1
              },              
            },
            data: gradeBalloon
            // data:[
            //   {
            //     name:'惠東',
            //     value:[114.8,23],
            //     symbol:`image://${yellowballoonIcon}`,
            //     symbolSize: [32,40],
            //     itemStyle:{
            //       color:'#EEC947'
            //     }
            //   },
            // ]
          },
          {
            type: "map",
            map: "provincialChange",
            coordinateSystem: "geo",
            geoIndex: 0,
            data: []
          }
        ]
      };
    },
    //区分开发区县等级
    gradeDistrict() {
      let list = this.drawCityDistrictList;
      let grade = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].developFlag == 0) {
          grade.push({
            name: list[i].district,
            itemStyle: {
              areaColor: "#33D8FA"
            },
            label: {
              color: "#000001"
            }
          });
        } else if (list[i].developFlag == 1) {
          grade.push({
            name: list[i].district,
            itemStyle: {
              areaColor: "#AC4ED3",
              color: "white"
            },
            label: {
              color: "white"
            }
          });
        }
      }
      return grade;
    },
    //气球区别
    gradeDistrictBalloon() {
      let list = this.drawCityDistrictList;
      // console.log("9999-list", list);
      let balloon = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].shopList.length > 0) {
          for (let index = 0; index<list[i].shopList.length; index++) {
            if (list[i].shopList[index].nature == 'Deaer') {
              balloon.push({
                name: list[i].shopList[index].address,
                address: list[i].shopList[index].address,
                value: [list[i].shopList[index].longitude, list[i].shopList[index].latitude],
                symbol: `image://${yellowballoonIcon}`,
                symbolSize: [24, 30],
                itemStyle: {
                  color: "#EEC947"
                }
              });
            } else {
              balloon.push({
                name: list[i].shopList[index].address,
                address: list[i].shopList[index].address,
                value: [list[i].shopList[index].longitude, list[i].shopList[index].latitude],
                symbol: `image://${greenballoonIcon}`,
                symbolSize: [24, 30],
                itemStyle: {
                  color: "#2CC68B"
                }
              });
            }
          }
        }
      }
      return balloon;
    }
  }
};
</script>

<style scoped>
#cityMap {
  /* width: 943px; */
  width:1143px;
  height: 748px;
  /* border: 1px solid yellowgreen; */
}
</style>