'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function EndingPage() {
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowSecondImage(true);
    }, 3000); // 3秒切换到第二张图

    const timer2 = setTimeout(() => {
      setShowArrow(true);
    }, 7000); // 第二张图再展示4秒显示箭头

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleArrowClick = () => {
    setShowContent(true);
    setShowArrow(false);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">
      {/* 图片切换区域 */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {!showSecondImage && !showContent && (
            <motion.div
              key="firstImage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full bg-black flex items-center justify-center px-6"
            >
              <p className="text-4xl md:text-5xl font-semibold drop-shadow-lg text-center max-w-4xl whitespace-pre-line">
                角落，不必黑暗；生命，不必罕见。
              </p>
            </motion.div>
          )}

          {showSecondImage && !showContent && (
            <motion.div
              key="secondImage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full relative"
            >
              <Image
                src="/images/ending-2.jpg"
                alt="Ending Illustration"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
                className="absolute top-1/2 right-12 transform -translate-y-1/2 max-w-lg text-white text-3xl font-semibold drop-shadow-lg whitespace-pre-line select-none"
              >
                他们正在被看见
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {showArrow && !showContent && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.7, y: 0 }}
            whileHover={{ opacity: 1, y: 5 }}
            onClick={handleArrowClick}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full p-3 bg-white bg-opacity-20 hover:bg-opacity-40 transition cursor-pointer"
            aria-label="向下滚动"
          >
            <ChevronDown className="text-white" size={32} />
          </motion.button>
        )}
      </div>

      {/* 声明内容区 */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 min-h-screen w-full pt-16 px-6 md:px-12 bg-[url('/images/section-bg.jpg')] bg-cover bg-center text-white text-lg leading-relaxed"
          >
            <div className="max-w-4xl mx-auto space-y-6 py-12 rounded-lg p-8">
              <p className="font-semibold whitespace-pre-line">
                {`声明：
为保护患者隐私，文中涉及的患者及其家属姓名均已作化名处理，漫画及相关故事内容也均为在尊重事实基础上的艺术化表达。如有不妥之处，欢迎随时联系，我们将及时修改或删除。
我们发布这篇新闻的初衷，是希望唤起更多人对罕见病群体的关注与理解，倡导尊重和支持，而非对任何行业或个体的指责。感谢理解与包容。`}
              </p>

              <p>提摩西小分队</p>
              <p>作者：王歌 朱润宁 曾奕航 齐一帆</p>
              <p>指导老师：于孟利 李维嘉</p>

              <div>
                <p className="font-semibold mt-4 mb-1">数据来源：</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>《2020中国罕见病综合社会调研》</li>
                  <li>《2024沙利文罕见病行业趋势观察报告》</li>
                  <li>《2025沙利文罕见病行业趋势观察报告》</li>
                  <li>《2022年中国罕见病临床诊疗现状调研报告》</li>
                  <li>《中国罕见病诊疗与血液制品未满足临床需求研究——中国原发性免疫缺陷病患者诊疗状况及生命质量调研报告（2024-2025年）》</li>
                  <li>Orphanet罕见病知识库</li>
                  <li>深圳国际公益学院社会政策研究中心</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mt-4 mb-1">参考文献：</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>中华神经科杂志, 2023, 56(8): 848-855.</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mt-4 mb-1">故事来源：</p>
                <ul className="list-disc list-inside space-y-1 break-words">
                  <li>
                    <a
                      href="http://finance.people.com.cn/n1/2019/0212/c1004-30623913.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-gray-400"
                    >
                      人民网，《30岁“女版药神”：宁可卖房购药 从未为自己众筹》
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://news.qq.com/rain/a/20230815A09QKC00"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-gray-400"
                    >
                      新黄河，《罕见病女童的救治之路：哪怕只有1%的希望，也要去试一试》
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://mp.weixin.qq.com/s?__biz=MzU0MTg4MzQ1MA==&mid=2247589130&idx=1&sn=b2aedee635c313a4f37ebec413437335&chksm=fa98b4f7764d324aab56ce5c11a3b886f1646d3d0153a2ac825266ad8ffc046883427b78586a&scene=27"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-gray-400 break-all"
                    >
                      罕见病信息网，《成为罕见病患者22年，我多了1300个好友》
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://mp.weixin.qq.com/s/bu9SbUWMfC0lc_Zc6fdgKQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-gray-400 break-all"
                    >
                      天才捕手计划《罕见病女孩口述：全国有70万像我这样的人，到死都不知道自己病了》
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://mp.weixin.qq.com/s/CAOXx_yPQD9YQUztCEIEdg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-gray-400 break-all"
                    >
                      陈糖橙，《02年，23岁罕见病女孩，我究竟经历了什么？》
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://mp.weixin.qq.com/s/bXM76oO7lfNjF1m_gmQhVg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-gray-400 break-all"
                    >
                      故事FM，《三个罕见病人自述：被疾病「偷走」的人生》
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}