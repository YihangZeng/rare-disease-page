'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PatientAidGraph from "@/components/star";

const timelineData = [
  {
    date: "2024.12",
    policies: [
      {
        name: "《国务院关税税则委员会关于2025年关税调整公告的方案》",
        agency: "国务院关税税则委员",
        content: "2025年起，对部分罕见病药物进口实施零关税，支持新质量生产力建设。",
      },
      {
        name: "《产业结构调整指导目录》",
        agency: "国家发展和改革委员会",
        content: "推动新药开发与产业化，支持罕见病药物和创新治疗药物的研发",
      },
    ],
  },
  {
    date: "2024.11",
    policies: [
      {
        name: "《关于印发 <国家基本医疗保险、工伤保险和生育保险药品目录（2024 年）> 的通知》",
        agency: "国家医保局、人力资源社会保障部",
        content: "新增13种罕见病治疗药物纳入医保目录，帮助减轻患者经济负担",
      },
    ],
  },
  {
    date: "2024.10",
    policies: [
      {
        name: "《罕见病诊疗指南（2024 年版）》",
        agency: "国家卫健委",
        content: "梳理了第二批罕见病目录中涉及的 86 种疾病的诊疗方案，为长期从事诊疗的一线临床工作者提供借鉴参考和专业指导",
      },
      {
        name: "《模型引导的罕见疾病药物研发技术指导原则（征求意见稿）》",
        agency: "国家药监局药品审评中心",
        content: "强调定量药理学在罕见病药物研发中的作用，支持药物研发和临床批次评估",
      },
      {
        name: "《罕见病药物临床药理学研究技术指导原则（征求意见稿）》",
        agency: "国家药监局药品审评中心",
        content: "通过临床药理学和定量药理学推动罕见病药物储备，解决研发的设计和数据分析挑战",
      },
    ],
  },
  {
    date: "2024.09",
    policies: [
      {
        name: "《以患者为中心的罕见疾病药物研发专项工作计划（“关爱计划”）》",
        agency: "国家药监局药审中心",
        content: "推动以患者为中心的罕见病药物研发，指导研发单位药物研发全程中引入患者观点，促进罕见病药物上市",
      },
      {
        name: "《关于临床急需进口药品器械和罕见病进口药品体系建设的指导意见（试行）》",
        agency: "北京市药品监督管理局",
        content: "建立政府主导的全链覆盖体系，推动临床急需药品与罕见病药品的进口和监管",
      },
      {
        name: "《关于印发第五次鼓励接种儿童药品清单的通知》",
        agency: "国家卫健委、国家药监局",
        content: "优先关注儿童药物需求，纳入罕见病药物，推动儿童药品研发",
      },
    ],
  },
  {
    date: "2024.08",
    policies: [
      {
        name: "《中华人民共和国医疗器械管理法（征求意见稿）》",
        agency: "国家药监局综合司",
        content: "优先审评罕见病、重症和儿童专用医疗器械，支持科技攻关项目",
      },
    ],
  },
  {
    date: "2024.06",
    policies: [
      {
        name: "《深化医药卫生体制改革 2024 年重点工作任务》",
        agency: "国务院",
        content: "加快创新药、罕见病治疗药品审批，推动新药研发",
      },
    ],
  },
  {
    date: "2024.05",
    policies: [
      {
        name: "《在罕见疾病药物临床研发中应用去中心化临床试验的技术指导原则》",
        agency: "国家药监局",
        content: "结合数字药健康技术（DHT），为罕见疾病药物临床试验提供灵活新方法，支持新路径",
      },
    ],
  },
  {
    date: "2024.03",
    policies: [
      {
        name: "《关于调整全国罕见病诊疗协作网成员医院和办公室人员的通知》",
        agency: "国家卫健委",
        content: "324 家增加到 419 家，相较于 2019 年首批名单，增加了 110 家同时减少了 15 家。同期更新的还有《全国罕见病诊疗协作网办公室人员名单》",
      },
    ],
  },
  {
    date: "2024.01",
    policies: [
      {
        name: "《罕见病基因治疗产品临床试验技术指导原则》",
        agency: "国家药监局",
        content: "本指导原则将结合罕见病特征、基因治疗产品特征，对罕见病基因治疗产品的临床研发提出建议，为罕见病基因治疗产品开展临床试验提供参考",
      },
    ],
  },
  {
    date: "2023.12",
    policies: [
      {
        name: "《关于印发第三批鼓励仿制药品目录的通知》",
        agency: "国家卫健委办公厅等五部门",
        content: "鼓励多种罕见病仿制药物的研发",
      },
      {
        name: "《国家基本医疗保险、工伤保险和生育保险药品目录（2023年）》",
        agency: "国家医保局、人社部",
        content: "新的《医保目录》新增15个罕见病用药，覆盖16个罕见病病种，填补了10个病种的用药保障空白",
      },
    ],
  },
  {
    date: "2023.11",
    policies: [
      {
        name: "《关于<支持北京深化国家服务业扩大开放综合示范区建设工作方案>的批复》",
        agency: "国务院",
        content: "优化跨境贸易监管服务模式，允许符合条件的企业代理进口经过安全风险评估的细胞与基因治疗产品和临床急需药品，探索未在国内注册上市的罕见病药品",
      },
    ],
  },
  {
    date: "2023.09",
    policies: [
      {
        name: "《第二批罕见病目录》",
        agency: "国家卫健委等六部门",
        content: "进一步加强我国罕见病管理，提高罕见病诊疗水平，维护罕见病患者健康权益",
      },
    ],
  },
  {
    date: "2023.08",
    policies: [
      {
        name: "《第四批鼓励研发申报儿童药品清单》",
        agency: "国家卫建委办公厅等四部门",
        content: "鼓励清单中涉及到的8种与罕见病相关的药品研发",
      },
    ],
  },
  {
    date: "2023.07",
    policies: [
      {
        name: "《以患者为中心的药物临床试验设计技术指导原则（试行）》、 《以患者为中心的药物临床试验实施技术指导原则（试行）》、 《以患者为中心的药物获益-风险评估技术指导原则（试行）》",
        agency: "国家药监局药审中心",
        content: "提出“以患者为中心”的药物研发策略。基于患者角度开展药物开发、设计、实施和决策的过程，促进高效研发更符合患者需求的有临床价值的药物",
      },
      {
        name: "《罕见疾病药物开发中疾病自然史研究指导原则》",
        agency: "国家药监局药审中心",
        content: "推动和规范我国罕见疾病的疾病自然史研究，提供可参考的技术规范",
      },
      {
        name: "《谈判药品续约规则》",
        agency: "国家医保局",
        content: "建立了基本覆盖药品全生命周期的支付标准调整规则，稳定并合理提升患者用药保障水平",
      },
      {
        name: "《非独家药品竞价规则》",
        agency: "国家医保局",
        content: "按照《基本医疗保险用药管理暂行办法》要求，制定了非独家药品的竞价规则",
      },
    ],
  },
  {
    date: "2023.06",
    policies: [
      {
        name: "《人类遗传资源管理条例实施细则》",
        agency: "科学技术部",
        content: "放宽了应当申报行政审批的采集范围，明确了高血压、糖尿病、红绿色盲、血友病等常见疾病不属于重要遗传家系监管范围，取消罕见病等特定种类的采集监管要求",
      },
    ],
  },
  {
    date: "2023.04",
    policies: [
      {
        name: "《儿童用药沟通交流中Ⅰ类会议申请及管理工作细则（试行）》",
        agency: "国家药监局药审中心",
        content: "针对儿童患病率高，且已列入罕见病目录的疾病或国家卫健委认定的重大传染病而研发的品种可开展临床交流",
      },
      {
        name: "《基因治疗血友病临床试验设计技术指导原则》",
        agency: "国家药监局药审中心",
        content: "从临床试验设计、受试者选择、有效性终点、安全性监测等方面，概述了基因治疗血友病临床试验设计的考虑要点",
      },
    ],
  },
  {
    date: "2023.03",
    policies: [
      {
        name: "《关于进一步完善医疗卫生服务体系的意见》",
        agency: "中共中央办公厅、国务院办公厅",
        content: "支持高水平医院建设疑难复杂专病及罕见病临床诊疗中心、人才培养基地和医学科技创新与转化平台，以满足重大疾病临床需求为导向加强临床专科建设，组建专科联盟和远程医疗协作网",
      },
    ],
  },
  {
    date: "2023.02",
    policies: [
      {
        name: "《中药注册管理专门规定》",
        agency: "国家药监局",
        content: "用于重大疾病、新发突发传染病、罕见病防治新药的注册申请实行优先审评审批",
      },
      {
        name: "《质量强国建设纲要》",
        agency: "中共中央、国务院",
        content: "加强药品和疫苗全生命周期管理，推动临床急需和罕见病治疗药品、医疗器械审评审批提速，提高药品检验检测和生物制品（疫苗）批签发能力，优化中药审评机制，加速推进化学原料药、中药技术研发和质量标准升级，提升仿制药与原研药、专利药的质量和疗效一致性",
      },
    ],
  },
  {
    date: "2023.01",
    policies: [
      {
        name: "《关于印发进一步加强中药科学监管促进中药传承创新发展若干措施的通知》",
        agency: "国家药监局",
        content: "鼓励并扶持用于重大疾病、罕见病，或者儿童用中药新药的研制，对符合规定情形的相关注册申请实行优先审评审批",
      },
    ],
  },
];


const sectionData = [
  {
    storyTitle: "成为罕见病患者22年，我多了1300个好友",
    storyText:
      "黑斑息肉综合征（PJS）患者组织成员小何（化名），作为国内最早几位确诊的患者之一，她不仅在病痛中坚强前行，更用爱与希望点亮了他人的世界。“我比他们自己都更急，因为我知道得不到合理治疗的后果，总担心病友走弯路。”22 年来，小何联络了 1300 多位病友，为他们答疑解惑，分享治疗经验，传递温暖与力量。",
  },
  {
    text:
      "无论是团体、组织、还是个人，为解决医疗负担开展的援助、互助行为，都带有深厚的公益、慈善属性，他们基于一种“利他”的价值，参与到罕见病的“多层次保障”中。",
    image: {
      src: "/images/aid-projects.jpg",
      alt: "患者可以通过哪些项目获得援助？",
      caption: "数据来源于《2024沙利文罕见病行业趋势观察报告》",
    },
  },
  {
    text:
      "近年来，我国公益慈善力量为罕见病用药保障作出了一系列的努力：无论是单病种的患者组织，还是基金会，都在试图通过开展针对患者的援助项目，尝试减轻患者的用药负担；作为患者及家庭，通过动员亲朋好友开展民间互助，也是一种常见的自救手段。",
    image: {
      src: "/images/social-activities.png",
      alt: "罕见病患者可以参加什么样的社会公益活动？",
      caption: "数据来源于《2024沙利文罕见病行业趋势观察报告》",
    },
  },
  {
    text:
      "在中共中央、国务院发布的《“健康中国 2030”规划纲要》中明确提出，到 2030 年，我国将推动全民健康制度体系的完善、健康服务质量的提升以及健康产业的繁荣发展，最终实现健康公平的目标。这一目标不仅为罕见病患者提供了坚实的政策支持，也为药品监管和医疗保障工作明确了发展方向，给更多的罕见病患者带来了生的希望。",
  },
  // 替换图片的section用时间轴显示
  {
    policyTimeline: true,
    caption:
      "数据来源于《2024沙利文罕见病行业趋势观察报告》《2025沙利文罕见病行业趋势观察报告》",
  },
  {
    text:
      "随着我国罕见病多层次保障的讨论日益深入，“三重保障（基本医保、大病保险、医疗救助）+商业保险+政府慈善救助+社会互助”的多层次保障格局逐渐完善并达成共识。或许真正的治愈，不在于消除所有病痛，而在于建造一个无需患者成为“孤勇者”的世界。",
  },
];


function PolicyTimeline({
  data,
  caption,
}: {
  data: typeof timelineData;
  caption?: string;
}) {
  return (
    <div className="p-6 rounded-lg max-h-[600px] overflow-y-auto">
      <h3 className="text-2xl font-bold mb-6 text-center drop-shadow-lg text-white">
        罕见病相关政策时间轴
      </h3>
      <div className="space-y-8">
        {data.map(({ date, policies }) => (
          <div key={date}>
            <div className="text-2xl font-extrabold mb-3 border-l-4 border-white pl-3 drop-shadow-md">
              {date}
            </div>
            <ul className="list-disc list-inside space-y-3">
              {policies.map(({ name, agency, content }) => (
                <li key={name} className="leading-relaxed text-white drop-shadow-sm">
                  <p className="font-bold text-lg md:text-xl">{name}</p>
                  <p className="italic text-gray-300">{agency}</p>
                  <p>{content}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {caption && (
        <p className="text-sm text-gray-300 italic mt-6 text-center select-none drop-shadow-sm">
          {caption}
        </p>
      )}
    </div>
  );
}

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
              src="/images/module-intro6.png"
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
          className="min-h-screen w-full bg-cover bg-center px-6 py-16 text-white"
          style={{ backgroundImage: "url('/images/section-bg.jpg')" }}
        >
          <div className="max-w-4xl mx-auto space-y-16">
            {/* 页面标题 */}
            <h2 className="text-3xl font-extrabold mb-10 text-center drop-shadow-lg">
              （五）从一个人的支持，到一群人的联动
            </h2>
            {sectionData.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {section.storyTitle && (
                  <h3 className="text-2xl font-bold drop-shadow-lg">
                    {section.storyTitle}
                  </h3>
                )}
                {section.storyText && (
                  <p className="text-lg md:text-xl leading-relaxed drop-shadow-md whitespace-pre-line">
                    {section.storyText}
                  </p>
                )}
                {section.text && (
                  <p className="text-lg md:text-xl leading-relaxed drop-shadow-md whitespace-pre-line">
                    {section.text}
                  </p>
                )}
                {section.policyTimeline ? (
                  <PolicyTimeline data={timelineData} caption={section.caption} />
                ) : idx === 1 ? (
                  <>
                    <PatientAidGraph />
                    <p className="text-sm text-gray-200 italic text-center mt-2">
                      数据来源于《2024沙利文罕见病行业趋势观察报告》
                    </p>
                  </>
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
              <Link href="/module7">
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