"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { StorylineData, Character } from "@/lib/data";
import { cn } from "@/lib/utils";

interface StorySectionProps {
  storylines: StorylineData;
  allCharacters: Character[];
  onCharacterClick: (character: Character) => void;
  accentColor: string;
}

export function StorySection({ storylines, allCharacters, onCharacterClick, accentColor }: StorySectionProps) {
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToStoryline = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex gap-8"
    >
      {/* Main Content */}
      <div className="flex-1 space-y-16">
        {storylines.items.map((item, index) => {
          const relatedCharacters = allCharacters.filter((char) =>
            item.relatedCharacters.includes(char.id)
          );

          return (
            <motion.div
              key={item.id}
              ref={(el) => { sectionRefs.current[item.id] = el; }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="scroll-mt-24"
            >
              {/* Storyline Title */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                  <span
                    className="w-1.5 h-8 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span>「{item.title}」</span>
                  {item.englishTitle && (
                    <span className="text-muted-foreground font-normal text-lg">
                      {item.englishTitle}
                    </span>
                  )}
                </h2>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              {/* Quote */}
              {item.quote && (
                <div className="mb-6">
                  <p
                    className="text-sm italic"
                    style={{ color: accentColor }}
                  >
                    {`"${item.quote}"`}
                  </p>
                </div>
              )}

              {/* Related Characters */}
              {relatedCharacters.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm text-muted-foreground mb-4">相关角色</h4>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {relatedCharacters.map((character) => (
                      <button
                        key={character.id}
                        onClick={() => onCharacterClick(character)}
                        className="flex-shrink-0 flex flex-col items-center gap-2 group"
                      >
                        <div
                          className="w-16 h-16 rounded-full bg-card border-2 border-border overflow-hidden transition-colors"
                          style={{
                            borderColor: "var(--border)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = accentColor;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                          }}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">
                              {character.name.slice(0, 2)}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                          {character.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Right Navigation */}
      <div className="hidden lg:block w-48 flex-shrink-0">
        <div className="sticky top-24">
          <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            故事线导览
          </h4>
          <nav className="space-y-2">
            {storylines.items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToStoryline(item.id)}
                className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-card"
              >
                「{item.title}」
              </button>
            ))}
          </nav>
        </div>
      </div>
    </motion.div>
  );
}
