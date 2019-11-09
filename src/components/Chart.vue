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
    // drawCity(newValue,oldValue){
    //   // console.log('chart检测城市',this.drawCity)
    //   this.List = this.drawCity
    //   for(let i = 0; i<this.drawCity; i++){
    //     this.List.push(this.drawCity[i])
    //   }
    //   // console.log('List',this.List)
    //   this.initChart()      
    // },
    // drawProvincial(newValue,oldValue){
    //   // console.log('chart检测省份',this.drawProvincial)
    //   this.List = this.drawProvincial
    //   for(let i = 0; i<this.drawProvincial; i++){
    //     this.List.push(this.drawProvincial[i])
    //   }
    //   console.log('List',this.List)
    //   this.initChart()
    // },
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
  mounted(){
  //  this.provincialTotal = this.drawEchartRequestList
  //  this.getBrand()
   this.initChart()
   console.log('this.provincialTotal',this.provincialTotal)
  },
  methods:{
   //请求后台品牌
  //  getBrand(){
  //     let ContentType ='text/plain'
  //     let Authorization ='token'
  //     let country = this.drawValueCountry
  //     indexModel.getChartList(country)
  //     .then(res=>{
  //       let date = res.data.data.brand
  //       let all = res.data.data
  //       console.log('请求原始值',all)
  //       let chartBrandList = []
  //       for(let i =0; i< date.length; i++){
  //          chartBrandList.push({name:date[i].brand})
  //       }
  //       console.log('chartBrand-30',chartBrandList)
  //       this.$store.commit("succession/setBrandList",chartBrandList)
  //       this.provincialTotal = res.data.data.developedProvince
  //       console.log('请求原始值this.provincialTotal',this.provincialTotal)
  //       this.initChart()
  //     })     
  //  },
   initChart(){
      // console.log('chart列表-32',this.drawProvincial,this.List)
      let Yprovincial = this.List
      // let Yprovincial =[]
      // for(let i=0; i<this.drawEchartRequestList.length;i++){
      //   Yprovincial.push(this.drawEchartRequestList[i].province)
      // }
      let drawBrandList = this.drawBrandList
      let provincialTotal = this.provincialTotal
      let seriesColor = ['#005F64','#00838F','#0097A7','#00ADC1','#00ADC1','#24C5DA','#4CCFE1','#80DEEA','#B2EAF2']
      let seriesList = []
      let total=[]
      console.log('Yprovincial',Yprovincial) 
      console.log('drawBrandList',drawBrandList)
      for(let j=0;j<drawBrandList.length;j++){
        total.push([])
        //历遍请求品牌
        for(let m=j;m<total.length;m++){
          //历遍省份
          for(let z=0;z<Yprovincial.length;z++){
            //历遍数据
            for(let k=0; k<provincialTotal.length;k++){
              if(Yprovincial[z]==provincialTotal[k].province){
                for(let n=0;n<provincialTotal[k].brands.length;n++){
                  if(drawBrandList[j].name==provincialTotal[k].brands[n].brand){
                      total[m].push(provincialTotal[k].brands[n].total)
                  }
                }
              }
            }
          }
        }
      }
      console.log('total',total)
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
            // data: [320, 302, 301,678,900 ]
            data:total[i]
        })
      }
      
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
              // data:[
              //   {name:'全部'},
              //   {name:'璞素'},
              //   {name:'0769'},
              //   {name:'慕思家纺'},
              //   {name:'慕思儿童'},
              //   {name:'慕思助眠'},
              //   {name:'3D'},
              //   {name:'苏斯'},
              //   {name:'V6'},
              //   {name:'名品汇'},
              //   {name:'兰博基尼'},
              //   {name:'歌蒂娅'},
              //   {name:'凯奇'},
              // ]
        },
        grid: {
              left: '1%',
              right: '3%',
              bottom: '1%',
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
        // series: [
        //       {
        //         name: '全部',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight',
        //             }
        //         },
        //         itemStyle:{
        //           color:'#005F64'
        //         },
        //         data: [320, 302, 301, 334, ]
        //       },
        //       {
        //         name: '璞素',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight'
        //             }
        //         },
        //         itemStyle:{
        //           color:'#00838F'
        //         },
        //         data: [120, 132, 101,990 ]
        //       },
        //       {
        //         name: '0769',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight'
        //             }
        //         },
        //         itemStyle:{
        //           color:'#0097A7'
        //         },
        //         data: [220, 182, 191, 234, ]
        //       },
        //       {
        //         name: '慕思家纺',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight'
        //             }
        //         },
        //          itemStyle:{
        //           color:'#00ADC1'
        //         },
        //         data: [150, 212, 201, 154, ]
        //       },
        //       {
        //         name: '慕思儿童',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight'
        //             }
        //         },
        //         itemStyle:{
        //           color:'#00BCD5'
        //         },
        //         data: [820, 832, 901, 934]
        //       },
        //       {
        //         name: '慕思助眠',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight'
        //             }
        //         },
        //         itemStyle:{
        //           color:'#24C5DA'
        //         },
        //         data: [820, 832, 901, 934, ]
        //       },
        //       {
        //         name: '3D',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight'
        //             }
        //         },
        //         itemStyle:{
        //           color:'#4CCFE1'
        //         },
        //         data: [820, 832, 901, 934, ]
        //       },
        //       {
        //         name: '苏斯',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight'
        //             }
        //         },
        //         itemStyle:{
        //           color:'#80DEEA'
        //         },
        //         data: [820, 832, 901, 934]
        //       },
        //       {
        //         name: 'V6',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight'
        //             }
        //         },
        //         itemStyle:{
        //           color:'#B2EAF2'
        //         },
        //         data: [820, 832, 901, 934]
        //       },
        //       {
        //         name: '名品汇',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight'
        //             }
        //         },
        //         itemStyle:{
        //           color:'#E1F7FA'
        //         },
        //         data: [820, 832, 901, 934]
        //       },
        //       {
        //         name: '兰博基尼',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight'
        //             }
        //         },
        //         itemStyle:{
        //           color:'#C5CCD2'
        //         },
        //         data: [820, 832, 901, 934]
        //       },
        //       {
        //         name: '歌蒂娅',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight'
        //             }
        //         },
        //         itemStyle:{
        //           color:'#005F64'
        //         },
        //         data: [820, 832, 901, 934]
        //       },
        //       {
        //         name: '凯奇',
        //         type: 'bar',
        //         stack: '总量',
        //         label: {
        //             normal: {
        //                 position: 'insideRight'
        //             }
        //         },
        //         itemStyle:{
        //           color:'#525252'
        //         },
        //         data: [820, 832, 901, 934]
        //       }
        // ] 
     }
   } 
  }

}
</script>

<style scoped>
#chart_box {
  width: 1173px;
  height: 712px;
  background-color: #232323;
  /* margin-top: 30px;
  margin-left: 38px; */
}
</style>