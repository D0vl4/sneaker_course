import { DotPattern } from "@/components/ui/dot-pattern";
import LightRays from "@/components/LightRays";
import GradientText from "@/components/GradientText";
import QuizOrbital from "@/components/ui/quiz-orbital";
import type { QuizAnswer } from "@/components/ui/quiz-orbital";

const quizAnswers: QuizAnswer[] = [
  {
    id: 1,
    text: "Schedule",
    explanation:
      "A schedule is indeed part of the Design Brief, outlining key milestones and deadlines for the sneaker design process.",
    isCorrect: false,
  },
  {
    id: 2,
    text: "Color and materials",
    explanation:
      "Color palette and material selection are core elements of any Design Brief for sneaker design.",
    isCorrect: false,
  },
  {
    id: 3,
    text: "Gap analysis",
    explanation:
      "Gap analysis is a business strategy tool, not a standard element of a sneaker Design Brief. It's used to identify differences between current and desired performance.",
    isCorrect: true,
  },
  {
    id: 4,
    text: "Target customer",
    explanation:
      "Defining the target customer is a fundamental part of the Design Brief to ensure the sneaker meets market needs.",
    isCorrect: false,
  },
  {
    id: 5,
    text: "Price point",
    explanation:
      "Price point is always specified in the Design Brief as it influences materials, manufacturing, and design decisions.",
    isCorrect: false,
  },
];

export default function SlideFive() {
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

        {/* Subtitle / question */}
        <div className="mb-3 sm:mb-4 shrink-0">
          <p
            className="leading-relaxed transition-colors duration-500"
            style={{
              fontFamily: "'Work Sans', sans-serif",
              color: "var(--slide-text)",
              fontSize: "var(--fs-body)",
            }}
          >
            Which one of these elements is NOT part of the Design Brief that is
            created at the start of the sneaker design process:
          </p>
        </div>

        {/* Quiz orbital fills remaining space */}
        <div className="flex-1 min-h-0">
          <QuizOrbital answers={quizAnswers} />
        </div>
      </div>

    </div>
  );
}
