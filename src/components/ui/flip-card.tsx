'use client';

import { cn } from '@/lib/utils';
import { Check, Palette, Layers, Footprints, Sparkles } from 'lucide-react';
import { useState } from 'react';

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  color?: string;
  icon?: 'palette' | 'layers' | 'footprints' | 'sparkles';
}

const iconMap = {
  palette: Palette,
  layers: Layers,
  footprints: Footprints,
  sparkles: Sparkles,
};

export default function CardFlip({
  title = 'Build MVPs Fast',
  subtitle = 'Launch your idea in record time',
  description = 'Copy, paste, customize—and launch your MVP faster than ever.',
  features = [
    'Copy & Paste Ready',
    'Developer-First',
    'MVP Optimized',
    'Zero Setup Required',
  ],
  color = '#ef4444',
  icon = 'sparkles',
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const MainIcon = iconMap[icon];
  const featureIcons = [Palette, Layers, Footprints, Sparkles];

  return (
    <div
      style={{
        ['--primary' as string]: color ?? '#ef4444',
      }}
      className="group relative h-[380px] sm:h-[clamp(260px,45vh,380px)] w-full max-w-[320px] sm:max-w-[280px] [perspective:2000px] cursor-pointer"
      onClick={() => setIsFlipped((v) => !v)}
    >
      <div
        className={cn(
          'relative h-full w-full',
          '[transform-style:preserve-3d]',
          'transition-all duration-700',
          isFlipped
            ? '[transform:rotateY(180deg)]'
            : '[transform:rotateY(0deg)]',
        )}
      >
        {/* Front of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(0deg)] [backface-visibility:hidden]',
            'overflow-hidden rounded-2xl',
            'bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-800',
            'border border-zinc-800/50',
            'shadow-xl',
            'transition-all duration-700',
            'group-hover:shadow-2xl',
            'group-hover:border-[var(--primary)]/30',
            isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Background gradient effect */}
          <div
            className="absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-20"
            style={{ background: `linear-gradient(135deg, ${color}15, transparent 60%, transparent)` }}
          />

          {/* Animated code blocks */}
          <div className="absolute inset-0 flex items-center justify-center pt-20">
            <div className="relative flex h-[100px] w-[200px] flex-col items-center justify-center gap-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-full rounded-sm opacity-0"
                  style={{
                    background: `linear-gradient(to right, ${color}33, ${color}4D, ${color}33)`,
                    width: `${60 + ((i * 17) % 40)}%`,
                    animation: 'flipCardSlideIn 2s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                    marginLeft: `${(i * 13) % 20}%`,
                  }}
                />
              ))}

              {/* Central icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg animate-pulse transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}E6, ${color}CC)`,
                    boxShadow: `0 10px 15px -3px ${color}40`,
                  }}
                >
                  <MainIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom content */}
          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-white transition-all duration-500 ease-out group-hover:translate-y-[-4px]">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm tracking-tight text-zinc-300 transition-all delay-[50ms] duration-500 ease-out group-hover:translate-y-[-4px]">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-2xl p-5',
            'bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-800',
            'border border-zinc-800',
            'shadow-xl',
            'flex flex-col',
            'transition-all duration-700',
            'group-hover:shadow-2xl',
            'group-hover:border-[var(--primary)]/30',
            !isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 rounded-2xl opacity-20"
            style={{ background: `linear-gradient(135deg, ${color}15, transparent 60%, transparent)` }}
          />

          <div className="relative z-10 flex-1 space-y-5">
            <div className="space-y-2">
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}E6, ${color}CC)` }}
                >
                  <MainIcon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-white transition-all duration-500 ease-out group-hover:translate-y-[-2px]">
                  {title}
                </h3>
              </div>
              <p className="line-clamp-3 text-sm tracking-tight text-zinc-400 transition-all duration-500 ease-out group-hover:translate-y-[-2px]">
                {description}
              </p>
            </div>

            <div className="space-y-2.5">
              {features.map((feature, index) => {
                const IconComponent = featureIcons[index % featureIcons.length];

                return (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-zinc-300 transition-all duration-500"
                    style={{
                      transform: isFlipped
                        ? 'translateX(0)'
                        : 'translateX(-10px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                    }}
                  >
                    <div
                      className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: `${color}1A` }}
                    >
                      <IconComponent className="h-3 w-3" style={{ color }} />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-zinc-800 pt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className={cn(
                'group/start relative w-full',
                'flex items-center justify-between',
                'rounded-lg p-2.5',
                'transition-all duration-300',
                'bg-gradient-to-r from-zinc-800 via-zinc-800 to-zinc-800',
                'hover:scale-[1.02] hover:cursor-pointer',
                'border border-transparent',
              )}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(to right, ${color}1A, ${color}0D, transparent)`;
                e.currentTarget.style.borderColor = `${color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <span className="text-sm font-semibold text-white transition-colors duration-300">
                Got it
              </span>
              <Check className="h-4 w-4 transition-all duration-300 group-hover/start:scale-110" style={{ color }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
