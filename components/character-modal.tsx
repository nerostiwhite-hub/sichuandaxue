"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Character } from "@/lib/data";

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  if (!character) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50"
          >
            <div className="relative h-full md:h-auto bg-card border border-border rounded-2xl p-6 md:p-8 overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="w-32 h-32 mb-6 rounded-full bg-secondary border-2 border-accent overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                    <span className="text-2xl text-muted-foreground">
                      {character.name.slice(0, 2)}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h2 className="text-2xl font-bold mb-2">{character.name}</h2>

                {/* Creator */}
                {character.creator && (
                  <p className="text-sm text-muted-foreground mb-4">
                    角色原案：{character.creator}
                  </p>
                )}

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {character.description}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
