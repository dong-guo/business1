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
      drawCountry: state => state.home.country
    })
  },
  mounted() {
    // this.content = this.drawProvincialList
    // this.getCountryMap()
    console.log('现在是什么国家drawCountry',this.drawCountryChange,this.boxKey)
    // this.getCountryList()
    this.judgeCountry()
  },
  watch:{
    drawProvincialList(newValue,oldValue){ 
      this.content = this.drawProvincialList
      console.log('Couuntry主页传递过来的数据-otherCountry检测',this.content)    
      this.getCountryMap()
    },
    drawCountry(newValue,oldValue){
      this.content = this.drawProvincialList
      this.getCountryMap()
    },
    //监视什么国家英文名
    drawCountryChange(newValue,oldValue){
      console.log('监视',this.drawCountryChange)
      this.judgeCountry()
    }
  },
  methods:{
    //初始化地图
    getCountryMap(){
      let [country,list,grade] = [this.drawCountryChange,this.content,[]]
      // console.log(110,country)
      //设定已开发蓝色州
      this.gradeOtherCountryProvincial(grade,list)
      console.log('grade',grade)
      console.log('list',list)
      axios.get(`./geoJson/country/${country}.json`).then(res => {
        let countryJson = res.data;
        echarts.registerMap("China", countryJson);
        this.myEcharts = echarts.init(document.getElementById("otherCountry"));
        let option = this.countryOption(grade,list);
        this.myEcharts.setOption(option);
      });
    },
    //Echarts配置地图
    countryOption(grade,list) {
      return {
        tooltip:{
            trigger:'item',
            padding:20,
            borderColor:'red',
            position:'left',
            formatter:function(params){
              let name=''
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
            }
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
    //判断是什么国家
    judgeCountry(){
      if(this.drawCountryChange == 'Australia'||this.drawCountryChange == 'India'){
        this.otherCountryStyle.width = '1000px'
        this.otherCountryStyle.paddingLeft = '250px'
        this.content = this.drawProvincialList
        this.getCountryMap()
        console.log('成功执行')
      }else{
        this.content = this.drawProvincialList
        this.getCountryMap()
        console.log('失败执行')
      }      
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