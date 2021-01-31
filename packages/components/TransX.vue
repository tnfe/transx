<template>
  <div class="">
    <slot></slot>
  </div>
</template>

<script>
import gsap from "gsap";
import getAnimate from "../utils/animate";

export default {
  name: "TransX",
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    delay: {
      type: Number,
      default: -1
    },
    time: {
      type: Number,
      default: 0.6
    },
    nextTransition: {
      type: String,
      default: "moveLeftBack"
    },
    prevTransition: {
      type: String,
      default: "moveRightBack"
    }
  },
  data: function() {
    return {
      state: "end",
      currentIndex: 0,
      list: []
    };
  },
  mounted() {
    this.currentIndex = this.defaultIndex;
    this.addSubList();
    this.showCurrentComp();
  },
  methods: {
    addSubList: function() {
      this.$slots.default.forEach(vnode => {
        if (vnode.tag) {
          const elem = vnode.elm;
          const displayStyle = elem.style.display || "block";
          elem.setAttribute("data", displayStyle);
          this.list.push(elem);
        }
      });
    },

    showCurrentComp: function() {
      this.list.forEach((elem, index) => {
        if (index == this.currentIndex) {
          this.showComp(elem);
        } else {
          this.hideComp(elem);
        }
      });
    },

    showComp: function(elem) {
      const displayStyle = elem.getAttribute("data") || "block";
      elem.style.display = displayStyle;
    },

    hideComp: function(elem) {
      elem.style.display = "none";
      elem.style.zIndex = 9;
    },

    setToTop: function(elem) {
      elem.parentNode.appendChild(elem);
      elem.style.zIndex = 999;
    },

    prev: function(conf = {}) {
      if (this.state != "end") return;

      let { time, delay, prevTransition } = conf;
      time = time || this.time;
      delay = delay || this.delay;
      prevTransition = prevTransition || this.prevTransition;

      if (this.currentIndex <= 0) {
        this.$emit("over");
        return;
      }

      const current = this.list[this.currentIndex];
      const next = this.list[this.currentIndex - 1];
      this.transition({ current, next, delay, time, transType: prevTransition, direction: "prev" });
    },

    next: function(conf = {}) {
      if (this.state != "end") return;

      let { time, delay, nextTransition } = conf;
      time = time || this.time;
      delay = delay || this.delay;
      nextTransition = nextTransition || this.nextTransition;

      if (this.currentIndex >= this.list.length - 1) {
        this.$emit("over");
        return;
      }

      const current = this.list[this.currentIndex];
      const next = this.list[this.currentIndex + 1];
      this.transition({ current, next, delay, time, transType: nextTransition, direction: "next" });
    },

    goto: function(index) {
      this.currentIndex = index;
      this.showCurrentComp();
      // this.killAll();
      const current = this.list[this.currentIndex];
      gsap.set(current, { x: 0, y: 0, rotation: 0, alpha: 1, scale: 1 });
      this.$emit("gotoend", this.currentIndex);
    },

    killAll: function() {
      this.list.forEach(elem => {
        gsap.killTweensOf(elem);
      });
    },

    transition: function({ current, next, delay, time, transType, direction }) {
      this.state = "running";
      this.showComp(current);
      this.showComp(next);
      this.setToTop(next);

      const { one, two } = getAnimate(transType);
      const to = { x: 0, y: 0, rotation: 0, alpha: 1, scale: 1 };
      delay = delay < 0 ? time * 0.65 : delay;

      gsap.to(current, { duration: time, transformOrigin: "50% 50%", ...one.to });
      gsap.fromTo(next, two.from, {
        ...to,
        delay,
        duration: time,
        transformOrigin: "50% 50%",
        ...two.to,
        onComplete: this.transitionEnd,
        onCompleteParams: [direction]
      });
    },

    transitionEnd: function(direction) {
      this.state = "end";
      if (direction == "next") this.currentIndex++;
      else this.currentIndex--;
      this.showCurrentComp();
      this.$emit("transitionend", this.currentIndex);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
