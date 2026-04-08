"use client";

import * as React from "react";
import { useRef } from "react";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface DockItemData {
  onClick?: () => void;
  Icon: React.ReactNode;
  label?: string;
  isActive?: boolean;
}

export interface AnimatedDockProps {
  className?: string;
  items: DockItemData[];
}

export const AnimatedDock = ({ className, items }: AnimatedDockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl bg-transparent px-4 pb-3",
        className,
      )}
    >
      {items.map((item, index) => (
        <DockItem key={index} mouseX={mouseX} isActive={item.isActive}>
          <button
            onClick={item.onClick}
            title={item.label}
            className={cn(
              "grow flex items-center justify-center w-full h-full cursor-pointer bg-transparent border-none outline-none transition-colors duration-200",
              item.isActive ? "text-red-400" : "text-white/70 hover:text-white"
            )}
          >
            {item.Icon}
          </button>
        </DockItem>
      ))}
    </motion.div>
  );
};

interface DockItemProps {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
  isActive?: boolean;
}

export const DockItem = ({ mouseX, children, isActive }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconScale = useTransform(width, [40, 80], [1, 1.5]);
  const iconSpring = useSpring(iconScale, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "aspect-square w-10 rounded-full flex items-center justify-center transition-colors duration-200",
        isActive
          ? "bg-red-500/20 border border-red-500/50"
          : "bg-white/15 border border-white/20 hover:bg-white/25 hover:border-white"
      )}
    >
      <motion.div
        style={{ scale: iconSpring }}
        className="flex items-center justify-center w-full h-full grow"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
