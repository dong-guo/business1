<template>
<div class="provincial-box">
  <div class=" swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide provincialBox" v-for="(item,index) in drawCityManager" :key="item+index">
        <div class="content">
          <div class="content_contentPic">
            <img class="content_contentPic_photo" v-if="drawCityManager" :src="item.profilePhoto" alt="">
          </div>
          <div class="content_contentPic_contentText">
            <p class="contentText_massager">招商经理</p>
            <P v-if="drawCityManager" class="contentText_name">{{item.managerName}}</P>
          </div>
        </div>
        <div class="brand">
          <span>负责品牌&nbsp;:&nbsp;</span>
          <span class="brand_color" v-if="drawCityManager">{{item.aliasBrand}}</span>
        </div>
        <div class="phone">
          <span>联系电话&nbsp;:&nbsp;</span>
          <span class="phone_color" v-if="drawCityManager">{{item.phone}}</span>
        </div>
        <div class="territory">
          <span>负责区域&nbsp;:&nbsp;</span>
          <span class="territory_color" v-if="drawCityManager">{{item.chargeProvince}}</span>
        </div>
        <div class="QrcodeBox">
          <div class="qrcode">
            <img class="qrcode_photo" v-if="drawCityManager" :src="item.contactPhoto" alt="">
          </div>
          <p>扫一扫添加好友</p>
        </div>
        <div class="divider"></div>
        <div class="developing">
          <div class="developingTitle">
            <div class="developingSign"></div>
            <p>重点开发城市</p>
          </div>  
          <div v-if="drawCityManager" class="developCityText">{{item.keyCity}}</div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</div>
 
</template>
<script>
import { mapState } from "vuex";

import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name:'provincialNewsBox',
  data(){
    return{
    }
  },
  computed:{
    ...mapState({
      drawCityList: state => state.provincial.cityList,
      drawCityManager: state => state.provincial.cityManager
    })
  },
  watch:{
    drawCityManager(newVal,oldVal){
      console.log('watch监视省级经销商信息',this.drawCityManager)
    }
  },
  mounted(){
    console.log('省级经销商信息',this.drawCityManager)
    this.swiper()
    // console.log('23',this.drawCityList) 
    // console.log('11',this.drawCityManager)
    // console.log('26',this.drawCityManager)
    // this.name = this.drawCityList.manager.managerName
    // this.phone = this.drawCityList.manager.phone
    // this.chargeProvince = this.drawCityList.manager.chargeProvince
    // this.keyCity = this.drawCityList.manager.keyCity
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
            return '<span class="' + className + '" style="border-radius:1px;background:rgba(32,253,250,1);;margin:0 6px 0 6px; height:4px;width:20px";></span>';
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

<style scoped type="text/css">
.provincial-box{
  position:relative;
  width:380px;
  height:690px;
  /* border:1px solid yellow; */
}
.swiper-container{
  width:380px;
  height:690px;
  border:1px solid #338CFA;
}
.provincialBox{
  width:366px;
  height:660px;
  box-sizing:border-box;
  /* border:1px solid yellow; */
  background-image:url(../assets/images/provincialBackgroundPic@2x.png);
  background-repeat:no-repeat;
  background-size:100% 100%;
  padding-left:46px;
}
.content{
  width:225px;
  height:80px;
  /* background-color:yellow; */
  margin-top:38px;
  display:flex;
}
.content_contentPic{
  width:80px;
  height:80px;
  border-radius:50%;
  border:2px solid rgba(51,216,250,1);
  background-color:wheat;
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
  line-height:50px;
  font-size:28px;
  white-space:nowrap;
}
.brand{
  margin-top:31px;
  color:#20FDFA;
  font-size:20px;
  width:320px;
  /* background:yellow; */
}
.brand span{
  color:#fff;
}
.brand .brand_color{
  color:rgba(32, 253, 250, 1);
}
.phone{
  color:#20FDFA;
  font-size:20px;
  margin-top:16px;
}
.phone span{
  color:#fff;
}
.phone .phone_color{
  color:rgba(32, 253, 250, 1);
}
.territory{
  color:#20FDFA;
  font-size:20px;
  margin-top:16px; 
}
.territory span{
  color:#fff;
}
.territory .territory_color{
  color:rgba(32, 253, 250, 1);
}
.QrcodeBox{
  /* background-color:white; */
  width:100px;
  height:135px;
  margin-top:30px;
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
  margin-top:19px;
  font-weight:400;
  opacity:0.5;
  text-align:center;
  color:rgba(255,255,255,1);
}
.divider{
  width:296px;
  height:9px;
  background-image:url(../assets/images/divider@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  margin-top:25px;
  margin-left:-11px;
}
.developing{
  width:282px;
  height:200px;
  margin-top:28px;
  /* background-color:yellow; */
}
.developingTitle{
  width:282px;
  height:20px;
  /* background-color:#20FDFA; */
}
.developingSign{
  width:6px;
  height:20px;
  background-color:rgba(14,109,233,1);
  float:left;
}
.developingTitle p {
  margin-left:13px;
  color:rgba(255,255,255,1);
  font-weight:400;
  font-size:20px;
  line-height:20px;
}
.developCityText{
  font-weight:400;
  margin-top:16px;
  color:rgba(122,180,251,1);
  line-height:26px;
  font-size:16px;
  height:80px;
  width:282px;
  position:absolute;
  overflow:hidden;
  -ms-text-overflow: ellipsis;text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* background:yellow; */
}
.swiper-pagination{
  height:25px;
  width:100%;
  /* background:pink; */
}
/* .swiper-pagination-bullet{
  border-radius:1px;
} */
</style>