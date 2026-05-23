"use client";

import { motion } from "framer-motion";
import { WikiEntry } from "@/lib/data";

interface WikiSectionProps {
  entries: WikiEntry[];
  title?: string;
  description?: string;
  accentColor?: string;
}

export function WikiSection({ entries, title, description, accentColor = "var(--accent)" }: WikiSectionProps) {
  const scrollToEntry = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Optional Title and Description */}
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          )}
          {description && (
            <p className="text-muted-foreground text-lg max-w-3xl">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-12">
          {entries.map((entry, index) => (
            <motion.article
              key={entry.id}
              id={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="scroll-mt-24"
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-3">
                <span 
                  className="w-1 h-6 rounded-full" 
                  style={{ backgroundColor: accentColor }}
                />
                {entry.title}
              </h3>
              <div className="pl-4 border-l border-border">
                {/* Main content */}
                {entry.content && (
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {entry.id === "timeline" ? (
                      // Special formatting for timeline entries
                      entry.content.split('\n\n').map((block, blockIndex) => {
                        const lines = block.split('\n');
                        const firstLine = lines[0];
                        const restContent = lines.slice(1).join('\n');
                        // Check if first line looks like a timeline header (e.g., "3世纪  先兆" or "479年  大毁灭")
                        const isTimelineHeader = /^[\d]+[世纪年]/.test(firstLine);
                        
                        return (
                          <div key={blockIndex} className={blockIndex > 0 ? "mt-4" : ""}>
                            {isTimelineHeader ? (
                              <>
                                <h4 className="text-base font-medium text-foreground mb-2">
                                  {firstLine}
                                </h4>
                                {restContent && (
                                  <p className="text-muted-foreground text-sm leading-relaxed">
                                    {restContent}
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {block}
                              </p>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p>{entry.content}</p>
                    )}
                  </div>
                )}
                
                {/* Subsections */}
                {entry.subsections && entry.subsections.length > 0 && (
                  <div className="space-y-4 mt-4">
                    {entry.subsections.map((sub, subIndex) => (
                      <div key={subIndex} className="py-2">
                        <h4 className="text-base font-medium text-foreground mb-2">
                          {sub.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                          {sub.content.startsWith("（") ? (
                            <span className="text-muted-foreground/60">{sub.content}</span>
                          ) : (
                            sub.content
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Navigation Sidebar */}
        <nav className="hidden lg:block w-48 flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              快速导航
            </p>
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => scrollToEntry(entry.id)}
                className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
              >
                {entry.title}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </motion.div>
  );
}
