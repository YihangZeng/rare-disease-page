import React from "react";
import ReactECharts from "echarts-for-react"; // 推荐库
// 如果没装 echarts-for-react，可以先 npm i echarts-for-react echarts

const fontFamily = "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif";

const option = {
  title: {
    text: '患者家庭收入、负债及经济负担自评分布',
    left: 'center',
    top: 20,
    textStyle: {
      fontSize: 28,
      fontFamily: fontFamily,
      color: '#FFFFFF'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {d}%',
    textStyle: { fontFamily }
  },
  legend: {
    orient: 'vertical',
    right: 60,         // 图例在右侧
    top: 60,
    align: 'left',
    itemGap: 14,
    textStyle: {
      fontSize: 14,
      fontFamily: fontFamily,
      color: "#FFFFFF"
    }
  },
  series: [
    {
        name: '患者家庭年收入情况',
        type: 'pie',
        radius: ['60%', '70%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: {
        borderColor: "#fff",
        borderWidth: 3
        },
        data: [
        {value: 26.0, name: '收入 0-5万', itemStyle: {color: '#b4cfe6'}},
        {value: 36.7, name: '收入 5-10万', itemStyle: {color: '#a5bddb'}},
        {value: 16.7, name: '收入 10-15万', itemStyle: {color: '#8fb3e0'}},
        {value: 13.9, name: '收入 15-25万', itemStyle: {color: '#96d2f7'}},
        {value: 6.7,  name: '收入 25万及以上', itemStyle: {color: '#c1daf2'}}
        ]
    },
    {
        name: '患者家庭负债情况',
        type: 'pie',
        radius: ['45%', '55%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: {
        borderColor: "#fff",
        borderWidth: 3
        },
        data: [
        {value: 19.2, name: '负债 0-5万', itemStyle: {color: '#d0f5c7'}},
        {value: 20.8, name: '负债 5-10万', itemStyle: {color: '#b3e6b7'}},
        {value: 19.2, name: '负债 10-15万', itemStyle: {color: '#c9eccf'}},
        {value: 15.2, name: '负债 15-25万', itemStyle: {color: '#aee2b7'}},
        {value: 25.6, name: '负债 25万及以上', itemStyle: {color: '#e2f7d6'}}
        ]
    },
    {
        name: '患者家庭经济负担自评',
        type: 'pie',
        radius: ['30%', '40%'],
        avoidLabelOverlap: false,
        label: { show: false },
        itemStyle: {
        borderColor: "#fff",
        borderWidth: 3
        },
        emphasis: {
        label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold',
            fontFamily,
            formatter: '{b}\n{d}%'
        }
        },
        data: [
        {value: 29.4, name: '负担 非常重', itemStyle: {color: '#fff8e1'}},
        {value: 35.9, name: '负担 较重', itemStyle: {color: '#ffe7a0'}},
        {value: 30.6, name: '负担 尚处于可接受范围', itemStyle: {color: '#ffe29e'}},
        {value: 4.1,  name: '负担 未造成明显经济负担', itemStyle: {color: '#fff6cc'}}
        ]
    }
    ]
}

export default function EconomicBurdenPie({ style }) {
  // style 允许父组件自定义宽高/居中等
  return (
    <ReactECharts
      option={option}
      style={{
        width: 900, height: 700, margin: "0 auto", ...style
      }}
    />
  );
}
