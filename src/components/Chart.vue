<template>
  <div id="chart_box"></div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";
import { mapState } from "vuex"

export default {
  name:'chart',
  data() {
    return {
      myEcharts: null
    };
  }, 
  computed: {
    ...mapState({
      drawProvincial: state => state.succession.provincial
    })
  }, 
  mounted(){
    let Yprovincial=this.drawProvincial
    this.myEcharts = echarts.init(document.getElementById("chart_box"));
    let option = this.chartOption(Yprovincial);
    this.myEcharts.setOption(option);
  },
  methods:{
   chartOption (Yprovincial) {
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
              data:[
                {name:'全部'},
                {name:'璞素'},
                {name:'0769'},
                {name:'慕思家纺'},
                {name:'慕思儿童'},
                {name:'慕思助眠'},
                {name:'3D'},
                {name:'苏斯'},
                {name:'V6'},
                {name:'名品汇'},
                {name:'兰博基尼'},
                {name:'歌蒂娅'},
                {name:'凯奇'},
              ]
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
        series: [
              {
                name: '全部',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight',
                    }
                },
                itemStyle:{
                  color:'#005F64'
                },
                data: [320, 302, 301, 334, 390, 330, 320,100]
              },
              {
                name: '璞素',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                itemStyle:{
                  color:'#00838F'
                },
                data: [120, 132, 101, 134, 90, 230, 0,900]
              },
              {
                name: '0769',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                itemStyle:{
                  color:'#0097A7'
                },
                data: [220, 182, 191, 234, 290, 330, 310,50]
              },
              {
                name: '慕思家纺',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                 itemStyle:{
                  color:'#00ADC1'
                },
                data: [150, 212, 201, 154, 190, 330, 410,15]
              },
              {
                name: '慕思儿童',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                itemStyle:{
                  color:'#00BCD5'
                },
                data: [820, 832, 901, 934, 1290, 1330, 132,55]
              },
              {
                name: '慕思助眠',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                itemStyle:{
                  color:'#24C5DA'
                },
                data: [820, 832, 901, 934, 0, 130, 132,87]
              },
              {
                name: '3D',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                itemStyle:{
                  color:'#4CCFE1'
                },
                data: [820, 832, 901, 934, 1290, 1330, 132,500]
              },
              {
                name: '苏斯',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                itemStyle:{
                  color:'#80DEEA'
                },
                data: [820, 832, 901, 934, 1290, 1330, 120,800]
              },
              {
                name: 'V6',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                itemStyle:{
                  color:'#B2EAF2'
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320,150]
              },
              {
                name: '名品汇',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                itemStyle:{
                  color:'#E1F7FA'
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320,901]
              },
              {
                name: '兰博基尼',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                itemStyle:{
                  color:'#C5CCD2'
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320,76]
              },
              {
                name: '歌蒂娅',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                itemStyle:{
                  color:'#005F64'
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320,95]
              },
              {
                name: '凯奇',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                itemStyle:{
                  color:'#525252'
                },
                data: [820, 832, 901, 934, 1290, 1330, 13,799]
              }
        ] 
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