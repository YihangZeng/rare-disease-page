// src/App.jsx
import React, { useEffect, useState } from "react";
import CirclePack from "./cp";
import RadialTree from "./rt";
import BubbleChart from "./bc"; // 新增组件

function App() {
  const [treeData, setTreeData] = useState(null);
  const [bubbleData, setBubbleData] = useState(null);
  const [chartType, setChartType] = useState("circle"); // "circle" | "tree" | "bubble"

  useEffect(() => {
    fetch("/tree3.json")
      .then(res => res.json())
      .then(json => setTreeData(json))
      .catch(err => console.error("树数据加载失败:", err));

    fetch("/hpo_bubble_data_translated.json")
      .then(res => res.json())
      .then(json => setBubbleData(json))
      .catch(err => console.error("词云数据加载失败:", err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🌳 D3 图表切换</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setChartType("circle")}>🟡 Circle Packing</button>
        <button onClick={() => setChartType("tree")}>🌲 Radial Tree</button>
        <button onClick={() => setChartType("bubble")}>🟣 Bubble Chart</button>
      </div>

      {/* 三种图表切换展示 */}
      {chartType === "circle" && treeData && <CirclePack data={treeData} />}
      {chartType === "tree" && treeData && (
        <RadialTree data={treeData} rootName="Rare disorders (320716)" />
      )}
      {chartType === "bubble" && bubbleData && (
        <BubbleChart data={bubbleData} minValue={70} />
      )}

      {/* 加载提示 */}
      {(chartType === "circle" && !treeData) ||
      (chartType === "tree" && !treeData) ||
      (chartType === "bubble" && !bubbleData) ? (
        <p>⏳ 正在加载数据...</p>
      ) : null}
    </div>
  );
}

export default App;
