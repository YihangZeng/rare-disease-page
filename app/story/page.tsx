'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import { useRouter } from 'next/navigation';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const questions = [
  {
    id: 1,
    question: "小丽说她开始不受控制地手舞足蹈，无法像正常人一样行走、生活。",
    options: ["假的吧", "精神病", "我不知道是什么", "亨廷顿舞蹈病"],
    answer: "亨廷顿舞蹈病",
    explanation: "亨廷顿病是一种罕见的常染色体显性遗传性神经系统变性疾病，典型表现包括逐渐进展的舞蹈样动作、认知障碍和精神行为异常。",
    link: "https://baike.baidu.com/item/%E4%BA%A8%E5%BB%B7%E9%A1%BF%E8%88%9E%E8%B9%88%E7%97%87/10898724"
  },
  {
    id: 2,
    question: "小龙开始厌学、写字东倒西歪。一个月前，骑车不慎摔倒。虽然只有轻微擦伤，但是却出现了口齿不清、肢体扭转、肌肉无力等症状。",
    options: ["精神病", "肝炎", "肝豆病", "我不知道是什么"],
    answer: "肝豆病",
    explanation: "肝豆状核变性（hepatolenticular degeneration）又称Wilson病、威尔逊病、肝豆病，是一种常染色体隐性遗传的铜代谢障碍疾病。该病临床表现复杂，主要为肝脏和神经系统病变，易漏诊、误诊。",
    link: "https://baike.baidu.com/item/%E8%82%9D%E8%B1%86%E7%8A%B6%E6%A0%B8%E5%8F%98%E6%80%A7/985915"
  }
];

const comicImages = [
  "/images/comic-page-1.jpg",
  "/images/comic-page-2.jpg",
  "/images/comic-page-3.jpg",
  "/images/comic-page-4.jpg",
  "/images/comic-page-5.jpg",
  "/images/comic-page-6.jpg",
  "/images/comic-page-7.jpg",
  "/images/comic-page-8.jpg",
];

export default function StoryPage() {
  // ** 新增 showIntro 状态，默认为 true 显示介绍页 **
  const [showIntro, setShowIntro] = useState(true);

  const [showContent, setShowContent] = useState(false);
  const [currentComicIndex, setCurrentComicIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState<boolean[]>(Array(questions.length).fill(false));
  const router = useRouter();

  const handleStartReading = () => {
    setShowContent(true);
    setTimeout(() => {
      const comicSection = document.getElementById('comic-section');
      if (comicSection) {
        comicSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const nextComic = () => {
    if (currentComicIndex < comicImages.length - 1) {
      setCurrentComicIndex(currentComicIndex + 1);
    } else {
      setShowQuiz(true);
      setTimeout(() => {
        const quizSection = document.getElementById('quiz-section');
        if (quizSection) {
          quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const prevComic = () => {
    if (currentComicIndex > 0) {
      setCurrentComicIndex(currentComicIndex - 1);
    }
  };

  const goToComic = (index: number) => {
    setCurrentComicIndex(index);
  };

  const handleAnswerSelect = (questionIndex: number, selectedOption: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = selectedOption;
    setSelectedAnswers(newSelectedAnswers);
    const newShowResults = [...showResults];
    newShowResults[questionIndex] = true;
    setShowResults(newShowResults);
  };

  const resetQuestion = (questionIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = null;
    setSelectedAnswers(newSelectedAnswers);
    const newShowResults = [...showResults];
    newShowResults[questionIndex] = false;
    setShowResults(newShowResults);
  };

  // 判断所有题目是否已答且结果显示
  const allAnswered = selectedAnswers.every(ans => ans !== null);
  const allShowResults = showResults.every(show => show === true);

  return (
    <div className="relative">
      {/* 先显示全屏介绍页 */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => setShowIntro(false)}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src="/images/module-intro2.png"
              alt="模块介绍"
              fill
              style={{ objectFit: "cover" }}
              draggable={false}
              priority
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

      {/* 介绍页隐藏后显示原页面内容 */}
      {!showIntro && (
        <>
          {/* 封面部分 */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* 背景图片 */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/cover0.png"
                alt="封面背景"
                fill
                style={{ objectFit: "cover" }}
                priority
                className="brightness-50"
              />
            </div>
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10"></div>
            {/* 标题内容 */}
            <motion.div
              className="relative z-20 text-center text-white px-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                察觉异常，<br />是一段漫长旅程的开始
              </h1>
              {/* 开始阅读按钮 */}
              <motion.div
                className="flex flex-col items-center mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <Button
                  onClick={handleStartReading}
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 px-8 py-3 text-lg rounded-full backdrop-blur-sm transition-all duration-300"
                  disabled={showContent}
                >
                  {showContent ? "已开始阅读" : "开始阅读故事"}
                </Button>
              </motion.div>
            </motion.div>
          </section>
          {/* 漫画全屏显示区域 */}
          <AnimatePresence>
            {showContent && !showQuiz && (
              <motion.section
                id="comic-section"
                className="fixed inset-0 z-50 bg-black flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* 漫画顶部提示 */}
                <div className="absolute top-4 right-6 bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-4 text-base font-semibold select-none z-50 shadow-md">
                  {currentComicIndex === comicImages.length - 1 && (
                    <span>点击下一页进入互动环节</span>
                  )}
                </div>
                {/* 漫画内容 */}
                <div className="relative w-full h-full flex items-center justify-center px-4 py-8">
                  <motion.div
                    key={currentComicIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={comicImages[currentComicIndex]}
                      alt={`漫画插图 - 页${currentComicIndex + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                      priority={currentComicIndex < 2}
                      sizes="100vw"
                    />
                  </motion.div>
                  {/* 左右导航按钮 */}
                  <Button
                    onClick={prevComic}
                    disabled={currentComicIndex === 0}
                    variant="ghost"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 p-3 rounded-full disabled:opacity-30 backdrop-blur-sm transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    onClick={nextComic}
                    variant="ghost"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 p-3 rounded-full backdrop-blur-sm transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                  {/* 页码指示器 */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {comicImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToComic(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentComicIndex
                            ? 'bg-white'
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
          {/* 互动答题模块 */}
          <AnimatePresence>
            {showQuiz && (
              <motion.div
                id="quiz-section"
                className="relative min-h-screen py-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* 背景图片 */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/section-bg.jpg"
                    alt="互动模块背景"
                    fill
                    style={{ objectFit: "cover" }}
                    className="brightness-50"
                  />
                </div>
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-10"></div>
                <div className="relative z-20 max-w-4xl mx-auto px-6">
                  <motion.section
                    className="bg-white/40 backdrop-blur-lg shadow-2xl rounded-xl p-8"
                    variants={sectionVariants}
                  >
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                      互动：面对这种情况，你会有怎样的想法？
                    </h2>
                    <p className="mb-12 text-gray-700 leading-relaxed text-center text-lg">
                      许许多多的误解让像小梦这样的罕见病患者，在尝试求助后，逐渐变得沉默。这份沉默，并非因为他们不愿说，而是因为我们听不见、也听不懂。我们对于罕见病的了解，太少了。
                    </p>
                    <div className="space-y-12">
                      {questions.map((q, i) => (
                        <motion.div
                          key={q.id}
                          className="border border-gray-300 rounded-lg p-6 bg-white/20 backdrop-blur-md"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.2 }}
                        >
                          <p className="font-semibold text-xl mb-6 text-gray-800">
                            {i + 1}. {q.question}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                            {q.options.map((option, idx) => {
                              const isSelected = selectedAnswers[i] === option;
                              const isCorrect = option === q.answer;
                              const showResult = showResults[i];
                              let buttonClass = "p-4 text-left border-2 rounded-lg transition-all duration-200 ";
                              if (!showResult) {
                                buttonClass += "border-gray-300 hover:border-blue-400 hover:bg-blue-50 bg-white";
                              } else {
                                if (isSelected && isCorrect) {
                                  buttonClass += "border-green-500 bg-green-100 text-green-800";
                                } else if (isSelected && !isCorrect) {
                                  buttonClass += "border-red-500 bg-red-100 text-red-800";
                                } else if (!isSelected && isCorrect) {
                                  buttonClass += "border-green-500 bg-green-50 text-green-700";
                                } else {
                                  buttonClass += "border-gray-300 bg-gray-100 text-gray-600";
                                }
                              }
                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleAnswerSelect(i, option)}
                                  disabled={showResults[i]}
                                  className={buttonClass}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">{option}</span>
                                    {showResult && (
                                      <div className="flex items-center">
                                        {isSelected && isCorrect && (
                                          <Check className="w-5 h-5 text-green-600" />
                                        )}
                                        {isSelected && !isCorrect && (
                                          <X className="w-5 h-5 text-red-600" />
                                        )}
                                        {!isSelected && isCorrect && (
                                          <Check className="w-5 h-5 text-green-600" />
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                          {/* 结果显示 - 修改部分，增加详细说明和跳转链接 */}
                          <AnimatePresence>
                            {showResults[i] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4"
                              >
                                <div
                                  className={`p-4 rounded-lg flex items-center gap-3 ${
                                    selectedAnswers[i] === q.answer
                                      ? "bg-green-100 border border-green-300"
                                      : "bg-red-100 border border-red-300"
                                  }`}
                                >
                                  {selectedAnswers[i] === q.answer ? (
                                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                                  ) : (
                                    <X className="w-6 h-6 text-red-600 flex-shrink-0" />
                                  )}
                                  <div>
                                    <p
                                      className={`font-semibold ${
                                        selectedAnswers[i] === q.answer ? "text-green-800" : "text-red-800"
                                      }`}
                                    >
                                      {selectedAnswers[i] === q.answer ? "回答正确！" : "回答错误"}
                                    </p>
                                    <p className={`text-sm ${selectedAnswers[i] === q.answer ? "text-green-700" : "text-red-700"}`}>
                                      正确答案是：{q.answer}
                                    </p>
                                    {/* 新增的详细答案展示 */}
                                    <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                                      查看答案：{q.answer}：{q.explanation}
                                    </p>
                                    <p className="mt-1 text-blue-600 text-sm underline cursor-pointer">
                                      <a href={q.link} target="_blank" rel="noopener noreferrer">
                                        【跳转网页】
                                      </a>
                                    </p>
                                  </div>
                                </div>
                                <Button onClick={() => resetQuestion(i)} variant="outline" className="mt-3 text-sm">
                                  重新回答
                                </Button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                    {/* 进入下一模块按钮 */}
                    {allAnswered && allShowResults && (
                      <div className="mt-12 text-center">
                        <Button
                          onClick={() => router.push('/next-module')}
                          className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 px-8 py-3 text-lg rounded-full backdrop-blur-sm transition-all duration-300"
                        >
                          进入下一模块
                        </Button>
                      </div>
                    )}
                  </motion.section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}