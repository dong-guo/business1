<template>
  <div id="country_box">
</div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";

import { mapState } from "vuex";


import cricleIcon from "../base64/cricle";
import threadIcon from "../base64/thread";
import thread2Icon from "../base64/thread2";
import newsIcon from "../base64/news";
import formatterLeftAngleIcon from "../base64/formatterLeftAngle";

import { IndexModel } from '../untils/index'
const indexModel = new IndexModel()

export default {
  name: "country",
  data() {
    return {
      content:[
      ]
    };
  },
  computed:{
    ...mapState({
      drawProvincialList: state =>state.country.provincialList,

      drawCountryChange: state => state.home.countryChange,
      drawCountryEnglishChange: state => state.home.countryEnglishChange,
      drawProvincialChange: state => state.home.provincialChange,
      drawLetterName: state => state.home.letterName,
      drawChinaName: state => state.home.chinaName,
      drawCountry: state => state.home.country,
      drawCountryZoom: state => state.home.countryZoom
    })
  },
  mounted() {
    this.content = this.drawProvincialList
    // this.getCountryList()
    this.getCountryMap()
    // this.plain1().then(this.plain2)
  },
  watch:{
    drawProvincialList(newValue,oldValue){ 
      this.content = this.drawProvincialList   
      // this.getCountryList() 
      this.getCountryMap()
    },
    drawCountryZoom(newValue,oldValue){
      this.getCountryMap()
    }
  },
  methods: {
    //该请求数据函数转移到china主页上,不用
    getCountryList(){
      let [contentType,Authorization,country] = ['text/plain','token','']
      for(let i = 0; i<this.drawCountry.length; i++){
        if(this.drawCountryChange == this.drawCountry[i].EnglishName){
           country = this.drawCountry[i].ChinaName
        }
      }
      indexModel.getProvincialList(country)
      .then(res=>{
        let provincialList = res.data.data
        // console.log('provincialList中国数据',provincialList)
        this.content = provincialList
        this.getCountryMap()
      })
    },
    //初始化国家地图函数
    getCountryMap(){
      let[country,content,countryZoom]  = [this.drawCountryChange,this.content,this.drawCountryZoom]
      // console.log('初始化国家地图参数country,content:',country,content)
      axios.get(`./geoJson/country/${country}.json`)
      .then(res => {
        let countryJson = res.data;
        echarts.registerMap("China", countryJson);
        this.myEcharts = echarts.init(document.getElementById("country_box"));
        let option = this.countryOption(content,newsIcon,countryZoom);
        this.myEcharts.setOption(option);
        //跳转到省内地图
        this.jumpProvincial()
      })
    },
    //跳转地图函数
    jumpProvincial(){
        this.myEcharts.on('click',param =>{
          let[provincial,letterName,chinaName] = [param.name,this.drawLetterName,this.drawChinaName]
          console.log('param',provincial)           
            for(let i = 0; i<chinaName.length; i++){
              if(provincial==chinaName[i]){
                this.$store.commit("home/setProvincialChange", letterName[i]);
                this.$store.commit("home/setProvincialChinaChange",param.name)
                this.$router.push({ name: "provincial" });
                // console.log('传入vuex省份',letterName[i])
                // this.$router.push(route).catch(err=>{
                //   console.log('输出报错',err)
                // })
              }
            }
        })
    },
    //国家地图样式配置
    countryOption(content,newsIcon,countryZoom) {
      return {
          tooltip:{
              trigger:'item',
              padding:20,
              position:'right',
              // borderColor:'red',
              formatter:function(params){
                // console.log(999,params.name)
                // console.log(998,content)
                let name=''
                for(let i=0; i<content.length; i++){
                  //c处理最后一位带省去掉省
                  let lastString = content[i].province.charAt(content[i].province.length-1)
                  if(lastString == '省'||lastString == '市'){
                    name = content[i].province.substring(0,content[i].province.length-1)
                  } else if (content[i].province == '内蒙古自治区'){
                    name = '内蒙古'
                  }else if (content[i].province == '西藏自治区'){
                    name = '西藏'
                  }else if(content[i].province == '广西壮族自治区'){
                    name = '广西'
                  } else if(content[i].province == '宁夏回族自治区'){
                    name = '宁夏'
                  }else if(content[i].province == '香港特别行政区'){
                    name = '香港'
                  }else if(content[i].province == '澳门特别行政区'){
                    name = '澳门'
                  }else if(content[i].province == '新疆维吾尔自治区'){
                    name = '新疆'
                  }else{
                    name = content[i].province
                  }
                  if(params.name == name){
                    console.log('所处于位置直辖市',content[i])
                    console.log('所处于位置',content[i].brands.length,name)
                    let arr = content[i].brands.split(",")
                    let brand = '品牌加盟：'
                    for(let i=0;i<arr.length;i++){
                      brand += arr[i].toString()+','
                      if(brand.length-20>0&& i<5){
                        brand += '<br/>'
                      }
                    }          
                    let res =`<img style='width:410px; height:160px;margin:-25px -25px -25px -25px; display:block;' src='${newsIcon}'/>`
                    res +=`<img style='width:30px; height:30px; position:absolute; display:block; left:-10px; top:-10px; ' src='${formatterLeftAngleIcon}'/>`
                    res +=`<img style='width:30px; height:30px; position:absolute; display:block; right:-10px; top:-10px; transform:rotate(90deg) ' src='${formatterLeftAngleIcon}'/>`
                    res +=`<img style='width:30px; height:30px; position:absolute; display:block; left:-10px; bottom:-10px; transform:rotate(-90deg) ' src='${formatterLeftAngleIcon}'/>`
                    res +=`<img style='width:30px; height:30px; position:absolute; display:block; right:-10px; bottom:-10px; transform:rotate(180deg) ' src='${formatterLeftAngleIcon}'/>`
                    res += 
                    `<div style ='position:absolute; letf:0px; top:0px; width:400px; height:auto; padding:20px;' >
                        <p style ='margin-left:-15px;height:36px;'>门店数量：${content[i].shopNumber}</p>
                        <p style ='margin-left:-15px;height:36px;'>${brand}</p>
                    </div>`
                    return res            
                  }
                }
              },    
              // formatter:function(params){
              //   console.log('formatter',params)
              //   // let res =`<img style='width:250px; height:150px;margin:-20px -20px -20px -20px;' src='${newsIcon}'/>`
              //   let res = ''
              //   res +=
              //   `<div style='position:absolute; top:0; left:0px;width:300px; height:150px; background-image:url(${newsIcon});background-size:contain;background-repeat:no-repeat;'>
              //     <p>${params.name}</p>
              //     <p>pu</p>
              //   </div>`
              //   return res;
              // },
              textStyle:{
                color:'rgba(122,180,251,1)',
                // color:'yellow',
                fontWeight:400,
                fontSize:20,
              },
          },
          series:[
              {
                type:'map',
                map:'China',
                // geoIndex:0,
                roam:'move',
                data:content,
                // zoom:1.25,
                zoom:countryZoom,
                emphasis:{
                  label:{
                    show:true,
                    color:'#000001',
                  },
                  itemStyle:{
                    areaColor:'#33D3F6'
                  }
                },
                label:{
                  show:true,
                  color:'#33D3F6',
                  fontSize:20,
                },
                itemStyle:{
                  areaColor:'#00083B',
                  borderType:'solid',
                  borderWidth:2,
                  borderColor:'#283777',
                }
              },
          ]
      };
    }
  }
};
</script>

<style scoped>
#country_box {
  background-color:linear-gradient(0deg,rgba(1,9,40,1),rgba(0,8,73,1));
  width: 1102px;
  height: 836px;
  /* border:1px solid yellow; */
}
.bg-img{
  background-image:url(../assets/images/news@2x.png);
  height:100px;
  width:200px;
  border:1px solid yellow;
}
</style>