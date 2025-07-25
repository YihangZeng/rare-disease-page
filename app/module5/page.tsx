'use client';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// 导入动态图组件，注意路径调整
import PolicyAwarenessBarChart from "@/components/last";
import { useState } from "react";

const sectionData = [
  {
    text: `确诊、药物和药价的重压尚未卸下，另一张无形的网已悄然收紧——即便倾尽家财换得生存机会，社会系统的认知迟滞与支持缺失，仍在将罕见病患者们推向更深的孤岛。从校园到职场再到日常社交，那些本应承接生命重量的社会结构，此刻却成了需要额外攀爬的峭壁。`,
  },
  {
    image: {
      src: "/images/mh123-1.jpg",
      alt: "漫画1 学业之墙",
      caption: "漫画1：学业之墙 - 教室走廊",
    },
  },
  {
    image: {
      src: "/images/mh123-2.jpg",
      alt: "漫画2 就业之墙",
      caption: "漫画2：就业之墙 - 公司会议室\n数据标注：2019年我国罕见病调查研究显示，成年罕见病患者就业率仅为40％",
    },
  },
  {
    image: {
      src: "/images/mh123-3.jpg",
      alt: "漫画3 生活之墙",
      caption: "漫画3：生活之墙 - 早高峰地铁站",
    },
  },
  {
    text: `尽管国家陆续出台罕见病专项政策，但认知断层也让许多救助措施沦为“空中楼阁”。即使作为罕见病患者们“救命稻草”的医务工作者，对罕见病相关政策的知晓情况也参差不齐。除了罕见病药物器械相关政策知晓率达到64.1%外，其他几类政策知晓率均处于半数及以下，罕见病平台建设相关政策知晓率仅为40.2%。对于政策的认知断层，使得许多针对罕见病的救助措施难以切实惠及患者，工作人员对政策细则的模糊执行可能加剧患者的困境。`,
    image: {
      // 仍可保留src/alt，用于辅助描述或SEO，如果愿意也可以删掉
      src: "/images/chart9.jpg",
      alt: "医务工作者对罕见病政策认知断层图表",
      caption: "数据来源于《2022年中国罕见病临床诊疗现状调研报告》",
    },
  },
  {
    text: `当政策善意卡在执行的“最后一公里”，患者不得不在繁复的证明材料和行政流程中耗尽本就稀缺的精力。那些写在文件里的权益需要自己争取，教室里的课桌要重新定义高度，职场中的价值需反复自证，就连超市过道的宽度都成了生存资格的丈量尺。`,
  },
];

export default function Page() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* 全屏介绍 */}
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
              src="/images/module-intro5.png"
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

      {/* 主体内容 */}
      {!showIntro && (
        <div
          className="min-h-screen w-full bg-cover bg-center px-6 py-16 text-white"
          style={{ backgroundImage: "url('/images/section-bg.jpg')" }}
        >
          <div className="max-w-4xl mx-auto space-y-16">
            {/* 主标题动画 */}
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-center drop-shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              （四）活下去之后，还要努力被接纳
            </motion.h1>
            {/* 内容部分 */}
            {sectionData.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {section.text && (
                  <p className="text-lg md:text-xl leading-relaxed drop-shadow-lg whitespace-pre-line">
                    {section.text}
                  </p>
                )}
                {section.image && (
                  <div className="space-y-2">
                    {/* === 特殊处理第五条，插入动态图组件 === */}
                    {idx === 4 ? (
                      <>
                        <PolicyAwarenessBarChart width={780} height={320} />
                        <p className="text-sm text-gray-200 italic text-center whitespace-pre-line">
                          {section.image.caption}
                        </p>
                      </>
                    ) : (
                      <>
                        <img
                          src={section.image.src}
                          alt={section.image.alt}
                          className="w-full rounded-lg shadow-lg"
                        />
                        <p className="text-sm text-gray-200 italic text-center whitespace-pre-line">
                          {section.image.caption}
                        </p>
                      </>
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
              <Link href="/module6">
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