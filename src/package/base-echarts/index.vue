<template>
  <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts" setup>
import {ref, onMounted, watchEffect, watch, onUnmounted, nextTick, defineExpose} from 'vue';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import useEcharts from './hooks/useEcharts';
import type { ECElementEvent } from 'echarts';

// 定义props
const props = withDefaults(
    defineProps<{
      options: EChartsOption;
      istool?: boolean;
      interval?: number;
      loopSeries?: boolean;
      index?: number;
      width?: string;
      height?: string;
      isCache?: boolean;
    }>(),
    {
      width: '100%',
      height: '100%',
      istool: false,
      interval: 2000,
      loopSeries: false,
      seriesIndex: 0,
      isCache: false,
      tooltipTimer: null
    },
);
const echartDivRef = ref<HTMLElement>();
onMounted(() => {
  let { setOptions, setTooltip, updateSize, ob } = useEcharts(
      echartDivRef?.value!,
  );
  ob.observe(echartDivRef.value!);
  watchEffect(() => {
    setTooltip(props.options, props.istool, props.interval, props.loopSeries, props.seriesIndex, props.tooltipTimer);
  });
  // 监听盒子宽高变化
  watch(
      [() => props.width, () => props.height],
      () => {
        setTimeout(updateSize, 0);
      },
      {
        deep: true,
      },
  );

  watch(
      [() => props.options],
      () => {
        setOptions(props.options, props.isCache);
      },
      {
        deep: true,
        immediate: true,
      },
  );
});

const echartInstance = () => {
  const { echartInstance } = useEcharts(
      echartDivRef?.value!,
  );
  return echartInstance
}
const setOption = (option) => {
  const { setOptions } = useEcharts(
      echartDivRef?.value!,
  );
  setOptions(option, props.isCache)
}
const updateSize = () => {
  const { updateSize } = useEcharts(
      echartDivRef?.value!,
  );
  updateSize()
}
const onClick = (fun) => {
  const { onClick } = useEcharts(
      echartDivRef?.value!,
  );
  onClick(fun)
}
const onDblclick = (fun) => {
  const { onDblclick } = useEcharts(
      echartDivRef?.value!,
  );
  onDblclick(fun)
}
const onMousedown = (fun) => {
  const { onMousedown } = useEcharts(
      echartDivRef?.value!,
  );
  onMousedown(fun)
}
const onMousemove = (fun) => {
  const { onMousemove } = useEcharts(
      echartDivRef?.value!,
  );
  onMousemove(fun)
}
const onMouseup = (fun) => {
  const { onMouseup } = useEcharts(
      echartDivRef?.value!,
  );
  onMouseup(fun)
}
const onMouseover = (fun) => {
  const { onMouseover } = useEcharts(
      echartDivRef?.value!,
  );
  onMouseover(fun)
}
const onMouseout = (fun) => {
  const { onMouseout } = useEcharts(
      echartDivRef?.value!,
  );
  onMouseout(fun)
}
const Globalout = (fun) => {
  const { Globalout } = useEcharts(
      echartDivRef?.value!,
  );
  Globalout(fun)
}

const Contextmenu = (fun) => {
  const { Contextmenu } = useEcharts(
      echartDivRef?.value!,
  );
  Contextmenu(fun)
}
defineExpose({
  setOptions: setOption,
  updateSize,
  onClick,
  onDblclick,
  onMousedown,
  onMousemove,
  onMouseup,
  onMouseover,
  onMouseout,
  Globalout,
  Contextmenu,
  echartInstance,
})

</script>

<style scoped></style>
