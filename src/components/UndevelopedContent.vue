<template>
<div class="uncontent">
   <ul class="uncontent_allUrbanArea">
     <li class="urbanArea" >城区</li>
     <li class="urbanArea" v-for="(item,index) in urbanArea" :key="item+index">{{item}}</li>
   </ul>
</div>

</template>
<script>
export default {
    name:'undevelopedContent',
    data(){
       return {
        //  urbanArea:[],
         urbanArea:['阳村市','五华县','惠来县','陆丰市','博社村','雷州市','龙门县','紫金县']
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