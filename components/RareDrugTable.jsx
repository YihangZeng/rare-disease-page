// components/RareDrugTable.jsx
import React from "react";

export default function RareDrugTable() {
  const data = [
    ["注射用阿糖苷酶α", "糖原累积病（Ⅰ型、Ⅱ型）", "2015", "127", "256"],
    ["注射用艾夫糖苷酶α", "", "2023", "", ""],
    ["注射用拉罗尼酶浓溶液", "黏多糖贮积症(Ⅰ型)", "2020", "158", "129"],
    ["依洛硫酸酯酶α注射液", "黏多糖贮积症(Ⅳa型)", "2019", "288", "103"],
    ["布罗索尤单抗注射液", "低磷性佝偻病", "2021", "155", "530"],
    ["", "肿瘤相关骨软化症", "", "", ""],
  ];

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full text-sm text-white border border-gray-400">
        <thead className="bg-gray-700 text-xs uppercase">
          <tr>
            <th className="px-4 py-2 border">药物名称</th>
            <th className="px-4 py-2 border">罕见病名称</th>
            <th className="px-4 py-2 border">上市年份</th>
            <th className="px-4 py-2 border">年治疗费用(万元)</th>
            <th className="px-4 py-2 border">患者组织登记人数</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800">
          {data.map((row, idx) => (
            <tr key={idx} className="border-t border-gray-600">
              {row.map((cell, i) => (
                <td key={i} className="px-4 py-2 border text-center">
                  {cell || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-sm text-gray-200 italic text-center mt-2">
        数据来源于《2024沙利文罕见病行业趋势观察报告》
      </p>
    </div>
  );
}
