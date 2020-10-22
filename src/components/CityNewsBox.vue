<template>
<div class="city-box">
  <div class=" swiper-container">
    <div class="swiper-wrapper">
      <div class="cityBox swiper-slide" v-for="(item,index) in drawCityManager" :key="item+index">
        <div class="content">
          <div class="content_contentPic">
            <img class="content_contentPic_photo" v-if="item.profilePhoto" :src="item.profilePhoto"/>
          </div>
          <div class="content_contentPic_contentText">
            <p class="contentText_massager">招商经理</p>
            <P v-if="drawCityManager" class="contentText_name">{{item.managerName}}</P>
          </div>
        </div>
        <div class="brand">
          <span>负责品牌&nbsp;:&nbsp;</span>{{item.aliasBrand}}
        </div>
        <div  v-if="drawCityManager" class="phone">
          <span>联系电话&nbsp;:&nbsp;</span>{{item.phone}}
        </div>
        <div v-if="drawCityManager" class="territory">
          <span>负责区域&nbsp;:&nbsp;</span>{{item.chargeProvince}}
        </div>
        <div class="QrcodeBox">
          <div class="qrcode">
            <img class="qrcode_photo" v-if="drawCityManager" :src="item.contactPhoto" alt="">
          </div>
          <p>扫一扫添加好友</p>
        </div> 
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</div>

</template>
<script>

import { mapState } from 'vuex'

import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name:'cityNewsBox',
  data(){
    return{
    }
  },
  computed:{
    ...mapState({
      drawCityManager:state =>state.city.cityManager,
      drawShadeBoxKey: state =>state.city.shadeBoxKey
    })
  },
  mounted(){
    this.swiper()
    // console.log('CityNewsBox-drawCityManager',this.drawCityManager)
  },
  watch:{
    drawCityManager(newValue,oldValue){
      console.log('CityNewsBox-drawCityManager-检测',this.drawCityManager)
    },
    drawShadeBoxKey(newValue,oldValue){
        if(this.drawShadeBoxKey == false){
          this.swiper()
          console.log('22222')
        }
    }
  },
  methods:{
            //设置swiper组件api
    swiper(){
      new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
          // type:'bullets',
          clickable: true,
          renderBullet: function (index, className) {
            // console.log('第几页',index)
            return '<span class="' + className + '" style="border-radius:1px;background:rgba(32,253,250,1);margin:0 6px 0 6px; height:4px;width:20px"></span>';
          },          
        },
        observer: true,
        observeParents: true,
        // bulletClass:'my-bullet',
          // onSlideChangeEnd: function(swiper){
          // 　　　swiper.update();  
          // 　　　mySwiper.startAutoplay();
          // 　　  mySwiper.reLoop();  
          // }    

      }); 
      console.log('运行')     
    },
  }

}
</script>

<style scoped>
.city-box{
  position:relative;
  width:380px;
  height:545px;
  /* border:1px solid yellow; */
}
.swiper-container{
  width:380px;
  height:545px;
  border:1px solid #338CFA;
}
.cityBox{
  width:365px;
  height:525px;
  box-sizing:border-box;
  /* border:1px solid yellow; */
  background-image:url(../assets/images/city_background@2x.png);
  background-repeat:no-repeat;
  background-size:100% 100%;
  padding-left:46px;
  padding-right:20px;
}
.content{
  width:225px;
  height:80px;
  /* background-color:yellow; */
  margin-top:68px;
  display:flex;
}
.content_contentPic{
  width:80px;
  height:80px;
  border-radius:50%;
  border:2px solid rgba(51,216,250,1);
  /* background-color:wheat; */
  background-image:url(../assets/images/headPic.png);
}
.content_contentPic_photo{
  width:80px;
  height:80px;
  border-radius:50%;
}
.content_contentPic_contentText{
  margin-left:20px;
  height:80px;
  /* background-color:teal; */
  width:125px;
}
.contentText_massager{
  color:#fff;
  font-size:20px;
}
.contentText_name{
  color:#7AB4FB;
  font-size:36px;
}
.brand{
  color:#20FDFA;
  font-size:20px;
  margin-top:31px;
}
.brand span{
  color:#fff;
}
.phone{
  color:#20FDFA;
  font-size:20px;
  margin-top:14px;
}
.phone span{
  color:#fff;
}
.territory{
  color:#20FDFA;
  font-size:20px;
  margin-top:14px; 
}
.territory span{
  color:#fff;
}
.QrcodeBox{
  /* background-color:white; */
  width:100px;
  height:135px;
  margin-top:15px;
}
.qrcode{
  width:100px;
  height:100px;
  background-color:pink;
  background-image:url(../assets/images/QRcode.png);
}
.qrcode_photo{
  width:100px;
  height:100px;  
}
.QrcodeBox p{
  font-size:14px;
  margin-top:15px;
  font-weight:400;
  opacity:0.5;
  text-align:center;
  color:rgba(255,255,255,1);
}
.swiper-pagination{
  height:15px;
  width:100%;
  z-index:1;
  /* background:pink; */
}
</style>