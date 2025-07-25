'use client';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useState } from "react";

// 动态导入地图组件
const ThreeChinaMaps = dynamic(() => import("@/components/ThreeChinaMaps"), {
  ssr: false,
});
// 动态导入诊断回退图表组件
const DiagnosisFallbackChart = dynamic(() => import("@/components/DiagnosisFallbackChart"), {
  ssr: false,
});

const sectionData = [
  {
    text: `16个月还不会走路，3岁体检查出肌酸激酶异常，却被医生说成是“发育慢”“缺钙”“缺维生素”，开出的药单只是一些补钙剂和维生素片。这是小张（化名）与疾病抗争的开始，但也是一次又一次奔波的起点。`,
  },
  {
    text: `像小张一样，许多患者在面对异常症状时及时就医，却因误诊而错失了有效治疗的时机。以原发性免疫缺陷病（PID）患者为例，他们常因多种非特异性症状求医，增加了早期识别与诊断的难度。根据《中国原发性免疫缺陷病患者诊疗状况及生命质量调研报告2024-2025年》收集的患者自报告数据，反复的上呼吸道感染（48.5%）、持续发热（42.6%）和严重呼吸系统问题（31.1%）是最常见的首诊原因，而不同年龄段的患者在首诊原因上表现出较为一致的分布特点。`,
    image: {
      src: "/images/image.png",
      alt: "罕见病患者的首诊原因都是什么？",
      caption:
        "数据来源于《中国原发性免疫缺陷病患者诊疗状况及生命质量调研报告2024-2025年》对PID患者调研，共回收435份有效问卷",
    },
  },
  {
    text: `从儿科到骨科、再到心内科，十几年间，小张的父母带他奔走于全国多家医院，挂过十几个科室，换来的却只是模糊的诊断词：“骨质疏松”“代谢异常”……真正的病因，始终像一个巨大的问号，横亘在全家的生活之上。根据《沙利文2024罕见病行业趋势观察报告》显示，96.6%的北京患者和93.8%的上海患者可以实现在本地确诊，而100%的西藏患者和83.7%的内蒙古患者则需要去省外医院确诊。`,
    customComponent: <ThreeChinaMaps />,
    caption: "数据来源于《2020中国罕见病综合社会调研》对20804位患者的调研",
  },
  {
    text: `那么，当医生无法确诊时，患者和家属又该如何应对？根据《2020中国罕见病综合社会调研》显示，除去约3500名患者表示所遇医生均能明确诊断以外，绝大多数患者曾遇到过医生无法确诊的情况。在这些情况下，27.9%的患者被建议前往其他城市的医院治疗，26.4%的患者反映医生依据自身临床经验进行治疗；此外，当医生提出转诊时，14.7%的患者被转到本地上级医院，7.1%的患者则被建议转给本院的上级医师。值得注意的是，仍有13.0%的患者被医生建议回家等待。`,
    image: {
      src: "/images/sankey.png",
      alt: "国内罕见病患者用了多少境外药？",
      caption: "数据来源于《沙利文罕见病行业趋势观察报告》",
    },
  },
  {
    text: `12岁那年，小张已经无法独立行走，只能靠轮椅生活。直到有医生注意到他“小腿肌肉假肥大”的表现，提出进行基因检测。结果显示：他患的是DMD（杜氏肌营养不良症），一种罕见却有典型特征的疾病。此时，距离第一次出现症状，已经过去了整整13年。`,
  },
  {
    text: `确诊困难只是问题的开始。国内针对罕见病的药物供应依然严重不足，许多患者不得不依赖境外药物治疗。长期以来，罕见病药物研发投入巨大且临床试验复杂，海外创新药企很少将中国市场纳入上市计划，国内涉足罕见病药物研发的企业更是寥寥无几。这一现实使我国罕见病患者长期陷入“境外有药，境内无药”的困境。`,
    image: {
      src: "/images/chart4.png",
      alt: "国内罕见病患者用了多少境外药？",
      caption: "数据来源于《2024中国罕见病行业趋势观察报告》",
    },
  },
];

export default function Page() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-screen"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => setShowIntro(false)}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/images/module-intro3.png"
              alt="模块介绍"
              className="w-full h-full object-cover"
              draggable={false}
            />
            <motion.div
              className="absolute bottom-20 w-full text-center text-white text-xl font-semibold select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              点击进入
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <div
          className="min-h-screen w-full bg-fixed bg-center bg-no-repeat bg-cover px-6 py-16 text-white"
          style={{ backgroundImage: "url('/images/section-bg.jpg')" }}
        >
          <div className="max-w-4xl mx-auto space-y-16">
            {/* 主标题 */}
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-bold text-center drop-shadow-lg"
            >
              （二）翻越地图，为一次可能的治疗
            </motion.h1>
            {/* 正文内容 */}
            {sectionData.map((section, idx) => (
  <motion.div
    key={idx}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: idx * 0.2 }}
    viewport={{ once: true }}
    className="space-y-4"
  >
    <p className="text-lg md:text-xl leading-relaxed drop-shadow-lg">{section.text}</p>
    {section.image && (
      <div className="space-y-2">
        <img
          src={section.image.src}
          alt={section.image.alt}
          className="w-full rounded-lg shadow-lg"
        />
        <p className="text-sm text-gray-200 italic text-center">
          {section.image.caption}
        </p>
      </div>
    )}
    {section.customComponent && (
      <div className="mt-4">
        {section.customComponent}
        {section.caption && (
          <p className="text-sm text-gray-400 italic text-center mt-2">
            {section.caption}
          </p>
        )}
      </div>
    )}
  </motion.div>
))}
            {/* 下一章节按钮 */}
            <motion.div
              className="text-center pt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Link href="/module4">
                <Button className="text-white border border-white bg-transparent hover:bg-white hover:text-black text-lg px-8 py-4 rounded-full shadow-md transition duration-300">
                  下一章节
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}