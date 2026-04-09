import { DotPattern } from "@/components/ui/dot-pattern";
import LightRays from "@/components/LightRays";
import GradientText from "@/components/GradientText";
import CardFlip from "@/components/ui/flip-card";
import type { FC } from "react";

const cards = [
  {
    title: "Materials & Textiles",
    subtitle: "The foundation of every sneaker",
    description:
      "From premium leather to Flyknit and Primeknit, materials define comfort, durability, and aesthetics. Understanding textile properties is essential for any sneaker designer.",
    features: [
      "Mesh & Knit Uppers",
      "Leather & Synthetics",
      "Sustainable Materials",
      "Performance Fabrics",
    ],
    icon: "layers" as const,
  },
  {
    title: "Color Theory",
    subtitle: "Telling stories through palettes",
    description:
      "Color drives consumer emotion and brand recognition. Great sneaker designers master color blocking, contrast ratios, and seasonal trend forecasting.",
    features: [
      "Color Blocking",
      "Trend Forecasting",
      "Brand Colorways",
      "Cultural Influence",
    ],
    icon: "palette" as const,
  },
  {
    title: "Sole Engineering",
    subtitle: "Where science meets the street",
    description:
      "The sole is the engine of a sneaker. From Air Max cushioning to Boost foam technology, sole design balances performance, weight, and visual impact.",
    features: [
      "Cushioning Systems",
      "Traction Patterns",
      "Midsole Technology",
      "Outsole Durability",
    ],
    icon: "footprints" as const,
  },
  {
    title: "Brand Identity",
    subtitle: "Creating icons that endure",
    description:
      "Iconic sneakers transcend footwear — they become cultural symbols. Building brand identity means aligning design language with storytelling and market positioning.",
    features: [
      "Logo & Branding",
      "Signature Silhouettes",
      "Collaboration Strategy",
      "Market Positioning",
    ],
    icon: "sparkles" as const,
  },
];

const SlideSeven: FC = () => {
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
            Key Design Disciplines
          </GradientText>
        </div>

        {/* Subtitle */}
        <div className="mb-4 sm:mb-5 shrink-0">
          <p
            className="leading-relaxed transition-colors duration-500"
            style={{
              fontFamily: "'Work Sans', sans-serif",
              color: "var(--slide-text-muted)",
              fontSize: "var(--fs-body)",
            }}
          >
            Explore the four pillars of sneaker design. Hover each card to
            discover what makes great footwear.
          </p>
        </div>

        {/* Cards row */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col items-center gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:gap-5 w-full max-w-[1200px] mx-auto px-2 sm:place-items-center">
            {cards.map((card) => (
              <CardFlip
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
                features={card.features}
                color="#ef4444"
                icon={card.icon}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flipCardSlideIn {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SlideSeven;
