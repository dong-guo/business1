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
export default {
    name:'undevelopedContent',
    data(){
       return {
        //  urbanArea:[],
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
    },
    methods:{
       showUndevelopedCity(){
         let country = this.drawValueCountry
         let province = this.drawValueProvincial
         let city = this.drawValueCity
         let contentType = 'text/plain'
         axios.get("https://mobiletest.derucci.net/consumer-admin/api/merchants/getUndevelopedList",{params:{province:province,country:country,city:city},headers:{contentType:contentType}})
         .then(res=>{
           this.urbanArea = res.data.data
           console.log('unCity',this.urbanArea)
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
  justify-content:space-between;
}
.urbanArea{
  width:100px;
  height:32px;
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