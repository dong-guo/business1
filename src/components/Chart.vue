<template>
  <div v-if="List" id="chart_box"></div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";
import { mapState } from "vuex"

import { IndexModel } from '../untils/index'
const indexModel = new IndexModel()

export default {
  name:'chart',
  data() {
    return {
      myEcharts: null,
      //地图渲染Y轴数据来原
      List:[],
      provincialTotal:[],
    };
  }, 
  computed: {
    ...mapState({
      drawProvincial: state => state.succession.provincial,
      drawValueCountry: state => state.succession.valueCountry,
      drawBrandList:state => state.succession.brandList,
      drawCity: state => state.succession.city,
      drawEchartRequestList: state=>state.succession.echartRequestList,
      drawYList: state=>state.succession.yList
    })
  }, 
  watch:{
    drawYList(newValue,oleValue){
      this.List = this.drawYList
      // console.log('监视Y轴数据变动',this.List)
      this.initChart()
    },
    drawValueCountry(newValue,oldValue){
      // console.log('chart检测国家',this.drawValueCountry)
      this.initChart()
    },
    drawBrandList(newValue,oleValue){
      this.initChart()
    },
    drawEchartRequestList(newValue,oldValue){
      this.provincialTotal = this.drawEchartRequestList
      this.initChart()
    }
  },
  created(){
    this.provincialTotal = this.drawEchartRequestList
  },
  mounted(){
  //  this.getBrand()
   this.initChart()
   console.log('this.provincialTotal',this.provincialTotal)
  },
  methods:{
   //请求后台品牌
   initChart(){
      let Yprovincial = this.List
      let drawBrandList = this.drawBrandList
      let provincialTotal = this.provincialTotal
      let seriesColor =['#0900C3','#0075F6','#00CBFE','#537EC5','#0B4381','#03E2AE','#005F64','#22E02D','#F5AC2D','#F94589','#FBFC01']
      let seriesList = []
      let totalList=[]
      console.log('匹配数据provincialTotal',provincialTotal)
      //历遍请求品牌数量
      for(let j=0; j < drawBrandList.length; j++){
        totalList.push([])
        //历遍数据长度
        for(let k = 0; k < provincialTotal.length; k++){
          //历遍Y轴省份
          for(let m = 0; m < Yprovincial.length; m++){
            //匹对Y轴省份与对应省份数据
            if(Yprovincial[m] == provincialTotal[k].province){
                let key = true
                //对每条数据品牌数量历遍
                for(let n = 0; n<provincialTotal[k].brands.length; n++){
                  //匹对每条数据里面品牌与标题品牌
                  if(drawBrandList[j].name == provincialTotal[k].brands[n].aliasBrand){
                    totalList[j].push(provincialTotal[k].brands[n].total)
                    key = false
                  }
                }
                //for循环完毕无添加值，添加一个0值
                if(key == true){
                  totalList[j].push(null)
                }
            }
          }
        }
      }  
      //遍历品牌
      for(let i=0; i<drawBrandList.length; i++){
        seriesList.push({
            name:drawBrandList[i].name,
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    position: 'insideRight',
                }
            },
            itemStyle:{
              color:seriesColor[i]
            },
            data:totalList[i]
        })
      }
      // console.log('seriesList22222222',seriesList)
      
      this.myEcharts = echarts.init(document.getElementById("chart_box"));
      let option = this.chartOption(Yprovincial,drawBrandList,seriesList);
      this.myEcharts.setOption(option);
   },
   //地图配置
   chartOption (Yprovincial,drawBrandList,seriesList) {
     return{
        tooltip : {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'        
            }
        },
        legend: {
              left:'5%',
              itemHeight:20,
              itemWidth:30,
              align:'auto',
              orientL:'horizontal',
              textStyle:{
                color:'white',
                fontSize:'18',
              },
              data:drawBrandList
        },
        grid: {
              left: '1%',
              right: '3%',
              bottom: '1%',
              top:125,
              containLabel: true
        },
        xAxis:  {
              type: 'value', 
              axisLabel:{
                color:'white'
              },
              axisTick:{
                show:true,
                lineStyle:{
                  color:'white'
                }
              },
              axisLine:{
                show:true,
                lineStyle:{
                  color:'white'
                }
              },
              splitLine:{
                show:false,
              }
        },
        yAxis: {
              type: 'category',
              //地图Y坐标变量
              data:Yprovincial,
              axisTick:{
                show:false
              },
              axisLine:{
                show:true,
                lineStyle:{
                  color:'white'
                }
              },
              axisLabel:{
                show:true,
                color:'white'
              }
  
        },
        series:seriesList
     }
   } 
  }

}
</script>

<style scoped>
#chart_box {
  width: 1173px;
  height: 712px;
  /* background-color: #232323; */
  /* margin-top: 30px;
  margin-left: 38px; */
}
</style>