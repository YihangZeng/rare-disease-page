import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// 数据
const data = [
  { label: "罕见病药物器械相关政策", know: 64.1, unknown: 35.9 },
  { label: "《罕见病诊疗指南（2019年版）》", know: 50.0, unknown: 50.0 },
  { label: "罕见病保障制度相关政策", know: 40.8, unknown: 59.2 },
  { label: "罕见病平台建设相关政策", know: 40.2, unknown: 59.8 }
];

const fontFamily = "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif";
const colors = {
  know: "#AFCBEF",     // 浅蓝
  unknown: "#FFF9C4"   // 浅黄
};

export default function PolicyAwarenessBarChart({ width = 780, height = 320 }) {
  const ref = useRef();

  useEffect(() => {
    const margin = { top: 46, right: 32, bottom: 38, left: 250 }; // 或者 260，根据实际情况微调
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    d3.select(ref.current).selectAll("*").remove();
    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "none")
      .style("font-family", fontFamily);

    // Y 轴
    const y = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, h])
      .padding(0.3);

    // X 轴
    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, w]);

    // 主体
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 堆叠条形
    g.selectAll("g.bar")
      .data(data)
      .join("g")
      .attr("class", "bar")
      .attr("transform", d => `translate(0,${y(d.label)})`)
      .each(function (d) {
        // 知晓
        d3.select(this).append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("height", y.bandwidth())
          .attr("width", x(d.know))
          .attr("fill", colors.know);

        // 不知晓
        d3.select(this).append("rect")
          .attr("x", x(d.know))
          .attr("y", 0)
          .attr("height", y.bandwidth())
          .attr("width", x(d.unknown))
          .attr("fill", colors.unknown);

        // 知晓数值
        d3.select(this).append("text")
          .attr("x", x(d.know) / 2)
          .attr("y", y.bandwidth() / 2 + 5)
          .attr("text-anchor", "middle")
          .attr("font-size", 17)
          .attr("fill", "#222")
          .attr("font-family", fontFamily)
          .attr("font-weight", "bold")
          .text(d.know);

        // 不知晓数值
        d3.select(this).append("text")
          .attr("x", x(d.know) + x(d.unknown) / 2)
          .attr("y", y.bandwidth() / 2 + 5)
          .attr("text-anchor", "middle")
          .attr("font-size", 17)
          .attr("fill", "#222")
          .attr("font-family", fontFamily)
          .attr("font-weight", "bold")
          .text(d.unknown);
      });

    // Y 轴标签（白色大号）
    g.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .call(g => g.selectAll("text")
        .attr("font-size", 18)
        .attr("fill", "#fff")
        .attr("font-family", fontFamily)
        .attr("font-weight", "bold"))
      .call(g => g.selectAll("path,line").remove());

    // X 轴（白色刻度/文字）
    g.append("g")
      .attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => d + "%"))
      .call(g => g.selectAll("text")
        .attr("font-size", 15)
        .attr("fill", "#fff")
        .attr("font-family", fontFamily))
      .call(g => g.selectAll("path,line").attr("stroke", "#fff").attr("stroke-width", 1));

    // 图例
    const legend = svg.append("g")
      .attr("transform", `translate(${width - margin.right - 164},${margin.top - 34})`);
    legend.append("rect")
      .attr("x", 0)
      .attr("width", 25)
      .attr("height", 16)
      .attr("fill", colors.know);
    legend.append("text")
      .attr("x", 33)
      .attr("y", 13)
      .attr("fill", "#fff")
      .attr("font-size", 15)
      .attr("font-family", fontFamily)
      .text("知晓");
    legend.append("rect")
      .attr("x", 82)
      .attr("width", 25)
      .attr("height", 16)
      .attr("fill", colors.unknown);
    legend.append("text")
      .attr("x", 114)
      .attr("y", 13)
      .attr("fill", "#fff")
      .attr("font-size", 15)
      .attr("font-family", fontFamily)
      .text("不知晓");

    // 标题
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 34)
      .attr("text-anchor", "middle")
      .attr("font-size", 23)
      .attr("fill", "#fff")
      .attr("font-family", fontFamily)
      .attr("font-weight", "bold")
      .text("罕见病政策知晓率横向比较");

  }, [width, height]);

  return <svg ref={ref}></svg>;
}
