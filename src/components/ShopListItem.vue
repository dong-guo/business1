<template>
<div class="listItem">
   <div class="pic"></div>
   <div class="listItem_name">{{item.city}}</div>
   <div class="listItem_add">{{item.address}}</div>
   <div class="listItem_title">经营品牌</div>
   <ul class="brandBox">
     <li class="brand" v-for="(list,index) in item.brandList" :key="list+index">{{list}}</li>
   </ul>
</div>

</template>
<script>

import { mapState } from "vuex"

export default {
  name:'shopListItem',
  props:["item"],
  data(){
    return{
    }
  },
  components:{
  },
  computed:{
    ...mapState({
      drawShopData: state => state.shopList.shopData,
      drawCityShopList: state => state.city.cityShopList,
    })
  },
  mounted(){
    // console.log('item',this.item)
    // console.log('shopListItem-drawCityShopList',this.drawCityShopList)
  }
}
</script>

<style scoped>
.listItem{
  width:444px;
  height:348px;
  border:1px solid #0E6DE9;
  background:rgba(14,109,233,0.2);
  box-sizing:border-box;
  position:relative;
  border-radius:4px;
  padding-left:17px;
  /* border:1px solid yellow; */
}
.pic{
  width:180px;
  height:90px;
  background-image:url(../assets/images/changeShop_newsPic@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  position:absolute;
  left:16px;
  top:-39px;
}
.listItem_name{
  margin-top:71px;
  color:#fff;
  font-size:26px;
  font-weight:300;
}
.listItem_add{
  height:60px;
  margin-top:15px;
  color:#0E6DE9;
  line-height:30px;
  font-size:20px;
  /* border:1px solid black; */
  box-sizing:border-box;
}
.listItem_title{
  color:#00FFC6;
  margin-top:15px;
  /* position:absolute; */
  /* top:200px; */
  /* left:17px; */
  font-size:20px;
  font-weight:500;
  /* border:1px solid yellow; */
  box-sizing:border-box;
}
.brandBox{
  height:32px;
  /* height:68px; */
  width:420px;
  /* background:yellow; */
  margin-top:18px;
  display:flex;
  flex-wrap:wrap;
}
.brand{
  width:100px;
  /* width:auto; */
  min-width:100px;
  padding:0 5px 0 5px;
  margin-bottom:4px;
  height:32px;
  background-color:rgba(0,255,198,0.2);
  border:1px solid rgba(0,255,198,1);
  box-sizing:border-box;
  border-radius:4px;
  margin-right:3px;
  text-align:center;
  line-height:30px;
  font-size:20px;
  font-weight:500;
  color:rgba(0,255,198,1);
}
</style>