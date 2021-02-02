![](./transx.png)

# TransX

一个小巧玲珑的 vue 组件切换动画库, 支持 10 几种动画切换方式

## 安装

```shell
npm install transx
```

## 使用

```javascript
import TransX from "transx";
...

  components: {
    TransX
  },
```

```html
<!-- 包裹动画元素 -->
<trans-x
  :time="0.7"
  :nextTransition="nextTransition"
  :prevTransition="prevTransition"
  ref="transx"
  @over="over"
  @transitionend="transitionEnd"
>
  <div class="comp" v-for="(item, index) in items" :key="index" :index="index + 1"></div>
</trans-x>
```

### 调用方法-切换到下一页

```javascript
methods: {
  transition: function(type) {
    const { transx } = this.$refs;
    if (type == "next")
      transx.next();
    else
      transx.prev();
  },

  goto: function(){
    const { transx } = this.$refs;
    transx.goto(3);
  },

  over: function() {
    alert("到头了");
  },

  transitionEnd: function(currentIndex) {
    this.currentIndex = currentIndex;
  }
}
```

### 组件属性

- `defaultIndex` - 默认显示第几张
- `time` - 动画时长
- `delay` - 动画间隔
- `nextTransition` - 下一个动画方式
- `prevTransition` - 上一个动画方式

### 组件事件

- `over` - 跳转到了边界
- `transitionend` - 动画结束

## 动画种类

```javascript
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
```

## License

[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
