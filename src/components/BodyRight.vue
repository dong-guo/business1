<template>
  <div class="home_body_right" :class="{'ckangeBox':drawBoxKey}">
    <div class="border_num" @click="change">
      <div class="border_one"></div>
      <div class="border_two"></div>
      <div class="border_three"></div>
    </div>
    <div class="border_title">
      <span>门店分布</span>
      {{drawNum}}
    </div>
    <div class="home_body_right_content" :class="{'changeContent':drawBoxKey}">
      <ul>
        <li v-for="(item,index) in drawCountryNumber" :key="item+index">
          <div class="record">
            <span class="record_country">{{item.name}}</span>
            <span class="record_number">{{drawNumber[index]}}</span>
          </div>
          <div class="shop">
            <div class="shop_franchser">
              <div class="shop_franchser_name">加盟店</div>
              <div class="shop_franchser_number">
                {{drawNumber[index]}}
                <span>家</span>
              </div>
            </div>
            <div class="shop_sony">
              <div class="shop_sony_name">直营店</div>
              <div class="shop_sony_number">
                24<span>家</span>
              </div>
            </div>
            <div class="shop_left"></div>
            <div class="shop_right"></div>
          </div>
          <div class="shop_border" v-if="[index+1]%4 != 0"></div>
          <div class="shop_borderBottom" v-else></div>
        </li>
      </ul>
      <div class="right_bottom">
        <div class="right_bottom_left"></div>
        <div class="right_bottom_right"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "bodyright",
  data() {
    return {
      myEcharts: null,
      up: false
    };
  },
  computed: {
    ...mapState({
      drawBoxKey: state => state.home.boxKey,
      drawNum: state => state.home.allNum,
      drawCountry: state => state.home.country,
      drawNumber: state => state.home.number,
      drawCountryNumber: state => state.home.countryNumber
    })
  },
  mounted(){
  },
  methods: {
    change() {
      this.up = !this.up;
      this.$store.commit("home/setBoxKey", this.up);
      //  console.log(111,this.up)
      //  console.log(222,this.drawBoxKey)
    }
  }
};
</script>

<style scoped>
.home_body_right {
  height: 903px;
  width: 508px;
  border: 1px solid rgba(55, 85, 218, 0.3);
  background: rgba(6, 7, 107, 0);
  box-sizing: border-box;
  position: absolute;
  top: 126px;
  left: 1393px;
  -webkit-transition-property: all;
  -webkit-transition-duration: 1.5s;
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.ckangeBox {
  /* -webkit-transition-property: all;
  -webkit-transition-duration: 1.5s;
  -webkit-transition-timing-function:cubic-bezier(0, 1, 0.5, 1); */
  width: 1514px;
  left: 389px;
  background: rgba(0, 7, 17, 0.9);
}
.border_num {
  height: 100%;
  width: 40px;
  position: absolute;
  left: -40px;
  /* background-color:yellow; */
}
.border_one {
  float: left;
  height: 300px;
  width: 3px;
  position: absolute;
  /* left: -40px; */
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
.border_two {
  float: left;
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
.border_three {
  float: left;
  height: 508px;
  width: 3px;
  position: absolute;
  /* left: -0px; */
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
.border_title {
  clear: both;
  color: rgba(244, 206, 55, 1);
  font-size: 30px;
  font-weight: 800;
  line-height: 44px;
  padding-left: 39px;
  background-image: url(../assets/images/rectangle@2x.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.border_title span {
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(51, 216, 250, 1) 100%
  );
  -webkit-background-clip: text;
  color: transparent;
}
.home_body_right_content {
  height: 859px;
  width: 100%;
  overflow: hidden;
}
.changeContent {
  height: 859px;
  width: 100%;
}
.home_body_right_content ul {
  margin-left: 34px;
  width: 451px;
  height: 859px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* align-content: center; */
}
.home_body_right_content li {
  height: 190px;
  width: 451px;
  margin: 10px;
  /* background-color:lawngreen; */
  box-sizing: border-box;
}
.record {
  width: 445px;
  margin: 0 auto;
  /* border:1px solid black; */
  height: 50px;
  font-size: 28px;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  /* background-color:lightseagreen; */
}
.record_country {
  display: inline-block;
  width: 200px;
  height: 50px;
  /* background-color:yellowgreen; */
  text-align: left;
  line-height: 50px;
}
.record_number {
  display: inline-block;
  height: 50px;
  width: 245px;
  /* background-color:pink; */
  text-align: end;
  line-height: 50px;
}
.shop {
  width: 445px;
  height: 92px;
  /* background-color:yellow; */
  margin: 20px auto;
}
.shop_left {
  width: 21px;
  height: 92px;
  /* border:1px solid black; */
  box-sizing: border-box;
  background-image: url(../assets/images/left_border@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  top: 0;
  left: 0;
}
.shop_right {
  width: 21px;
  height: 92px;
  /* border:1px solid black; */
  box-sizing: border-box;
  background-image: url(../assets/images/right_border@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  top: -92px;
  left: 424px;
}
.shop_franchser {
  box-sizing: border-box;
  width: 204px;
  height: 74px;
  border: 1px solid rgba(14, 109, 233, 1);
  background: rgba(14, 109, 233, 0.2);
  float: left;
  margin-top: 9px;
  margin-left: 13px;
  border-radius: 4px;
}
.shop_franchser_name {
  width: 60px;
  height: 34px;
  font-size: 20px;
  font-family: "Source Han Sans CN";
  font-weight: 500;
  color: rgba(0, 150, 255, 1);
  line-height: 34px;
  margin-left: 7px;
  margin-top: 0px;
  /* background-color:chartreuse; */
}
.shop_franchser_number {
  width: auto;
  height: 34px;
  font-size: 34px;
  font-family: "Source Han Sans CN";
  font-weight: 500;
  color: rgba(0, 150, 255, 1);
  line-height: 34px;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.88);
  padding-right: 8px;
  text-align: right;
  /* background-color:yellow; */
}
.shop_franchser_number span {
  font-size: 24px;
  font-weight: 500;
  /* color: rgba(0, 150, 255, 1); */
  /* background-color:crimson; */
}
.shop_sony {
  margin-top: 9px;
  float: left;
  box-sizing: border-box;
  width: 204px;
  height: 74px;
  border: 1px solid rgba(0, 255, 198, 1);
  background: rgba(0, 255, 198, 0.2);
  margin-left: 10px;
  border-radius: 4px;
}
.shop_sony_name {
  width: 60px;
  height: 34px;
  font-size: 20px;
  font-family: "Source Han Sans CN";
  font-weight: 500;
  color: rgba(0, 255, 198, 1);
  line-height: 34px;
  margin-left: 7px;
  margin-top: 0px;
}
.shop_sony_number {
  width: auto;
  height: 34px;
  font-size: 34px;
  font-family: "Source Han Sans CN";
  font-weight: 500;
  color: rgba(0, 255, 198, 1);
  line-height: 34px;
  text-align: right;
  padding-right: 8px;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.88);
  /* background-color:crimson; */
}
.shop_sony_number span {
  margin-left: 3px;
  font-size: 24px;
  /* background-color:gold; */
}
.shop_border {
  height: 9px;
  width: 451px;
  background-image: url(../assets/images/break_up@2x.png);
  background-repeat: no-repeat;
  background-size: 100%;
}
.shop_borderBottom {
  height: 0px;
  width: 451px;
}
.right_bottom {
  height: 31px;
  width: 100%;
  /* background-color:rgb(255, 0, 106,0.2); */
  position: absolute;
  top: 872px;
}
.right_bottom_left {
  height: 31px;
  width: 31px;
  /* background-color:tomato; */
  background-image: url(../assets/images/left3@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.right_bottom_right {
  height: 31px;
  width: 31px;
  position: absolute;
  right: 0;
  top: 0;
  background-image: url(../assets/images/right4@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>