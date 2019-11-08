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
        drawValueCity: state => state.succession.valueCity,

        drawChangeType: state => state.succession.changeType
      })
    },
    watch:{
      drawChangeType(newValue,oldValue){
        console.log('this.drawChangeType',this.drawChangeType)
        this.showUndevelopedCity()
      },
      drawValueCountry(newValue,oldValue){
         this.urbanArea = []
      },
      drawValueProvincial(newValue,oldValue){
        this.showUndevelopedCity()
         console.log('unValueProvincial',this.drawValueProvincial)
      },
      drawValueCity(newValue,oldValue){
        //  console.log('unValueCity',this.drawValueCity)
         this.showUndevelopedCity()
      },
    },
    mounted(){
    },
    methods:{
      //请求未开发区县
       showUndevelopedCity(){
         let [country,province,city,type] = [this.drawValueCountry,this.drawValueProvincial,this.drawValueCity,this.drawChangeType]
         console.log('国家，省，市，Type ',country,province,city,type)
         indexModel.getUndevelopedCity(country,province,city,type)
         .then(res=>{
           this.urbanArea = res.data.data
          //  console.log('unCity',this.urbanArea)
         })
       },
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