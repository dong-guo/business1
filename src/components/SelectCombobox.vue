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
            v-for="(item,index) in country"
            :key="item.index"
          >{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="select_combobox_box">
      <div class="combobox" @click="openProvincial" id="combobox2">
        <input type="text" v-model="valueProvincial" placeholder="省" />
        <img src="../assets/images/iconfont-xiasanjiao@2x.png" alt />
      </div>
      <div class="list" v-show="showProvincial">
        <ul>
          <li
            @click="getProvincial(index,item)"
            v-for="(item,index) in provincial"
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
          <li @click="getCity(index,item)" v-for="(item,index) in city" :key="item.index">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "selectCombobox",
  data() {
    return {
      country: [
        "中国",
        "美国",
        "日本",
        "澳大利亚",
        "柬埔寨",
        "德国",
        "法国",
        "印度",
        "俄罗斯",
        "英国",
        "巴西"
      ],
      provincial: ["广东", "广西", "湖南", "福建", "山东"],
      city: ["广州", "深圳", "佛山", "珠海", "东莞"],
      showCountry: false,
      showProvincial: false,
      showCity: false,
      valueCountry: "",
      valueProvincial: "",
      valueCity: ""
    };
  },
  methods: {
    openValueCountry() {
      this.showCountry = !this.showCountry;
      this.showProvincial = false;
      this.showCity = false;
    },
    getValueCountry(index, item) {
      this.valueCountry = item;
      this.showCountry = false;
    },
    openProvincial() {
      this.showProvincial = !this.showProvincial;
      this.showCountry = false;
      this.showCity = false;
    },
    getProvincial(index, item) {
      this.valueProvincial = item;
      this.showProvincial = false;
    },
    openCity() {
      this.showCity = !this.showCity;
      this.showCountry = false;
      this.showProvincial = false;
    },
    getCity(index, item) {
      this.valueCity = item;
      this.showCity = !this.showCity;
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