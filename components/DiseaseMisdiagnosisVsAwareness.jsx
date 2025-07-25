import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// 字体设置
const fontFamily = "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif";

// 浅蓝-浅黄色系
const leftBarColor = "#AFCBEF";
const rightBarColor = "#FFF9C4";
const labelColor = "#fff";
const leftValueColor = "#84A7CE";
const rightValueColor = "#E3D08C";

const data = [
  {name: "纯合子家族性高胆固醇血症", misdiagnosis: 3, aware: 0.0078},
  {name: "糖原累积病Ⅰ型/庞贝病", misdiagnosis: 3, aware: 0.0011},
  {name: "脊髓延髓肌萎缩症/肯尼迪病", misdiagnosis: 2.5, aware: 0.0025},
  {name: "Fabry 病", misdiagnosis: 2.3, aware: 0.0049},
  {name: "黏多糖贮积症", misdiagnosis: 2.2, aware: 0.0026},
  {name: "Prade-Willi 综合征", misdiagnosis: 2.2, aware: 0.0064},
  {name: "朗格汉斯细胞组织细胞增生症", misdiagnosis: 2.2, aware: 0.0186},
  {name: "视神经脊髓炎", misdiagnosis: 1.9, aware: 0.0172},
  {name: "肌萎缩侧索硬化", misdiagnosis: 1.7, aware: 0.0491},
  {name: "卡尔曼综合征", misdiagnosis: 1.4, aware: 0.0067},
  {name: "肝豆状核变性/Wilson 病", misdiagnosis: 1.4, aware: 0.0753},
  {name: "淋巴管肌瘤病", misdiagnosis: 1.3, aware: 0.0106},
  {name: "特发性低促性腺激素性性腺功能减退", misdiagnosis: 1.3, aware: 0.0064},
  {name: "系统性硬化症", misdiagnosis: 1.2, aware: 0.0322},
  {name: "重症肌无力", misdiagnosis: 1.1, aware: 0.0555},
  {name: "脊髓性肌萎缩症", misdiagnosis: 1.1, aware: 0.0144},
  {name: "结节性硬化症", misdiagnosis: 1.1, aware: 0.0122},
  {name: "婴儿严重肌阵挛性癫痫/Dravet 综合征", misdiagnosis: 1, aware: 0.0036},
  {name: "尼曼匹克病", misdiagnosis: 1, aware: 0.0021},
  {name: "多发性硬化症", misdiagnosis: 1, aware: 0.0856},
  {name: "戈谢病", misdiagnosis: 0.9, aware: 0.0044},
  {name: "进行性肌营养不良", misdiagnosis: 0.8, aware: 0.0161},
  {name: "亨廷顿舞蹈症", misdiagnosis: 0.8, aware: 0.0081},
  {name: "血友病", misdiagnosis: 0.7, aware: 0.0956},
  {name: "遗传性大疱性表皮松解症", misdiagnosis: 0.7, aware: 0.0065},
  {name: "Marfan 综合征", misdiagnosis: 0.6, aware: 0.0582},
  {name: "成骨不全", misdiagnosis: 0.6, aware: 0.0444},
  {name: "特发性肺动脉高压", misdiagnosis: 0.6, aware: 0.032},
  {name: "先天性肾上腺皮质增生", misdiagnosis: 0.5, aware: 0},
  {name: "脊髓小脑性共济失调", misdiagnosis: 0.3, aware: 0.0126},
  {name: "四氢生物喋呤缺乏症", misdiagnosis: 0.3, aware: 0.0004},
  {name: "白化病", misdiagnosis: 0.1, aware: 0.2594},
  {name: "茎苷酮尿症", misdiagnosis: 0.1, aware: 0.0396},
  {name: "先天性肾上腺发育不良", misdiagnosis: 0, aware: 0.008}
];

export default function DiseaseMisdiagnosisVsAwareness({
  width = 900,
  height = 1000
}) {
  const ref = useRef();

  useEffect(() => {
    const margin = { top: 84, right: 28, bottom: 42, left: 16 };
    const leftWidth = 298;
    const labelWidth = 340;
    const rightWidth = 280;

    const barHeight = 22;
    const barGap = 6;
    const totalHeight = data.length * (barHeight + barGap);
    const startY = (height - totalHeight) / 2 + margin.top;

    // clean
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    // 背景
    svg
      .attr("width", width)
      .attr("height", height)
      .style("background", "#062255")
      .style("font-family", fontFamily);

    // 大标题
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 38)
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .attr("font-size", 28)
      .attr("font-family", fontFamily)
      .attr("font-weight", "bold")
      .text("疾病误诊率与知晓率对比");

    // 组
    const leftG = svg
      .append("g")
      .attr("class", "left-group")
      .attr("transform", `translate(${margin.left},${startY})`);
    const labelG = svg
      .append("g")
      .attr("class", "label-group")
      .attr("transform", `translate(${margin.left + leftWidth},${startY})`);
    const rightG = svg
      .append("g")
      .attr("class", "right-group")
      .attr("transform", `translate(${margin.left + leftWidth + labelWidth},${startY})`);

    // x scale
    const maxMisdiagnosis = d3.max(data, d => d.misdiagnosis);
    const maxAware = d3.max(data, d => d.aware);
    const xLeft = d3.scaleLinear().domain([0, maxMisdiagnosis]).range([0, leftWidth]);
    const xRight = d3.scaleLinear().domain([0, maxAware * 100]).range([0, rightWidth]);

    // 左侧柱
    leftG
      .selectAll("rect.left-bar")
      .data(data)
      .join("rect")
      .attr("class", "left-bar")
      .attr("x", d => leftWidth - xLeft(d.misdiagnosis))
      .attr("y", (d, i) => i * (barHeight + barGap))
      .attr("width", d => xLeft(d.misdiagnosis))
      .attr("height", barHeight)
      .attr("fill", leftBarColor)
      .attr("rx", 5);

    // 左侧数值
    leftG
      .selectAll("text.left-value")
      .data(data)
      .join("text")
      .attr("class", "left-value")
      .attr("x", d => leftWidth - xLeft(d.misdiagnosis) - 10)
      .attr("y", (d, i) => i * (barHeight + barGap) + barHeight / 2 + 4)
      .attr("text-anchor", "end")
      .attr("font-size", 13)
      .attr("font-family", fontFamily)
      .attr("fill", leftValueColor)
      .attr("font-weight", 600)
      .text(d => d.misdiagnosis.toFixed(1));

    // 标签
    labelG
      .selectAll("text.label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("x", labelWidth / 2)
      .attr("y", (d, i) => i * (barHeight + barGap) + barHeight / 2 + 4)
      .attr("font-size", 14)
      .attr("font-family", fontFamily)
      .attr("fill", labelColor)
      .attr("font-weight", 600)
      .attr("text-anchor", "middle")
      .text(d => d.name);

    // 右侧柱
    rightG
      .selectAll("rect.right-bar")
      .data(data)
      .join("rect")
      .attr("class", "right-bar")
      .attr("x", 0)
      .attr("y", (d, i) => i * (barHeight + barGap))
      .attr("width", d => xRight(d.aware * 100))
      .attr("height", barHeight)
      .attr("fill", rightBarColor)
      .attr("rx", 5);

    // 右侧数值
    rightG
      .selectAll("text.right-value")
      .data(data)
      .join("text")
      .attr("class", "right-value")
      .attr("x", d => xRight(d.aware * 100) + 8)
      .attr("y", (d, i) => i * (barHeight + barGap) + barHeight / 2 + 4)
      .attr("text-anchor", "start")
      .attr("font-size", 13)
      .attr("font-family", fontFamily)
      .attr("fill", rightValueColor)
      .attr("font-weight", 600)
      .text(d => (d.aware * 100).toFixed(2) + "%");

    // 坐标轴标签
    svg.append("text")
      .attr("x", margin.left + leftWidth / 2)
      .attr("y", 90)
      .attr("text-anchor", "middle")
      .attr("font-family", fontFamily)
      .attr("font-size", 15)
      .attr("font-weight", "bold")
      .attr("fill", "#fff")
      .text("疾病误诊率（被误诊人数与未被误诊人数比例）");

    svg.append("text")
      .attr("x", margin.left + leftWidth + labelWidth + rightWidth / 2)
      .attr("y",  90)
      .attr("text-anchor", "middle")
      .attr("font-family", fontFamily)
      .attr("font-size", 15)
      .attr("font-weight", "bold")
      .attr("fill", "#fff"
      )
      .text("医务工作者知晓率（被选为最熟悉比例）");

  }, [width, height]);

  return (
    <div
      style={{
        background: "#062255",
        padding: 16,
        borderRadius: 18,
        boxShadow: "0 2px 18px #0002"
      }}
    >
      <svg ref={ref} width={width} height={height}></svg>
    </div>
  );
}
