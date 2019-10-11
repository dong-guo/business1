<template>
  <div class="reach">
    <ul>
      <li class="reach_after"  :class="{'textColor1':discColor1}">
        <div class="reach_after_disc" :class="{'activeColor1':discColor1}"></div>
        <span>完全开发区域</span>
      </li>
      <li class="reach_after" :class="{'textColor2':discColor2}">
        <div class="reach_after_disc" :class="{'activeColor2':discColor2}"></div>
        <span>未完全开发区域</span>
      </li>
      <li class="reach_after">
        <div class="reach_after_disc"></div>
        <span>未开发区域</span>
      </li>
    </ul>
  </div>

</template>
<script>
export default {
  name:'prachprovincial',
  data(){
    return {
      discColor1:true,
      discColor2:true,
    }
  },
}
</script>

<style scoped>
.reach {
  /* background-color:saddlebrown; */
  width: 260px;
  height: 180px;
  position: absolute;
  top: 130px;
  left: 90px;
  font-size: 30px;
  font-weight: 400;
  color: rgba(229, 229, 229, 1);
  line-height: 31px;
}
.reach_after {
  height: 60px;
  width: 260px;
  /* border: 1px solid #fff */
}
.reach_after_disc{
  width:20px;
  height:20px;
  border-radius:50%;
  display:inline-block;
  margin-right:17px;
  border:1px solid rgba(43, 58, 124, 1);
  list-style-type:circle;
}
/* .reach_after:hover{
  color: rgba(51, 216, 250, 1);
} */
.textColor1{
  color: rgba(51, 216, 250, 1);
}
.textColor2{
  color: #AC4ED3;
}
.activeColor1{
  background:rgba(51,216,250,1);
}
.activeColor2{
  background:#AC4ED3;
}
</style>