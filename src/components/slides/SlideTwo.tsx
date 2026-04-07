import { DotPattern } from "@/components/ui/dot-pattern";
import { AnimatedDock } from "@/components/ui/animated-dock";
import type { DockItemData } from "@/components/ui/animated-dock";
import BorderGlow from "@/components/ui/border-glow";
import { Maximize, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

interface SlideTwoProps {
  onBack: () => void;
  onNext: () => void;
}

export default function SlideTwo({ onBack, onNext }: SlideTwoProps) {
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleSubmit = () => {
    console.log("Submitted");
  };

  const dockItems: DockItemData[] = [
    {
      onClick: handleFullscreen,
      Icon: <Maximize size={18} />,
      label: "Fullscreen",
    },
    {
      onClick: handleSubmit,
      Icon: <CheckCircle size={18} />,
      label: "Submit",
    },
    {
      onClick: onBack,
      Icon: <ArrowLeft size={18} />,
      label: "Back",
    },
    {
      onClick: onNext,
      Icon: <ArrowRight size={18} />,
      label: "Next",
    },
  ];

  return (
    <div className="relative w-[1920px] h-[1080px] overflow-hidden bg-[#1a1a1a]">
      {/* Dot pattern grid background */}
      <DotPattern
        width={24}
        height={24}
        cr={0.8}
        className="z-[1] opacity-40 fill-white/15"
      />

      {/* Red corner crop marks */}
      {/* Top-left */}
      <div className="absolute top-[120px] left-[160px] w-5 h-5 z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
        <div className="absolute top-0 left-0 h-full w-1 bg-red-500" />
      </div>
      {/* Top-right */}
      <div className="absolute top-[120px] right-[160px] w-5 h-5 z-10">
        <div className="absolute top-0 right-0 w-full h-1 bg-red-500" />
        <div className="absolute top-0 right-0 h-full w-1 bg-red-500" />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-[160px] left-[160px] w-5 h-5 z-10">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500" />
        <div className="absolute bottom-0 left-0 h-full w-1 bg-red-500" />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-[160px] right-[160px] w-5 h-5 z-10">
        <div className="absolute bottom-0 right-0 w-full h-1 bg-red-500" />
        <div className="absolute bottom-0 right-0 h-full w-1 bg-red-500" />
      </div>

      {/* Red dashed border content frame */}
      <div
        className="absolute z-10"
        style={{
          top: '140px',
          left: '180px',
          right: '180px',
          bottom: '180px',
          border: '2px dashed rgba(239, 68, 68, 0.5)',
        }}
      />

      {/* Quote content — left-aligned inside the frame */}
      <div
        className="absolute z-10 flex flex-col justify-center"
        style={{
          top: '140px',
          left: '180px',
          right: '180px',
          bottom: '180px',
          padding: '60px 80px',
        }}
      >
        {/* Label */}
        <span
          className="text-red-500 text-base mb-6 tracking-wide"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          I believe
        </span>

        {/* Quote */}
        <h2
          className="text-white leading-tight"
          style={{
            fontFamily: "'Work Sans', sans-serif",
            fontSize: '72px',
            letterSpacing: '-0.02em',
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

      {/* Navigation dock — centered, 20px from bottom */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
        <BorderGlow
          borderRadius={16}
          glowRadius={30}
          glowIntensity={0.8}
          edgeSensitivity={20}
          backgroundColor="rgba(0,0,0,0.6)"
          colors={['#c084fc', '#f472b6', '#38bdf8']}
          fillOpacity={0.3}
        >
          <AnimatedDock items={dockItems} />
        </BorderGlow>
      </div>
    </div>
  );
}
