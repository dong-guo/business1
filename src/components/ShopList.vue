<template>
<div>
  <div class="shop" v-if="shopKey" @click="openShopKey"></div>
  <div class="changeShop" v-else>
    <div class="shop_num" @click="openShopKey">
      <div class="shop_one"></div>
      <div class="shop_two"></div>
      <div class="shop_three"></div>
    </div> 
    <div class="changeShop_title">
      <div class="changeShop_title_text" >
         <span>店铺列表</span>
      </div>
      <div class="changeShop_title_corner"></div>
    </div>
    <div class="changeShop_content">
      <ul id="all">
        <li v-for ="(item,index) in totalPage" :key="item+index" class="all_list">
          <shop-list-item class="shopListItem" :item="item"></shop-list-item>
        </li>
      </ul>
    </div> 
  </div>
</div>
</template>
<script>

import ShopListItem from "../components/ShopListItem.vue"

import { mapState } from "vuex"

export default {
   name:'shopList',
   components:{
     ShopListItem , 
   },
   data(){
     return{
       shopKey:true,
       totalPage:[],
       totalShow:[],
       currentPage:0
     }
   },
   computed:{
     ...mapState({
       drawShopData: state => state.shopList.shopData
     })
   },
   mounted(){
   },
   methods:{
     openShopKey(){
       this.shopKey = !this.shopKey
       this.openItem()
     },
     openItem(){
        if(this.shopKey == false){
            console.log('drawShopData',this.drawShopData)
            let itemListNum = this.drawShopData
            let pageno = 1
            let pagesize = 6
            let pageNum = Math.ceil(itemListNum.length/pagesize)||1
            for(let i = 0; i<pageNum; i++){
              this.totalPage[i] = this.drawShopData.slice(pagesize*i,pagesize*(i+1))
            }
            console.log('totalPage',this.totalPage)
            this.totalPage = this.totalPage[this.currentPage];
            console.log('当前显示页',this.totalPage)
        }
      }
   }
}
</script>

<style scoped>
.shop{
  width:103px;
  height:246px;
  /* background-color:burlywood; */
  background-image:url(../assets/images/shop_list@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  position:absolute;
  top:249px;
  left:0;
}
.changeShop{
  width:1514px;
  height:903px;
  /* background-color:coral; */
  background-color:rgba(0,7,17,0.9);
  /* border:1px solid goldenrod; */
  
  position:absolute;
  top:23px;
  left:0;
  z-index:1;
}
.shop_num{
  /* background-color:greenyellow; */
  height:903px;
  width:40px;
  position:absolute;
  top:0;
  left:1514px;
}
.shop_one{
  height: 300px;
  width: 3px;
  position: absolute;
  left: 40px;
  top: 302px;
  background-image: url(../assets/images/1@2x.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.shop_two{
  height: 400px;
  width: 3px;
  position: absolute;
  left: 20px;
  top: 252px;
  background-image: url(../assets/images/2@2x.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.shop_three{
  height: 508px;
  width: 3px;
  position: absolute;
  left:0px;
  top: 198px;
  background-image: url(../assets/images/3@2x.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.changeShop_title{
  width:100%；;
  height:44px;
  /* background-color:indianred; */
}
.changeShop_title_text{
  width:508px;
  height:44px;
  position:absolute;
  left:0px;
  top:0;
  font-size:30px;
  font-weight:800;
  background-image: url(../assets/images/changeShop_title@2x.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* color:rgba(244,206,55,1); */

}
.changeShop_title_text span{
  padding-left:36px;
  background:linear-gradient(
    92deg,
    rgba(0,114,255,1) 0%, 
    rgba(0,234,255,1) 48.8525390625%, 
    rgba(1,170,255,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.changeShop_title_corner{
  /* background-color:limegreen; */
  width:30px;
  height:30px;
  background-image:url(../assets/images/canvass_corner@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  transform: rotate(90deg);
  position:absolute;
  top:0;
  right:0;
}
.changeShop_content{
  width:1514px;
  height:859px;
  /* background:lightblue; */
}
.changeShop_content ul{
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:flex-start;
  /* width:1452px; */
  margin:0 auto;
  /* background-color:lightgrey; */
}
.changeShop_content ul li{
  margin:0 30px;
  margin-top:82px;
}
</style>