# base-echarts

基于 echarts+vue3+vite 的可轮播共用组件

## 基本配置

1. height / width 设置宽高的同时可监听宽度高度是否发生变化，进行图表自适应
2. option 针对图表的单独配置
3. istool 是否开启悬浮框自动播放 (默认关闭)
4. interval 设置悬浮框多久切换（默认3s）
5. loopseries 是否开启悬浮框循环播放（默认开启）


## 使用方式
1. 文件内单独引用 <br>
import { BaseEcharts } from 'base-echarts'
2. 全局挂载使用 <br>
   import { install } from 'base-echarts'<br>
   app.use(install)

## 待完善
内置点击事件 ...
