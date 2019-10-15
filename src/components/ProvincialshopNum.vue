<template>
<div class="provincialShop">
  <div class="singleShop">
    <div class="yellowballoon"></div>
    <p>单品店(5)</p>
    </div>
  <div class="generalStore">
    <div class="greenballoon"></div>
      <p>综合店(8)</p>
    </div>
</div>

</template>
<script>
export default{

}
</script>

<style scoped>
.provincialShop{
  width:180px;
  height:103px;
  /* background-color:green; */
}
.singleShop{
  display:flex;
  /* background-color:burlywood; */
  height:40px;
  width:180px;
}
.yellowballoon{
 margin-right:17px;
 width:32px;
 height:40px;
 /* border:1px solid pink; */
 background-image:url(../assets/images/greenBalloon@2x.png);
 background-repeat:no-repeat;
 background-size:cover;
}
.singleShop p{
  width:128px;
  height:40px;
  /* border:1px solid red; */
  color:#00AF6D;
  font-size:30px;
}
.generalStore{
  /* background-color:rgb(135, 197, 222); */
  height:40px;
  width:180px;
  margin-top:32px;
  display:flex;
  position:absolute;
  bottom:0;
  left:0;
}
.greenballoon{
 margin-right:17px;
 width:32px;
 height:40px;
 /* border:1px solid pink; */
 background-image:url(../assets/images/yellowBalloon@2x.png);
 background-repeat:no-repeat;
 background-size:cover;
}
.generalStore p{
  width:128px;
  height:40px;
  /* border:1px solid red; */
  color:#E6AF08;
  font-size:30px; 
}
</style>