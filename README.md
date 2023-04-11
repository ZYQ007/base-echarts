# base-echarts

基于 echarts+vue3+vite

## 功能

1. 自适应浏览器窗口
2. 自适应盒子宽高
3. tooltip 支持轮播、鼠标悬停
4. 支持图表点击事件获取对应信息


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
```

## 使用方式

#### 安装： npm install base-echarts

#### 引用：
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

#### 基本配置：

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

#### 点击获取信息
```html
<script setup lang="ts">
  import { BaseEcharts } from "base-echarts";
  const getParam = (params) => {
    console.log(params)
  }
</script>
<template>
  <BaseEcharts :options="options" @echartsClick="getParam"></BaseEcharts>
</template>
```
#### 图表自适应事件
```html
<script setup lang="ts">
  import { BaseEcharts } from "base-echarts";
  // 一般情况下，内置自适应事件，遇到特殊情况可单独调用
  const updateSize = (fun) => {
    fun()
  }
</script>
<template>
  <BaseEcharts :options="options" @updateSize="updateSize"></BaseEcharts>
</template>
```
#### 优化
1.     2.1.7 之前的版本没有针对某一个div单独的宽高变化进行适配，2.1.8优化了这个问题，使用ResizeObserver
       侦听div的宽高变化进行适配
2.     将默认高度改为100%，方便用户根据外层盒子改变BaseEcharts宽高
