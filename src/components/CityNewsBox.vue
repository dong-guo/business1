<template>
<div class="cityBox">
  <div class="content">
    <div class="content_contentPic"></div>
    <div class="content_contentPic_contentText">
       <p class="contentText_massager">招商经理</p>
       <P class="contentText_name">樊建中</P>
    </div>
  </div>
  <div class="phone">
    <span>联系电话:</span>15099999999
  </div>
  <div class="territory">
    <span>负责区域:</span>河北、天津、北京
  </div>
  <div class="QrcodeBox">
    <div class="qrcode"></div>
    <p>扫一扫添加好友</p>
  </div> 
</div>

</template>
<script>
export default {

}
</script>

<style scoped>
.cityBox{
  width:365px;
  height:465px;
  box-sizing:border-box;
  /* border:1px solid yellow; */
  background-image:url(../assets/images/city_background@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  padding-left:46px;
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
  background-color:wheat;
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
  margin-top:14px; 
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
.QrcodeBox p{
  font-size:14px;
  margin-top:19px;
  font-weight:400;
  opacity:0.5;
  text-align:center;
  color:rgba(255,255,255,1);
}
</style>