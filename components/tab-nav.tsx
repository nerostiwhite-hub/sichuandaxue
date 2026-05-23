"use client";

import { cn } from "@/lib/utils";
import { World } from "@/lib/data";

export type TabType = "setting" | "storyline" | "characters";

interface TabNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  world: World;
  onDisabledClick: (message: string) => void;
}

export function TabNav({ activeTab, onTabChange, world, onDisabledClick }: TabNavProps) {
  // Check if storylines are disabled
  const isStorylineDisabled = world.storylines?.disabled === true;
  const storylineDisabledMessage = world.storylines?.disabledMessage || "正在补充中...";
  
  // Check disabledTabs from world config
  const isSettingDisabled = world.disabledTabs?.setting === true;
  const isCharactersDisabled = world.disabledTabs?.characters === true;

  const tabs: { id: TabType; label: string; available: boolean; disabledMessage?: string }[] = [
    { 
      id: "setting", 
      label: "世界设定", 
      available: world.setting !== null && !isSettingDisabled,
      disabledMessage: "正在补充中..."
    },
    { 
      id: "storyline", 
      label: "故事线", 
      available: world.storylines !== null && !isStorylineDisabled && world.storylines.items.length > 0,
      disabledMessage: isStorylineDisabled ? storylineDisabledMessage : "正在补充中..."
    },
    { 
      id: "characters", 
      label: "角色一览", 
      available: world.characters.length > 0 && !isCharactersDisabled,
      disabledMessage: "正在补充中..."
    },
  ];

  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex gap-2 p-1 bg-card rounded-lg border border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.available) {
                onTabChange(tab.id);
              } else {
                onDisabledClick(tab.disabledMessage || "正在补充中...");
              }
            }}
            className={cn(
              "px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
              tab.available
                ? activeTab === tab.id
                  ? "text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
                : "text-muted-foreground/50 cursor-not-allowed"
            )}
            style={
              tab.available && activeTab === tab.id
                ? { backgroundColor: world.accentColor }
                : undefined
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
