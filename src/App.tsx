import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SlideOne from "./components/demo";
import SlideQuote from "./components/slides/SlideQuote";
import SlideTwo from "./components/slides/SlideTwo";
import SlideFour from "./components/slides/SlideFour";
import SlideThree from "./components/slides/SlideThree";
import SlideFive from "./components/slides/SlideFive";
import SlideSix from "./components/slides/SlideSix";
import { AnimatedDock } from "./components/ui/animated-dock";
import type { DockItemData } from "./components/ui/animated-dock";
import BorderGlow from "./components/BorderGlow";
import { SlideMenu } from "./components/ui/SlideMenu";
import SettingsPanel from "./components/ui/SettingsPanel";
import type { SettingsConfig } from "./components/ui/SettingsPanel";
import SlideSeven from "./components/slides/SlideSeven";
import SlideEight from "./components/slides/SlideEight";
import SlideNine from "./components/slides/SlideNine";
import { LayoutList, Settings, ArrowLeft, ArrowRight } from "lucide-react";

const TOTAL_SLIDES = 10;

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [slideResponses, setSlideResponses] = useState<Record<number, string>>({});
  const [highestSlideReached, setHighestSlideReached] = useState(0);
  const [settings, setSettings] = useState<SettingsConfig>({
    fontSize: "medium",
    theme: "dark",
  });

  const fontSizeClass =
    settings.fontSize === "small"
      ? "text-sm"
      : settings.fontSize === "large"
        ? "text-lg"
        : "text-base";

  const isLight = settings.theme === "light";

  const goToSlide = (next: number) => {
    if (next < 0 || next >= TOTAL_SLIDES) return;
    setDirection(next > currentSlide ? 1 : -1);
    setCurrentSlide(next);
    setHighestSlideReached((prev) => Math.max(prev, next));
  };

  const toggleMenu = () => {
    setShowMenu((v) => !v);
    setShowSettings(false);
  };

  const toggleSettings = () => {
    setShowSettings((v) => !v);
    setShowMenu(false);
  };

  const dockItems: DockItemData[] = [
    {
      onClick: toggleMenu,
      Icon: <LayoutList size={18} />,
      label: "Slides",
      isActive: showMenu,
    },
    {
      onClick: toggleSettings,
      Icon: <Settings size={18} />,
      label: "Settings",
      isActive: showSettings,
    },
    {
      onClick: () => goToSlide(currentSlide - 1),
      Icon: <ArrowLeft size={18} />,
      label: "Back",
    },
    {
      onClick: () => goToSlide(currentSlide + 1),
      Icon: <ArrowRight size={18} />,
      label: "Next",
    },
  ];

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 0.96,
      x: dir > 0 ? 80 : -80,
      filter: "blur(8px)",
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 0.96,
      x: dir > 0 ? -80 : 80,
      filter: "blur(8px)",
    }),
  };

  return (
    <div className={`fixed inset-0 overflow-hidden transition-colors duration-500 ${isLight ? "bg-[#f5f5f0]" : "bg-black"}`} data-theme={settings.theme} data-fontsize={settings.fontSize}>
      <AnimatePresence mode="wait" custom={direction}>
        {currentSlide === 0 && (
          <motion.div
            key="slide-0"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideOne onLetsGo={() => goToSlide(1)} />
          </motion.div>
        )}
        {currentSlide === 1 && (
          <motion.div
            key="slide-1"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideQuote />
          </motion.div>
        )}
        {currentSlide === 2 && (
          <motion.div
            key="slide-2"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideTwo userResponse={slideResponses[2]} onSendResponse={(msg) => setSlideResponses(prev => ({ ...prev, 2: msg }))} />
          </motion.div>
        )}
        {currentSlide === 3 && (
          <motion.div
            key="slide-3"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideFour userResponse={slideResponses[3]} onSendResponse={(msg) => setSlideResponses(prev => ({ ...prev, 3: msg }))} />
          </motion.div>
        )}
        {currentSlide === 4 && (
          <motion.div
            key="slide-4"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideFive />
          </motion.div>
        )}
        {currentSlide === 5 && (
          <motion.div
            key="slide-5"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideSix />
          </motion.div>
        )}
        {currentSlide === 6 && (
          <motion.div
            key="slide-6"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideThree />
          </motion.div>
        )}
        {currentSlide === 7 && (
          <motion.div
            key="slide-7"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideSeven />
          </motion.div>
        )}
        {currentSlide === 8 && (
          <motion.div
            key="slide-8"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideEight />
          </motion.div>
        )}
        {currentSlide === 9 && (
          <motion.div
            key="slide-9"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideNine onClose={() => goToSlide(0)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent top heading bar */}
      {currentSlide >= 1 && currentSlide < TOTAL_SLIDES - 1 && (
        <div
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-colors duration-500"
          style={{
            backgroundColor: "var(--slide-bar-bg)",
            borderBottom: "1px solid var(--slide-bar-border)",
          }}
        >
          <div className="px-4 sm:px-8 py-2.5 sm:py-3">
            <span
              className="text-xs sm:text-sm font-medium tracking-wide transition-colors duration-500"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                color: "var(--slide-text)",
              }}
            >
              Sneaker Design and the Designer Brief
            </span>
          </div>
        </div>
      )}

      {/* Progress bar — full width, below top heading bar */}
      {currentSlide >= 1 && currentSlide < TOTAL_SLIDES - 1 && (
        <div
          className="fixed top-[40px] sm:top-[46px] left-0 right-0 z-50 h-[2px] bg-black/20 overflow-hidden rounded-full"
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(to right, #000000, #ef4444)' }}
            animate={{ width: `${((currentSlide + 1) / TOTAL_SLIDES) * 100}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}

      {/* Persistent bottom lesson info bar */}
      {currentSlide >= 1 && currentSlide < TOTAL_SLIDES - 1 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-sm transition-colors duration-500"
          style={{
            backgroundColor: "var(--slide-bar-bg)",
            borderTop: "1px solid var(--slide-bar-border)",
          }}
        >
          <div className="px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between">
            <span
              className="text-[10px] sm:text-xs transition-colors duration-500"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                color: "var(--slide-text-muted)",
              }}
            >
              <span className="text-red-400 font-semibold">Lesson 1:</span>{" "}
              Tools of the Design Cycle
            </span>
            <span
              className="text-[10px] sm:text-xs font-mono transition-colors duration-500"
              style={{ color: "var(--slide-text)" }}
            >
              {String(currentSlide + 1).padStart(2, "0")}/{String(TOTAL_SLIDES).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}

      {/* Backdrop to close menu/settings on click anywhere */}
      <AnimatePresence>
        {(showMenu || showSettings) && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setShowMenu(false); setShowSettings(false); }}
          />
        )}
      </AnimatePresence>

      {/* Persistent navigation dock — visible from slide 2 onwards */}
      {currentSlide >= 1 && currentSlide < TOTAL_SLIDES - 1 && (
        <div className="fixed bottom-[44px] sm:bottom-[50px] left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
          {/* Slide menu / Settings panel — slides up above dock */}
          <AnimatePresence>
            {showMenu && (
              <div className="mb-2">
                <SlideMenu
                  currentSlide={currentSlide}
                  totalSlides={TOTAL_SLIDES}
                  unlockedUpTo={highestSlideReached}
                  onGoToSlide={goToSlide}
                  onClose={() => setShowMenu(false)}
                />
              </div>
            )}
            {showSettings && (
              <div className="mb-2">
                <SettingsPanel
                  settings={settings}
                  onSettingsChange={setSettings}
                  onClose={() => setShowSettings(false)}
                />
              </div>
            )}
          </AnimatePresence>

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
      )}
    </div>
  );
}

export default App;
