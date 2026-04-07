import React from "react";

interface ClearButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ClearButton({ children, onClick, className = "" }: ClearButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-8 py-3
        bg-white/10
        backdrop-blur-md
        border border-white/30
        rounded-full
        text-white text-sm font-medium tracking-wide
        cursor-pointer
        transition-all duration-300 ease-out
        hover:bg-white/20 hover:border-white/50 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
}
