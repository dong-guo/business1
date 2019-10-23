<template>
  <div class="select_combobox">
    <div class="select_combobox_box">
      <div class="combobox" @click="openValueCountry">
        <input type="text" v-model="valueCountry" placeholder="国家" />
        <img src="../assets/images/iconfont-xiasanjiao@2x.png" alt />
      </div>
      <div class="list" v-show="showCountry">
        <ul>
          <li
            @click="getValueCountry(index,item)"
            v-for="(item,index) in drawCountry"
            :key="item.index"
          >{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="select_combobox_box">
      <div class="combobox" @click="openProvincial" id="combobox2">
        <input type="text" v-model="valueProvincial" :placeholder="showPlaceHoleder" />
        <img src="../assets/images/iconfont-xiasanjiao@2x.png" alt />
      </div>
      <div class="list" v-show="showProvincial">
        <ul>
          <li
            @click="getProvincial(index,item)"
            v-for="(item,index) in drawProvincial"
            :key="item.index"
          >{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="select_combobox_box">
      <div class="combobox" @click="openCity" id="combobox3">
        <input type="text" v-model="valueCity" placeholder="市" />
        <img src="../assets/images/iconfont-xiasanjiao@2x.png" alt />
      </div>
      <div class="list" v-show="showCity">
        <ul>
          <li @click="getCity(index,item)" v-for="(item,index) in drawCity" :key="item.index">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import { mapState } from "vuex";

export default {
  name: "selectCombobox",
  data() {
    return {
      showPlaceHoleder:'省',
      showCountry: false,
      showProvincial: false,
      showCity: false,
      valueCountry: "",
      valueProvincial: "",
      valueCity: ""
    };
  },
  mounted(){
    this.requestCountry()
  },
  computed:{
    ...mapState({
      drawCountry: state => state.succession.country,
      drawProvincial: state => state.succession.provincial,
      drawCity: state => state.succession.city,
    })
  },
  watch:{
    valueCountry(newValue,oldValue){
      console.log('valueCountry',newValue)
      this.requestProvincial()
    },
    valueProvincial(newValue,oldValue){
      console.log('75行valueProvincial',newValue)
      this.requestCity()
      this.valueCity =''
    },
  },
  methods: {
    //请求国家
    requestCountry(){
      axios.get("https://mobiletest.derucci.net/consumer-admin/api/merchants/getCountryList").then(res =>{
       let country = res.data.data
        this.$store.commit("succession/setCountryChange",country)
        console.log('selectCombobox-country',country)
      })
    },
    //请求中国省份
    requestProvincial(){
      if(this.valueCountry == '中国'){
        let country = this.valueCountry
        console.log('country',country)
        let contentType = 'text/plain'
        let authorization = 'token'
        console.log('this.valueCountry',country)
        axios.get("https://mobiletest.derucci.net/consumer-admin/api/merchants/getProvinceList",{params:{country:country},headers:{contentType:contentType,authorization:authorization}})
        .then(res =>{
          let provincial =res.data.data
          this.$store.commit("succession/setProvincialChange",provincial)
          console.log('provincial-109',provincial)
        }) 
      } else{
        this.valueProvincial=''
        this.valueCity=''
        let provincial = ''
        this.$store.commit("succession/setProvincialChange",provincial)
      }    
    },
    //请求城市
    requestCity(){
      let province = this.valueProvincial
      let country = this.valueCountry
      console.log('国家，省',country,province)
      let authorization = 'token'
      let contentType = 'form-data' 
      axios.get("https://mobiletest.derucci.net/consumer-admin/api/merchants/getCityList",{params:{country:country,province:province},headers:{contentType:contentType}})
      .then(res =>{
         let city = res.data.data
         this.$store.commit("succession/setCityChange",city)
         console.log('city,116行',city)
      })    
    },
    openValueCountry() {
      this.showCountry = !this.showCountry;
      this.showProvincial = false;
      this.showCity = false;
    },
    getValueCountry(index, item) {
      this.valueCountry = item;
      this.$store.commit("succession/setValueCountry",this.valueCountry)
      this.showCountry = false;
    },
    openProvincial() {
      if(this.valueCountry=='中国'){
        this.showProvincial = !this.showProvincial;
        this.showCountry = false;
        this.showCity = false;
      } else{
        this.showProvincial = false
      }
    },
    getProvincial(index, item) {
      this.valueProvincial = item;
      this.$store.commit("succession/setValueProvincial",this.valueProvincial)
      this.showProvincial = false;
    },
    openCity() {
      if(this.valueCountry=='中国'){
        this.showCity = !this.showCity;
        this.showCountry = false;
        this.showProvincial = false;        
      }else{
        this.showCity = false
      }
    },
    getCity(index, item) {
      this.valueCity = item;
      let undevelopedCity = this.valueCity
      if(this.valueCountry == '中国'){
        this.$store.commit("succession/setValueCity",undevelopedCity)
        this.showCity = !this.showCity;
      }else{
        undevelopedCity = ''
        this.$store.commit("succession/setValueCity",undevelopedCity)
      }
    }
  }
};
</script>

<style scoped>
.select_combobox {
  position: relative;
  display: flex;
  z-index: 1;
  /* background-color: deeppink; */
}
.select_combobox_box {
  /* display:inline-block; */
  margin-right: 20px;
}
.combobox {
  width: 204px;
  height: 74px;
  border: 1px solid rgba(14, 109, 233, 1);
  box-sizing: border-box;
  position: relative;
  /* display:inline-block; */
  /* margin-right: 20px; */
}
.combobox input {
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  font-size: 26px;
  line-height: 74px;
  text-indent: 18px;
  border-radius: 4px;
  background-color: rgba(14, 109, 233, 0.2);
  color: rgba(0, 150, 255, 1);
}
.combobox ::-webkit-input-placeholder {
  color: rgba(0, 150, 255, 1);
}
.combobox img {
  position: absolute;
  top: 29px;
  left: 160px;
  width: 24px;
  height: 16px;
}
.list {
  width: 204px;
  overflow: auto;
  border: 1px solid rgba(14, 109, 233, 1);
  margin-top: 6px;
  border-radius: 4px;
  box-sizing: border-box;
  height: 360px;
}
.list::-webkit-scrollbar {
  display: none;
}
.list ul li {
  width: 100%;
  height: 73px;
  font-size: 26px;
  text-indent: 18px;
  font-weight: 500;
  color: rgba(224, 230, 246, 1);
  line-height: 73px;
  background-color: rgba(14, 109, 233, 0.9);
  border-bottom: 1px solid rgba(14, 109, 233, 1);
  box-sizing: border-box;
}
.list ul li:hover {
  background-color: rgb(95, 160, 245);
}
</style>