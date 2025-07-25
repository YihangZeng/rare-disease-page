import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts/core";
import EChartsReact from "echarts-for-react";
//import "echarts/map/js/china"; // 或动态加载见下

const fontFamily = "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', SimSun, serif";

// 原始数据
const rawData = [
  { "name": "辽宁省", "省外": 47.6, "省内": 13.6, "非异地": 38.8 },
  { "name": "江西省", "省外": 56.4, "省内": 12.8, "非异地": 30.7 },
  { "name": "上海市", "省外": 9.2, "省内": 0.0, "非异地": 90.8 },
  { "name": "内蒙古自治区", "省外": 69.2, "省内": 5.4, "非异地": 25.3 },
  { "name": "黑龙江省", "省外": 55.2, "省内": 21.3, "非异地": 23.6 },
  { "name": "重庆市", "省外": 26.5, "省内": 0.0, "非异地": 73.5 },
  { "name": "天津市", "省外": 38.5, "省内": 0.0, "非异地": 61.5 },
  { "name": "广西壮族自治区", "省外": 32.2, "省内": 26.6, "非异地": 40.9 },
  { "name": "云南省", "省外": 29.6, "省内": 36.9, "非异地": 33.4 },
  { "name": "吉林省", "省外": 36.3, "省内": 20.4, "非异地": 43.3 },
  { "name": "甘肃省", "省外": 40.3, "省内": 29.7, "非异地": 30.1 },
  { "name": "贵州省", "省外": 47.2, "省内": 23.4, "非异地": 29.4 },
  { "name": "新疆维吾尔自治区", "省外": 44.0, "省内": 27.7, "非异地": 28.3 },
  { "name": "宁夏回族自治区", "省外": 46.4, "省内": 15.9, "非异地": 37.7 },
  { "name": "海南省", "省外": 45.8, "省内": 23.7, "非异地": 30.5 },
  { "name": "青海省", "省外": 29.6, "省内": 29.6, "非异地": 40.7 },
  { "name": "西藏自治区", "省外": 88.9, "省内": 0.0, "非异地": 11.1 },
  { "name": "香港特别行政区", "省外": 16.7, "省内": 0.0, "非异地": 83.3 },
  { "name": "澳门特别行政区", "省外": 0.0, "省内": 0.0, "非异地": 100.0 }
];

// 你可将china.json下载到 public/china.json
const mapUrl = "/china.json";

function getMapOption(field, titleText) {
  return {
    backgroundColor: "#062255",
    title: {
      text: titleText,
      left: 'center',
      textStyle: {
        color: "#FFF",
        fontFamily: fontFamily,
        fontWeight: "bold",
        fontSize: 19,
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c}%',
      textStyle: { fontFamily }
    },
    visualMap: {
      left: 'right',
      min: 0,
      max: 100,
      inRange: {
        color: [
          "#AFCBEF", "#B7C7DF", "#FFF9C4", "#FFE48F", "#FFD86B"
        ] // 浅蓝-黄渐变
    },
      text: ['高', '低'],
      calculable: true,
      textStyle: { color: "#fff", fontFamily }
    },
    series: [
      {
        type: "map",
        map: "china",
        roam: false,
        data: rawData.map(d => ({ name: d.name, value: d[field] })),
        label: {
          show: false,
          fontFamily
        },
        emphasis: {
          label: { show: true, color: "#222", fontWeight: "bold", fontFamily }
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1
        }
      }
    ]
  }
}

function getBarOption(field, titleText) {
  return {
    backgroundColor: "#062255",
    title: {
      text: titleText,
      left: "center",
      textStyle: {
        color: "#FFF",
        fontFamily: fontFamily,
        fontWeight: "bold",
        fontSize: 19,
      }
    },
    grid: { left: 60, right: 24, top: 46, bottom: 26 },
    xAxis: {
      type: "value",
      axisLabel: { color: "#fff", fontFamily }
    },
    yAxis: {
      type: "category",
      data: rawData.map(item => item.name),
      axisLabel: { color: "#fff", rotate: 28, fontFamily }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%',
      textStyle: { fontFamily }
    },
    series: [
      {
        type: "bar",
        data: rawData.map(d => d[field]),
        itemStyle: {
          color: "#AFCBEF"
        },
        barWidth: 16
      }
    ]
  };
}

export default function ThreeChinaMaps() {
  const [isMapView, setIsMapView] = useState(true);
  const [geoLoaded, setGeoLoaded] = useState(false);

  // 地图注册（只需注册一次）
  useEffect(() => {
    fetch(mapUrl)
      .then(res => res.json())
      .then(json => {
        echarts.registerMap("china", json);
        setGeoLoaded(true);
      });
  }, []);

  // 响应点击切换
  function handleToggle() {
    setIsMapView(v => !v);
  }

  // 注意 geoLoaded 为true后再渲染 ECharts
  return (
    <div
      style={{
        display: "flex",
        height: 620,
        width: 880,
        background: "#062255",
        fontFamily
      }}
      onClick={handleToggle}
      title="点击切换地图/条形图"
    >
      {["省外", "省内", "非异地"].map((field, i) => (
        <div style={{ flex: 1, minWidth: 0 }} key={field}>
          {geoLoaded ? (
            <EChartsReact
              style={{ width: "100%", height: 620, background: "#062255" }}
              option={
                isMapView
                  ? getMapOption(field, field === "省外"
                    ? "省外流动比例"
                    : field === "省内"
                      ? "省内就诊比例"
                      : "非异地就诊比例")
                  : getBarOption(field, field === "省外"
                    ? "省外流动比例"
                    : field === "省内"
                      ? "省内就诊比例"
                      : "非异地就诊比例")
              }
              notMerge={true}
              lazyUpdate={true}
              opts={{ renderer: "canvas" }}
            />
          ) : (
            <div
              style={{
                width: "75%",
                height: 620,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              正在加载地图...
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
