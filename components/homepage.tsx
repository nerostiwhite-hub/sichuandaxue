"use client";

import { motion } from "framer-motion";

interface HomepageProps {
  onEnter: () => void;
}

export function Homepage({ onEnter }: HomepageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center space-y-12"
      >
        {/* Title */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-light tracking-wide text-foreground"
          >
            Welcome!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground"
          >
            Nerosti的个人站
          </motion.p>
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center space-y-4 text-muted-foreground leading-relaxed"
        >
          <p>感谢您的访问。</p>
          <p>我正在缓慢地补充我的世界观和OC设定，展示的内容并非全部。</p>
          <p>如果您对任何设定感兴趣，可以通过下方的联系方式向我询问。</p>
          <p>设定中不包括NSFW内容，界面很简单，可以放心阅览。</p>
          <p>这些世界观都不再接受原案不出自我本人的OC加入了，除非我主动邀请您。</p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-card border border-border rounded-lg p-6 text-left space-y-2"
        >
          <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 text-center">
            联系方式
          </h3>
          <div className="space-y-2 text-muted-foreground text-center">
            <p>邮箱：3191330442@qq.com（最常用）</p>
            <p>nerosti@163.com</p>
            <p>nerostiwhite@gmail.com（不常用）</p>
            <p>QQ：3191330442</p>
            <p>Cara：@nerosti（私信已关闭，仅接受帖下留言）</p>
          </div>
        </motion.div>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button
            onClick={onEnter}
            className="px-8 py-3 bg-card border border-border rounded-lg text-foreground hover:bg-secondary transition-colors duration-200"
          >
            进入世界观列表
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
