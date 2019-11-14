<template>
<div>
  <div class="canvass" @click="openCanvass" v-if="canvassKey"></div>
  <div class="changeCanvass" v-else>
    <div class="canvass_num" @click="openCanvass">
      <div class="canvass_one"></div>
      <div class="canvass_two"></div>
      <div class="canvass_three"></div>
    </div>
    <div class="canvass_title">
      <div class="canvass_title_text" >
         <span>招商人员</span>
      </div>
      <div class="canvass_title_corner"></div>
    </div>
    <div class="canvass_body">
      <ul>
        <li v-for="(item,index) in personal" :key="item+index" >
          <div class="canvass_body_personal">
            <div class="body_personal_news">
                <div class="personal_news_pic">
                </div>
                <div class="personal_news_people"> 
                  <div class="news_people_manager">招商经理</div>
                  <div class="news_people_name">{{item.managerName}}</div>
                </div>
            </div>
            <div class="body_personal_phone">联系电话: <span>{{item.phone}}</span></div>
            <div class="body_personal_adds">负责区域: <span>{{item.chargeProvince}}</span></div>
          </div>
          <div class="canvass_body_barcode">
            <div class="body_barcode_QRcode">
              <img src="item[index].profilePhoto" alt="">
            </div>
            <div class="body_barcode_text">扫一扫添加好友</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="canvass_bottom">
      <div class="canvass_corner"></div>
    </div>
  </div>
</div>
</template>
<script>

import { IndexModel } from '../untils/index'
const indexModel = new IndexModel()

import axios from "axios";
export default {
   data(){
     return{
       canvassKey:true,
       personal:[],
       canvassPhoto:''
     }
   },
   mounted(){
     this.getManagerList()
   },
   watch:{
     personal(newValue,oldValue){
      //  console.log('监测信息',this.personal)
      //  console.log(767,this.personal[2].profilePhoto)
     }
   },
   methods:{
     getManagerList(){
       let page = 1
       let limit = 2
        indexModel.getCanvassList(page,limit)
        .then(res=>{
          let managerList = res.data.data
          console.log('managerList',managerList)
          this.personal = managerList
        })
     },
     openCanvass(){
        this.canvassKey = !this.canvassKey
     }
   }
}
</script>

<style scoped>
.canvass{
  /* background-color:goldenrod; */
  background-image:url(../assets/images/shop_select@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  width:106px;
  height:246px;
  position:absolute;
  top:317px;
  left:1813px;
}
.changeCanvass{
  height:903px;
  width:602px;
  z-index:2;
  position:absolute;
  top:0;
  right:0;
  /* left:1318px; */
  background: rgba(0, 7, 17, 0.9);
  border:1px solid rgba(55, 85, 218, 0.3);
  box-sizing:border-box;
  -webkit-transition-property: width;
  -webkit-transition-duration: 2.5s;
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.canvass_num{
  /* background-color:greenyellow; */
  height:903px;
  width:40px;
  position:absolute;
  top:0;
  left:-40px;
}
.canvass_one{
  /* background-color:hotpink; */
  /* float: left; */
  height: 300px;
  width: 3px;
  position: absolute;
  left: 0;
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
.canvass_two{
  /* float: left; */
  height: 400px;
  width: 3px;
  position: absolute;
  /* left: -20px; */
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
.canvass_three{
  /* float: left; */
  height: 508px;
  width: 3px;
  position: absolute;
  left: 40px;
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
.canvass_title{
  width:100%；;
  height:44px;
  /* background-color:indianred; */
}
.canvass_title_text{
  width:508px;
  height:44px;
  position:absolute;
  left:93px;
  top:0;
  font-size:30px;
  font-weight:800;
  background-image: url(../assets/images/canvass_rectangle@2x.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* color:rgba(244,206,55,1); */

}
.canvass_title_text span{
  padding-left:356px;
  background:linear-gradient(
    92deg,
    rgba(0,114,255,1) 0%, 
    rgba(0,234,255,1) 48.8525390625%, 
    rgba(1,170,255,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.canvass_title_corner{
  /* background-color:limegreen; */
  width:30px;
  height:30px;
  background-image:url(../assets/images/canvass_corner@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  position:absolute;
  top:0;
  left:0;
}
.canvass_body{
  /* background-color:lightblue; */
  height:859px;
  width:100%;
  overflow:auto;
}
.canvass_body::-webkit-scrollbar {

display:none

}
.canvass_body ul{
  height:100%;
  width:578px;
  margin-left:24px;
  /* margin:0 auto; */
}
.canvass_body ul li{
  width:578px;
  height:245px;
  /* border:1px solid rgba(51,140,250,1); 
  box-sizing:border-box; */
  /* background-color:lightgreen; */
  background-image:url(../assets/images/background_border@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  display:flex;
}
.canvass_body_personal{
  /* background-color:lightsalmon; */
  width:300px;
  height:100%;
  /* margin-top:61px; */
  margin-left:47px;
}
.canvass_body_barcode{
  margin-left:52px;
  margin-top:60px;
  width:100px;
  height:126px;
  /* background-color:maroon; */
}
.body_personal_news{
  /* background-color:mediumaquamarine; */
  height:70px;
  width:100%;
  margin-top:61px;
  display:flex;
  /* flex-basis:0; */
  /* display:inline-block; */
}
.personal_news_pic{
  /* background-color:mediumvioletred; */
  height:70px;
  width:70px;
  border-radius:100%;
  background-image:url(../assets/images/headPic.png);
  background-size:cover;
  
}
.personal_news_people{
  /* background-color:moccasin; */
  height:70px;
  width:150px;
  margin-left:32px;
}
.news_people_manager{
  height:20px;
  width:100%;
  color:rgba(255,255,255,1);
  font-size:20px;
}
.news_people_name{
  line-height:40px;
  width:100%;
  margin-top:10px;
  color:#7AB4FB;
  font-size:36px;
  /* background-color:orange; */
}
.body_personal_phone{
  color:#FFFFFF;
  margin-top:29px;
  font-size:20px;
}
.body_personal_phone span{
  color:#20FDFA
}
.body_personal_adds{
  color:#FFFFFF;
  margin-top:10px;
  font-size:20px;
}
.body_personal_adds span{
  color:#20FDFA
}
.body_barcode_QRcode{
  background-color:yellow;
  width:100px;
  height:100px;
}
.body_barcode_text{
  color:#FFFFFF;
  font-size:14px;
  height:15px;
  line-height:14px;
  text-align:center;
  margin-top:11px;
  opacity:0.5;
  /* background-color:aquamarine; */
}
.canvass_bottom{
  height:50px;
  width:600px;
  position:absolute;
  top:853px;
  left:0;
  background-image:url(../assets/images/canvass_bottom@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  /* background-color:mediumorchid; */
}
.canvass_corner{
  /* background-color:mediumorchid; */
  height:32px;
  width:32px;
  position:absolute;
  top:19px;
  left:0;
  background-image:url(../assets/images/left3@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
}
</style>