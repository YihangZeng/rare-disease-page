import React from "react";
import ReactECharts from "echarts-for-react";

const fontFamily = "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif";

const option = {
  backgroundColor: "#062255",
  title: [
    {
      text: '中国罕见病药物医保纳入情况',
      left: '5%',
      top: '5%',
      textStyle: {
        fontFamily,
        color: "#FFF9C4",
        fontWeight: "bold",
        fontSize: 19,
        letterSpacing: 2
      }
    },
    {
      text: '患者整体参保情况',
      left: '45%',
      top: '5%',
      textAlign: 'center',
      textStyle: {
        fontFamily,
        color: "#AFCBEF",
        fontWeight: "bold",
        fontSize: 19
      }
    },
    {
      text: '医务人员选择药物考量因素',
      left: '80%',
      top: '5%',
      textAlign: 'center',
      textStyle: {
        fontFamily,
        color: "#FFF9C4",
        fontWeight: "bold",
        fontSize: 19
      }
    }
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    textStyle: { fontFamily }
  },
  legend: [
    {
      data: ['医保', '非医保'],
      left: '10%',
      top: '12%',
      textStyle: {
        fontFamily,
        color: "#AFCBEF",
        fontWeight: "bold",
        fontSize: 14
      }
    },
    {
      data: ['选择', '未选择'],
      left: '70%',
      top: '12%',
      textStyle: {
        fontFamily,
        color: "#FFF9C4",
        fontWeight: "bold",
        fontSize: 14
      }
    }
  ],
  grid: [
  { left: '4%', top: '20%', width: '23%', height: '60%' },   // 左图窄
  { left: '37%', top: '20%', width: '26%', height: '60%' },  // 饼图区域宽
  { left: '68%', top: '20%', width: '28%', height: '60%' }   // 右图不变
],

  xAxis: [
    {
      gridIndex: 0,
      type: 'category',
      data: ['乙类', '甲类'],
      axisTick: { alignWithLabel: true },
      axisLabel: {
        fontFamily,
        fontSize: 14,
        color: "#B7C7DF"
      }
    },
    {
      gridIndex: 2,
      type: 'value',
      max: 100,
      position: 'top',
      inverse: true,
      axisLabel: {
        formatter: '{value} %',
        fontFamily,
        color: "#B7C7DF",
        fontSize: 14
      },
      splitLine: { show: false }
    }
  ],
  yAxis: [
    {
      gridIndex: 0,
      type: 'value',
      axisLabel: {
        fontFamily,
        color: "#B7C7DF"
      }
    },
    {
      gridIndex: 2,
      type: 'category',
      inverse: true,
      data: [
        "疗效", "价格", "药物不良反应", "医保是否覆盖", "医学指南/医生建议",
        "购药难易程度", "抑制物发生风险高低", "用药方式", "药物半衰期",
        "患者/患者组织建议", "产地", "生产厂家/品牌", "广告宣传/媒体报导"
      ],
      axisTick: { show: false },
      axisLabel: {
        fontFamily,
        color: "#FFF9C4",
        fontSize: 13,
        width: 100,
        overflow: 'truncate'
      }
    }
  ],
  series: [
    // 左侧医保柱状图
    {
      name: '医保',
      type: 'bar',
      stack: '医保统计',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [112, 17],
      itemStyle: { color: '#AFCBEF' }, // 浅蓝
      barWidth: 24
    },
    {
      name: '非医保',
      type: 'bar',
      stack: '医保统计',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [53, 95],
      itemStyle: { color: '#FFF9C4' }, // 浅黄
      barWidth: 24
    },
    // 中间饼图
    {
      name: '患者参保情况',
      type: 'pie',
      radius: '30%',
      center: ['45%', '55%'],
      label: {
        show: true,
        formatter: '{b}: {d}%',
        fontFamily,
        fontSize: 13,
        color: "#FFFFFF"
      },
      data: [
        { value: 89.0, name: '城乡居民医保', itemStyle: { color: '#AFCBEF' } },
        { value: 10.3, name: '城镇职工医保', itemStyle: { color: '#FFF9C4' } },
        { value: 0.7, name: '未参加医保', itemStyle: { color: '#B7C7DF' } }
      ]
    },
    // 右侧医务人员选择因素条形图
    {
      name: '选择',
      type: 'bar',
      stack: '选择比例',
      xAxisIndex: 1,
      yAxisIndex: 1,
      label: {
        show: true,
        position: 'insideRight',
        formatter: '{c}%',
        fontFamily,
        fontSize: 12,
        color: "#062255"
      },
      data: [83.6, 76.9, 62.4, 62.2, 55.1, 35.5, 26.1, 20.7,
        14.2, 12.4, 7.8, 4.8, 1.9],
      itemStyle: { color: '#AFCBEF' }, // 浅蓝
      barWidth: 14
    },
    {
      name: '未选择',
      type: 'bar',
      stack: '选择比例',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: [16.4, 23.1, 37.6, 37.8, 44.9, 64.3, 73.9, 79.3,
        85.8, 87.6, 92.2, 95.2, 98.1],
      itemStyle: { color: '#FFF9C4' }, // 浅黄
      barWidth: 14
    }
  ]
};

export default function RareDrugInsuranceCharts({ style }) {
  return (
    <ReactECharts
      option={option}
      style={{ width: 900, height: 700, margin: "0 auto", ...style }}
    />
  );
}
