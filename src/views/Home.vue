<template>
  <div class="home">
    <div class="home_head">
      <p>
        <span :class="{'home_head_change':drawBoxKey}">慕思招商系统</span>
      </p>
    </div>
    <div class="home_body">
      <world></world>
      <reach></reach>
      <global></global>
      <div class="home_body_top">
        <p>截止目前,全球共有门店<span>(家)</span></p>
        <div class="home_body_bg">
          <ul>
            <li v-for="(item,index) in stringNum" :key="item+index">{{item}}</li>
          </ul>
        </div>
      </div>
      <body-right></body-right>
    </div>
  </div>
</template>

<script>
import World from "../components/World.vue"
import Reach from "../components/Reach.vue";
import BodyRight from "../components/BodyRight.vue";
import Global from "../components/Global.vue";

import balloonIcon from "../base64/balloon";

import { mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      myEcharts: null,
      stringNum:''
    };
  },
  components: {
    BodyRight,
    Reach,
    Global,
    World
  },
  computed: {
    ...mapState({
      drawBoxKey: state => state.home.boxKey,
      drawAllNum: state => state.home.allNum
    })
  },
  mounted() {
    this.changeNum()
    console.log(555,this.stringNum)
    console.log(556,typeof(this.stringNum))

  },
  methods: {
    changeNum(){    
     this.stringNum = this.drawAllNum.toString()

    }
  }
};
</script>
<style scoped>
.home {
  height: 1080px;
  width: 1920px;
  /* background-color:#2B3A7C; */
  background-image: url(../assets/images/background@2x.png);
}
.home_head {
  height: 96px;
  width: 1920px;
  background-image: url(../assets/images/home_head@2x.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.home_head p {
  width: 797px;
  height: 228px;
  margin: 0 auto;
  text-align: center;
  font-size: 46px;
  font-weight: medium;
  color: #fff;
  background-image: url(../assets/images/home_head_change@2x.png);
  background-repeat: no-repeat;
  background-size: 100%;
}
.home_head_change {
  text-shadow: 2px 2px 9px rgba(1, 21, 59, 1);
}
.home_body {
  height: 984px;
  width: 1920px;
  /* background-color: yellow; */
}
.home_body_top {
  height: 132px;
  width: 432px;
  position: absolute;
  top: 126px;
  left: 747px;
  /* top:-954px;
 left:747px; */
}
.home_body_top p {
  width: 432px;
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
  font-size: 36px;
  line-height: 40px;
  text-align: center;
  /* border:1px solid red; */
}
.home_body_top span {
  font-size: 24px;
}
.home_body_bg{
  height: 28px;
  width: 380px;
  background-image: url(../assets/images/two_border@2x.png);
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  top: 46px;
}
.home_body_bg ul {
  /* background:rgba(255, 255, 255,0.2); */
  height: 73px;
  width: 291px;
  margin-left:39px;
  position: relative;
  top:-23px;
}
.home_body_top li {
  float: left;
  height: 73px;
  width: 50px;
  background-image: url(../assets/images/number_border@2x.png);
  background-size: 100%;
  margin-left: 20px;
  /* margin-top: -23px; */
  text-align: center;
  line-height: 64px;
  font-size: 43px;
  font-weight: 400;
  color: #5fbbf0;
}
/* #world_box {
  height: 984px;
  width: 1920px;
  background-color:yellow;
} */
</style>