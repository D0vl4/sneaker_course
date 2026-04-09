import { DotPattern } from "@/components/ui/dot-pattern";
import LightRays from "@/components/LightRays";
import GradientText from "@/components/GradientText";
import { SneakerAccordion } from "@/components/ui/sneaker-accordion";
import type { FC } from "react";

const SlideEight: FC = () => {
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
        <div className="mb-1 sm:mb-2 shrink-0">
          <GradientText
            colors={["#ef4444", "#ffffff", "#ef4444"]}
            animationSpeed={6}
            className="!m-0 !justify-start text-xl sm:text-2xl lg:text-4xl !font-extrabold"
          >
            The Sneaker Design Process
          </GradientText>
        </div>

        {/* Subtitle */}
        <div className="mb-4 sm:mb-6 shrink-0">
          <p
            className="leading-relaxed transition-colors duration-500"
            style={{
              fontFamily: "'Work Sans', sans-serif",
              color: "var(--slide-text-muted)",
              fontSize: "var(--fs-body)",
            }}
          >
            From initial concept to final colorway — explore the five stages
            that bring every sneaker to life.
          </p>
        </div>

        {/* Accordion fills remaining space */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <SneakerAccordion />
        </div>
      </div>

    </div>
  );
};

export default SlideEight;
