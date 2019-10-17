<template>
<div id="provincialBox">
</div>

</template>
<script>
import axios from "axios";
import echarts from "echarts";

import greenballoonIcon from "../base64/greenballoon";
import yellowballoonIcon from "../base64/yellowballoon";

import { cityMap } from "../until/cityMap.js"

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
       drawProvincialZoom: state => state.home.provincialZoom,
     })
   },
   created(){
     console.log('cityMap',cityMap)
    //  console.log(Object.keys(cityMap))
   },
   mounted(){
      // let provincialChange = this.drawProvincialChange
      // let provincialZoom = this.drawProvincialZoom
      // console.log('provincialChange',this.drawProvincialChange)
      // axios.get(`./geoJson/province/${provincialChange}.json`)
      // .then(res => {
      //   let provincialChangeJson = res.data;
      //   echarts.registerMap("provincialChange", provincialChangeJson);
      //   this.myEcharts = echarts.init(document.getElementById("provincialBox"));
      //   let option = this.provincialOption(provincialZoom);
      //   this.myEcharts.setOption(option); 
      //   this.myEcharts.on('georoam',(params)=>{
      //     this.$store.commit("home/setProvincialZoom",params.zoom);
      //     console.log('roam',params)
      //   })
      //   //地图跳转
      //   this.myEcharts.on('click',(params) =>{
      //     this.$router.push({ name: "city" });
      //   })
      // })  
      this.actionProvincial()
   },
   methods:{
     actionProvincial(){
        let provincialChange = this.drawProvincialChange
        let provincialZoom = this.drawProvincialZoom
        console.log('provincialChange',this.drawProvincialChange)
        axios.get(`./geoJson/province/${provincialChange}.json`)
        .then(res => {
          let provincialChangeJson = res.data;
          echarts.registerMap("provincialChange", provincialChangeJson);
          this.myEcharts = echarts.init(document.getElementById("provincialBox"));
          let option = this.provincialOption(provincialZoom);
          this.myEcharts.setOption(option); 
          this.myEcharts.on('georoam',(params)=>{
            this.$store.commit("home/setProvincialZoom",params.zoom);
            console.log('roam',params)
          })
          //城市地图跳转
          this.myEcharts.on('click',(params) =>{
            console.log('city',params.name)
            let cityAry = Object.keys(cityMap)
            for(let i = 0; i<cityAry.length; i++){
              if(params.name==cityAry[i]){
                //  console.log('cityMapNum',cityMap[cityAry[i]])
                 let cityname = params.name
                 let city = cityname.substr(0,cityname.length-1)
                 this.$store.commit("home/setCityChange",cityMap[cityAry[i]])
                 this.$store.commit("home/setCityChinaChange",city)
                 this.$router.push({ name: "city" });
              }
            }
          })
        }) 
      },
     provincialOption(provincialZoom){
       return{
          tooltip:{
            show:true,
            triger:'item',
            borderWidth:2,
          //   formatter:[
          //    "招商经理：刘建军" +'<br/>'+
          //    "联系电话：13412345678"+'<br/>'+
          //    "负责区域：青海、西藏、内蒙古、山西"
          //  ].join("\n"),
          formatter:'{a}',
            textStyle:{
                  color:'#fff',
                  fontSize:20,
            }
          },
          geo: {
            type: "map",
            map: "provincialChange",
            // roam:true,
            // scaleLimit:{
            //   min:0.6,
            //   max:2,
            // },
            zoom: provincialZoom,
            top: "1px",
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
            regions:[
              {
                name:'韶关市',
                itemStyle:{
                  areaColor:'#AC4ED3',
                  color:'white',
                },
                label:{
                  color:'white',
                }
              },
              {
                name:'广州市',
                itemStyle:{
                  areaColor:'#33D8FA',
                },
                label:{
                  color:'#000001',
                }                
              }
            ],
          },
          series:[
            {
              // name:'provincialChange',
              type:'scatter',
              coordinateSystem: "geo",
              data:[
                  {
                    value:[113,22.5],
                    symbol:`image://${yellowballoonIcon}`,
                    symbolSize: [32,40],
                    itemStyle:{
                      color:'#EEC947'
                    }
                  },
                  {
                    value:[114,25],
                    symbol:`image://${greenballoonIcon}`,
                    symbolSize: [32,40],
                    itemStyle:{
                      color:'#2CC68B'
                    }
                  },
              ]
            },
            {
              type:'map',
              map:'provincialChange',
              geoIndex:0,
              // zoom:0.9,
              // top: "1px",
              // emphasis:{
              //   label:{
              //     show:true,
              //     color:'#000001'
              //   },
              //   itemStyle:{
              //     areaColor:'#33D3F6'
              //   }
              // },
              // label:{
              //   show:true,
              //   color:'#33D3F6'
              // },
              // itemStyle:{
              //   areaColor:'#00083B',
              //   borderType:'solid',
              //   borderWidth:2,
              //   borderColor:'#283777',
              // }
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