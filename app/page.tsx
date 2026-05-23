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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
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
        <h1 className="text-6xl font-serif mb-4 text-white">
          思传达学
        </h1>
        
        <p className="text-xl text-gray-400 mb-4">
          ssu ch&apos;uan ta hsüeh
        </p>
        
        <p className="text-gray-500">
          这里是副标题占位符
        </p>
      </div>

      {/* 读报按钮 */}
      <button
        onClick={onEnter}
        className="px-12 py-4 border-2 border-white text-white text-xl font-serif hover:bg-white hover:text-black transition-colors duration-300"
      >
        读报
      </button>
    </div>
  );
}

// 云雾特效组件
function CloudEffect({ onComplete }: { onComplete: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      style={{ filter: "blur(20px)" }}
    >
      <div className="text-black">加载中...</div>
    </div>
  );
}

// 通用内容模态框
function ContentModal({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-40 flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-4xl max-h-[80vh] rounded-lg overflow-hidden border border-gray-700">
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
          </div>
        </div>
      </div>
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
    <div className="fixed inset-0 bg-gradient-to-b from-amber-900/90 to-amber-950/95 z-30">
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
          <button
            key={i}
            className="px-8 py-4 bg-amber-100/90 text-amber-900 border-2 border-amber-800 font-serif text-lg shadow-lg"
          >
            {text}
          </button>
        ))}
      </div>

      {/* 对话框 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4">
        <div
          onClick={() => setDialogIndex(prev => (prev + 1) % dialogs.length)}
          className="bg-amber-100/95 p-8 cursor-pointer border-4 border-amber-800 shadow-2xl"
        >
          <p className="text-amber-900 font-serif text-xl leading-relaxed">
            {dialogs[dialogIndex]}
          </p>
          <p className="text-amber-700 text-sm mt-4">（点击继续）</p>
        </div>
      </div>
    </div>
  );
}

// 报纸主界面
function NewspaperPage({ onHotspotClick, onFlip }: { onHotspotClick: (name: string) => void; onFlip: () => void; currentBgIndex: number }) {
  const currentConfig = backgroundConfigs[currentBgIndex];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 背景图区域 */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div
          className={`w-full max-w-5xl aspect-[4/3] ${currentConfig.bgColor} relative rounded-lg shadow-2xl`}
        >
          {/* 背景图占位内容 */}
          <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-serif">
            {currentConfig.name}
          </div>

          {/* 热区 */}
          {currentConfig.hotspots.map((hotspot, i) => (
            <button
              key={i}
              onClick={() => onHotspotClick(hotspot.name)}
              className="absolute bg-white/30 hover:bg-white/50 rounded cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                width: `${hotspot.width}%`,
                height: `${hotspot.height}%`
              }}
            >
              <span className="text-gray-800 font-serif text-lg">
                {hotspot.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 翻页按钮 */}
      <button
        onClick={onFlip}
        className="absolute bottom-8 right-8 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-serif text-lg transition-colors z-10"
      >
        翻页
      </button>
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState<"home" | "newspaper" | "youth">("home");
  const [showCloud, setShowCloud] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const handleEnter = () => {
    setShowCloud(true);
    setTimeout(() => {
      setShowCloud(false);
      setPage("newspaper");
    }, 1000);
  };

  const handleHotspotClick = (name: string) => {
    setModalTitle(name);
    if (name === "青年专栏") {
      setShowCloud(true);
      setTimeout(() => {
        setShowCloud(false);
        setPage("youth");
      }, 1000);
    } else {
      setShowModal(true);
    }
  };

  const handleFlip = () => {
    setCurrentBgIndex(prev => (prev + 1) % backgroundConfigs.length);
  };

  return (
    <>
      {page === "home" && <HomePage onEnter={handleEnter} />}
      {page === "newspaper" && (
        <NewspaperPage 
          onHotspotClick={handleHotspotClick} 
          onFlip={handleFlip}
          currentBgIndex={currentBgIndex}
        />
      )}
      {page === "youth" && (
        <YouthColumnPage 
          onClose={() => setPage("newspaper")} 
        />
      )}

      {showCloud && <CloudEffect onComplete={() => {}} />}

      {showModal && (
        <ContentModal 
          title={modalTitle} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}
