import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";

const SankeyDiagram = () => {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const width = 960;
    const height = 600;
    const margin = { top: 60, bottom: 20, left: 20, right: 20 };

    const svg = d3.select(containerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("font-family", "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif")
      .style("background-color", "#062255");

    const tooltip = d3.select(tooltipRef.current)
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("padding", "8px 12px")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("border-radius", "6px")
      .style("color", "#fff")
      .style("font-family", "FZXBSJ, sans-serif")
      .style("font-size", "16px")
      .style("font-weight", "500")
      .style("display", "none")
      .style("z-index", "10");

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "26px")
      .style("fill", "#ffffff")
      .style("font-weight", "bold")
      .text("转诊行为路径分析");

    const sankeyLayout = sankey()
      .nodeWidth(20)
      .nodePadding(20)
      .extent([[margin.left, margin.top + 30], [width - margin.right, height - margin.bottom]]);

    const data = {
      nodes: [
        { name: "医生无法确诊" }, { name: "使用自身经验" }, { name: "转诊行为" },
        { name: "建议放弃/其他" }, { name: "按自己经验治疗" }, { name: "推荐医院类转诊" },
        { name: "推荐医师类转诊" }, { name: "转给本地上级医院" }, { name: "转给本院上级医师" },
        { name: "建议去其他城市医院" }, { name: "建议患者找熟悉的专家" }, { name: "建议患者找听说过的专家" },
        { name: "建议患者找熟悉的医院" }, { name: "建议患者找听说过的医院" }, { name: "建议患者回家" },
        { name: "其他" }
      ],
      links: [
        { source: 0, target: 1, value: 26.4 },
        { source: 0, target: 2, value: 71 },
        { source: 0, target: 3, value: 17.7 },
        { source: 2, target: 5, value: 51.2 },
        { source: 2, target: 6, value: 19.8 },
        { source: 1, target: 4, value: 26.4 },
        { source: 5, target: 7, value: 14.7 },
        { source: 6, target: 8, value: 7.1 },
        { source: 5, target: 9, value: 27.9 },
        { source: 6, target: 10, value: 6.4 },
        { source: 6, target: 11, value: 6.3 },
        { source: 5, target: 12, value: 4.6 },
        { source: 5, target: 13, value: 4.0 },
        { source: 3, target: 14, value: 13.0 },
        { source: 3, target: 15, value: 4.7 }
      ]
    };

    const sankeyData = sankeyLayout({
      nodes: data.nodes.map(d => ({ ...d })),
      links: data.links.map(d => ({ ...d }))
    });

    const { nodes, links } = sankeyData;

    const color = d3.scaleLinear()
      .domain([0, nodes.length - 1])
      .range(["#5B9BD5", "#FFE48F"])
      .interpolate(d3.interpolateRgb);

    // Draw links with custom tooltip
    svg.append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.4)
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", d => color(nodes.indexOf(d.source)))
      .attr("stroke-width", d => Math.max(1, d.width))
      .on("mouseover", function (event, d) {
        tooltip
          .html(`<strong>${d.source.name}</strong> → <strong>${d.target.name}</strong><br/><span style="font-size:15px;">${d.value.toFixed(1)}%</span>`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY}px`)
          .style("display", "block");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY}px`);
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      });

    // Draw nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g");

    node.append("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("fill", (d, i) => color(i))
      .attr("stroke", "#444")
      .on("mouseover", function (event, d) {
        tooltip
          .html(`<strong>${d.name}</strong><br/><span style="font-size:15px;">${(d.value || 0).toFixed(1)}%</span>`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY}px`)
          .style("display", "block");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY}px`);
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      });

    // Node labels
    node.append("text")
      .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
      .style("font-size", "14px")
      .style("fill", "#ffffff")
      .text(d => d.name);

    return () => {
      d3.select(containerRef.current).select("svg").remove();
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div ref={containerRef}></div>
      <div ref={tooltipRef}></div>
    </div>
  );
};

export default SankeyDiagram;
