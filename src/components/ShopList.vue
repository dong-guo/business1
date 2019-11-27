<template>
  <div class="box">
    <div class="shop" v-if="shopKey" @click="openShopKey"></div>
    <div class="changeShop" v-else>
      <div class="shop_num" @click="openShopKey">
        <div class="shop_one"></div>
        <div class="shop_two"></div>
        <div class="shop_three"></div>
      </div>
      <div class="changeShop_title">
        <div class="changeShop_title_text">
          <span>店铺列表</span>
        </div>
        <div class="changeShop_title_corner"></div>
      </div>
      <div id="changeShop_content" class="swiper-container">
        <div id="changeShop_content_listBox" class="swiper-wrapper">
          <ul totalPage v-for="(item,index) in totalPage" :key="item+index" class="swiper-slide">
            <li v-for="(item,index) in totalPage[index]" :key="item+index" class="all_list">
              <shop-list-item class="shopListItem" :item="item"></shop-list-item>
            </li>
          </ul>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="changeShop_bottom_corner"></div>
    </div>
  </div>
</template>
<script>
import ShopListItem from "../components/ShopListItem.vue";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

import { mapState } from "vuex";

export default {
  name: "shopList",
  components: {
    ShopListItem
  },
  data() {
    return {
      shopKey: true,
      totalPage: [],
      totalShow: [],
      pageNum: "",
      currentPage: 0,
      startPoint: 0
    };
  },
  computed: {
    ...mapState({
      drawShopData: state => state.shopList.shopData,
      drawCityShopList: state =>state.city.cityShopList
    })
  },
  watch:{
    // totalShow(newValue,oldValue){
    //     this.$nextTick(()=>{
    //       this.swiper()
    //     })    
    // }
  },
  mounted() {
    // this.swiper()
    console.log('CITY-drawCityShopList',this.drawCityShopList) 
  },
  methods: {
    //设置swiper组件api
    swiper(){
      new Swiper(".swiper-container", {
        // loop: true,
        // autoplay: {
        //   delay: 2000
        // },
        pagination: {
          el: ".swiper-pagination",
          type:'bullets',
          clickable: true,
          // bulletElement : 'li',
          hideOnClick :true,
          // bulletClass:'my-bullet',
        },
        observer: true,
        observeParents: true,
          onSlideChangeEnd: function(swiper){
          　　　swiper.update();  
          　　　mySwiper.startAutoplay();
          　　  mySwiper.reLoop();  
          }      
      }); 
      console.log('运行')     
    },
    //开启店铺列表开关
    openShopKey() {
      this.shopKey = !this.shopKey;
      this.openItem();
    },
    //打开盒子 刷新数据到totalShow
    openItem() {
      if (this.shopKey == false) {
        // console.log("drawShopData", this.drawShopData);
        // let itemListNum = this.drawShopData;
        let itemListNum = this.drawCityShopList
        let pageno = 1;
        let pagesize = 6;
        this.pageNum = Math.ceil(itemListNum.length / pagesize) || 1;
        for (let i = 0; i < this.pageNum; i++) {
          this.totalPage[i] = itemListNum.slice(
            pagesize * i,
            pagesize * (i + 1)
          );
        }
        // console.log("totalPage", this.totalPage);
        this.totalShow = this.totalPage[this.currentPage];
        // console.log("当前显示页", this.totalShow);
        this.$nextTick(()=>{
          this.swiper()
        }) 
      }
    },
    changeCurrentPage() {
      // this.currentPage = this.currentPage +1
      if (this.currentPage >= this.pageNum) {
        this.currentPage = this.pageNum - 1;
      }
      this.totalShow = this.totalPage[this.currentPage];
      // console.log("改变当前显示页", this.totalShow);
      // console.log("this.currentPage", this.currentPage);
    }
  }
};
</script>

<style scoped type="text/css">
.box{
  position:relative;
}
.shop {
  width: 103px;
  height: 246px;
  /* background-color:burlywood; */
  background-image: url(../assets/images/shop_list@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 249px;
  left: 0;
}
.changeShop {
  width: 1514px;
  height: 953px;
  /* background-color:coral; */
  background-color: rgba(0, 7, 17, 0.9);
  /* border:1px solid goldenrod; */
  position: absolute;
  /* position:relative; */
  top: 13px;
  left: 0;
  z-index: 1;
  /* -webkit-transition-property: width;
  -webkit-transition-duration: 1.5s;
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1); */
}
.shop_num {
  /* background-color:greenyellow; */
  height: 100%;
  width: 40px;
  position: absolute;
  top: 0;
  right:-40px;
  /* left: 1514px; */
}
.shop_one {
  height: 300px;
  width: 3px;
  position: absolute;
  left: 40px;
  top: 302px;
  background-image: url(../assets/images/1@2x.png);
  background-size: 100%;
  background-repeat: no-repeat;
  -webkit-animation: myone 0.5s infinite linear;
  -webkit-animation-delay: 0.1s;  
}
@keyframes myone {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.shop_two {
  height: 400px;
  width: 3px;
  position: absolute;
  left: 20px;
  top: 252px;
  background-image: url(../assets/images/2@2x.png);
  background-size: 100%;
  background-repeat: no-repeat;
  -webkit-animation: mytwo 0.5s infinite linear;
  -webkit-animation-delay: 0.05s;  
}
@keyframes mytwo {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.shop_three {
  height: 508px;
  width: 3px;
  position: absolute;
  left: 0px;
  top: 198px;
  background-image: url(../assets/images/3@2x.png);
  background-size: 100%;
  background-repeat: no-repeat;
  -webkit-animation: mythree 0.5s infinite linear;
  -webkit-animation-delay: 0s;  
}
@keyframes mythree {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.changeShop_title {
  width: 100%；;
  height: 44px;
  /* background-color:indianred; */
}
.changeShop_title_text {
  width: 508px;
  height: 44px;
  position: absolute;
  left: 0px;
  top: 0;
  font-size: 30px;
  font-weight: 800;
  background-image: url(../assets/images/changeShop_title@2x.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* color:rgba(244,206,55,1); */
}
.changeShop_title_text span {
  padding-left: 36px;
  background: linear-gradient(
    92deg,
    rgba(0, 114, 255, 1) 0%,
    rgba(0, 234, 255, 1) 48.8525390625%,
    rgba(1, 170, 255, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.changeShop_title_corner {
  /* background-color:limegreen; */
  width: 30px;
  height: 30px;
  background-image: url(../assets/images/canvass_corner@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
  transform: rotate(90deg);
  position: absolute;
  top: 0;
  right: 0;
}
.changeShop_bottom_corner{
  width: 30px;
  height: 30px;
  background-image: url(../assets/images/canvass_corner@2x.png); 
  background-repeat: no-repeat;
  background-size: cover;
  transform: rotate(180deg);  
  position: absolute;
  bottom: 0;
  right: 0;
}
.swiper-container {
  /* width: 1514px;
  height: 859px; */
  margin:auto;
  height:auto;
  /* background:lightblue; */
}
.swiper-container ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1514px;
  /* height: 859px; */
  height:auto;
  margin: 0 auto;
  padding-top: 69px;
  box-sizing: border-box;
  /* background-color:blue; */
  /* border:1px solid red; */
}
.swiper-container ul li {
  margin: 0 30px;
  margin-bottom: 72px;
}
.swiper-container {
  --swiper-pagination-color: #025a9e;
  /* height:20px;
  width:20px; */
}
.my-bullet{
  --swiper-pagination-color: #025a9e;
}
</style>