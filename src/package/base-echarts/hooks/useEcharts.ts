import * as echarts from 'echarts';
// @ts-ignore
import tools from '../tooltip-auto-show-vue.js';

export default function (el: HTMLElement) {
    const echartInstance = echarts.init(el);

    const setOptions = (options: echarts.EChartsOption) => {
        echartInstance.setOption(options);
    };

    // 监听盒子变化
    const updateSize = () => {
        echartInstance.resize();
    };

    // 监听浏览器变化
    window.addEventListener('resize', () => {
        echartInstance.resize();
    });

    // tooltip 轮播设置
    const setTooltip = (
        options: echarts.EChartsOption,
        istool?: boolean,
        interval?: number,
        loopSeries?: boolean,
        seriesIndex?: number,
        tootipTimer = null,
    ) => {
        if (istool) {
            // @ts-ignore
            tootipTimer && tootipTimer.clearLoop();
            tootipTimer = null;
            tools.loopShowTooltip(echartInstance, options, {
                interval: interval, // 轮播间隔时间
                loopSeries: loopSeries, // 是否开启轮播循环
                seriesIndex: seriesIndex,
            });
        }
    };

    // 侦听盒子变化
    const throttle = function (fn: any, wait: any) {
        let timer: any = null;
        return function () {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const context = this;
            const args = arguments;
            if (!timer) {
                timer = setTimeout(function () {
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
                throttle(echartInstance.resize(), 200);
            }
        }
    });
    return {
        echartInstance,
        ob,
        setOptions,
        updateSize,
        setTooltip,
    };
}
