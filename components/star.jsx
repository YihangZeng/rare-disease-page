import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import EChartsReact from "echarts-for-react";

// 色板
const colorMap = [
  "#AFCBEF", // 基金组织-蓝
  "#FFF9C4", // 捐赠方-黄
  "#B8E3B6"  // 疾病-绿
];

const fontFamily = "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif";

const nodes = [
  { id: '中华慈善总会', name: '中华慈善总会', category: 0, symbolSize: 52 },
  { id: '中国初级卫生保健基金会', name: '中国初级卫生保健基金会', category: 0, symbolSize: 52 },
  { id: '中国红十字基金会', name: '中国红十字基金会', category: 0, symbolSize: 52 },
  { id: '武田中国', name: '武田中国', category: 1, symbolSize: 40 },
  { id: '拜耳医药', name: '拜耳医药', category: 1, symbolSize: 40 },
  { id: '安进公司', name: '安进公司', category: 1, symbolSize: 40 },
  { id: '神州细胞生物', name: '神州细胞生物', category: 1, symbolSize: 40 },
  { id: '赛诺菲', name: '赛诺菲', category: 1, symbolSize: 40 },
  { id: '渤健', name: '渤健', category: 1, symbolSize: 40 },
  { id: '辉瑞制药', name: '辉瑞制药', category: 1, symbolSize: 40 },
  { id: '甲型血友病', name: '甲型血友病', category: 2, symbolSize: 30 },
  { id: '血友病', name: '血友病', category: 2, symbolSize: 30 },
  { id: '纯合子家族性高胆固醇血症', name: '纯合子家族性高胆固醇血症', category: 2, symbolSize: 30 },
  { id: '肺动脉高压', name: '肺动脉高压', category: 2, symbolSize: 30 },
  { id: '5q脊髓性肌萎缩症', name: '5q脊髓性肌萎缩症', category: 2, symbolSize: 30 },
  { id: 'ATTR-PN型', name: 'ATTR-PN型', category: 2, symbolSize: 30 },
  { id: 'ATTR-CM型', name: 'ATTR-CM型', category: 2, symbolSize: 30 },
  { id: '多发性骨髓瘤', name: '多发性骨髓瘤', category: 2, symbolSize: 30 },
  { id: '法布瑞病', name: '法布瑞病', category: 2, symbolSize: 30 },
  { id: '戈谢病', name: '戈谢病', category: 2, symbolSize: 30 },
  { id: '遗传性血管性水肿', name: '遗传性血管性水肿', category: 2, symbolSize: 30 }
];

const links = [
  ['中华慈善总会','武田中国'], ['中华慈善总会','拜耳医药'], ['中华慈善总会','安进公司'],
  ['中华慈善总会','神州细胞生物'], ['中华慈善总会','赛诺菲'], ['中国初级卫生保健基金会','渤健'],
  ['中国初级卫生保健基金会','辉瑞制药'], ['中国初级卫生保健基金会','赛诺菲'], ['中国红十字基金会','武田中国'],
  ['中国红十字基金会','安进公司'], ['武田中国','甲型血友病'], ['拜耳医药','血友病'],
  ['安进公司','纯合子家族性高胆固醇血症'], ['神州细胞生物','血友病'], ['赛诺菲','甲型血友病'],
  ['赛诺菲','肺动脉高压'], ['渤健','5q脊髓性肌萎缩症'], ['辉瑞制药','ATTR-PN型'],
  ['辉瑞制药','ATTR-CM型'], ['赛诺菲','多发性骨髓瘤'], ['安进公司','法布瑞病'],
  ['安进公司','戈谢病'], ['安进公司','遗传性血管性水肿'], ['中华慈善总会','血友病'],
  ['中国红十字基金会','遗传性血管性水肿'], ['中国初级卫生保健基金会','ATTR-CM型']
].map(([source, target]) => ({ source, target }));

const option = {
  backgroundColor: "#062255",
  title: {
    text: '患者援助项目协作星图（PAPs）',
    left: 'center',
    top: 20,
    textStyle: {
      fontSize: 26,
      color: "#FFF9C4",
      fontFamily,
      fontWeight: "bold"
    }
  },
  tooltip: {
    show: true,
    formatter: params => params.dataType === 'node'
      ? `<b>${params.data.name}</b>`
      : `${params.data.source} → ${params.data.target}`
  },
  legend: [{
    data: ['基金组织', '捐赠方', '疾病'],
    orient: "horizontal",
    left: "center",
    bottom: 18,
    textStyle: {
      color: "#FFF9C4",
      fontSize: 18,
      fontFamily
    },
    itemWidth: 20,
    itemHeight: 20
  }],
  series: [{
    type: 'graph',
    layout: 'circular',
    circular: { rotateLabel: true },
    data: nodes.map(n => ({
      ...n,
      itemStyle: {
        color: colorMap[n.category],
        borderColor: "#FFF9C4",
        borderWidth: 2
      },
      label: {
        fontFamily,
        fontSize: n.symbolSize > 40 ? 17 : 13,
        color: "#062255",
        fontWeight: "bold"
      }
    })),
    links: links,
    categories: [
      { name: '基金组织', itemStyle: { color: colorMap[0] } },
      { name: '捐赠方', itemStyle: { color: colorMap[1] } },
      { name: '疾病', itemStyle: { color: colorMap[2] } }
    ],
    roam: true,
    label: {
      show: true,
      position: 'right',
      formatter: '{b}',
      fontFamily,
    },
    lineStyle: {
      color: "source",
      width: 2,
      opacity: 0.85,
      curveness: 0.26
    },
    emphasis: {
      focus: 'adjacency',
      lineStyle: { width: 3 }
    },
    force: { repulsion: 300 }
  }]
};

export default function PatientAidGraph({ style }) {
  return (
    <div style={{ width: "100%", height: 650, ...style }}>
      <EChartsReact
        option={option}
        style={{ width: "100%", height: "100%" }}
        notMerge
        lazyUpdate
        theme={null}
      />
    </div>
  );
}
