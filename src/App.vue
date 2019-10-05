<template>
  <div id="app">
    <div class="app-home">
      <div class="home_head">
        <p>
          <span :class="{'home_head_change':drawBoxKey}">慕思招商系统</span>
        </p>
      </div>
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState({
      drawBoxKey: state => state.home.boxKey,
    })
  }
};
</script>
<style lang="scss">
html {
  margin: 0;
  padding: 0;
  height: 1080px;
  width: 1920px;
}
#app {
  margin: 0;
  padding: 0;
}
.app-home{
  background-image: url(./assets/images/background@2x.png);
  height: 1080px;
  width: 1920px;
}
.home_head {
  height: 96px;
  width: 1920px;
  background-image: url(./assets/images/home_head@2x.png);
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
  background-image: url(./assets/images/home_head_change@2x.png);
  background-repeat: no-repeat;
  background-size: 100%;
}
.home_head_change {
  text-shadow: 2px 2px 9px rgba(1, 21, 59, 1);
}
</style>
