<template>
<div class="provincialShop">
  <div class="singleShop">
    <div class="greenballoon"></div>
    <!-- <p>单品店&nbsp;&nbsp;({{drawAllCityList.shopTypeCount[0].single}})</p> -->
    <p v-if="drawCityShopNumber">品牌店&nbsp;&nbsp;({{drawCityShopNumber.single}})</p>
    </div>
  <div class="generalStore">
    <div class="yellowballoon"></div>
      <!-- <p>综合店&nbsp;&nbsp;({{drawAllCityList}})</p> -->
      <p v-if="drawCityShopNumber">综合店&nbsp;&nbsp;({{drawCityShopNumber.multiple}})</p>
    </div>
</div>

</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
    name:'provincialShopNum',
    data(){
      return{
        single:'',
        multiple:'',
      }
    },
    computed:{
      ...mapState({
        drawCityShopNumber: state => state.provincial.cityShopNumber,
        drawAllCityList: state =>state.provincial.allCityList
      })
    },
    watch:{
      drawAllCityList(newValue,oldValue){
        console.log('drawAllCityList-12',this.drawAllCityList)
      },
      drawCityShopNumber(newValue,oldValue){
        console.log('drawCityShopNumber',this.drawCityShopNumber)
      }
    },
    mounted(){
      // this.single = this.drawAllCityList.shopTypeCount[0].single
      // this.multiple = this.drawAllCityList.shopTypeCount[0].multiple
      // console.log('drawCityShopNumber',this.drawCityShopNumber)
      console.log('drawAllCityList-11',this.drawAllCityList,'provincialShopNum')
    }

}
</script>

<style scoped>
.provincialShop{
  width:220px;
  height:103px;
  /* background-color:green; */
}
.singleShop{
  /* display:flex; */
  position:relative;
  /* background-color:burlywood; */
  height:40px;
  width:208px;
}
.greenballoon{
 margin-right:27px;
 width:30px;
 height:40px;
 /* border:1px solid pink; */
 background-image:url(../assets/images/greenBalloon@2x.png);
 background-repeat:no-repeat;
 background-size:contain;
}
.singleShop p{
  width:208px;
  height:40px;
  position:absolute;
  top:0;
  left:53px;
  /* border:1px solid red; */
  color:#00AF6D;
  font-size:30px;
}
.generalStore{
  /* background-color:rgb(135, 197, 222); */
  height:40px;
  width:180px;
  margin-top:23px;
  /* display:flex; */
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
 background-size:contain;
}
.generalStore p{
  width:208px;
  height:40px;
  position:absolute;
  top:0;
  left:53px;
  /* border:1px solid red; */
  color:#E6AF08;
  font-size:30px; 
}
</style>