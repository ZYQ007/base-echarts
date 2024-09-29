# base-echarts

基于 echarts+vue3+vite

## 功能

1. 自适应浏览器窗口
2. 自适应盒子宽高
3. tooltip 支持轮播、鼠标悬停
4. 支持Echarts原生事件


## 基本配置
```html
<BaseEcharts
  :options="options"
  :width="width"
  :height="height"
  :istool="true"
  :interval="2000"
  :loopSeries="true"
  :seriesIndex="0">
</BaseEcharts>
```
```
options      图表基本配置

width        宽度 默认 100%  宽高默认100%，如果外层div不设宽度和高度，需要绑定宽高

height       高度 默认 100%

istool       是否允许tooltip自动轮播 默认关闭 false

interval     tooltip 轮播时间间隔 默认 2000

loopSeries   true表示循环所有series的tooltip, false则显示指定 seriesIndex 的 tooltip

seriesIndex  默认为0，指定某个系列（option中的series索引）循环显示tooltip,当loopSeries为true时，
             从seriesIndex系列开始执行
             
isCache      默认为false， 是否关闭echarts缓存             
```

## 使用方式

### 安装： npm install base-echarts

### 引用：
   1. 组件内引用：
   ```
   import { BaseEcharts } from 'base-echarts'
   ```

   2. 全局挂载使用：
   ```
   // main.js
   
   import { install } from 'base-echarts'
   app.use(install)
   ```

### 基本配置：

```html
<BaseEcharts
  :options="options"
  :width="width"
  :height="height"
  :istool="true"
  :interval="2000"
  :loopSeries="true"
  :seriesIndex="0"
  :isCache="false">
</BaseEcharts>
```

### 事件调用
内置了echarts所有鼠标交互事件, 其他属性或事件可通过实例对象 echartsInstance() 调用;

例： echartsInstanche().clear() // 由于子组件获取实例异步的问题，向外暴露了一个返回实例的函数

![img_2.png](img_2.png)

##### 使用方法：通过 ref 调用，注意一定要在dom元素渲染完成后调用，写在onMounted 或 nextTick中
```html

<script setup lang="ts">
   import {BaseEcharts} from "base-echarts";
   import {onMounted, ref} from "vue";

   let echarts = ref(null)
   onMounted(() => {
      // 点击事件调用
      echarts.value.onClick( e => {
        console.log(e);
      }) 
     // 或
     echarts.value.echartsInstanche().on('click', function (e) {
       console.log(e);
     })
   })
</script>
<template>
   <BaseEcharts :options="options" ref="echarts"></BaseEcharts>
</template>
```
```html
小版本不断更迭，烦请多多包涵，很多问题是是在使用中发现的，最近一次更新优化了tooltip跳动错乱的问题，
如果使用过程中没有遇到的问题，建议不要轻易升级
```
