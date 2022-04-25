<template>
  <div id="app">
    <div class="group">
      <trans-x
          :time="0.7"
          :loop="true"
          :autoplay="false"
          :nextTransition="nextTransition"
          :prevTransition="prevTransition"
          ref="transx"
          @over="over"
          @transitionend="transitionEnd"
      >
        <template v-for="(item, index) in items" :key="index">
          <comp  class="comp" :index="index + 1"> </comp>
        </template>
      </trans-x>
    </div>

    <div>
      <div class="btn-group">
        <div>当前第{{ currentIndex + 1 }}个组件</div>
      </div>

      <div class="btn-group">
        <div class="button" @click="transition('prev')">上一个</div>
        <div class="button" @click="transition('next')">下一个</div>
        <div class="button" @click="goto">跳 转</div>
      </div>

      <div class="btn-group">
        <div class="transition">
          <span>prevTransition </span>
          <select v-model="prevTransition">
            <option v-for="(option, index) in options" :value="option.value" :key="index">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="transition">
          <span>nextTransition </span>
          <select v-model="nextTransition">
            <option v-for="(option, index) in options" :value="option.value" :key="index">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comp from "./Comp.vue";
import TransX from "../packages/components/TransX";

export default {
  name: "App",
  components: {
    Comp,
    TransX
  },
  data: function() {
    return {
      currentIndex: 0,
      items: [1, 2, 3, 4, 5],
      nextTransition: "moveRightBack",
      prevTransition: "moveLeftBack",
      options: [
        { text: "fadeIn", value: "fadeIn" },
        { text: "fadeOut", value: "fadeOut" },
        { text: "flip", value: "flip" },
        { text: "moveLeftQuart", value: "moveLeftQuart" },
        { text: "moveRightQuart", value: "moveRightQuart" },
        { text: "moveLeftBack", value: "moveLeftBack" },
        { text: "moveRightBack", value: "moveRightBack" },
        { text: "zoomOutBack", value: "zoomOutBack" },
        { text: "zoomInBack", value: "zoomInBack" },
        { text: "rotateLeftBack", value: "rotateLeftBack" },
        { text: "rotateRightBack", value: "rotateRightBack" },
        { text: "rotateLeftTop", value: "rotateLeftTop" },
        { text: "rotateRightTop", value: "rotateRightTop" },
        { text: "zoomRotateIn", value: "zoomRotateIn" },
        { text: "zoomRotateOut", value: "zoomRotateOut" },
        { text: "shuttleLeft", value: "shuttleLeft" },
        { text: "shuttleRight", value: "shuttleRight" },
        { text: "shuttleDown", value: "shuttleDown" },
        { text: "shuttleUp", value: "shuttleUp" },
        { text: "rollLeft", value: "rollLeft" },
        { text: "rollRight", value: "rollRight" },
        { text: "scaleXLeft", value: "scaleXLeft" },
        { text: "scaleXRight", value: "scaleXRight" }
      ]
    };
  },
  methods: {
    transition: function(type) {
      if (type == "next") this.$refs.transx.next();
      else this.$refs.transx.prev();
    },
    goto: function() {
      this.$refs.transx.goto(0);
      this.currentIndex = 0;
    },
    over: function(isEnd) {
      console.log("结束", isEnd);
    },
    transitionEnd: function(currentIndex) {
      this.currentIndex = currentIndex;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 40px 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.group {
  margin: 0 auto;
  position: relative;
  left: 50%;
  margin-left: -200px;
  height: 650px;
  width: 400px;
}

.transition {
  margin: 10px;
}

.comp {
  position: absolute;
  top: 0;
  left: 0;
}

.button {
  margin: 20px auto;
  width: 180px;
  height: 50px;
  background: #fccff2;
  position: relative;
  line-height: 50px;
}
.btn-group .button {
  display: inline-block;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  height: 40px;
  width: 120px;
  color: #fff;
  background: #22ccff;
  line-height: 40px;
  cursor: pointer;
}
</style>
