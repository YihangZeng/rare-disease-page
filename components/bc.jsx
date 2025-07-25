// src/BubbleChart.jsx
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BubbleChart = ({ data, minValue = 70 }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data) return;

    const filteredData = data
      .filter(d => d.id && d.value && !isNaN(+d.value) && +d.value >= minValue)
      .map(d => ({ ...d, value: +d.value }));

    const container = ref.current;
    const width = container.clientWidth;
    const height = width;
    const margin = 1;
    const titleText = "罕见病症状词云图";
    const titleFontSize = Math.max(16, width / 25);
    console.log("titleFontSize:", titleFontSize);
    const titlePadding = titleFontSize * 2;

    const name = d => (d.id || "").split(".").pop();
    const group = d => (d.id || "").split(".")[0];
    const format = d3.format(",d");

    const pack = d3.pack()
      .size([width - margin * 2, height - margin * 2 - titlePadding])
      .padding(3);

    const root = pack(d3.hierarchy({ children: filteredData }).sum(d => d.value));

    const svg = d3.create("svg")
      .attr("viewBox", [-margin, -margin, width, height])
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("max-width", "100%")
      .style("height", "auto")
      .style("font-family", "'Microsoft YaHei', serif")
      .attr("text-anchor", "middle");

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", titleFontSize * 1.2)
      .style("font-size", `${titleFontSize}px`)
      .style("font-weight", "bold")
      .style("font-family", "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif")
      .style("fill", "#FFFFFF")
      .text(titleText);

    const node = svg.append("g")
      .attr("transform", `translate(0, ${titlePadding})`)
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    node.append("title")
      .text(d => `${d.data.id}\n${format(d.data.value)}`);

    const cx = (width - margin * 2) / 2;
    const cy = (height - margin * 2 - titlePadding) / 2;
    const maxDist = Math.sqrt(cx * cx + cy * cy);

    const color = d3.scaleLinear()
      .domain([1, 0])
      .range(["#a2e3f8", "#FFF9C4"])
      .interpolate(d3.interpolateRgb);

    node.append("circle")
      .attr("fill-opacity", 0.85)
      .attr("fill", d => {
        const dist = Math.sqrt((d.x - cx) ** 2 + (d.y - cy) ** 2);
        return color(dist / maxDist);
      })
      .attr("r", d => d.r);


    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    node.each(function (d) {
      const group = d3.select(this);
      const label = (d.data.id || "").split(".").pop();
      const r = d.r;
      if (r < 10) return;

      let fontSize = Math.min(20, r / 2.5);
      ctx.font = `${fontSize}px Microsoft YaHei`;

      const maxWidth = r * 1.6;
      const lineHeight = fontSize * 1.2;
      const words = label.split("");

      let lines = [];
      let line = "";

      words.forEach(char => {
        const testLine = line + char;
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth <= maxWidth) {
          line = testLine;
        } else {
          if (line) lines.push(line);
          line = char;
        }
      });
      if (line) lines.push(line);

      const totalHeight = lines.length * lineHeight;
      if (totalHeight > r * 1.8) return;

      const text = group.append("text")
        .style("font-size", fontSize + "px")
        .style("font-weight", "bold")
        .style("pointer-events", "none")
        .style("font-family", "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif")
        .attr("dominant-baseline", "middle")
        .attr("alignment-baseline", "middle");

      lines.forEach((line, i) => {
        text.append("tspan")
          .attr("x", 0)
          .attr("y", (i - (lines.length - 1) / 2) * lineHeight)
          .text(line);
      });
    });

    container.innerHTML = "";
    container.appendChild(svg.node());
  }, [data, minValue]);

  return <div ref={ref}></div>;
};

export default BubbleChart;
