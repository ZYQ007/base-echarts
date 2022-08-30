<template>
  <div class="echarts" ref="chartRef" :style="{ height, width }" />
</template>
<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  nextTick,
  watchEffect,
  computed,
  watch
} from 'vue'
import * as echarts from 'echarts'
import tools from './tooltip-auto-show-vue'

let chartsArr = []
export default defineComponent({
  name: 'BaseEcharts',
  props: {
    height: {
      type: String,
      default: '300px'
    },
    width: {
      type: String,
      default: '100%'
    },
    option: {
      type: Object,
      default: () => ({})
    },
    // 是否轮播
    istool: {
      type: Boolean,
      default: false
    },
    // 轮播时间
    interval: {
      type: String,
      default: '3000'
    },
    // 是否开启循环
    loopseries: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance()
    const initCharts = () => {
      //通过Promise异步操作,避免报错Initialize failed: invalid dom
      //1:新建一个promise对象
      let newPromise = new Promise((resolve) => {
        resolve()
      })
      // let myChart=null;
      // 2:然后异步执行echarts的初始化函数
      newPromise.then(() => {
        const myChart = echarts.init(proxy.$refs.chartRef)
        let tootipTimer = null
        watchEffect(() => {
          myChart.setOption(props.option)
          if (props.istool) {
            tootipTimer && tootipTimer.clearLoop()
            tootipTimer = null
            tootipTimer = tools.loopShowTooltip(myChart, props.option, {
              interval: props.interval, // 轮播间隔时间
              loopSeries: props.loopseries // 是否开启轮播循环
            })
          }
        })
        chartsArr.push(myChart)
        myChart.on('click', function (params) {
          if (params.seriesType === 'pie' && params.name) {
            emit('pieDetail', params)
          }
          if (params.componentType === 'radar' && params.name) {
            emit('radarDetail', params)
          }
          if (params.seriesType === 'bar' && params.name) {
            emit('barDetail', params)
          }
          if (params.seriesType === 'line' && params.name) {
            emit('lineDetail', params)
          }
        })
      })
    }
    const handleChartResize = () => {
      for (let i = 0; i < chartsArr.length; i++) {
        chartsArr[i] && chartsArr[i].resize()
      }
    }
    watch(
      () => [props.height, props.width],
      () => {
        setTimeout(handleChartResize, 0)
      },
      { immediate: false, deep: true }
    )
    onBeforeMount(() => {
      nextTick(() => {
        initCharts()
      })
    })
    onMounted(() => {
      window.addEventListener('resize', handleChartResize)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleChartResize)
    })
    return {}
  }
})
</script>
<style lang="less" scoped></style>
