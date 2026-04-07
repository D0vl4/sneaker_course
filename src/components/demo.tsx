import { ClearButton } from "@/components/ui/clear-button";
import HeroBackground from "@/components/ui/hero-ascii-one";

interface SlideOneProps {
  onLetsGo: () => void;
}

export default function SlideOne({ onLetsGo }: SlideOneProps) {
  return (
    <div className="relative w-[1920px] h-[1080px] overflow-hidden bg-black">
      {/* ASCII Vitruvian background */}
      <HeroBackground />

      {/* 3px white stroke border */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ border: "3px solid white" }}
      />

      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-20 border-b border-white/20">
        <div className="mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-mono text-white text-2xl font-bold tracking-widest italic" style={{ transform: "skewX(-12deg)" }}>
              SNEAKERS
            </div>
            <div className="h-4 w-px bg-white/40"></div>
            <span className="text-white/60 text-[10px] font-mono">EST. 2025</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-white/60">
            <span>MODULE: 001</span>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <span>PREMIUM COURSE</span>
          </div>
        </div>
      </div>

      {/* Corner Frame Accents */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/30 z-20"></div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/30 z-20"></div>
      <div className="absolute bottom-[54px] left-0 w-12 h-12 border-b-2 border-l-2 border-white/30 z-20"></div>
      <div className="absolute bottom-[54px] right-0 w-12 h-12 border-b-2 border-r-2 border-white/30 z-20"></div>

      {/* CTA Content — left-aligned */}
      <div className="relative z-10 flex h-full items-center">
        <div className="px-16 ml-[10%]">
          <div className="max-w-lg relative">
            {/* Top decorative line */}
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div className="w-8 h-px bg-white"></div>
              <span className="text-white text-[10px] font-mono tracking-wider">001</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>

            {/* Title with dithered accent */}
            <div className="relative">
              <div className="absolute -left-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
              <h1
                className="text-8xl font-bold text-white mb-4 leading-none tracking-wider"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                Sneaker
                <span className="block text-white mt-0 opacity-90">
                  Course
                </span>
              </h1>
            </div>

            {/* Decorative dots pattern */}
            <div className="flex gap-1 mb-3 opacity-40">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 bg-white rounded-full"></div>
              ))}
            </div>

            {/* Description */}
            <div className="relative">
              <p className="text-base text-gray-300 mb-6 leading-relaxed font-mono opacity-80">
                Master the art of sneaker culture — from design origins to resell
                strategy, all in one premium course.
              </p>
              <div className="absolute -right-4 top-1/2 w-3 h-3 border border-white opacity-30" style={{ transform: "translateY(-50%)" }}>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white" style={{ transform: "translate(-50%, -50%)" }}></div>
              </div>
            </div>

            {/* Green badge */}
            <div className="mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block animate-pulse" />
              <span className="text-green-400 text-sm font-medium font-mono tracking-wide">
                2,847 students currently enrolled
              </span>
            </div>

            {/* Single button — no "Learn More" */}
            <div className="flex gap-4">
              <ClearButton onClick={onLetsGo}>LET'S GO</ClearButton>
            </div>

            {/* Bottom technical notation */}
            <div className="flex items-center gap-2 mt-6 opacity-40">
              <span className="text-white text-[9px] font-mono">∞</span>
              <div className="flex-1 h-px bg-white"></div>
              <span className="text-white text-[9px] font-mono">SNEAKER.PROTOCOL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/20 bg-black/40 backdrop-blur-sm">
        <div className="mx-auto px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 text-[9px] font-mono text-white/50">
            <span>SYSTEM.ACTIVE</span>
            <div className="flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-1 bg-white/30" style={{ height: `${Math.random() * 12 + 4}px` }}></div>
              ))}
            </div>
            <span>V1.0.0</span>
          </div>
          <div className="flex items-center gap-4 text-[9px] font-mono text-white/50">
            <span>◐ RENDERING</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
            <span>FRAME: ∞</span>
          </div>
        </div>
      </div>
    </div>
  );
}
