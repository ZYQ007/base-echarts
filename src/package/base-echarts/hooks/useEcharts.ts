import * as echarts from 'echarts';
import { ref } from 'vue';
// @ts-ignore
import tools from '../tooltip-auto-show-vue.js'; // 引入轮播工具模块
import { ECElementEvent } from 'echarts';

export default function (el: HTMLElement) {
    let echartInstance = echarts.getInstanceByDom(el);
    if (echartInstance == null) {
        echartInstance = echarts.init(el);
    }

    // 初始化tooltip控制
    let tootipTimer = ref(null);

    // 设置图表选项
    const setOptions = (options: echarts.EChartsOption, isCache: boolean) => {
        echartInstance.setOption(options, isCache);
    };

    // 更新图表大小
    const updateSize = () => {
        echartInstance.resize();
    };

    // 监听窗口变化并调整图表大小
    window.addEventListener('resize', () => {
        echartInstance.resize();
    });

    // 通用事件绑定方法
    const bindEvent = (eventName: string, fun: (params: ECElementEvent) => void) => {
        echartInstance.on(eventName, (params: ECElementEvent) => fun(params));
    };

    // 各类事件绑定方法
    const onClick = (fun) => bindEvent('click', fun);
    const onDblclick = (fun) => bindEvent('dblclick', fun);
    const onMousedown = (fun) => bindEvent('mousedown', fun);
    const onMousemove = (fun) => bindEvent('mousemove', fun);
    const onMouseup = (fun) => bindEvent('mouseup', fun);
    const onMouseover = (fun) => bindEvent('mouseover', fun);
    const onMouseout = (fun) => bindEvent('mouseout', fun);
    const Globalout = (fun) => bindEvent('globalout', fun);
    const Contextmenu = (fun) => bindEvent('contextmenu', fun);

    // 更新数据的方法
    const updateData = (newData) => {
        if (newData) {
            setOptions(newData, true); // 重新设置选项
        }
    };

    // 设置tooltip轮播
    const setTooltip = (
        options: echarts.EChartsOption,
        istool = true,
        interval = 2000,
        loopSeries = false,
        seriesIndex = 0,
        updateDataFunc?: any,
    ) => {
        if (istool) {
            if (tootipTimer.value && tootipTimer.value.clearLoop) {
                tootipTimer.value.clearLoop(); // 清除旧的轮播
            }

            // 设置新的轮播
            tootipTimer.value = tools.loopShowTooltip(echartInstance, options, {
                interval: interval, // 轮播间隔时间
                loopSeries: loopSeries, // 是否开启轮播循环
                seriesIndex: seriesIndex, // 从指定系列开始轮播
                updateData: updateDataFunc || null, // 传递更新数据的方法
            });
        }
    };

    // 侦听盒子变化并节流更新大小
    const throttle = (fn: any, wait: number) => {
        let timer: any = null;
        return function () {
            const context = this;
            const args = arguments;
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(context, args);
                    timer = null;
                }, wait);
            }
        };
    };

    const ob = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const handler = entry.target;
            if (handler) {
                throttle(updateSize, 200)(); // 节流更新大小
            }
        }
    });

    return {
        echartInstance,
        ob,
        setOptions,
        updateSize,
        setTooltip,
        updateData,
        onClick,
        onDblclick,
        onMousedown,
        onMousemove,
        onMouseup,
        onMouseover,
        onMouseout,
        Globalout,
        Contextmenu,
    };
}
