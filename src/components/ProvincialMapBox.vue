<template>
<div id="provincialBox">
</div>

</template>
<script>
import axios from "axios";
import echarts from "echarts";

import greenballoonIcon from "../base64/greenballoon";
import yellowballoonIcon from "../base64/yellowballoon";
import newsIcon from "../base64/news";
import formatterleftIcon from "../base64/formatterleft";
import formatterrightIcon from "../base64/formatterright";

import { IndexModel } from '../untils/index'
const indexModel = new IndexModel()

import { cityMap } from "../until/cityMap.js"

import { mapState } from "vuex";

export default {
   name:'provincialMapBox',
   data(){
     return{
       developedCity:['云浮市','广州市','深圳市','佛山市','东莞市'],
       incompleteCity:['惠州市','中山市','珠海市','江门市'],
       showChinaCountry:'',
       allCityList:{},
       cityShopNumber:{},
       cityManager:{},
     }
   },
   computed:{
     ...mapState({
       drawProvincialChange: state => state.home.provincialChange,
       drawProvincialZoom: state => state.home.provincialZoom,
       drawCountryChange: state => state.home.countryChange,
       drawProvincialChinaChange: state => state.home.provincialChinaChange,
       drawCountry: state => state.home.country
     })
   },
   watch:{
       drawProvincialZoom:{
         handler(newVal,oldVal){
           this.actionProvincial()
         },
         deep:true
       }
   },
   mounted(){
      this.matchingCountry()
      this.requestCityList()
      // this.actionProvincial()
   },
   methods:{
     //请求省内经销商数据
     requestCityList(){
       let country = this.showChinaCountry
       let province = this.drawProvincialChinaChange + '省'
       indexModel.getCityList(country,province)
       .then(res=>{
         console.log('res.data',res.data)
           if(res.data.status == 1 ){
            this.allCityList = res.data.data
            console.log('allCityList',this.allCityList)
            this.cityShopNumber = this.allCityList.shopTypeCount[0]
            this.cityManager = this.allCityList.manager
            this.$store.commit("provincial/setCityShopNumber",this.cityShopNumber)
            this.$store.commit("provincial/setAllCityList",this.allCityList)
            this.$store.commit("provincial/setCityManager",this.cityManager)
            //  console.log('cityList',this.allCityList,country,province)
            this.actionProvincial()
            console.log('cityShowNumber',this.cityShopNumber)
           } else {
            this.actionProvincial()
           }
       })
     },
     //初始化省地图
     actionProvincial(){
        let provincialChange = this.drawProvincialChange
        let provincialZoom = this.drawProvincialZoom
        let cityBrandList = this.allCityList.cityList
        // console.log('provincialChange',this.drawProvincialChange)
        // console.log('cityBrandList转化嵌套',cityBrandList)
        axios.get(`./geoJson/province/${provincialChange}.json`)
        .then(res => {
          let developCity=this.gradeCity()
          let gradeBalloon = this.gradeBalloon()
          // console.log('66气球数据',gradeBalloon)
          let provincialChangeJson = res.data;
          echarts.registerMap("provincialChange", provincialChangeJson);
          this.myEcharts = echarts.init(document.getElementById("provincialBox"));
          let option = this.provincialOption(provincialZoom,cityBrandList,developCity,gradeBalloon);
          this.myEcharts.setOption(option); 
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
     //地图配置
     provincialOption(provincialZoom,cityBrandList,developCity,gradeBalloon){
       return{
          tooltip:{
            show:true,
            triger:'item',
            formatter:function(params){
              // console.log('555',params.name)
              // console.log('999',cityBrandList)
              //判断是鼠标所在点是地图还是散点图
              if(params.componentSubType == 'map'){
                // console.log('929',cityBrandList)
                let brandListArray = []
                for(let i = 0; i<cityBrandList.length; i++){
                    brandListArray = cityBrandList[i].brandList
                    if (params.name == cityBrandList[i].city){
                          let list =[]
                          for(let index=0; index<brandListArray.length; index++){
                            // console.log('cityBrandList.brandList.city',brandListArray)
                            list += `<p style ='margin-left:5px;height:36px;'>${brandListArray[index].brand}：${brandListArray[index].total}</p>`
                          }
                          if(brandListArray.length >0){
                              let res =`<img style='width:280px; height:300px;margin:-10px -10px -10px -10px; display:block;' src='${newsIcon}'/>`
                              res += 
                                  `<div style ='position:absolute; letf:0px; top:0px; width:280px; height:206px;padding-top:10px; font-size:20px;' >
                                        <p style ='margin-left:5px;height:36px;'>${params.name}</p>
                                        ${list}
                                  </div>`    
                              return res 
                          } else{
                              let res = `<img style='width:280px; height:100px;margin:-10px -10px -10px -10px; display:block;' src='${newsIcon}'/>`
                              res += 
                                  `<div style ='position:absolute; letf:0px; top:0px; width:280px; height:100px;padding-top:10px; font-size:20px;'>
                                    <p style ='margin-left:5px;height:36px;'>${params.name}</p>
                                    <p style ='margin-left:5px;height:36px;'>暂无数据</p>
                                  </div>`
                               return res
                          }
                    }
                }
              } else {          
                for(let i = 0; i<cityBrandList.length; i++){
                    // let res = `<img style='width:230px; height:206px;margin:-10px -10px -10px -10px; display:block;' src='${newsIcon}'/>`
                    let address =''
                    for(let index = 0; index<gradeBalloon.length; index++){
                      if(params.name==gradeBalloon[index].name){
                         address = gradeBalloon[index].address
                      }
                    }
                    let res = 
                      `<div style ='width:auto; height:74px;padding-top:10px; margin:-5px -5px -5px -5px; border-radius:4px; background:rgba(14,109,233,0.5); font-size:20px;' >
                            <p style ='margin-left:5px;height:36px;'>${params.name}</p>
                            <p style ='margin-left:5px;height:36px;'>地址：${address}</p>
                      </div>`
                      res += `<img style='width:21px; height:94px; position:absolute; top:-5px; left:-15px;' src='${formatterleftIcon}'/>`
                      res += `<img style='width:21px; height:94px; position:absolute; top:-5px; right:-15px;' src='${formatterrightIcon}'/>`
                    return res
                }
              }

            },
            textStyle:{
                  color:'#fff',
                  fontSize:10,
            }
          },
          geo: {
            type: "map",
            map: "provincialChange",
            roam:'move',
            scaleLimit:{
              min:0.6,
              max:2,
            },
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
                // areaColor:'rgba(51,216,250,1)',
                areaColor:'rgba(56,166,200,1)'
              }
            },
            regions:developCity
          },
          series:[
            {
              // name:'provincialChange',
              type:'scatter',
              coordinateSystem: "geo",
              data:gradeBalloon,
            },
            {
              type:'map',
              map:'provincialChange',
              coordinateSystem: "geo",
              geoIndex:0,
              data:cityBrandList,
            }
          ]
        };
      
     },
     //国家中英文转换
     matchingCountry(){
        for(let i = 0; i<this.drawCountry.length; i++){
            if(this.drawCountryChange==this.drawCountry[i].EnglishName){
              this.showChinaCountry = this.drawCountry[i].ChinaName
            }
        }
     },
     //城市区分开发程度函数
     gradeCity(){
       let list = this.allCityList.cityList
       let grade =[]
       for(let i = 0; i < list.length; i++){
          if(list[i].developFlag == 0){
            grade.push({
                name:list[i].city,
                itemStyle:{
                  areaColor:'#33D8FA',
                },
                label:{
                  color:'#000001',
                }
            })
          }else if(list[i].developFlag == 1){
            grade.push({
                name:list[i].city,
                itemStyle:{
                  areaColor:'#AC4ED3',
                  color:'white',
                },
                label:{
                  color:'white',
                },
            })
          }
       }
       return grade
     },
     //气球商店区分函数
     gradeBalloon(){
       let list = this.allCityList.cityList
       let balloon = []
       for(let i=0; i<list.length; i++){
         if(list[i].shopList.length > 0){
            for(let index=0; index<list[i].shopList.length;index++){
              if(list[i].shopList[index].city =='佛山市'){
                balloon.push({
                        name:list[i].shopList[index].address,
                        address:list[i].shopList[index].address,
                        value:[114-index+6,24],
                        symbol:`image://${yellowballoonIcon}`,
                        symbolSize: [32,40],
                        itemStyle:{
                          color:'#EEC947'
                        }
                })
                }else{
                balloon.push({
                        name:list[i].shopList[index].address,
                        address:list[i].shopList[index].address,
                        value:[112.5-index+6,22],
                        symbol:`image://${greenballoonIcon}`,
                        symbolSize: [32,40],
                        itemStyle:{
                          color:'#2CC68B'
                        }
                })
              }
            }
         }
       }
       return balloon
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