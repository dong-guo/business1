<template>
<div class="uncontent">
   <ul class="uncontent_allUrbanArea">
     <li class="urbanArea" >城区</li>
     <li class="urbanArea" v-for="(item,index) in urbanArea" :key="item+index">{{item}}</li>
   </ul>
</div>

</template>
<script>
import axios from "axios";
import { mapState } from "vuex"

import { IndexModel } from '../untils/index'
const indexModel = new IndexModel()

export default {
    name:'undevelopedContent',
    data(){
       return {
         urbanArea:[]
       }
    },
    computed:{
      ...mapState({
        drawValueCountry: state => state.succession.valueCountry,
        drawValueProvincial: state => state.succession.valueProvincial,
        drawValueCity: state => state.succession.valueCity
      })
    },
    watch:{
      drawValueCountry(newValue,oldValue){
        //  console.log('unValueCountry',this.drawValueCountry)
         this.urbanArea = []
      },
      // drawValueProvincial(newValue,oldValue){
      //    console.log('unValueProvincial',this.drawValueProvincial)
      // },
      drawValueCity(newValue,oldValue){
        //  console.log('unValueCity',this.drawValueCity)
         this.showUndevelopedCity()
  
      },
    },
    mounted(){
      // console.log('drawValueCountry',this.drawValueCountry)
       this.showUndevelopedCity()
        // this.text()
    },
    methods:{
      //请求未开发区县
       showUndevelopedCity(){
         let [country,province,city] = [this.drawValueCountry,this.drawValueProvincial,this.drawValueCity]
        //  let contentType = 'text/plain'
         indexModel.getUndevelopedCity(country,province,city)
         .then(res=>{
           this.urbanArea = res.data.data
          //  console.log('unCity',this.urbanArea)
         })
       },
       text(){
         let type = 'CITY'
         let parentCode ='440000'
         indexModel.selectProvincialOrCity(type,parentCode)
         .then(res=>{
            let pp = res.data.data
            console.log('pp',pp)
         })
       }
    }

}
</script>

<style scoped>
.uncontent{
  /* background-color:rgb(175, 160, 25); */
  height:400px;
  width:460px;
}
.uncontent_allUrbanArea{
  display:flex;
  flex-wrap:wrap;
  /* justify-content:space-between; */
}
.urbanArea{
  /* width:100px; */
  width:auto;
  /* min-width:100px; */
  padding:0 10px 0 10px;
  height:32px;
  margin-right:15px;
  background:rgba(0,255,198,0.2);
  border:1px solid rgba(0,255,198,1);
  border-radius:4px;
  font-size:20px;
  font-weight:500;
  line-height:32px;
  text-align:center;
  color:rgba(0,255,198,1);
  margin-bottom:20px;
  flex-shrink:0;
  
}
</style>