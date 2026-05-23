"use client";

import { motion } from "framer-motion";
import { World } from "@/lib/data";
import Image from "next/image";

interface WorldHeaderProps {
  world: World;
}

export function WorldHeader({ world }: WorldHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      {/* Hero Image */}
      <div className="relative w-full max-w-4xl mx-auto aspect-[21/9] mb-8 rounded-xl overflow-hidden bg-card">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        {world.heroImage ? (
          <Image
            src={world.heroImage}
            alt={`${world.name} 主题图`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
            <span className="text-muted-foreground text-lg">{world.name} · 主题图</span>
          </div>
        )}
      </div>

      {/* World Name */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
        {world.name}
      </h1>

      {/* Subtitle for 无见之国 */}
      {world.subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground mb-2">
          -{world.subtitle}-
        </p>
      )}

      {/* Tagline */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
        {world.tagline}
      </p>
    </motion.div>
  );
}