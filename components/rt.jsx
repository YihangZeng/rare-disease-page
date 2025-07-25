// src/RadialTree.jsx
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const RadialTree = ({ data, rootName = "Rare disorders (320716)" }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data) return;

    const width = 628;
    const height = width;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 2 - 30;

    const customColors = ["#F4D87C", "#B7C7DF"];
    const fontFamily = "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif";
    const fontSize = Math.max(10, Math.round(width / 90));

    const tree = d3.tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

    function findSubtree(node, name) {
      if (node.name === name) return node;
      const children = node.children || node._children || [];
      for (const child of children) {
        const found = findSubtree(child, name);
        if (found) return found;
      }
      return null;
    }

    function collapseDeepNodes(node, maxDepth = 2, depth = 0) {
      if (!node.children) return;
      if (depth >= maxDepth) {
        node._children = node.children;
        node.children = null;
      } else {
        node.children.forEach(child => collapseDeepNodes(child, maxDepth, depth + 1));
      }
    }

    function collectLeafNames(root) {
      return root.descendants().filter(d => !d.children && !d._children).map(d => d.data.name);
    }

    const fullTree = JSON.parse(JSON.stringify(data));
    const rootFull = d3.hierarchy(fullTree);
    const leafNames = collectLeafNames(rootFull);

    const rootCollapsed = d3.hierarchy(JSON.parse(JSON.stringify(data)));
    collapseDeepNodes(rootCollapsed);

    const maxValue = d3.max(rootFull.descendants(), d => d.data.value || 1);
    const strokeScale = d3.scaleSqrt().domain([1, maxValue]).range([0.5, 5]);

    const tooltip = d3.select("body").append("div")
      .attr("class", "custom-tooltip")
      .style("position", "absolute")
      .style("padding", "8px")
      .style("background", "rgba(255,255,255,0.9)")
      .style("border", "1px solid #aaa")
      .style("border-radius", "4px")
      .style("font-family", fontFamily)
      .style("font-size", `${fontSize + 4}px`)
      .style("pointer-events", "none")
      .style("white-space", "pre-wrap")
      .style("box-shadow", "0 2px 6px rgba(0,0,0,0.2)")
      .style("display", "none");

    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx, -cy, width, height])
      .attr("style", `width: 100%; height: auto; font: ${fontSize}px ${fontFamily};`);
    const titleFontSize = Math.max(16, width / 25);
    svg.append("text")
      .attr("x", 0)
      .attr("y", -height / 2 + 20)
      .attr("text-anchor", "middle")
      .attr("font-size", titleFontSize)
      .style("font-family", "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif")
      .attr("fill", "#FFFFFF")
      .style("font-weight", "bold")
      .text("罕见病分类图");

    const linkGroup = svg.append("g").attr("class", "links");
    const nodeGroup = svg.append("g").attr("class", "nodes");

    function update(source) {
      tree(source);

      const links = linkGroup.selectAll("path")
        .data(source.links(), d => d.target.data.name);

      const defs = svg.select("defs").empty() ? svg.append("defs") : svg.select("defs");
      let gradient = defs.select("#grad");
      if (gradient.empty()) {
        gradient = defs.append("radialGradient")
          .attr("id", "grad")
          .attr("gradientUnits", "userSpaceOnUse");
        gradient.append("stop").attr("offset", "0%").attr("stop-color", customColors[0]);
        gradient.append("stop").attr("offset", "100%").attr("stop-color", customColors[1]);
      }

      links.join("path")
        .attr("fill", "none")
        .attr("stroke", "url(#grad)")
        .attr("stroke-opacity", 0.8)
        .attr("stroke-width", d => strokeScale(d.target.data.value || 1))
        .attr("d", d3.linkRadial().angle(d => d.x).radius(d => d.y));

      const node = nodeGroup.selectAll("g")
        .data(source.descendants(), d => d.data.name);

      const nodeEnter = node.join("g")
        .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

      nodeEnter.selectAll("circle").remove();

      nodeEnter.append("circle")
        .attr("r", 3.5)
        .attr("fill", d => !d.children && !d._children ? customColors[0] : customColors[1])
        .style("cursor", "pointer")
        .on("click", (event, d) => {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else if (d._children) {
            d.children = d._children;
            d._children = null;
          }
          update(source);
        })
        .on("mouseover", (event, d) => {
          const nameOnly = (d.data.name || "").replace(/\s*\(.*?\)\s*$/, "");
          const def = d.data.Definition;
          const age = d.data.AverageAgeOfOnset;
          const symptoms = d.data.HPOTerms;
          let lines = [`<strong>${nameOnly}</strong>`];
          if (def) lines.push(`简介：${def}`);
          if (age) lines.push(`发病年龄：${age}`);
          if (symptoms) lines.push(`症状：${symptoms}`);
          tooltip.html(lines.join("<br>")).style("display", "block");
        })
        .on("mousemove", event => {
          tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px");
        })
        .on("mouseout", () => {
          tooltip.style("display", "none");
        });
    }

    update(rootFull);
    setTimeout(() => update(rootCollapsed), 0);

    const container = ref.current;
    container.innerHTML = "";
    container.appendChild(svg.node());

    return () => tooltip.remove(); // 清理 tooltip
  }, [data, rootName]);

  return <div ref={ref} />;
};

export default RadialTree;
