<template>
<div class="provincialBox">
  <div class="content">
    <div class="content_contentPic">
      <img class="content_contentPic_photo" v-if="drawCityManager" :src="drawCityManager.profilePhoto" alt="">
    </div>
    <div class="content_contentPic_contentText">
       <p class="contentText_massager">招商经理</p>
       <P v-if="drawCityManager" class="contentText_name">{{drawCityManager.managerName}}</P>
    </div>
  </div>
  <div class="phone">
    <span>联系电话&nbsp;:&nbsp;</span>
    <span v-if="drawCityManager">{{drawCityManager.phone}}</span>
  </div>
  <div class="territory">
    <span>负责区域&nbsp;:&nbsp;</span>
    <span v-if="drawCityManager">{{drawCityManager.chargeProvince}}</span>
  </div>
  <div class="QrcodeBox">
    <div class="qrcode">
      <img class="qrcode_photo" v-if="drawCityManager" :src="drawCityManager.contactPhoto" alt="">
    </div>
    <p>扫一扫添加好友</p>
  </div>
  <div class="divider"></div>
  <div class="developing">
    <div class="developingTitle">
      <div class="developingSign"></div>
      <p>重点开发城市</p>
    </div>  
    <div v-if="drawCityManager" class="developCityText">{{drawCityManager.keyCity}}</div>
  </div>
</div>
 
</template>
<script>
import { mapState } from "vuex";

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
  mounted(){
    console.log('省级经销商信息',this.drawCityManager)
    // console.log('23',this.drawCityList) 
    // console.log('11',this.drawCityManager)
    // console.log('26',this.drawCityManager)
    // this.name = this.drawCityList.manager.managerName
    // this.phone = this.drawCityList.manager.phone
    // this.chargeProvince = this.drawCityList.manager.chargeProvince
    // this.keyCity = this.drawCityList.manager.keyCity
  }
}
</script>

<style scoped>
.provincialBox{
  width:366px;
  height:660px;
  box-sizing:border-box;
  /* border:1px solid yellow; */
  background-image:url(../assets/images/provincialBackgroundPic@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
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
.phone{
  color:#20FDFA;
  font-size:20px;
  margin-top:31px;
}
.phone span{
  color:#fff;
}
.territory{
  color:#20FDFA;
  font-size:20px;
  margin-top:16px; 
}
.territory span{
  color:#fff;
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
  margin-top:32px;
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
  margin-top:23px;
  color:rgba(122,180,251,1);
  line-height:26px;
  font-size:16px;
}
</style>