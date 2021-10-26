<p align="center">
  <img src="./public/logo.png" />
</p>

一个小巧玲珑的 vue 组件切换动画库, 支持 10 几种动画切换方式, 效果十分炫酷并且非常轻量哦~

<img src="http://mat1.gtimg.com/www/js/news/fadeIn.gif" alt="fadeIn" width="200" height="330"><img src="http://mat1.gtimg.com/www/js/news/zoomRotateIn.gif" alt="zoomRotateIn" width="200" height="330"><img src="http://mat1.gtimg.com/www/js/news/flip.gif" alt="flip" width="200" height="330"><img src="http://mat1.gtimg.com/www/js/news/shuttleRight.gif" alt="shuttleRight" width="200" height="330">

`codesandbox`在线调试 [https://codesandbox.io/s/practical-sid-0ubim](https://codesandbox.io/s/practical-sid-0ubim)

## 安装

```shell
npm install transx
or
yarn add transx
```

## 使用

```html
<!-- 包裹动画元素 -->
<trans-x
  :time="time"
  :delay="delay"
  :autoplay="autoplay"
  :loop="loop"
  :nextTransition="nextTransition"
  :prevTransition="prevTransition"
  ref="transx"
  @over="over"
  @transitionend="transitionEnd"
>
  <div class="comp" v-for="(item, index) in items" :key="index" :index="index + 1"></div>
</trans-x>

```

```javascript
import TransX from "transx";

export default {
  components: {
    TransX
  },
  data() {
    return {
      time: 0.6,
      loop: true,
      autoplay: 1000,
      delay: -1,
      nextTransition: "fadeIn",
      prevTransition: "fadeIn",
      defaultIndex: 0
    }
  }
}
```

## 支持参数
|  参数   | 说明  | 类型  | 默认值  | 备注 |
|  ----  | ----  |----  | ----  |  ----  |
| time  | 动画时长 | number | 0.6 | 单位秒  |
| loop  | 是否循环展现 | boolean | true |   |
| autoplay  | 是否自动循环 | boolean, number | false | autoplay传递为true时，会赋予默认值1000，单位毫秒  |
| delay  | 动画间隔 | number | -1 |   |
| defaultIndex  | 默认显示第几张 | number | 0 |   |
| nextTransition  | 下一个的动画，动画种类见下方 | string | moveLeftBack |   |
| prevTransition  | 上一个的动画，动画种类见下方 | string | moveRightBack |   |


## 支持事件
- `over` - 跳转到了边界后的回调，当在第一页继续上翻和在最后一页继续下翻时调用
```javascript
  over: function(isEnd) {
    console.log('边界到了', isEnd);
  }
```
** 说明：当边界为翻到第一页时isEnd为false，当边界为翻到最后一页时isEnd为true，
- `transitionend` - 动画结束时的回调，在动画结束后调用，参数为当前的索引，值从0开始
```javascript
  transitionEnd: function(currentIndex) {
    console.log("当前到第几页了: ", currentIndex);
  }
```
## 支持API
- `goto` - 跳转到第几页，参数为页码标识，索引从0开始
```javascript
    this.$refs.transx.goto(3); // 跳转到第四页
```
- `prev` - 跳转到上一页
```javascript
    // 不传参
    this.$refs.transx.prev();
    // 传参
    this.$refs.transx.prev({
        time: 0.6,
        delay: -1,
        transition: "moveLeftQuart", // 参考下面[支持动画种类]
    });
```
- `next` - 跳转到下一页
```javascript
    // 不传参
    this.$refs.transx.next();
    // 传参
    this.$refs.transx.next({
        time: 0.6,
        delay: -1,
        transition: "moveLeftQuart", // 参考下面[支持动画种类]
    });
```

## 支持的动画种类
- `fadeIn`: 淡入
- `fadeOut`: 淡出
- `flip`: 翻转
- `moveLeftQuart`: 
- `moveRightQuart`: 
- `moveLeftBack`: 
- `moveRightBack`: 
- `zoomOutBack`: 
- `zoomInBack`: 
- `rotateLeftBack`: 
- `rotateRightBack`: 
- `rotateLeftTop`: 
- `rotateRightTop`: 
- `zoomRotateIn`: 
- `zoomRotateOut`: 
- `shuttleLeft`: 
- `shuttleRight`: 
- `shuttleDown`: 
- `shuttleUp`: 
- `rollLeft`: 
- `rollRight`: 
- `scaleXLeft`: 
- `scaleXRight`: 

** 说明：种类较多，[示例在这](https://codesandbox.io/s/practical-sid-0ubim), 试试再选择，说不定有意外惊喜哦~
## License

[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
