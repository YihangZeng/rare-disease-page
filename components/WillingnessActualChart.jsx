import React from "react";
import ReactECharts from "echarts-for-react";

// 1. 字体
const fontFamily = "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif";

// 2. 图表尺寸（绝对像素）
const chartWidth = 900;
const chartHeight = 800;

// 3. 数据
const rawData = [
  { name: '特发性肺动脉高压', actual: 14516, intent: 92418 },
  { name: '戈谢病', actual: 64439, intent: 118753 },
  { name: '肝豆状核变性', actual: 17508, intent: 62117 },
  { name: '重症肌无力', actual: 15524, intent: 47432 },
  { name: '视神经脊髓炎', actual: 45640, intent: 68132 },
  { name: '结节性硬化症', actual: 43923, intent: 66155 },
  { name: '赫多囊肾病', actual: 117643, intent: 98888 },
  { name: '特发性低促性腺激素性腺功能减退症', actual: 28302, intent: 13318 },
  { name: '淋巴管肌瘤病', actual: 49588, intent: 36198 },
  { name: '四氢生物蝶呤缺乏症', actual: 40718, intent: 31694 },
  { name: '卡尔曼综合征', actual: 27360, intent: 19028 },
  { name: '罕见严重肌障碍性瘫痪症', actual: 85494, intent: 77938 },
  { name: '莱丙酮尿症', actual: 39531, intent: 32662 },
  { name: '普拉德-威利综合征', actual: 67463, intent: 50130 },
  { name: '多发性硬化症', actual: 43755, intent: 33110 },
  { name: '硬皮病（系统性硬化症）', actual: 43199, intent: 39110 },
  { name: '进行性肌营养不良', actual: 169540, intent: 50159 },
  { name: '亨廷顿病', actual: 27401, intent: 98295 },
  { name: '法布雷病', actual: 25761, intent: 73220 },
  { name: '脊髓性肌萎缩症', actual: 119177, intent: 71795 },
  { name: '肌萎缩侧索硬化症', actual: 84153, intent: 127626 },
  { name: '朗格汉斯细胞组织细胞增生症', actual: 106367, intent: 143485 },
  { name: '脊髓硬化性肌萎缩（脊髓病）', actual: 17895, intent: 48663 },
  { name: '糖原累积病（I型，庐贝病）', actual: 77545, intent: 105827 },
  { name: '脊髓小脑性共济失调', actual: 47118, intent: 73205 },
  { name: '血友病', actual: 37039, intent: 51637 },
  { name: '纯合子家族性高胆固醇血症', actual: 37114, intent: 51143 },
  { name: '成骨不全症（脆骨病）', actual: 26704, intent: 40328 },
  { name: '先天性肾上腺皮质增生症', actual: 49576, intent: 62755 },
  { name: '尼曼匹克病', actual: 103796, intent: 109481 },
  { name: '遗传性大疱性表皮松解症', actual: 51715, intent: 57321 }
];

// 4. 颜色池
const pastelColors = [
  "#B4CFE6", "#A5BDD7", "#9DC1E1", "#FFE29E", "#FFECB3", "#FFF3B0"
];
function generateColor(index) {
  return pastelColors[index % pastelColors.length];
}

// 5. 计算最大值用于缩放半径
const maxValue = Math.max(...rawData.flatMap(d => [d.actual, d.intent]));
const maxRadius = 30;
const minRadius = 7;
const scaleRadius = val => Math.max(minRadius, Math.sqrt(val / maxValue) * maxRadius);

// 6. 生成绝对像素坐标的数据
const data = rawData.map((d, i) => {
  const color = generateColor(i);
  const x = Math.random() * (chartWidth - 2 * maxRadius) + maxRadius;
  const y = Math.random() * (chartHeight - 2 * maxRadius) + maxRadius;
  return {
    name: d.name,
    value: [x, y],
    actual: d.actual,
    intent: d.intent,
    color: color,
    actualRadius: scaleRadius(d.actual),
    intentRadius: scaleRadius(d.intent)
  };
});

// 7. ECharts 配置
const option = {
  backgroundColor: "#062255",
  title: {
    text: '受访患者支付意愿与实际自费支出同心圆散点图',
    left: 'center',
    top: 16,
    textStyle: {
      fontSize: 22,
      fontFamily,
      color: "#FFFFFF"
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: params => {
      const d = data[params.dataIndex];
      return `<strong>${d.name}</strong><br/>
              支付意愿：${d.intent} 元<br/>
              实际支出：${d.actual} 元`;
    },
    textStyle: {
      fontFamily,
      fontSize: 15
    }
  },
  xAxis: { type: "value", min: 0, max: chartWidth, show: false },
  yAxis: { type: "value", min: 0, max: chartHeight, show: false },
  grid: { left: 0, right: 0, top: 0, bottom: 0 }, // 不要留边
  series: [
    {
      type: 'custom',
      data,
      renderItem: (params, api) => {
        const idx = params.dataIndex;
        const d = data[idx];
        const [x, y] = api.coord(d.value);

        return {
          type: 'group',
          children: [
            {
              type: 'circle',
              shape: { cx: x, cy: y, r: d.intentRadius },
              style: { fill: d.color, opacity: 0.3 }
            },
            {
              type: 'circle',
              shape: { cx: x, cy: y, r: d.actualRadius },
              style: { fill: d.color, opacity: 1 }
            }
          ]
        };
      }
    }
  ]
};

// 8. 组件
export default function WillingnessActualChart() {
  return (
    <div style={{ position: "relative", width: chartWidth, height: chartHeight }}>
      {/* 悬浮提示UI */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: "40%",
          transform: "translateX(-50%)",
          zIndex: 10,
          background: "rgba(255,255,255,0.78)",
          padding: "12px 32px",
          borderRadius: 16,
          fontFamily,
          fontSize: 18,
          color: "#062255",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          pointerEvents: "none",
          letterSpacing: 1
        }}
      >
        悬停图中任意病症，可查看其支付意愿与实际自费支出
      </div>
      <ReactECharts
        option={option}
        style={{ width: chartWidth, height: chartHeight }}
      />
    </div>
  );
}
