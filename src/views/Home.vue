<template>
  <div class="home">
    <!-- <div class="home_head">
      <p>
        <span :class="{'home_head_change':drawBoxKey}">慕思招商系统</span>
      </p>
    </div> -->
    <div class="home_body">
      <world></world>
      <reach class="reach"></reach>
      <global class="home_global"></global>
      <div class="home_body_top">
        <p>截止目前,全球共有门店<span>(家)</span></p>
        <div class="home_body_bg">
          <ul>
            <li v-for="(item,index) in stringNum" :key="item+index">{{item}}</li>
          </ul>
        </div>
      </div>
      <body-right></body-right>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
    </div>
    <router-view></router-view>
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
    World,
  },
  computed: {
    ...mapState({
      drawBoxKey: state => state.home.boxKey,
      drawAllNum: state => state.home.allTotal
    })
  },
  watch:{
    drawAllNum(newValue,oldValue){
      console.log('AllNum',this.drawAllNum)
      this.changeNum()
    }
  },
  mounted() {
    this.changeNum()
  },
  methods: {
    changeNum(){    
     this.stringNum = this.drawAllNum.toString()
    }
  }
};
</script>

<style scoped >
@import '../styleCss/background.css';

.home {
  /* width: 1920px; */
  /* background-color:#2B3A7C; */
  /* background-image: url(../assets/images/background@2x.png); */
}

.home_body {
  height: 984px;
  width: 1920px;
  /* background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%); */
  overflow:hidden;
}
.home_body_top {
  height: 132px;
  width: 432px;
  position: absolute;
  top: 126px;
  left: 747px;
}
.home_body_top p {
  width: 432px;
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
  font-size: 36px;
  line-height: 40px;
  text-align: center;
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
  /* background-color:green; */
}
.home_body_bg ul {
  /* border:1px solid yellow; */
  height: 73px;
  width: 291px;
  margin-left:39px;
  /* margin-left:50px;
  width:278px; */
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
  text-align: center;
  line-height: 64px;
  font-size: 43px;
  font-weight: 400;
  color: #5fbbf0;
}
.home_global{
  /* position: absolute; */
  top: 843px;
  left:  44px;
  /* border:1px solid yellow; */
}
.reach{
  position: absolute;
  top: 130px;
  left: 90px;
}
.router-view{
  color:brown;
}
</style>