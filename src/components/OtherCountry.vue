<template>
<div id="otherCountry" :style='otherCountryStyle'>
</div>

</template>
<script>
import axios from "axios";
import echarts from "echarts";

import { mapState } from "vuex";

import greenballoonIcon from "../base64/greenballoon";
import yellowballoonIcon from "../base64/yellowballoon";
import newsIcon from "../base64/news";
import formatterleftIcon from "../base64/formatterleft";
import formatterrightIcon from "../base64/formatterright";
import formatterLeftAngleIcon from "../base64/formatterLeftAngle";

import { IndexModel } from '../untils/index'
const indexModel = new IndexModel()

export default {
  name:'othercountry',
  data(){
    return{
      boxKey:true,
      content:[],
      otherShopList:[],
      otherCountryStyle:{
          "width": "1312px",
          "height": "736px",
          "padding-left":"0px",
          "background-color":"linear-gradient(0deg,rgba(1,9,40,1),rgba(0,8,73,1))",
          // "border":"1px solid yellow",
      }
    }
  },
  computed:{
    ...mapState({
      drawProvincialList: state =>state.country.provincialList,

      drawCountryChange: state => state.home.countryChange,
      drawOtherCountryChange: state => state.home.otherCountryChange,
      drawCountry: state => state.home.country,
      drawCountryBoxMapKey:state=>state.country.countryBoxMapKey,

      drawOtherList: state => state.country.otherList,
    })
  },
  mounted() {
    // this.content = this.drawProvincialList
    // this.getCountryMap()
    console.log('现在是什么国家drawCountry',this.drawCountryChange,this.otherShopList)
    // this.getCountryList()
    this.judgeCountry()
    // this.activeCountryMap()
  },
  watch:{
    drawProvincialList(newValue,oldValue){ 
      this.content = this.drawProvincialList
      this.otherShopList = this.drawOtherList.shopList
      // console.log('Couuntry主页传递过来的数据-otherCountry检测',this.content)
      // console.log('Couuntry主页传递过来的数据-otherShopList检测',this.otherShopList)    
      this.getCountryMap()
    },
  },
  methods:{
    activeCountryMap(){
      if(this.drawCountryChange != 'China'){
        this.judgeCountry()
      }
    },
    //判断是什么国家更改样式容器大小
    judgeCountry(){
      if(this.drawCountryChange == 'Australia'||this.drawCountryChange == 'India'){
        this.otherCountryStyle.width = '900px'
        this.otherCountryStyle.paddingLeft = '270px'
        this.content = this.drawProvincialList
        this.getCountryMap()
        // console.log('成功执行')
      }else{
        this.content = this.drawProvincialList
        this.getCountryMap()
        // console.log('失败执行')
      }      
    },
    //初始化地图
    getCountryMap(){
      let [country,list,grade,balloonList] = [this.drawCountryChange,this.content,[],this.otherShopList]
      // console.log(110,country,this.content)
      // console.log(120,country,balloonList)
      //设定已开发蓝色州
      this.gradeOtherCountryProvincial(grade,list)
      // console.log('grade',grade)
      // console.log('list',list)
      axios.get(`./geoJson/country/${country}.json`).then(res => {
        let countryJson = res.data;
        let gradeBalloon = this.gradeBalloon()
        echarts.registerMap("China", countryJson);
        this.myEcharts = echarts.init(document.getElementById("otherCountry"));
        let option = this.countryOption(grade,list,gradeBalloon);
        this.myEcharts.setOption(option);
      });
    },
    //Echarts配置地图
    countryOption(grade,list,gradeBalloon) {
      // console.log('222222',gradeBalloon)
      return {
        tooltip:{
            trigger:'item',
            padding:20,
            borderColor:'red',
            position:'left',
            formatter:function(params){
              let name=''
              if(params.componentSubType == 'map'){
                // console.log('params',params)
                for(let i=0; i<list.length; i++){
                  if(params.name == list[i].province){
                    // console.log('所处于位置',list[i].province)
                    let arr = list[i].brands.split(",")
                      let brand = '品牌加盟：'
                      for(let i=0;i<arr.length;i++){
                        brand += arr[i].toString()+','
                        if(brand.length-20>0&& i<5){
                          brand += '<br/>'
                        }
                    }        
                    let res =`<img style='width:400px; height:250px;margin:-25px -25px -25px -25px; display:block;' src='${newsIcon}'/>`
                    res +=`<img style='width:30px; height:30px; position:absolute; display:block; right:370px; top:-10px; ' src='${formatterLeftAngleIcon}'/>`
                    res +=`<img style='width:30px; height:30px; position:absolute; display:block; right:-10px; top:-10px; transform:rotate(90deg) ' src='${formatterLeftAngleIcon}'/>`
                    res +=`<img style='width:30px; height:30px; position:absolute; display:block; right:370px; top:220px; transform:rotate(-90deg) ' src='${formatterLeftAngleIcon}'/>`
                    res +=`<img style='width:30px; height:30px; position:absolute; display:block; right:-10px; top:220px; transform:rotate(180deg) ' src='${formatterLeftAngleIcon}'/>`
                    res += 
                    `<div style ='position:absolute; letf:0px; top:0px; width:400px; height:250px; padding:20px;' >
                        <p style ='margin-left:-15px;height:36px;'>招商经理：${list[i].managerName}</p>
                        <p style ='margin-left:-15px;height:36px;'>联系电话：${list[i].phone}</p>
                        <p style ='margin-left:-15px;height:36px;'>负责区域：${list[i].chargeProvince}</p>
                        <p style ='margin-left:-15px;height:36px;'>门店数量：${list[i].shopNumber}</p>
                        <p style ='margin-left:-15px;height:36px;'>${brand}</p>
                    </div>`
                    return res            
                  }
                }
              }else{
                for(let i = 0; i< gradeBalloon.length; i++){
                    let address =''
                    for(let index = 0; index<gradeBalloon.length; index++){
                      if(params.name == gradeBalloon[index].name){
                         address = gradeBalloon[index].address
                         name = gradeBalloon[index].name
                      }
                    }
                    let res = 
                      `<div style ='width:auto; height:74px;padding-top:10px; margin:-20px -20px -20px -20px; border-radius:4px; background:rgba(14,109,233,0.5); font-size:20px;' >
                            <p style ='margin-left:5px;height:36px;'>${name}</p>
                            <p style ='margin-left:5px;height:36px;'>地址：${address}</p>
                      </div>`
                      res += `<img style='width:21px; height:94px; position:absolute; top:-5px; left:-15px;' src='${formatterleftIcon}'/>`
                      res += `<img style='width:21px; height:94px; position:absolute; top:-5px; right:-15px;' src='${formatterrightIcon}'/>`
                    return res
                }                
              }
            },    
            textStyle:{
              color:'rgba(122,180,251,1);',
              fontSize:20,
            },
        },        
        geo: {
          type: "map",
          map: "China",
          zoom: 1,
          right: "1px",
          top: "50px",
          left: "1px",
          bottom: "1px",
          itemStyle: {
            areaColor: "#010933",
            borderColor: "#2B3A7C",
            borderType:'solid',
            borderWidth:3,
          },
          label:{
            show:true,
            fontSize:12,
            align:'center',
            color:'#33D8FA',
            position:[10,10],
            distance:55,
          },
          regions:grade,
          emphasis:{
            label:{
              show:true,
              color:'green'
            },
            itemStyle:{
              areaColor:'#dcf5fa',
            }
          },
        },
        series:[
            {
              type:'map',
              map:'provincialChange',
              coordinateSystem: "geo",
              geoIndex:0,
              data:list,
            },
            {
              type:'scatter',
              coordinateSystem: "geo",
              symbolOffset:[0,'-50%'],
              data:gradeBalloon,
              itemStyle:{
                opacity:0.6
              },
              emphasis:{
                itemStyle:{
                  opacity:1
                },                
              }
            },            
        ]
      };
    },
    //外国各州开发程度颜色表示
    gradeOtherCountryProvincial(grade,list){
      for(let i= 0; i<list.length;i++){
        grade.push({
          name: list[i].province,
          selected: false,
          label:{
            color:'#000001',
          },
          itemStyle: { areaColor: "#33D8FA" }
        })    
      }
      return grade
    },
    gradeBalloon(){
       let balloon = []
      //  console.log('this.otherShopList',this.otherShopList)
       let list = this.otherShopList
          // console.log('气球待处理数据',list)
          for(let i=0; i< list.length; i++){
              if(list[i].nature =='Dealer'){
                balloon.push({
                        name:list[i].shopName,
                        address:list[i].address,
                        value:[list[i].longitude,list[i].latitude],
                        symbol:`image://${yellowballoonIcon}`,
                        symbolSize: [16,20],
                        itemStyle:{
                          color:'#EEC947'
                        }
                })
                }else{
                balloon.push({
                        name:list[i].shopName,
                        address:list[i].address,
                        value:[list[i].longitude,list[i].latitude],
                        symbol:`image://${greenballoonIcon}`,
                        symbolSize: [16,20],
                        itemStyle:{
                          color:'#2CC68B'
                        }
                })
              }
          }
       return balloon
    }     
  }
}
</script>

<style scoped>
#otherCountry{
  background-color:linear-gradient(0deg,rgba(1,9,40,1),rgba(0,8,73,1));
  width: 1312px;
  height: 736px;
  /* border:1px solid green; */
}
.ckangeMapBox{
  width:1000px;
  height:730px;
  border:1px solid yellow;
}
</style>