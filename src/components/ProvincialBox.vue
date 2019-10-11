<template>
<div id="provincialBox">
</div>

</template>
<script>
import axios from "axios";
import echarts from "echarts";

import { mapState } from "vuex";

export default {
   name:'provincialBox',
   data(){
     return{
       developedCity:['云浮市','广州市','深圳市','佛山市','东莞市'],
       incompleteCity:['惠州市','中山市','珠海市','江门市']
     }
   },
   computed:{
     ...mapState({
       drawProvincialChange: state => state.home.provincialChange,
     })
   },
   mounted(){
      let provincialChange = this.drawProvincialChange
      console.log('provincialChange',this.drawProvincialChange)
      axios.get(`./geoJson/province/${provincialChange}.json`)
      .then(res => {
        let provincialChangeJson = res.data;
        echarts.registerMap("provincialChange", provincialChangeJson);
        this.myEcharts = echarts.init(document.getElementById("provincialBox"));
        let option = this.provincialOption();
        this.myEcharts.setOption(option);
      })  
   },
   methods:{
     provincialOption(){
       return{
          tooltip:{
            show:true,
            triger:'item',
            borderWidth:2,
            formatter:[
             "招商经理：刘建军" +'<br/>'+
             "联系电话：13412345678"+'<br/>'+
             "负责区域：青海、西藏、内蒙古、山西"
           ].join("\n"),
          },
          geo: {
            type: "map",
            map: "provincialChange",
            zoom: 0.9,
            top: "1px",
            itemStyle: {
              areaColor: "#00083C",
              borderColor: "#2B3A7C",
              borderType:'solid',
              borderWidth:3,
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
            }
          },
          series:[
            {
              // name:'provincialChange',
              type:'scatter',
              coordinateSystem: "geo",
              data:[
                  {
                    value:[113,22.5],
                    symbol:'circle',
                    symbolSize: 20,
                    itemStyle:{
                      color:'#EEC947'
                    }
                  },
                  {
                    value:[115,23.5],
                    symbol:'circle',
                    symbolSize: 20,
                    itemStyle:{
                      color:'#2CC68B'
                    }
                  },
              ]
            },
            {
              type:'map',
              name:'provincialChange',
              symbolSize:'pin',
              symbolSize:50,
              label:{
                show:true,
                textStyle:{
                  color:'yellow'
                }
              },
              emphasis:{
                show:true,
                textStyle:{
                  color:'yellow',
                }
              }
            }
          ]
        };
      
     }
   }
}
</script>

<style scoped>
#provincialBox{
  height: 717px;
  width: 929px;
  border:1px solid yellow;
  /* background-color:yellow; */
}
</style>