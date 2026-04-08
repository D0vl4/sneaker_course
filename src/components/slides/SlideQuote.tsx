import { DotPattern } from "@/components/ui/dot-pattern";
import LightRays from "@/components/LightRays";

export default function SlideQuote() {
  return (
    <div className="relative w-full h-full overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'var(--slide-bg)' }}>
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

      {/* Top bar — lesson label */}
      <div className="absolute top-0 left-0 right-0 z-10 backdrop-blur-sm transition-colors duration-500" style={{ backgroundColor: 'var(--slide-bar-bg)', borderBottom: '1px solid var(--slide-bar-border)' }}>
        <div className="px-4 sm:px-8 py-2.5 sm:py-3">
          <span
            className="text-xs sm:text-sm font-medium tracking-wide transition-colors duration-500"
            style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text)' }}
          >
            Sneaker Design and the Designer Brief
          </span>
        </div>
      </div>

      {/* Red corner crop marks */}
      <div className="absolute top-[8%] sm:top-[11%] left-[5%] sm:left-[8%] w-4 h-4 sm:w-5 sm:h-5 z-10">
        <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-red-500" />
        <div className="absolute top-0 left-0 h-full w-0.5 sm:w-1 bg-red-500" />
      </div>
      <div className="absolute top-[8%] sm:top-[11%] right-[5%] sm:right-[8%] w-4 h-4 sm:w-5 sm:h-5 z-10">
        <div className="absolute top-0 right-0 w-full h-0.5 sm:h-1 bg-red-500" />
        <div className="absolute top-0 right-0 h-full w-0.5 sm:w-1 bg-red-500" />
      </div>
      <div className="absolute bottom-[15%] sm:bottom-[15%] left-[5%] sm:left-[8%] w-4 h-4 sm:w-5 sm:h-5 z-10">
        <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-red-500" />
        <div className="absolute bottom-0 left-0 h-full w-0.5 sm:w-1 bg-red-500" />
      </div>
      <div className="absolute bottom-[15%] sm:bottom-[15%] right-[5%] sm:right-[8%] w-4 h-4 sm:w-5 sm:h-5 z-10">
        <div className="absolute bottom-0 right-0 w-full h-0.5 sm:h-1 bg-red-500" />
        <div className="absolute bottom-0 right-0 h-full w-0.5 sm:w-1 bg-red-500" />
      </div>

      {/* Red dashed border content frame */}
      <div
        className="absolute z-10 top-[10%] sm:top-[13%] left-[7%] sm:left-[9%] right-[7%] sm:right-[9%] bottom-[13%] sm:bottom-[17%]"
        style={{
          border: '2px dashed rgba(239, 68, 68, 0.5)',
        }}
      />

      {/* Quote content */}
      <div className="absolute z-10 flex flex-col justify-center top-[10%] sm:top-[13%] left-[7%] sm:left-[9%] right-[7%] sm:right-[9%] bottom-[13%] sm:bottom-[17%] p-5 sm:p-10 lg:p-16">
        <span
          className="text-red-500 text-sm sm:text-base mb-3 sm:mb-6 tracking-wide"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          I believe
        </span>

        <h2
          className="leading-tight transition-colors duration-500"
          style={{
            fontFamily: "'Work Sans', sans-serif",
            fontSize: 'clamp(1.5rem, 5vw, 72px)',
            letterSpacing: '-0.02em',
            color: 'var(--slide-title-white)',
          }}
        >
          <span className="font-light">"Design should be </span>
          <span className="font-light">easy to understand </span>
          <span className="font-bold">because </span>
          <span className="font-light">simple ideas </span>
          <span className="font-bold">are quicker to grasp...</span>
          <span className="font-light">"</span>
        </h2>
      </div>

      {/* Bottom lesson info bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 backdrop-blur-sm transition-colors duration-500" style={{ backgroundColor: 'var(--slide-bar-bg)', borderTop: '1px solid var(--slide-bar-border)' }}>
        <div className="px-4 sm:px-8 py-2 flex items-center justify-between">
          <span
            className="text-[10px] sm:text-xs transition-colors duration-500"
            style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text-muted)' }}
          >
            <span className="text-red-400 font-semibold">Lesson 1:</span>{" "}
            Tools of the Design Cycle
          </span>
          <span className="text-[10px] sm:text-xs font-mono transition-colors duration-500" style={{ color: 'var(--slide-text-faint)' }}>
            01/33
          </span>
        </div>
      </div>
    </div>
  );
}
