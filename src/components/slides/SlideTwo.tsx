import { DotPattern } from "@/components/ui/dot-pattern";
import LightRays from "@/components/LightRays";
import GradientText from "@/components/GradientText";
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat";

interface SlideTwoProps {
  userResponse?: string;
  onSendResponse?: (message: string) => void;
}

export default function SlideTwo({ userResponse, onSendResponse }: SlideTwoProps) {
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

      {/* Main content area */}
      <div className="absolute z-10 top-[48px] sm:top-[52px] left-0 right-0 bottom-0 overflow-y-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 pb-36 sm:pb-40">
        {/* Title with GradientText */}
        <div className="mb-4 sm:mb-6">
          <GradientText
            colors={["#ef4444", "#ffffff", "#ef4444"]}
            animationSpeed={6}
            className="!m-0 !justify-start text-xl sm:text-2xl lg:text-4xl !font-extrabold"
          >
            Warm-up: What Does Sneaker Design Involve?
          </GradientText>
        </div>

        {/* Body text */}
        <div className="mb-4 sm:mb-6 max-w-3xl">
          <p
            className="leading-relaxed transition-colors duration-500"
            style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text)', fontSize: 'var(--fs-body)' }}
          >
            Sneaker design is a complex process that includes a variety of skills and tools.
            List all the skills and tools you can think of that may be required in the design of a sneaker.
          </p>
        </div>

        {/* Instructor note */}
        <div className="mb-6 sm:mb-8 max-w-3xl">
          <p
            className="leading-relaxed italic transition-colors duration-500"
            style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text-muted)', fontSize: 'var(--fs-body-sm)' }}
          >
            <span className="font-semibold not-italic" style={{ color: 'var(--slide-text)' }}>Instructors:</span>{" "}
            Give students time to respond, then call on volunteers to share their thoughts.
          </p>
        </div>

        {/* Two-column layout: chat input + image */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Animated AI Chat input */}
          <div className="flex-1 min-h-[200px] sm:min-h-[280px] rounded-xl backdrop-blur-sm overflow-hidden flex flex-col transition-colors duration-500" style={{ backgroundColor: 'var(--slide-card-bg)', border: '1px solid var(--slide-card-border)' }}>
            {userResponse ? (
              <div className="p-4 sm:p-5 flex flex-col h-full">
                <span className="text-[10px] font-mono tracking-wider mb-3 transition-colors duration-500" style={{ color: 'var(--slide-text-muted)' }}>YOUR RESPONSE</span>
                <p
                  className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap transition-colors duration-500"
                  style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text)' }}
                >
                  {userResponse}
                </p>
              </div>
            ) : (
              <AnimatedAIChat
                onSend={onSendResponse}
                className="h-full p-2 sm:p-3"
              />
            )}
          </div>

          {/* Image placeholder */}
          <div className="flex-1 min-h-[200px] sm:min-h-[280px] rounded-xl border-2 border-dashed border-yellow-400/50 bg-black/20 backdrop-blur-sm overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
              alt="Sneaker design"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
              <span
                className="text-white/60 text-[10px] sm:text-xs"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                Image via Unsplash
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
