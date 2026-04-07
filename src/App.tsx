import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SlideOne from "./components/demo";
import SlideTwo from "./components/slides/SlideTwo";

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const goToSlide = (next: number) => {
    setDirection(next > currentSlide ? 1 : -1);
    setCurrentSlide(next);
  };

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
    <div className="w-[1920px] h-[1080px] overflow-hidden fixed inset-0 bg-black">
      <AnimatePresence mode="wait" custom={direction}>
        {currentSlide === 0 && (
          <motion.div
            key="slide-0"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
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
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <SlideTwo
              onBack={() => goToSlide(0)}
              onNext={() => goToSlide(2)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
