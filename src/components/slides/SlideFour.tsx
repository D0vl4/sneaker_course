import { DotPattern } from "@/components/ui/dot-pattern";
import LightRays from "@/components/LightRays";
import GradientText from "@/components/GradientText";
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat";

interface SlideFourProps {
  userResponse?: string;
  onSendResponse?: (message: string) => void;
}

export default function SlideFour({ userResponse, onSendResponse }: SlideFourProps) {
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
        {/* Title */}
        <div className="mb-4 sm:mb-6">
          <GradientText
            colors={["#ef4444", "#ffffff", "#ef4444"]}
            animationSpeed={6}
            className="!m-0 !justify-start text-xl sm:text-2xl lg:text-4xl !font-extrabold"
          >
            Why Study Sneaker Design?
          </GradientText>
        </div>

        {/* Body text */}
        <div className="mb-4 sm:mb-6 max-w-3xl">
          <p
            className="leading-relaxed transition-colors duration-500"
            style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text)', fontSize: 'var(--fs-body)' }}
          >
            Let's watch Joe La Puma, host of Sneaker Shopping, discuss why sneaker design is so important.
            As you watch the video, identify 3 reasons why sneaker design is important.
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

        {/* Two-column layout: chat input + video placeholder */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Animated AI Chat input */}
          <div className="flex-1 min-h-[200px] sm:min-h-[280px] rounded-xl backdrop-blur-sm overflow-hidden flex flex-col transition-colors duration-500" style={{ backgroundColor: 'var(--slide-card-bg)', border: '1px solid var(--slide-card-border)' }}>
            {userResponse ? (
              <div className="p-4 sm:p-5 flex flex-col h-full">
                <span className="text-[10px] font-mono tracking-wider mb-3" style={{ color: 'var(--slide-text-faint)' }}>YOUR RESPONSE</span>
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

          {/* Video placeholder */}
          <div className="flex-1 min-h-[200px] sm:min-h-[280px] aspect-[800/533] rounded-xl border-2 border-dashed border-yellow-400/50 bg-black/20 backdrop-blur-sm overflow-hidden relative flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'var(--slide-text-faint)' }}>
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--slide-text-faint)' }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span
                className="text-xs sm:text-sm transition-colors duration-500"
                style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text-faint)' }}
              >
                Video placeholder
              </span>
              <p className="text-[10px] mt-2 font-mono" style={{ color: 'var(--slide-text-faint)' }}>
                Media will be added here
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
