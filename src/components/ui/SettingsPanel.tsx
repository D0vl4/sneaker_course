"use client";

import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

export interface SettingsConfig {
  fontSize: "small" | "medium" | "large";
  theme: "dark" | "light";
}

interface SettingsPanelProps {
  settings: SettingsConfig;
  onSettingsChange: (settings: SettingsConfig) => void;
  onClose: () => void;
}

const fontSizeOptions: { label: string; value: SettingsConfig["fontSize"] }[] = [
  { label: "S", value: "small" },
  { label: "M", value: "medium" },
  { label: "L", value: "large" },
];

export default function SettingsPanel({
  settings,
  onSettingsChange,
}: SettingsPanelProps) {
  const updateSetting = <K extends keyof SettingsConfig>(
    key: K,
    value: SettingsConfig[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const isDark = settings.theme === "dark";

  return (
    <motion.div
      className="w-[90vw] sm:w-[340px] rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur-xl shadow-2xl"
      style={{ fontFamily: "'Work Sans', sans-serif" }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      {/* Font Size */}
      <div className="mb-5">
        <span className="mb-2.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-white/40">
          Font Size
        </span>
        <div className="flex gap-2">
          {fontSizeOptions.map((opt) => {
            const isActive = settings.fontSize === opt.value;
            return (
              <motion.button
                key={opt.value}
                onClick={() => updateSetting("fontSize", opt.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex h-9 flex-1 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "border border-red-500/50 bg-red-500/20 text-white"
                    : "border border-transparent bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                {opt.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Theme Toggle */}
      <div>
        <span className="mb-2.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-white/40">
          Theme
        </span>
        <div className="flex gap-2">
          <motion.button
            onClick={() => updateSetting("theme", "dark")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              isDark
                ? "border border-red-500/50 bg-red-500/20 text-white"
                : "border border-transparent bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
            }`}
          >
            <Moon size={14} />
            Dark
          </motion.button>
          <motion.button
            onClick={() => updateSetting("theme", "light")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              !isDark
                ? "border border-red-500/50 bg-red-500/20 text-white"
                : "border border-transparent bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
            }`}
          >
            <Sun size={14} />
            Light
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
