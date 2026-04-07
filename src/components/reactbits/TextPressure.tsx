import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface TextPressureProps {
  text: string;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
}

const TextPressure: React.FC<TextPressureProps> = ({ 
  text, 
  className = "", 
  minWeight = 100, 
  maxWeight = 900 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const fontWeight = useTransform(mouseX, [0, 1], [minWeight, maxWeight]);
  const letterSpacing = useTransform(mouseY, [0, 1], ["-0.05em", "0.1em"]);

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block cursor-default select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.h1
        style={{
          fontWeight,
          letterSpacing,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          transition: "font-weight 0.1s ease-out"
        }}
        className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default TextPressure;
