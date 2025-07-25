'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const textParagraphs = [
  "那里，可能是一间狭小出租屋、一张病床，或者一本总被医院划归“待明确诊断”的病历。",
  "有人疼痛难忍却多年找不到病因；有人辗转十几家医院只为寻求治疗方法；有人从小吃药到大，药却始终没进医保。",
  "还有更多人，在被确诊之前，已经花光积蓄；在被理解之前，已经学会了沉默。",
  "他们在“罕见”的标签下，经历着“不罕见”的挣扎：确诊慢、用药贵、治愈难。",
  "他们不是在战斗，而是在生活，只是这场生活，比别人多了一层沉重的注脚。",
];

export default function HomeIntro() {
  const secondRef = useRef<HTMLDivElement | null>(null);
  const thirdRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* 第一屏：封面图 */}
      <div
        className="h-screen w-full bg-cover bg-center relative cursor-pointer"
        style={{ backgroundImage: "url('/images/cover.jpg')" }}
        onClick={() => scrollToSection(secondRef)}
      >
        <motion.div
          className="absolute bottom-10 w-full text-center text-white text-3xl animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ↓
        </motion.div>
      </div>

      {/* 第二屏：主标题 + 引导箭头 */}
      <motion.div
        ref={secondRef}
        className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center text-white text-center"
        style={{ backgroundImage: "url('/images/section-bg.jpg')" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-3xl md:text-5xl font-bold drop-shadow-xl px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          你知道，中国有两千万个这样的角落吗？
        </motion.h1>
        <motion.p
          className="mt-10 text-5xl animate-bounce cursor-pointer"
          onClick={() => scrollToSection(thirdRef)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ↓
        </motion.p>
      </motion.div>

      {/* 第三屏：正文内容 */}
      <div
        ref={thirdRef}
        className="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/section2-bg.jpg')" }}
      >
        <motion.div
          className="w-full max-w-screen-md px-4 text-white leading-relaxed text-lg md:text-xl space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.5,
              },
            },
          }}
        >
          {textParagraphs.map((text, idx) => (
            <motion.p
              key={idx}
              className="drop-shadow-lg"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: textParagraphs.length * 0.5 + 0.5, duration: 0.8 }}
        >
          <Link href="/main" passHref>
            <Button className="text-white border border-white bg-transparent hover:bg-white hover:text-black text-lg px-8 py-4 rounded-full shadow-md transition duration-300">
              跟随他们的生命轨迹
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}