"use client";

import * as React from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

const SLIDE_TITLES = [
  "Welcome",
  "Design Quote",
  "Warm-up: Sneaker Design Skills",
  "Why Study Sneaker Design?",
  "Take the Assessment",
  "Match the Roles",
  "3D Sneaker Viewer",
];

interface SlideMenuProps {
  currentSlide: number;
  totalSlides: number;
  onGoToSlide: (index: number) => void;
  onClose: () => void;
}

export function SlideMenu({
  currentSlide,
  totalSlides,
  onGoToSlide,
  onClose,
}: SlideMenuProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="w-[90vw] sm:w-[400px] rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <span
          className="text-[11px] font-medium uppercase tracking-widest text-white/40"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          Slides
        </span>
        <button
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded-full text-white/30 transition-colors hover:bg-white/10 hover:text-white/60"
          aria-label="Close menu"
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>

      {/* Slide list */}
      <div className="px-2 pb-2">
        {SLIDE_TITLES.slice(0, totalSlides).map((title, index) => {
          const isCurrent = index === currentSlide;

          return (
            <button
              key={index}
              onClick={() => {
                onGoToSlide(index);
                onClose();
              }}
              className={`
                group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors
                ${isCurrent ? "bg-white/10" : "bg-transparent hover:bg-white/5"}
              `}
            >
              {/* Current slide indicator - red left bar */}
              {isCurrent && (
                <motion.div
                  layoutId="slide-indicator"
                  className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-red-500"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              )}

              {/* Slide number */}
              <span
                className={`
                  shrink-0 font-mono text-[11px] tabular-nums
                  ${isCurrent ? "text-red-400" : "text-white/25 group-hover:text-white/40"}
                  transition-colors
                `}
                style={{ fontFamily: "'JetBrains Mono', 'SF Mono', monospace" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <span
                className={`
                  text-sm leading-snug truncate
                  ${isCurrent ? "text-white font-medium" : "text-white/50 group-hover:text-white/70"}
                  transition-colors
                `}
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                {title}
              </span>

              {/* Current dot */}
              {isCurrent && (
                <span className="ml-auto shrink-0 h-1.5 w-1.5 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
