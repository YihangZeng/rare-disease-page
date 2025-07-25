import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// 直接写组件
const roles = ["患者", "家属", "医师"];
const roleColors = ["#5B8FF9", "#61DDAA", "#F6BD16"];

const data = [
  { disease: "婴儿严重肌阵挛性癫痫", 患者: 0.0, 家属: 1.2, 医师: 1.2 },
  { disease: "成骨不全症", 患者: 0.9, 家属: 0.8, 医师: 0.8 },
  { disease: "多发性硬化", 患者: 1.2, 家属: 1.2, 医师: 1.2 },
  { disease: "四生蝶缺乏症", 患者: 1.5, 家属: 1.7, 医师: 1.1 },
  { disease: "气物晦吟泛症", 患者: 1.6, 家属: 1.6, 医师: 0.8 },
  { disease: "车内制尿症", 患者: 1.6, 家属: 1.9, 医师: 1.4 },
  { disease: "骨性肌萎缩症", 患者: 1.6, 家属: 1.7, 医师: 1.4 },
  { disease: "原积肌病(Ⅲ型,庞病)", 患者: 1.7, 家属: 1.6, 医师: 1.3 },
  { disease: "传大性粘皮症", 患者: 1.8, 家属: 1.9, 医师: 1.5 },
  { disease: "糖锚硬化(新生儿)", 患者: 1.8, 家属: 1.4, 医师: 1.3 },
  { disease: "糖锚硬化(渐冻人)", 患者: 1.8, 家属: 1.9, 医师: 1.7 },
  { disease: "先谢病", 患者: 1.8, 家属: 1.9, 医师: 1.7 },
  { disease: "骨延性症(骨尼病)", 患者: 1.8, 家属: 1.7, 医师: 0.8 },
  { disease: "马方综合征", 患者: 1.9, 家属: 2.0, 医师: 1.5 },
  { disease: "淋巴管肌病", 患者: 2.0, 家属: 2.0, 医师: 1.5 },
  { disease: "纯合子家族性高胆固醇血症", 患者: 2.0, 家属: 1.4, 医师: 1.7 },
  { disease: "结节性硬化症", 患者: 2.0, 家属: 2.0, 医师: 1.7 },
  { disease: "脊小性共济失调", 患者: 2.1, 家属: 1.7, 医师: 0.9 },
  { disease: "髓脑共济失调", 患者: 2.1, 家属: 2.0, 医师: 2.0 },
  { disease: "肝豆状核变性", 患者: 2.2, 家属: 2.4, 医师: 1.7 },
  { disease: "发低性激性腺功能减退症", 患者: 2.2, 家属: 2.5, 医师: 2.3 },
  { disease: "血友病", 患者: 2.3, 家属: 2.4, 医师: 2.3 },
  { disease: "脊多糖贮积症", 患者: 2.4, 家属: 1.9, 医师: 1.9 },
  { disease: "宁廷银症", 患者: 2.4, 家属: 1.8, 医师: 1.8 },
  { disease: "抛德-利合征", 患者: 2.5, 家属: 1.5, 医师: 1.2 },
  { disease: "尼匹病", 患者: 3.0, 家属: 2.1, 医师: 2.1 },
  { disease: "慕克病", 患者: 3.0, 家属: 2.5, 医师: 2.1 }
];

export default function RareDiseaseGlyphs() {
  const svgRef = useRef();

  useEffect(() => {
    // 布局参数
    const numCols = 7;
    const numRows = Math.ceil(data.length / numCols);
    const cardW = 148;
    const cardH = 100;
    const cardGap = 24;
    const marginTop = 86;
    const marginBottom = 90;
    const marginSide = 44;
    const width =
      628;
    const height =
      marginTop +
      numRows * cardH +
      (numRows - 1) * cardGap +
      marginBottom;

    // 清空旧内容（确保响应式/重新渲染不重复）
    d3.select(svgRef.current).selectAll("*").remove();

    // 背景
    d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#062255")
      .style("font-family", "FZXBSJ, sans-serif");

    // 标题
    d3.select(svgRef.current)
      .append("text")
      .attr("x", width / 2)
      .attr("y", 48)
      .attr("text-anchor", "middle")
      .style("font-size", "32px")
      .style("font-weight", "bold")
      .style("fill", "#fff")
      .text("不同罕见病患者、家属与医师的感受分布");

    // 分数比例尺
    const barMaxH = 50;
    const yScale = (val) => 68 - (val / 3) * barMaxH;

    // 卡片
    const card = d3
      .select(svgRef.current)
      .selectAll("g.card")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "card")
      .attr("transform", (d, i) => {
        const col = i % numCols;
        const row = Math.floor(i / numCols);
        const x = marginSide + col * (cardW + cardGap);
        const y = marginTop + row * (cardH + cardGap);
        return `translate(${x},${y})`;
      });

    card
      .append("rect")
      .attr("width", cardW)
      .attr("height", cardH)
      .attr("rx", 18)
      .attr("fill", "rgba(255,255,255,0.06)")
      .attr("stroke", "#264377")
      .attr("stroke-width", 2);

    card
      .selectAll("rect.bar")
      .data((d) =>
        roles.map((role, i) => ({
          role,
          value: d[role],
          color: roleColors[i],
          disease: d.disease,
          i
        }))
      )
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => 34 + d.i * 28)
      .attr("y", (d) => yScale(d.value))
      .attr("width", 16)
      .attr("height", (d) => 68 - yScale(d.value))
      .attr("rx", 4)
      .attr("fill", (d) => d.color);

    // 分数字
    card
      .selectAll("text.bar-label")
      .data((d) =>
        roles.map((role, i) => ({
          role,
          value: d[role],
          color: roleColors[i],
          disease: d.disease,
          i
        }))
      )
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d) => 34 + d.i * 28 + 8)
      .attr("y", (d) => yScale(d.value) - 8)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#fff")
      .attr("opacity", 0.85)
      .text((d) => d.value);

    // 病名
    card
      .append("text")
      .attr("x", cardW / 2)
      .attr("y", cardH - 18)
      .attr("text-anchor", "middle")
      .attr("font-size", "15px")
      .attr("fill", "#fff")
      .attr("font-weight", "bold")
      .text((d) => d.disease);

    // 图例
    const legendY = height - marginBottom + 38;
    roles.forEach((role, i) => {
      d3.select(svgRef.current)
        .append("rect")
        .attr("x", width / 2 - 90 + i * 90)
        .attr("y", legendY)
        .attr("width", 26)
        .attr("height", 14)
        .attr("rx", 4)
        .attr("fill", roleColors[i]);
      d3.select(svgRef.current)
        .append("text")
        .attr("x", width / 2 - 74 + i * 90)
        .attr("y", legendY + 12)
        .attr("font-size", "17px")
        .attr("fill", "#fff")
        .text(role);
    });

    d3.select(svgRef.current)
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 24)
      .attr("text-anchor", "middle")
      .attr("font-size", "13px")
      .attr("fill", "#fff")
      .attr("opacity", 0.7)
      .text("每个卡片为一种罕见病，色条高度代表三类人群感受分数");
  }, []);

  return (
    <div style={{ width: "100%", overflowX: "auto", background: "#062255" }}>
      <svg ref={svgRef} />
    </div>
  );
}
