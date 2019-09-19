<template>
<div class="home_body_right" :class="{'ckangeBox':key}" @click="change"> 
          <div class="border_one"></div>
          <div class="border_two"></div>
          <div class="border_three"></div>
          <p>门店分布</p>
          <div class="home_body_right_content" :class="{'changeContent':up}" @click="changeWhite" >
            <ul>
              <li v-for="item in country" :key="item">
                 <div class="record">
                   <span class="record_country">{{item}}</span>
                   <span class="record_number">5700家</span>
                 </div>
                 <div class="shop">
                   <div class="shop_franchser">加盟店</div>
                   <div class="shop_sony">直营店</div>
                   <div class="shop_left"></div>
                   <div class="shop_right"></div>
                 </div>
                 <div class="shop_border"></div>
              </li>
            </ul>
          </div>
      </div>

</template>
<script>
export default {
  name:'bodyright',
    data(){
      return {
        myEcharts:null,
        key:false,
        up:false,
        country:['中国','美国','日本','欧洲','印度','冈比亚','巴西','阿根廷','斯洛伐克']
      }
    },
    methods:{
      change(){
       this.key=!this.key
       console.log(111,this.key)
      },
      changeWhite(){
        this.up=!this.up
        console.log(222,this.up)
      }
    }
}
</script>

<style scoped>
.home_body_right{
  height:903px;
  width:508px;
  border:1px solid rgba(55, 85, 218, 0.3);
  background:rgba(6,7,107,0);
  box-sizing:border-box;
  position:absolute;
  top:126px;
  left:1393px;
}
.ckangeBox{
  width:1514px;
  left:389px;
  /* background-color:red; */
  background:rgba(0,7,17,0.9);
}
.border_one{
  float:left;
  height:300px;
  width:3px;
  position:absolute;
  left:-40px;
  top:302px;
  background-image:url(../assets/images/1@2x.png);
  background-size:100%;
  background-repeat:no-repeat;
}
 .border_two{
  float:left;
  height:400px;
  width:3px;
  position:absolute;
  left:-20px;
  top:252px;
  background-image:url(../assets/images/2@2x.png);
  background-size:100%;
  background-repeat:no-repeat;
}
.border_three{
  float:left;
  height:508px;
  width:3px;
  position:absolute;
  left:-0px;
  top:198px;
  background-image:url(../assets/images/3@2x.png);
  background-size:100%;
  background-repeat:no-repeat;
}
.home_body_right p{
  color:#F4CE37;
  font-size:30px;
  line-height:44px;
  padding-left:39px;
  background-image:url(../assets/images/rectangle@2x.png);
  background-repeat:no-repeat;
  background-size:100% 100%;
}
.home_body_right_content{
  height:859px;
  width:508px;
  overflow:hidden;
}
.changeContent{
  height:859px;
  width:1514px;
}
.home_body_right_content ul{
  margin-left:34px;
  width:451px;
  height:859px;
  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  justify-content:flex-start;
  /* align-content: center; */
}
.home_body_right_content li{
  height:190px;
  width:451px;
  margin:10px;
  /* background-color:lawngreen; */
  box-sizing:border-box;
}
.record{
  width:445px;
  margin:0 auto;
  /* border:1px solid black; */
  height:50px;
  font-size:28px;
  font-weight:300;
  color:rgba(255,255,255,1);
  /* background-color:lightseagreen; */
}
.record_country{
  display:inline-block;
  width:200px;
  height:50px;
  /* background-color:yellowgreen; */
  text-align:left;
  line-height:50px;
}
.record_number{
  display:inline-block;
  height:50px;
  width:245px;
  /* background-color:pink; */
  text-align:end;
  line-height:50px;
}
.shop{
  width:445px;
  height:92px;
  /* background-color:yellow; */
  margin:20px auto;
}
.shop_left{
  width:21px;
  height:92px;
  /* border:1px solid black; */
  box-sizing:border-box;
  background-image:url(../assets/images/left_border@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  position:relative;
  top:0;
  left:0;
}
.shop_right{
  width:21px;
  height:92px;
  /* border:1px solid black; */
  box-sizing:border-box;
  background-image:url(../assets/images/right_border@2x.png);
  background-repeat:no-repeat;
  background-size:cover;
  position:relative;
  top:-92px;
  left:424px;
}
.shop_franchser{
  box-sizing:border-box;
  width:204px;
  height:74px;
  border:1px solid rgba(14,109,233,1);
  background:rgba(14,109,233,0.2);
  float:left;
  margin-top:9px;
  margin-left:13px;
  border-radius:4px;
}
.shop_sony{
  margin-top:9px;
  float:left;
  box-sizing:border-box;
  width:204px;
  height:74px;
  border:1px solid rgba(0,255,198,1);
  background:rgba(0,255,198,0.2);
  margin-left:10px;
  border-radius:4px;
}
.shop_border{
  height:9px;
  width:451px;
  background-image:url(../assets/images/break_up@2x.png);
  background-repeat:no-repeat;
  background-size:100%;
}
</style>