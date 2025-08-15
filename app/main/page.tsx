'use client';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import RadialTree from "@/components/rt";
import BubbleChart from "@/components/bc";

const patients = [
  { id: 1, img: "/images/patient-xiaolei.png" },
  { id: 2, img: "/images/patient-xiaofan1.png" },
  { id: 3, img: "/images/patient-xiaonan.png" },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative" as const,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: "absolute" as const,
  }),
};

export default function HomeIntro() {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const patientIndex = (page + patients.length) % patients.length;
  const [treeData, setTreeData] = useState(null);
  const [bubbleData, setBubbleData] = useState(null);

  // 新增状态，控制是否显示全屏介绍图片
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    fetch('/tree3.json')
      .then(res => res.json())
      .then(setTreeData)
      .catch(e => console.error('加载树形图数据失败', e));
    fetch('/hpo_bubble_data_translated.json')
      .then(res => res.json())
      .then(setBubbleData)
      .catch(e => console.error('加载气泡图数据失败', e));
  }, []);

  return (
    <div className="min-h-screen w-full select-none text-white overflow-x-hidden">
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
            {/* 替换成你想展示的全屏图片 */}
            <img
              src="/images/module-intro.png"
              alt="模块介绍"
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* 可以加一个提示文字，比如“点击进入” */}
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
        <>
          {/* 你的原始页面内容，保持不变 */}
          <section
            className="min-h-screen w-full px-8 py-12 flex flex-col justify-center mx-auto"
            style={{
              backgroundImage: 'url(/images/section-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-8 drop-shadow-lg text-center"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              你知道，中国有两千万个这样的角落吗？
            </motion.h1>
            <motion.section
              className="max-w-5xl mx-auto space-y-6 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
            >
              <h2 className="text-3xl font-semibold mb-4">什么是罕见病</h2>
              <p>罕见病，指的是患病率极低、患者人数稀少的一类疾病。虽然单一病种的患者规模可能不大，但作为一个整体，其影响范围远超公众想象。数据显示，全球已知的罕见病种类已超过7,000种。其中，根据患病率标准定义的5,304种罕见病中，超过八成（84.5%）的发病率低于百万分之一。</p>
              <p>尽管如此，罕见病的总体患病人群规模却并不“罕见”。循证医学数据显示，全球范围内罕见病的患病率约为3.5%至5.9%，受影响人数估计达2.6亿至4.5亿人。在中国，公开文献中已记录的罕见病种类超过1,400种，而实际数量或远高于此。由于罕见病的确诊难度大，不少患者被误诊为常见疾病或长期未被发现，导致诊疗路径复杂、延误严重。</p>
              <div className="mt-8 text-center">
                <img src="/images/rare-disease-chart.png" alt="罕见病群体不罕见图表1" className="mx-auto rounded max-w-full shadow-lg" />
              </div>
              <p>目前，中国罕见病患者数量已被估算超过2,000万人。全球罕见病数据库Orphanet在2019年对6,172种罕见病进行统计后发现，约71.9%的罕见病与遗传因素有关，近七成（69.9%）在儿童期即发病。这一现实也提示着政策制定者与医疗系统：对于这一庞大而隐形的患者群体，认知、识别与支持体系亟待加强。</p>
            </motion.section>
          </section>

          <section className="min-h-screen w-full px-4 py-12 mx-auto bg-[url('/images/section-bg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="w-full h-[1000px] max-w-5xl mx-auto bg-white/10 rounded-lg p-6 backdrop-blur-md shadow-lg my-4">
              {treeData ? (
                <RadialTree data={treeData} rootName="Rare disorders (320716)" />
              ) : (
                <p className="p-4 text-center text-gray-300">加载中...</p>
              )}
            </div>
          </section>

          <section className="min-h-screen w-full px-4 py-12 flex flex-col items-center justify-center bg-[url('/images/section-bg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="relative w-full max-w-4xl h-[480px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={patients[patientIndex].id}
                  className="h-full flex justify-center items-center relative rounded-lg shadow-lg bg-white/10 backdrop-blur"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <img src={patients[patientIndex].img} alt="" className="rounded object-contain max-h-full max-w-full select-none" draggable={false} />
                </motion.div>
              </AnimatePresence>
              <button aria-label="上一位患者" onClick={() => setPage([page - 1, -1])} className="absolute top-1/2 -translate-y-1/2 left-[-60px] bg-white/20 text-white border border-white rounded-full shadow-lg p-3 hover:bg-white/30 transition">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button aria-label="下一位患者" onClick={() => setPage([page + 1, 1])} className="absolute top-1/2 -translate-y-1/2 right-[-60px] bg-white/20 text-white border border-white rounded-full shadow-lg p-3 hover:bg-white/30 transition">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
            <section className="text-center mt-8">
              <Link href="/story">
                <Button className="border border-white text-white bg-transparent hover:bg-white/20 text-lg px-8 py-4 rounded-full shadow-md">
                  跟随他们的生命轨迹
                </Button>
              </Link>
            </section>
          </section>
        </>
      )}
    </div>
  );
}
