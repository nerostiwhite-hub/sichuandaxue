"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// 热区配置
interface Hotspot {
  name: string;
  x: number;  // left percentage
  y: number;  // top percentage
  width: number;  // width percentage
  height: number;  // height percentage
}

// 背景图配置
interface BackgroundConfig {
  name: string;
  hotspots: Hotspot[];
  bgColor: string;
}

// 两个背景图的配置
const backgroundConfigs: BackgroundConfig[] = [
  {
    name: "背景图1",
    bgColor: "bg-gray-800",
    hotspots: [
      { name: "参考文献", x: 5, y: 10, width: 40, height: 80 },
      { name: "项目介绍", x: 55, y: 10, width: 40, height: 80 }
    ]
  },
  {
    name: "背景图2",
    bgColor: "bg-gray-700",
    hotspots: [
      { name: "社论", x: 5, y: 10, width: 40, height: 80 },
      { name: "青年专栏", x: 55, y: 10, width: 40, height: 80 }
    ]
  }
];

// 首页组件
function HomePage({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center"
    >
      {/* 渐隐主题图 */}
      <div className="w-full h-[200px] relative mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black" />
      </div>

      {/* 标题区域 */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl font-serif mb-4"
        >
          思传达学
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl text-gray-400 mb-4"
        >
          ssu ch&apos;uan ta hsüeh
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-gray-500"
        >
          这里是副标题占位符
        </motion.p>
      </div>

      {/* 读报按钮 */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEnter}
        className="px-12 py-4 border-2 border-white text-white text-xl font-serif hover:bg-white hover:text-black transition-colors duration-300"
      >
        读报
      </motion.button>
    </motion.div>
  );
}

// 云雾特效组件
function CloudEffect({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 800);
      }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      style={{ filter: "blur(20px)" }}
    />
  );
}

// 通用内容模态框
function ContentModal({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-40 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 w-full max-w-4xl max-h-[80vh] rounded-lg overflow-hidden border border-gray-700"
      >
        {/* 模态框头部 */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
          <div>
            <h2 className="text-2xl font-serif text-white mb-2">{title}</h2>
            <p className="text-gray-400">副标题占位</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
          >
            ×
          </button>
        </div>

        {/* 内容区域 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4 text-gray-300">
            <p className="text-lg">
              这里是正文占位符，内容可以非常长。Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              更多的占位文本内容，可以继续添加更多段落来测试滚动功能。
            </p>
            <p>
              这里是正文占位符，内容可以非常长。Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// 青年专栏界面
function YouthColumnPage({ onClose }: { onClose: () => void }) {
  const [dialogIndex, setDialogIndex] = useState(0);
  const dialogs = [
    "这里是一段可继续点击的对话占位符。",
    "第二段对话内容，继续点击可以查看更多。",
    "第三段对话内容，这是最后一段。"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-b from-amber-900/90 to-amber-950/95 z-30"
    >
      {/* 返回按钮 */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-amber-200 hover:text-white text-3xl transition-colors z-10"
      >
        ×
      </button>

      {/* 选项按钮 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
        {["选项 A", "选项 B", "选项 C"].map((text, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-amber-100/90 text-amber-900 border-2 border-amber-800 font-serif text-lg shadow-lg"
            style={{ 
              clipPath: "polygon(2% 0%, 98% 0%, 100% 50%, 98% 100%, 2% 100%, 0% 50%)",
              transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`
            }}
          >
            {text}
          </motion.button>
        ))}
      </div>

      {/* 对话框 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4">
        <motion.div
          key={dialogIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setDialogIndex(prev => (prev + 1) % dialogs.length)}
          className="bg-amber-100/95 p-8 cursor-pointer border-4 border-amber-800 shadow-2xl"
          style={{
            clipPath: "polygon(0% 5%, 5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%)"
          }}
        >
          <p className="text-amber-900 font-serif text-xl leading-relaxed">
            {dialogs[dialogIndex]}
          </p>
          <p className="text-amber-700 text-sm mt-4">（点击继续）</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// 报纸主界面
function NewspaperPage({ onHotspotClick }: { onHotspotClick: (name: string) => void }) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const currentConfig = backgroundConfigs[currentBgIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black relative overflow-hidden"
    >
      {/* 背景图区域 */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full max-w-5xl aspect-[4/3] ${currentConfig.bgColor} relative rounded-lg shadow-2xl`}
          >
            {/* 背景图占位内容 */}
            <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-serif">
              {currentConfig.name}
            </div>

            {/* 热区 */}
            {currentConfig.hotspots.map((hotspot, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                whileHover={{ 
                  opacity: 0.7, 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(255,255,255,0.3)"
                }}
                transition={{ duration: 0.3 }}
                onClick={() => onHotspotClick(hotspot.name)}
                className="absolute bg-white rounded cursor-pointer flex items-center justify-center"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  width: `${hotspot.width}%`,
                  height: `${hotspot.height}%`
                }}
              >
                <span className="text-gray-800 font-serif text-lg opacity-0 hover:opacity-100 transition-opacity">
                  {hotspot.name}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 翻页按钮 */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentBgIndex(prev => (prev + 1) % backgroundConfigs.length)}
        className="absolute bottom-8 right-8 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-serif text-lg transition-colors z-10"
      >
        翻页
      </motion.button>
    </motion.div>
  );
}

export default function Home() {
  const [page, setPage] = useState<"home" | "newspaper" | "youth">("home");
  const [showCloud, setShowCloud] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleEnter = () => {
    setShowCloud(true);
  };

  const handleCloudComplete = () => {
    setShowCloud(false);
    setPage("newspaper");
  };

  const handleHotspotClick = (name: string) => {
    setModalTitle(name);
    if (name === "青年专栏") {
      setShowCloud(true);
    } else {
      setShowModal(true);
    }
  };

  const handleYouthCloudComplete = () => {
    setShowCloud(false);
    setPage("youth");
  };

  return (
    <>
      <AnimatePresence>
        {page === "home" && <HomePage key="home" onEnter={handleEnter} />}
        {page === "newspaper" && (
          <NewspaperPage 
            key="newspaper" 
            onHotspotClick={handleHotspotClick} 
          />
        )}
        {page === "youth" && (
          <YouthColumnPage 
            key="youth" 
            onClose={() => setPage("newspaper")} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCloud && (
          <CloudEffect 
            key="cloud" 
            onComplete={page === "home" ? handleCloudComplete : handleYouthCloudComplete} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <ContentModal 
            key="modal" 
            title={modalTitle} 
            onClose={() => setShowModal(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
