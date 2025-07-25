'use client';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useState } from "react";
// 动态导入组件
const EconomicBurdenPie = dynamic(() => import("@/components/EconomicBurdenPie"), { ssr: false });
const WillingnessActualChart = dynamic(() => import("@/components/WillingnessActualChart"), { ssr: false });
const RareDrugInsuranceCharts = dynamic(() => import("@/components/zuhe"), { ssr: false });
const RareDrugTable = dynamic(() => import("@/components/RareDrugTable"), { ssr: false });

const sectionData = [
  {
    text: `确诊证书像一把双刃刀——一面切开蒙昧的迷雾，另一面却刺向生活的命脉。
罕见病是医学难题，更是经济难题。受困于罕见病的特殊性，并非所有的患者都有药可医，也并非所有患者都负担得起天价的治疗费用。当医学名词终于从病历本上站起身，许多家庭发现，他们迎来的是一道道比疾病本身更残酷的数学题：存款数字在药价面前急速坍缩，借款利息追着病程疯长，连“活下去”这个本能的选择，都开始需要计算器辅助决策。
无数的家庭因此被撕裂。`,
  },
  {
    text: `小雨（化名）出生仅两个月时，被确诊为半乳糖-涎酸贮积症，是全球第一例通过进行骨髓移植进行治疗的患者。为了给小雨治病，一家子花光了所有积蓄，四处借钱。小雨爸爸辞去在工地开工程车的工作，在照顾小雨的同时兼职打零工。小雨的爷爷也当起保安赚钱勉强补贴家用。从小雨生病开始已经花了150万元，单移植就花费60多万元，由于病情罕见，大多数药物都需要自费。`,
  },
  {
    text: `根据调查显示，家庭年收入处于10万元以下的患者家庭最多占62.7%，30.6%家庭在10-25万之间。更加严峻的，是受访患者家庭的负债情况。有33.4%的患者家庭负债在10万-25万元之间，高达25.6%的患者家庭负债在25万元以上。
结合全体患者的年平均医疗开支（75,912元/年）和年非医疗费用开支（24,936元/年）统计数据，患者家庭的年直接开支占其家庭年平均收入的93%，远远超过WHO关于灾难性医疗支出阈值的定义，即家庭自付医疗费用超过家庭可支付能力的40%。根据患者家庭的自评，超过65%的患者表示疾病给家庭带来较重或非常重的经济负担。`,
    useChart: true,
  },
  {
    text: `有人在深夜翻遍亲友通讯录只为凑齐一支药的首付，有人在医院走廊用手机计算着孩子还能等多久，有人在药盒与账单的夹缝中省下一顿又一顿的饭钱……每个家庭都攒下治疗费的方式或许不同，但相同的是，他们都义无反顾选择“不能放弃，坚持下去”。`,
  },
  {
    text: `根据调查，对于有未成年患者的家庭来说，他们的支付意愿甚至占到了家庭收入的85.65%，实际医疗自费金额占比69.27%，支付意愿占家庭收入的比例高于实际医疗自费占家庭收入的比例18.38个百分点。这意味着，未成年罕见病患者家庭愿意几乎倾其所有来帮助孩子战胜疾病。对于成年患者家庭而言，他们的支付意愿占家庭收入42.93%，实际自费金额占59.84%，表明成年患者家庭仍然希望治病支出不要影响到家庭的正常运作。`,
    useComponent: true,
  },
  {
    text: `目前，64种罕见病的112种药物已纳入医保，其中甲类药物17种，乙类药物95种。甲类药物能够全额报销，乙类药物需要自付一部分，报销一部分，报销比例因各地政策和药物有所不同，门诊和住院用药也不相同，门诊用药普遍报销比例较低，住院治疗通常报销50%-70%；`,
    useZuhe: true,
  },
  {
    text: `不过，国家医保“兜底”不“大揽”的定位意味着罕见病保障不可能由国家全部买单。目前，50种罕见病的53种药物未纳入医保，其中有27种罕见病的全部治疗药物（共计25种）均未纳入医保，其中18种药物在国内年治疗费用高昂，为几十万元到上百万元，患者家庭难以负担。`,
    useTable: true, // ✅ 新增字段表示要使用表格
  },
  {
    text: `对于罕见病家庭而言，比病症发作更痛的，是清醒地看着自己与生存的希望之间的标价牌——它清晰地写着“可支付”，又血红地印着“不可抵达”。`,
  },
];

export default function Page() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
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
              src="/images/module-intro4.png"
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
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-center mb-10 drop-shadow-lg"
            >
              （三）确诊，是另一种焦虑的开始
            </motion.h2>
            {sectionData.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <p className="text-lg md:text-xl leading-relaxed drop-shadow-lg whitespace-pre-line">
                  {section.text}
                </p>
                {section.useComponent ? (
                  <div className="mt-8">
                    <WillingnessActualChart />
                    <p className="text-sm text-gray-200 italic text-center mt-2">
                      数据来源于《中国罕见病诊疗与血液制品未满足临床需求研究（2024-2025年）》
                    </p>
                  </div>
                ) : section.useChart ? (
                  <div className="mt-8">
                    <EconomicBurdenPie />
                    <p className="text-sm text-gray-200 italic text-center mt-2">
                      数据来源于《中国罕见病诊疗与血液制品未满足临床需求研究（2024-2025年）》
                    </p>
                  </div>
                ) : section.useZuhe ? (
                  <div className="mt-8">
                    <RareDrugInsuranceCharts />
                    <p className="text-sm text-gray-200 italic text-center mt-2">
                      数据来源于《2024沙利文罕见病行业趋势观察报告》
                    </p>
                  </div>
                ) : section.useTable ? (
                  <div>
                    <RareDrugTable />
                  </div>
                ) : section.image ? (
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
                ) : null}
              </motion.div>
            ))}
            <motion.div
              className="text-center pt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Link href="/module5">
                <Button className="text-white border border-white bg-transparent hover:bg-white hover:text-black text-lg px-8 py-4 rounded-full shadow-md transition duration-300">
                  下一章节
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}