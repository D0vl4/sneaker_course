import { GLSLHills } from "@/components/ui/glsl-hills";
import GradientText from "@/components/GradientText";
import type { FC } from "react";

interface SlideNineProps {
  onClose: () => void;
}

const SlideNine: FC<SlideNineProps> = ({ onClose }) => {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/* GLSL Hills background */}
      <div className="absolute inset-0 z-0">
        <GLSLHills speed={0.3} cameraZ={130} />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Sneaker image */}
        <div className="mb-4 sm:mb-8">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
            alt="Sneaker"
            className="w-[140px] sm:w-[240px] lg:w-[280px] object-contain"
            style={{ filter: "drop-shadow(0 0 40px rgba(239,68,68,0.3))" }}
          />
        </div>

        {/* Title */}
        <div className="mb-2 sm:mb-4 text-center pb-1">
          <GradientText
            colors={["#ef4444", "#ffffff", "#ef4444"]}
            animationSpeed={6}
            className="!m-0 !justify-center text-2xl sm:text-5xl lg:text-6xl !font-extrabold"
          >
            Congratulations!
          </GradientText>
        </div>

        {/* Subtitle */}
        <p
          className="text-center max-w-xs sm:max-w-xl leading-relaxed mb-6 sm:mb-10"
          style={{
            fontFamily: "'Work Sans', sans-serif",
            color: "rgba(255,255,255,0.6)",
            fontSize: "clamp(0.75rem, 2vw, 1.125rem)",
          }}
        >
          You've completed Lesson 1 of the Sneaker Design course.
          From the design brief to colorways and storytelling —
          you now have a foundation in the tools of the design cycle.
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-red-500/90 hover:bg-red-500 text-white text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] active:scale-95"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SlideNine;
