<template>
<div class="global_country">
    <router-link :to="{name:'home'}">
      <div class="global_world">
        <p>全球</p>
      </div>
    </router-link>  
    <router-link :to="{name:'china'}">
       <div class="choose_country">
         <p>中国</p>
       </div>
    </router-link>
</div>

</template>
<script>
export default{

}
</script>

<style scoped>
.global_country{
  width:436px;
  height:173px;
  /* background-color:violet; */
  display:flex;
  justify-content:space-between;
}
.global_world {
  height: 173px;
  width: 208px;
  background-image: url(../assets/images/superior@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  /* border:1px solid gold; */
}
.global_world p {
  color: rgba(255, 255, 255, 1);
  font-size: 36px;
  font-weight: 400;
  line-height: 38px;
  padding-left: 74px;
  padding-top: 68px;
  letter-spacing:10px;
  background:linear-gradient(0deg,rgba(255,255,255,1) 0%, rgba(51,216,250,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  /* margin-left:74px;
  margin-top:46px; */
}
.choose_country{
  height: 173px;
  width: 208px;
  background-image: url(../assets/images/choose@2x.png);
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  /* border:1px solid green; */
}
.choose_country p {
  color: rgba(255, 255, 255, 1);
  font-size: 36px;
  font-weight: 400;
  line-height: 38px;
  padding-left: 74px;
  padding-top: 68px;
  letter-spacing:10px;
}
</style>