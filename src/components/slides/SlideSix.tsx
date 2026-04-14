import { DotPattern } from "@/components/ui/dot-pattern";
import LightRays from "@/components/LightRays";
import GradientText from "@/components/GradientText";
import DragDropQuiz from "@/components/ui/drag-drop-quiz";
import { analytics } from "@/lib/analytics";

import type { FC } from "react";

interface MatchItem {
  id: number;
  role: string;
  description: string;
}

const quizItems: MatchItem[] = [
  {
    id: 1,
    role: "Designers",
    description:
      "are individuals who specialize in color psychology, current fashion trends, and materials in the making of sneakers.",
  },
  {
    id: 2,
    role: "Footwear Product Developers",
    description:
      "are focused on making sure that new shoes get out into the market where people can buy and wear them.",
  },
  {
    id: 3,
    role: "Product Line Managers",
    description:
      "are individuals who work with all departments to identify the development of new products and to increase the profitability of existing ones.",
  },
  {
    id: 4,
    role: "Creative Directors",
    description:
      "oversee the design process and give guidance to the creatives who work under them. They also work with sales and marketing teams.",
  },
];

const SlideSix: FC = () => {
  return (
    <div
      className="relative w-full h-full overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: "var(--slide-bg)" }}
    >
      {/* Light rays background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ef4444"
          raysSpeed={0.6}
          lightSpread={1.5}
          rayLength={2.5}
          pulsating
          fadeDistance={1.2}
          saturation={1.2}
          followMouse
          mouseInfluence={0.15}
          noiseAmount={0.05}
          distortion={0.1}
        />
      </div>

      {/* Dot pattern grid background */}
      <DotPattern
        width={24}
        height={24}
        cr={0.8}
        className="z-[1] opacity-40 fill-white/15"
      />

      {/* Main content area */}
      <div className="absolute z-10 top-[48px] sm:top-[52px] left-0 right-0 bottom-0 overflow-y-auto overflow-x-hidden px-4 sm:px-8 lg:px-12 py-4 sm:py-5 pb-36 sm:pb-40 flex flex-col">
        {/* Title */}
        <div className="mb-2 sm:mb-3 shrink-0">
          <GradientText
            colors={["#ef4444", "#ffffff", "#ef4444"]}
            animationSpeed={6}
            className="!m-0 !justify-start text-xl sm:text-2xl lg:text-4xl !font-extrabold"
          >
            Take the Assessment
          </GradientText>
        </div>

        {/* Subtitle */}
        <div className="mb-3 sm:mb-4 shrink-0">
          <p
            className="leading-relaxed transition-colors duration-500"
            style={{
              fontFamily: "'Work Sans', sans-serif",
              color: "var(--slide-text)",
              fontSize: "var(--fs-body)",
            }}
          >
            Drag the roles into the correct boxes:
          </p>
        </div>

        {/* Quiz fills remaining space */}
        <div className="flex-1 min-h-0">
          <DragDropQuiz 
            items={quizItems} 
            onComplete={(allCorrect) => {
              analytics.track(5, "SlideSix", "quiz_completed", `Success: ${allCorrect}`);
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default SlideSix;
