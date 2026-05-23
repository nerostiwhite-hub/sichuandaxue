"use client";

import { motion } from "framer-motion";
import { Character } from "@/lib/data";

interface CharacterGridProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

export function CharacterGrid({ characters, onCharacterClick }: CharacterGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character, index) => (
          <motion.button
            key={character.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => onCharacterClick(character)}
            className="group text-left p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
          >
            {/* Avatar */}
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-secondary border-2 border-border group-hover:border-accent overflow-hidden transition-colors">
              <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                <span className="text-lg text-muted-foreground">
                  {character.name.slice(0, 2)}
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="text-center mb-3">
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                {character.name}
              </h3>
              {character.creator && (
                <p className="text-xs text-muted-foreground mt-1">
                  角色原案：{character.creator}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-3 text-center">
              {character.description}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
