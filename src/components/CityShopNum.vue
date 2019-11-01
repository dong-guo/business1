<template>
<div class="cityShop">
    <div class="singleShop">
    <div class="greenballoon"></div>
    <p v-if="drawCityShopTypeCount">单品店&nbsp;&nbsp;({{drawCityShopTypeCount.single}})</p>
    </div>
  <div class="generalStore">
    <div class="yellowballoon"></div>
      <p v-if="drawCityShopTypeCount">综合店&nbsp;&nbsp;({{drawCityShopTypeCount.multiple}})</p>
    </div>
</div>

</template>
<script>
import { mapState } from 'vuex'

export default {
   name:'cityShopNum',
   data(){
     return{}
   },
   computed:{
     ...mapState({
       drawCityShopTypeCount:state => state.city.cityShopTypeCount
     })
   },
   mounted(){
      // console.log('cityShopNum-drawCityShopTypeCount',this.drawCityShopTypeCount)
   },
   watch:{
     drawCityShopTypeCount(newValue,oldValue){
      // console.log('cityShopNum-drawCityShopTypeCount检测',this.drawCityShopTypeCount)
     }
   }
}
</script>

<style scoped>
.cityShop{
  width:220px;
  height:103px;
  /* background-color:green; */
}
.singleShop{
  /* display:flex; */
  /* background-color:burlywood; */
  position:relative;
  height:40px;
  width:180px;
}
.greenballoon{
 margin-right:17px;
 width:32px;
 height:40px;
 /* border:1px solid pink; */
 box-sizing:border-box;
 background-image:url(../assets/images/greenBalloon@2x.png);
 background-repeat:no-repeat;
 background-size:cover;
}
.singleShop p{
  width:168px;
  height:40px;
  position:absolute;
  left:53px;
  top:0;
  /* border:1px solid red; */
  color:#00AF6D;
  font-size:30px;
}
.generalStore{
  /* background-color:rgb(135, 197, 222); */
  height:40px;
  width:180px;
  margin-top:23px;
  position:relative;
  bottom:0;
  left:0;
}
.yellowballoon{
 margin-right:17px;
 width:32px;
 height:40px;
 /* border:1px solid pink; */
 background-image:url(../assets/images/yellowBalloon@2x.png);
 background-repeat:no-repeat;
 background-size:cover;
}
.generalStore p{
  width:168px;
  height:40px;
  position:absolute;
  top:0;
  left:53px;
  /* border:1px solid red; */
  color:#E6AF08;
  font-size:30px; 
}
</style>