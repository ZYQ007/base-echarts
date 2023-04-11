<template>
  <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect, watch, onUnmounted } from 'vue';
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
    }>(),
    {
      width: '100%',
      height: '100%',
      istool: false,
      interval: 2000,
      loopSeries: true,
      seriesIndex: 0,
    },
);

const emit = defineEmits<{
  (e: 'echartsClick', value: any): object;
  (e: 'updateSize', value: any): any;
}>();

const echartDivRef = ref<HTMLElement>();
onMounted(() => {
  const { setOptions, setTooltip, updateSize, echartInstance, ob } = useEcharts(
      echartDivRef.value!,
  );
  ob.observe(echartDivRef.value!);
  watchEffect(() => {
    setTooltip(props.options, props.istool, props.interval, props.loopSeries, props.seriesIndex);
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
        setOptions(props.options);
      },
      {
        deep: true,
        immediate: true,
      },
  );
  // 向外暴露点击事件
  echartInstance.on('click', function (params: ECElementEvent) {
    emit('echartsClick', params);
  });
  emit('updateSize', updateSize);
});
onUnmounted(() => {
  const { ob } = useEcharts(echartDivRef.value!);
  ob.unobserve(echartDivRef.value!);
});
</script>

<style scoped></style>
