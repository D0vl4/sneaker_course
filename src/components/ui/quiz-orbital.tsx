import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, HelpCircle } from "lucide-react";

export interface QuizAnswer {
  id: number;
  text: string;
  explanation: string;
  isCorrect: boolean;
}

export interface QuizOrbitalProps {
  answers: QuizAnswer[];
  onAnswered?: (correct: boolean) => void;
}

const NODE_SIZE = 52;
const HALF_NODE = NODE_SIZE / 2;

export default function QuizOrbital({ answers, onAnswered }: QuizOrbitalProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<Set<number>>(new Set());
  const [solved, setSolved] = useState(false);

  const handleNodeClick = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedId === null) return;
    const selected = answers.find((a) => a.id === selectedId);
    if (!selected) return;

    if (selected.isCorrect) {
      setSolved(true);
      onAnswered?.(true);
    } else {
      setWrongAttempts((prev) => new Set(prev).add(selectedId));
      onAnswered?.(false);
    }
  }, [selectedId, answers, onAnswered]);

  const handleDismiss = useCallback(() => {
    setSelectedId(null);
  }, []);

  const selectedAnswer = answers.find((a) => a.id === selectedId);
  const isSelectedWrong = selectedId !== null && wrongAttempts.has(selectedId);
  const isSelectedCorrect = selectedAnswer?.isCorrect && solved;

  // Was this answer already submitted (wrong or correct)?
  const isSelectedSubmitted = isSelectedWrong || isSelectedCorrect;

  const getNodeBorderColor = (answer: QuizAnswer) => {
    if (solved && answer.isCorrect) return "#22c55e";
    if (wrongAttempts.has(answer.id)) return "#ef4444";
    return "rgba(255,255,255,0.8)";
  };

  const getNodeIcon = (answer: QuizAnswer) => {
    if (solved && answer.isCorrect) return <Check className="w-5 h-5 text-green-400" />;
    if (wrongAttempts.has(answer.id)) return <X className="w-5 h-5 text-red-400" />;
    return answer.id;
  };

  const getLabelColor = (answer: QuizAnswer) => {
    if (solved && answer.isCorrect) return "#22c55e";
    if (wrongAttempts.has(answer.id)) return "#ef4444";
    return "var(--slide-text-muted)";
  };

  // Static positions for nodes — centered properly
  const getNodePosition = (index: number, total: number) => {
    const angle = (360 / total) * index - 90; // -90 to start from top
    const radian = (angle * Math.PI) / 180;
    const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 140 : 210;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };

  // Determine card badge and button state
  const getBadgeInfo = () => {
    if (!selectedAnswer) return { text: "", bg: "", color: "", border: "" };

    if (isSelectedCorrect) {
      return {
        text: "Correct!",
        bg: "rgba(34,197,94,0.15)",
        color: "#22c55e",
        border: "1px solid rgba(34,197,94,0.3)",
      };
    }
    if (isSelectedWrong) {
      return {
        text: "Incorrect — Try again!",
        bg: "rgba(239,68,68,0.15)",
        color: "#ef4444",
        border: "1px solid rgba(239,68,68,0.3)",
      };
    }
    // Not yet submitted — viewing this answer
    return {
      text: `Answer ${selectedAnswer.id}`,
      bg: "rgba(239,68,68,0.15)",
      color: "#ef4444",
      border: "1px solid rgba(239,68,68,0.3)",
    };
  };

  // Can submit this answer? Only if not already wrong-attempted and not solved
  const canSubmit = selectedId !== null && !wrongAttempts.has(selectedId) && !solved;

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Orbital system */}
      <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px]">
        {/* Center pulsing element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center relative"
            animate={{
              scale: [1, 1.06, 1],
              boxShadow: [
                "0 0 20px rgba(239,68,68,0.4), 0 0 40px rgba(239,68,68,0.2)",
                "0 0 30px rgba(239,68,68,0.6), 0 0 60px rgba(239,68,68,0.3)",
                "0 0 20px rgba(239,68,68,0.4), 0 0 40px rgba(239,68,68,0.2)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle at 35% 35%, #f97316, #ef4444, #b91c1c)",
            }}
          >
            <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Orbit ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: "280px", height: "280px", border: "1px solid var(--slide-card-border)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full hidden sm:block"
          style={{ width: "420px", height: "420px", border: "1px solid var(--slide-card-border)" }}
        />

        {/* Answer nodes */}
        {answers.map((answer, index) => {
          const pos = getNodePosition(index, answers.length);
          const borderColor = getNodeBorderColor(answer);
          const isSelected = selectedId === answer.id;

          return (
            <motion.button
              key={answer.id}
              className="absolute top-1/2 left-1/2 z-20 cursor-pointer"
              style={{
                x: pos.x - HALF_NODE,
                y: pos.y - HALF_NODE,
                width: `${NODE_SIZE}px`,
                height: `${NODE_SIZE}px`,
              }}
              animate={{ scale: isSelected ? 1.15 : 1 }}
              transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleNodeClick(answer.id)}
              aria-label={`Answer ${answer.id}: ${answer.text}`}
            >
              <div
                className="rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  width: `${NODE_SIZE}px`,
                  height: `${NODE_SIZE}px`,
                  backgroundColor: "rgba(15,15,20,0.9)",
                  border: `2.5px solid ${borderColor}`,
                  color: "#fff",
                  fontFamily: "'Work Sans', sans-serif",
                }}
              >
                {getNodeIcon(answer)}
              </div>
              <span
                className="absolute top-[58px] left-1/2 -translate-x-1/2 text-[10px] sm:text-xs w-[80px] sm:w-[100px] text-center leading-tight whitespace-normal"
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  color: getLabelColor(answer),
                }}
              >
                {answer.text}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Card popup */}
      <AnimatePresence>
        {selectedId !== null && selectedAnswer && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleDismiss} />

            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative z-40 w-[90%] max-w-sm"
            >
              <Card
                className="border-white/10 shadow-2xl"
                style={{ backgroundColor: "rgba(15,15,20,0.95)" }}
              >
                <CardHeader className="pb-3 pt-5 px-5">
                  <div className="flex items-center justify-between mb-2">
                    {(() => {
                      const badge = getBadgeInfo();
                      return (
                        <Badge
                          className="text-[10px] px-2 py-0.5"
                          style={{
                            backgroundColor: badge.bg,
                            color: badge.color,
                            border: badge.border,
                          }}
                        >
                          {badge.text}
                        </Badge>
                      );
                    })()}
                    <button
                      onClick={handleDismiss}
                      className="text-white/40 hover:text-white/70 transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <CardTitle
                    className="text-base sm:text-lg"
                    style={{ fontFamily: "'Work Sans', sans-serif", color: "#fff" }}
                  >
                    {selectedAnswer.text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <p
                    className="text-xs sm:text-sm leading-relaxed mb-4"
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    {selectedAnswer.explanation}
                  </p>

                  {canSubmit ? (
                    <button
                      onClick={handleSubmit}
                      className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                      style={{
                        fontFamily: "'Work Sans', sans-serif",
                        background: "linear-gradient(135deg, #ef4444, #dc2626)",
                        boxShadow: "0 2px 12px rgba(239,68,68,0.3)",
                      }}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleDismiss}
                      className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                      style={{
                        fontFamily: "'Work Sans', sans-serif",
                        background: isSelectedCorrect
                          ? "linear-gradient(135deg, #22c55e, #16a34a)"
                          : "linear-gradient(135deg, #52525b, #3f3f46)",
                        boxShadow: isSelectedCorrect
                          ? "0 2px 12px rgba(34,197,94,0.3)"
                          : "0 2px 12px rgba(0,0,0,0.3)",
                      }}
                    >
                      Close
                    </button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
