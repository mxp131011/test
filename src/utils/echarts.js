import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent, LegendComponent, DatasetComponent } from 'echarts/components';
import { BarChart, LineChart, GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, GridComponent, LegendComponent, DatasetComponent, LineChart, CanvasRenderer, GaugeChart, BarChart]);

const getLinearGradient = (colors, location) => {
    return new echarts.graphic.LinearGradient(...location, [
        { offset: 0, color: colors[0] },
        { offset: 1, color: colors[1] }
    ]);
};

const colors = ['#80FFA5', '#9E87FF', '#f08d36', '#fe68f2', '#00ccae', '#828ff6', '#7bc05e', '#0e97ff', '#f470f0', '#93d7fe'];
const gradientColors = [
    ['#80FFA5', '#00DDFF'],
    ['#9E87FF', '#9effff'],
    ['#f08d36', '#f4d14f'],
    ['#fe68f2', '#f9a5b9'],
    ['#00ccae', '#6addc5'],
    ['#828ff6', '#70c8f4'],
    ['#7bc05e', '#a8cf8d'],
    ['#0e97ff', '#0adaf5'],
    ['#f470f0', '#dca3e6'],
    ['#93d7fe', '#6d99f5']
];

const axisLine = () => ({ lineStyle: { color: '#DCE2E8' } });

const axisLabel = () => ({ color: '#556677', margin: 20 });

const axisTick = () => ({ show: false });

const legend = () => ({ icon: 'circle', itemGap: 15, itemWidth: 12, textStyle: { fontSize: 12 } });

const grid = () => ({ top: 38, left: 10, right: 20, bottom: 0, containLabel: true });

const getXAxis = () => ({ type: 'category', boundaryGap: false, axisLine: axisLine(), axisLabel: axisLabel(), axisTick: axisTick() });

const getColor = (_colors, location) => {
    if (Array.isArray(_colors)) {
        return _colors.length > 1 ? getLinearGradient(_colors, location) : _colors[0] || '';
    } else {
        return _colors;
    }
};

const yAxis = () => ({
    type: 'value',
    splitLine: { show: true, lineStyle: { type: 'dashed' } },
    axisLabel: {
        formatter: (val) => {
            let v = val;
            if (!isNaN(val) && Math.abs(val) >= 1000) {
                v = (Number(v) / 1000).toFixed(0) + 'K';
            } else if (!isNaN(val) && Math.abs(val) >= 100) {
                v = Number(v).toFixed(1);
            } else {
                v = Number(val.toFixed(2));
            }
            return v;
        }
    }
});

export function getDataZoom(start, end) {
    return [
        { type: 'inside', start, end }, // 触摸缩放
        {
            // 滑块缩放
            type: 'slider',
            height: 20,
            borderColor: 'transparent',
            fillerColor: 'rgba(128,255,165,0.3)',
            backgroundColor: 'rgba(0,221,255,0.1)',
            handleColor: '#aab6c6',
            handleIcon:
                'M512 512m-208 0a6.5 6.5 0 1 0 416 0 6.5 6.5 0 1 0-416 0Z M512 192C335.264 192 192 335.264 192 512c0 176.736 143.264 320 320 320s320-143.264 320-320C832 335.264 688.736 192 512 192zM512 800c-159.072 0-288-128.928-288-288 0-159.072 128.928-288 288-288s288 128.928 288 288C800 671.072 671.072 800 512 800z',
            handleSize: 20,
            handleStyle: { borderColor: '#aab6c6' },
            moveHandleSize: 0,
            textStyle: { fontSize: 10 },
            brushSelect: false,
            start,
            end,
            bottom: 6
        }
    ];
}
// 颜色转换（16进制转rgba）
function hexToRgba(colorStr, opacity = 1) {
    let colorStrNew = colorStr.toLowerCase();
    if (colorStrNew && /^#([0-9|a-f]{3}|[0-9|a-f]{6})$/.test(colorStrNew)) {
        if (colorStrNew.length === 4) {
            // 将三位转换为六位
            colorStrNew = `'#'${colorStrNew[1] + colorStrNew[1]}`;
            colorStrNew += `${colorStrNew[2] + colorStrNew[2]}`;
            colorStrNew += `${colorStrNew[2] + colorStrNew[2]}`;
        }
        // 处理六位的颜色值
        const colorNew = [];
        for (let i = 1; i < 7; i += 2) {
            colorNew.push(parseInt('0x' + colorStrNew.slice(i, i + 2)));
        }
        return `rgba(${colorNew.join(',')},${opacity})`;
    }
    return colorStr.indexOf('RGB') >= 0 ? colorStr : false;
}

/**
 * 仪表盘
 *
 * @param { Object } dataset  数据
 * @returns echart 实例
 */
export function gaugeChart(data, color, bj) {
    data.value = Number(data.value) * 10000;
    const linecolor = [1, bj];
    const option = {
        series: [
            {
                type: 'gauge',
                radius: '85%',
                legendHoverLink: false,
                max: 10000,
                pointer: { show: false },
                progress: { show: true, overlap: false, roundCap: true, clip: false },
                axisLine: { roundCap: true, lineStyle: { width: 12, color: [linecolor] } },
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                data: [data],
                title: { fontSize: 12, offsetCenter: ['0%', '30%'] },
                itemStyle: { color },
                detail: {
                    valueAnimation: true,
                    width: '60%',
                    lineHeight: 40,
                    height: '15%',
                    fontSize: 20,
                    fontWeight: 'bolder',
                    color,
                    offsetCenter: ['0%', '-10%'],
                    formatter: (val) => parseInt(val) / 100 + '%'
                }
            }
        ]
    };
    return option;
}

/**
 * 区域图（折线图的变体）
 *   @param { Object } optionData
 *      optionData.xAxis  X轴数据  （是一个对象）（data字段必传）
 *                    { data:['a','b','c','d'] }
 *      optionData.series Y轴数据 （是一个对象数组）  支持如下格式 （数组每一项中data字段必传）
 *                   [{ color:['#333','#333'],data:[1,2,3,2,3] }]
 *                   [{ color:'#333',data:[1,2,3,2,3] }]
 *                   [{ data:[1,2,3,2,3] }]
 *
 * @returns echart的配置项
 */
export function areaChart(optionData) {
    const series = [];
    optionData.series.forEach((item, index) => {
        const seriesItem = {
            legendHoverLink: false,
            type: 'line',
            smooth: true,
            lineStyle: { width: 0 },
            showSymbol: false,
            emphasis: { focus: 'series' },
            areaStyle: { opacity: 0.7 },
            ...item
        };
        const cor = item.color || gradientColors[index] || '';
        if (cor) {
            seriesItem.areaStyle.color = getColor(cor, [0, 1, 0, 0]);
        }
        series.push(seriesItem);
    });
    const tooltip = { trigger: 'axis', textStyle: { fontSize: 12 } };
    const xAxis = { ...getXAxis(), ...optionData.xAxis };
    const option = { color: colors, tooltip, legend: legend(), grid: grid(), xAxis, yAxis: yAxis(), series };
    return option;
}

/**
 * 柱状图
 *   @param { Object } optionData
 *      optionData.xAxis  X轴数据  （是一个对象）（data字段必传）
 *                    { data:['a','b','c','d'] }
 *      optionData.series Y轴数据 （是一个对象数组）  支持如下格式 （数组每一项中data字段必传）
 *                   [{ color:['#333','#333'],data:[1,2,3,2,3] }]
 *                   [{ color:'#333',data:[1,2,3,2,3] }]
 *                   [{ data:[1,2,3,2,3] }]
 *
 * @returns echart的配置项
 */
export function barChart(optionData) {
    const series = [];
    optionData.series.forEach((item, index) => {
        const seriesItem = {
            type: 'bar',
            barWidth: 10,
            legendHoverLink: false,
            itemStyle: { borderRadius: [4, 4, 4, 4], shadowColor: 'rgba(0, 0, 0, 0.1)', shadowBlur: 20 },
            ...item
        };
        seriesItem.data = item.data.map((val) => {
            const ser = { value: val, itemStyle: { borderRadius: val > 0 ? [15, 15, 0, 0] : [0, 0, 15, 15] } };
            let cor = item.color || gradientColors[index] || '';
            if (val < 0 && Array.isArray(cor) && cor.length >= 2) {
                cor = [cor[1], cor[0]];
            }
            if (cor) {
                ser.itemStyle.color = getColor(cor, [1, 1, 0, 0]);
            }
            return ser;
        });
        series.push(seriesItem);
    });
    const xAxis = { ...getXAxis(), ...optionData.xAxis };
    xAxis.boundaryGap = true;
    const tooltip = { trigger: 'axis', textStyle: { fontSize: 12 } };
    const option = { color: colors, tooltip, legend: legend(), grid: grid(), xAxis, yAxis: yAxis(), series };
    return option;
}

/**
 * 折线图
 *
 *  @param { Object } optionData
 *      optionData.xAxis  X轴数据  （是一个对象）（data字段必传）
 *                    { data:['a','b','c','d'] }
 *      optionData.series Y轴数据 （是一个对象数组）  支持如下格式 （数组每一项中data字段必传）
 *                   [{ color:['#333','#333'],data:[1,2,3,2,3] }]
 *                   [{ color:'#333',data:[1,2,3,2,3] }]
 *                   [{ data:[1,2,3,2,3] }]
 *
 * @returns echart的配置项
 */
export function lineChart(optionData) {
    const series = [];
    optionData.series.forEach((item, index) => {
        const seriesItem = {
            type: 'line',
            symbol: 'circle',
            smooth: true,
            legendHoverLink: false,
            showSymbol: false,
            lineStyle: { borderRadius: [20, 20], width: 5, cap: 'round' },
            itemStyle: { borderRadius: [20, 20] },
            ...item
        };
        const cor = item.color || gradientColors[index] || '';
        if (cor) {
            seriesItem.lineStyle.color = getColor(cor, [1, 1, 0, 0]);
        }

        if (!('shadowColor' in item) || item.shadowColor) {
            let shadowColor = false;
            if (item.shadowColor) {
                shadowColor = item.shadowColor;
            } else if (item.color || gradientColors[index]) {
                shadowColor = item.color || gradientColors[index] || false;
                shadowColor = Array.isArray(shadowColor) ? shadowColor[0] : shadowColor; // 有可能是二维数组所以调用两次;
                shadowColor = Array.isArray(shadowColor) ? shadowColor[0] : hexToRgba(shadowColor, 0.3); // 有可能是二维数组所以所以调用两次
            }
            if (shadowColor) {
                seriesItem.lineStyle.shadowColor = shadowColor; // 阴影颜色
                seriesItem.lineStyle.shadowBlur = 12; // 图形阴影的模糊大小（uniapp和纯vue渲染有一点区别）
                seriesItem.lineStyle.shadowOffsetX = -0; // 阴影偏移（uniapp和纯vue渲染有一点区别）
                seriesItem.lineStyle.shadowOffsetY = -14; // 阴影偏移（uniapp和纯vue渲染有一点区别）
            }
        }
        delete seriesItem.shadowColor;
        series.push(seriesItem);
    });
    const myYAxis = {
        ...yAxis(),
        max: (value) => value.max + (value.max - value.min) / 4,
        splitLine: { show: false },
        axisLine: { show: false }
    };
    const xAxis = { ...getXAxis(), axisLine: { show: false }, ...optionData.xAxis };
    const tooltip = { trigger: 'axis', textStyle: { fontSize: 12 } };
    const option = { color: colors, tooltip, legend: legend(), grid: grid(), xAxis, yAxis: myYAxis, series };
    return option;
}

/**
 * 设置图表
 * @param { ref } chartsRef  组件
 *  @param { Object } option  配置文件
 */
export function initMyEChart(domID, option) {
    const dom = document.getElementById(domID);
    if (dom) {
        const myChart = echarts.init(dom);
        option && myChart.setOption(option);
        return myChart;
    } else {
        return false;
    }
}
