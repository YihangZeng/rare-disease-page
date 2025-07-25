'use client';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import BubbleChart from "@/components/bc";
import RareDiseaseGlyphs from "@/components/rare-disease-glyphs"; 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DiseaseMisdiagnosisVsAwareness from '@/components/DiseaseMisdiagnosisVsAwareness';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function NextModulePage() {
  const [bubbleData, setBubbleData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/hpo_bubble_data_translated.json')
      .then(res => res.json())
      .then(setBubbleData)
      .catch(e => console.error('加载气泡图数据失败', e));
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative">
      {/* 背景 */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/section-bg.jpg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
      
      <motion.main
        className="max-w-[1600px] mx-auto px-4 py-16 relative"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center drop-shadow-lg">
          罕见病认知现状分析
        </h1>
        
        <section className="space-y-6 text-lg max-w-5xl mx-auto leading-relaxed text-gray-200">
          <p>
            大多数公众对于罕见病的认知都非常匮乏，根据深圳国际公益学院社会政策研究中心的统计，百分之七十五的社会公众仅知道3种及以下的罕见病病种，13%的社会公众对于罕见病一无所知。
          </p>
          
          <div className="my-6 flex justify-center">
            <img
              src="/images/rare-disease-chart2.png"
              alt="社会公众对于罕见病的了解情况"
              className="rounded max-w-full shadow-lg"
            />
          </div>
          <p>
            这份“不了解”，也成为误诊与延误治疗的温床。罕见病病种繁多、症状复杂，常常导致诊断延迟甚至误诊。据Orphanet罕见病知识库统计，罕见病已知症状累计多达xxx余种，涵盖神经系统、免疫系统、皮肤等多个领域。
          </p>
          
          {/* 词云图放这里 */}
          <div className="w-full h-[1100px] max-w-5xl mx-auto bg-white/10 rounded-lg p-6 backdrop-blur-md shadow-lg my-4">
            {bubbleData ? (
              <BubbleChart data={bubbleData} minValue={70} />
            ) : (
              <p className="text-center text-gray-400 py-40">加载中...</p>
            )}
          </div>
          
          <p className="text-center italic text-gray-400 mb-10">
            【 注：数据来源于Orphanet罕见病知识库，基于xx选取xx种病症；标题：《罕见病都有哪些病症？（部分）》】
          </p>
          
          <p>
            不仅是公众认知有限，连专业医生也难以避开知识盲区。根据《2020中国罕见病综合社会调研》对全国38634名临床医生的调查，有4.6%的受访者（共1,770人）表示从未听说过罕见病，60.9%（共23,514人）虽然听说过，但并不了解。
          </p>
          
          <p>
            在已知的罕见病中，医务人员最熟悉的病种依次为白化病、血友病和多发性硬化症。其中，白化病作为医生相对来说最熟悉的病种，知晓率也仅为25.94%，而对近一半病种的知晓率甚至不足1%。
          </p>
          
         
          
          <p className="text-center italic text-gray-400">
            【《部分罕见病误诊率及医务工作者知晓率》，数据来源于《2020中国罕见病综合社会调研》对于38634名医务工作者的调研】
          </p>
          
          <div className="my-6 flex justify-center overflow-auto">
            <DiseaseMisdiagnosisVsAwareness width={900} height={1000} />
          </div>
          
          <p>
            这一认知短板在后续调研中进一步显现。由于诊疗体系尚不完善、信息渠道有限、保障存在地域差异，医患双方对罕见病的认知常常存在偏差，影响信任建立与治疗沟通。为评估各方知识水平，研究团队设置了33道知识题，满分3分。结果显示，患者和家属平均得分分别为1.80和1.77分，均高于医师的1.56分，说明即便是高学历医生，对罕见病的了解仍有待提升。
          </p>
          
          <p className="text-center italic text-gray-400">
            【《患者vs患者家属vs医师，谁对罕见病更了解？》，数据来源于《2020中国罕见病综合社会调研》对患者、患者家属和医务工作者的调研，共设置33个与罕见病相关的知识性题目】
          </p>
          
          {/* 交互式D3图表插入位置 */}
          <div className="my-6 max-w-5xl mx-auto rounded-lg shadow-lg overflow-auto">
            <img src="/gsfb.png" alt="罕见病可视化" className="w-full h-auto block" />
          </div>
          
          <p>
            从公众到专业人士，对罕见病认知的普遍匮乏，正在悄然构成一道“隐形壁垒”，不仅延误了确诊时机，也让本可早干预的治疗变得步履维艰。
          </p>
        </section>
        
        {/* 底部跳转按钮 */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <Button
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 px-8 py-3 text-lg rounded-full backdrop-blur-sm transition-all duration-300"
            onClick={() => router.push('/module3')}
          >
            下一章节
          </Button>
        </div>
      </motion.main>
    </div>
  );
}