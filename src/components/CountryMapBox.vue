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

import { IndexModel } from '../untils/index'
const indexModel = new IndexModel()

export default {
  name: "country",
  data() {
    return {
      content:[
        // {
        //   'name':'广东',
        //   'value':[113.5,23.5],
        //   'new1':'招商经理：刘建军,青海西藏,内蒙',
        //   'new2':'联系电话：16789876565',
        //   'new3':'负责区域：青海、西藏、内蒙古',
        // },
        // {
        //   'name':'四川',
        //   'value':[100.5,43.5],
        //   'new1':'招商经理：刘笑话,',
        //   'new2':'联系电话：16789876565',
        //   'new3':'负责区域：青海、西藏、内蒙古',          
        // }
      ]
    };
  },
  computed:{
    ...mapState({
      drawCountryChange: state => state.home.countryChange,
      drawProvincialChange: state => state.home.provincialChange,
      drawLetterName: state => state.home.letterName,
      drawChinaName: state => state.home.chinaName,
      drawCountry: state => state.home.country
    })
  },
  mounted() {
    this.getCountryList()
    this.getCountryMap()
  },
  watch:{
    content(newValue,oleValue){
      console.log('监视content',this.content)
      this.getCountryMap()
    }
  },
  methods: {
    getCountryList(){
      let contentType = 'text/plain'
      let Authorization = 'token'
      let country = ''
      for(let i = 0; i<this.drawCountry.length; i++){
        if(this.drawCountryChange == this.drawCountry[i].EnglishName){
           country = this.drawCountry[i].ChinaName
        }
      }
      console.log('country',country)
      // axios.get("https://mobiletest.derucci.net/consumer-admin/api/merchants/getProvinceDataList",{params:{country:country},headers:{contentType:contentType,Authorization:Authorization}})
      indexModel.getProvincialList(country)
      .then(res=>{
        let provincialList = res.data.data
        this.content = provincialList
        console.log('provincialList',provincialList)
      })
    },
    getCountryMap(){
      let country = this.drawCountryChange
      let content = this.content
      console.log(111,country,content)   
      axios.get(`./geoJson/country/${country}.json`)
      .then(res => {
        let countryJson = res.data;
        echarts.registerMap("China", countryJson);
        this.myEcharts = echarts.init(document.getElementById("country_box"));
        let option = this.countryOption(content,newsIcon);
        this.myEcharts.setOption(option);
        //跳转到省内地图
        this.myEcharts.on('click',param =>{
          let provincial = param.name
          let letterName = this.drawLetterName
          let chinaName = this.drawChinaName
          console.log('param',provincial)
              for(let i = 0; i<chinaName.length; i++){
                if(provincial==chinaName[i]){
                  this.$store.commit("home/setProvincialChange", letterName[i]);
                  this.$store.commit("home/setProvincialChinaChange",param.name)
                  this.$router.push({ name: "provincial" });
                }
              }
        })
      })
    },
    countryOption(content,newsIcon) {
      return {
          tooltip:{
              trigger:'item',
              padding:20,
              position:'right',
              borderColor:'red',
              position:'right',
              // symbol:`image://${newsIcon}`,
              // formatter:[
              //   "招商经理：刘建军" +'<br/>'+
              //   "联系电话：13412345678"+'<br/>'+
              //   "负责区域：青海、西藏、内蒙古、山西"
              // ].join("\n"),
              // formatter:[
              //   `<p style='width:300px;height:200px;background:pink'>
              //        招商经理：刘建军 <br/> 
              //        联系电话：13412345678
              //    </p>`
              // ].join("\n"),
              formatter:function(params,content){
                console.log('formatter',params)
                console.log(8089,content)
                let res ="<img style='width:250px; height:150px;margin:-20px -20px -20px -20px;' src=`${newsIcon}`/>"
               res +=
                `<div style='position:absolute; top:0; left:0;'>
                  <p>${params.name}</p>
                  <p>pu</p>
                </div>`
                return res;
              },
              textStyle:{
                color:'yellow',
                fontSize:20,
                width:1800,
                height:300,
                rich:{
                  img:{
                    color:'red',
                    width:800,
                    height:200,
                    backgroundColor:{
                      // image:`image://${newsIcon}`
                      image:'../assets/image/news.png',
                    }
                  }
                }
              }
          },
          series:[
              {
                type:'map',
                map:'China',
                // geoIndex:0,
                zoom:1,
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
                  color:'#33D3F6'
                },
                itemStyle:{
                  areaColor:'#00083B',
                  borderType:'solid',
                  borderWidth:2,
                  borderColor:'#283777',
                  data:[
                    // {
                    //     name:'广东',
                    //     value:[115,23.5],
                    //     label:{
                    //       show:true,
                    //       color:'red'
                    //     },
                    // }
                  ]
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
  width: 1012px;
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