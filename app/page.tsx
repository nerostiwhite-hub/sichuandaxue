"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { worldsData, World, Character } from "@/lib/data";
import { Homepage } from "@/components/homepage";
import { Sidebar } from "@/components/sidebar";
import { WorldHeader } from "@/components/world-header";
import { TabNav, TabType } from "@/components/tab-nav";
import { WikiSection } from "@/components/wiki-section";
import { StorySection } from "@/components/story-section";
import { CharacterGrid } from "@/components/character-grid";
import { CharacterModal } from "@/components/character-modal";

export default function Home() {
  const [showHomepage, setShowHomepage] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentWorld, setCurrentWorld] = useState<World>(worldsData[0]);
  const [activeTab, setActiveTab] = useState<TabType>("setting");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("正在补充中...");

  // Reset tab when world changes
  const handleWorldChange = useCallback((world: World) => {
    setCurrentWorld(world);
    // Find first available tab
    if (world.setting) {
      setActiveTab("setting");
    } else if (world.storylines && !world.storylines.disabled && world.storylines.items.length > 0) {
      setActiveTab("storyline");
    } else if (world.characters.length > 0) {
      setActiveTab("characters");
    }
  }, []);

  const handleCharacterClick = useCallback((character: Character) => {
    setSelectedCharacter(character);
    setModalOpen(true);
  }, []);

  const handleDisabledTabClick = useCallback((message: string) => {
    setToastMessage(message);
    setShowToast(true);
  }, []);

  const handleEnterFromHomepage = useCallback(() => {
    setShowHomepage(false);
  }, []);

  const handleBackToHome = useCallback(() => {
    setShowHomepage(true);
    setSidebarOpen(false);
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Show homepage first
  if (showHomepage) {
    return <Homepage onEnter={handleEnterFromHomepage} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        currentWorld={currentWorld}
        onWorldChange={handleWorldChange}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onBackToHome={handleBackToHome}
      />

      {/* Main Content */}
      <main className="px-6 py-20 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWorld.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* World Header */}
              <WorldHeader world={currentWorld} />

              {/* Tab Navigation */}
              <TabNav
                activeTab={activeTab}
                onTabChange={setActiveTab}
                world={currentWorld}
                onDisabledClick={handleDisabledTabClick}
              />

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentWorld.id}-${activeTab}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* World Setting */}
                  {activeTab === "setting" && currentWorld.setting && (
                    <WikiSection 
                      entries={currentWorld.setting.entries} 
                      accentColor={currentWorld.accentColor}
                    />
                  )}

                  {/* Storyline */}
                  {activeTab === "storyline" && currentWorld.storylines && !currentWorld.storylines.disabled && (
                    <StorySection
                      storylines={currentWorld.storylines}
                      allCharacters={currentWorld.characters}
                      onCharacterClick={handleCharacterClick}
                      accentColor={currentWorld.accentColor}
                    />
                  )}

                  {/* Characters */}
                  {activeTab === "characters" && currentWorld.characters.length > 0 && (
                    <CharacterGrid
                      characters={currentWorld.characters}
                      onCharacterClick={handleCharacterClick}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Character Modal */}
      <CharacterModal
        character={selectedCharacter}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-card border border-border rounded-lg shadow-lg z-50"
          >
            <p className="text-sm text-muted-foreground">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
