"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home } from "lucide-react";
import { worldsData, World } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentWorld: World;
  onWorldChange: (world: World) => void;
  isOpen: boolean;
  onToggle: () => void;
  onBackToHome: () => void;
}

export function Sidebar({ currentWorld, onWorldChange, isOpen, onToggle, onBackToHome }: SidebarProps) {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-6 left-6 z-50 p-3 rounded-lg bg-card border border-border hover:bg-secondary transition-colors"
        aria-label={isOpen ? "关闭菜单" : "打开菜单"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-72 lg:w-64 bg-sidebar border-r border-sidebar-border z-40 flex flex-col"
          >
            <div className="pt-20 px-6 pb-6 flex-1">
              {/* 返回主页按钮 */}
              <button
                onClick={() => {
                  onBackToHome();
                  onToggle();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 mb-4 rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">返回主页</span>
              </button>
              
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
                世界观列表
              </h2>
              <nav className="space-y-2">
                {worldsData.map((world) => (
                  <button
                    key={world.id}
                    onClick={() => {
                      onWorldChange(world);
                      onToggle();
                    }}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg transition-all duration-200",
                      currentWorld.id === world.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <span className="block font-medium">{world.name}</span>
                    {world.id !== "chaos-light" && (
                      <span className="block text-xs text-muted-foreground mt-1 line-clamp-1">
                        {world.tagline}
                      </span>
                    )}
                    {world.id === "chaos-light" && (
                      <span className="block text-xs text-muted-foreground mt-1 line-clamp-1">
                        星辰之下，花海之中，三人于此重逢……
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 border-t border-sidebar-border">
              <p className="text-xs text-muted-foreground">
                @Nerosti
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
