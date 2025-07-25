// src/CirclePack.jsx
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const CirclePack = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data) return;

    const width = 928;
    const height = width;
    const color = d3.scaleLinear()
      .domain([0, 5])
      .range(["hsl(201, 100.00%, 95.50%)", "hsl(230, 62.10%, 66.90%)"])
      .interpolate(d3.interpolateHcl);

    const pack = data => d3.pack()
      .size([width, height])
      .padding(3)(
        d3.hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value)
      );

    const root = pack(data);
    let focus = root;
    let view;

    const svg = d3.create("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", `max-width: 100%; height: auto; font: 10px sans-serif; display: block; background: ${color(0)}; cursor: pointer;`);

    const node = svg.append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", d => d.children ? color(d.depth) : "white")
      .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function () { d3.select(this).attr("stroke", "#000"); })
      .on("mouseout", function () { d3.select(this).attr("stroke", null); })
      .on("click", (event, d) => {
        if (focus !== d) {
          zoom(event, d);
          event.stopPropagation();
        }
      });

    svg.on("click", event => zoom(event, root));
    zoomTo([focus.x, focus.y, focus.r * 2]);

    function zoomTo(v) {
      const k = width / v[2];
      view = v;
      node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("r", d => d.r * k);
    }

    function zoom(event, d) {
      focus = d;
      svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", () => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });
    }

    // 清空并挂载
    const container = ref.current;
    container.innerHTML = "";
    container.appendChild(svg.node());
  }, [data]);

  return <div ref={ref} />;
};

export default CirclePack;
