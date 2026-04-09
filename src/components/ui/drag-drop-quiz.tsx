import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MatchItem {
  id: number;
  role: string;
  description: string;
}

interface DragDropQuizProps {
  items: MatchItem[];
  onComplete?: (allCorrect: boolean) => void;
}

type CheckResult = "correct" | "wrong" | null;

export default function DragDropQuiz({ items, onComplete }: DragDropQuizProps) {
  const [placements, setPlacements] = useState<(number | null)[]>(
    () => new Array(items.length).fill(null)
  );
  const [results, setResults] = useState<(CheckResult)[]>(
    () => new Array(items.length).fill(null)
  );
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const placedIds = new Set(placements.filter((id): id is number => id !== null));
  const bankItems = items.filter((item) => !placedIds.has(item.id));
  const allPlaced = placements.every((p) => p !== null);

  const getItemById = useCallback(
    (id: number) => items.find((item) => item.id === id),
    [items]
  );

  const placeItem = useCallback(
    (itemId: number, slotIndex: number) => {
      if (solved) return;
      setPlacements((prev) => {
        const next = [...prev];
        const existingSlot = next.indexOf(itemId);
        if (existingSlot !== -1) next[existingSlot] = null;
        next[slotIndex] = itemId;
        return next;
      });
      setResults((prev) => {
        const next = [...prev];
        next[slotIndex] = null;
        return next;
      });
    },
    [solved]
  );

  const removeItem = useCallback((slotIndex: number) => {
    setPlacements((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
    setResults((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  }, []);

  // --- HTML5 Drag and Drop ---
  const handleDragStart = useCallback((itemId: number) => {
    setDraggedId(itemId);
    setSelectedId(null);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
    setDragOverSlot(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    setDragOverSlot(slotIndex);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverSlot(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, slotIndex: number) => {
      e.preventDefault();
      setDragOverSlot(null);
      if (draggedId !== null) {
        placeItem(draggedId, slotIndex);
        setDraggedId(null);
      }
    },
    [draggedId, placeItem]
  );

  // --- Tap-to-select (mobile) ---
  const handleBankTap = useCallback(
    (itemId: number) => {
      if (solved) return;
      setSelectedId((prev) => (prev === itemId ? null : itemId));
    },
    [solved]
  );

  const handleSlotTap = useCallback(
    (slotIndex: number) => {
      if (solved) return;
      if (selectedId !== null) {
        placeItem(selectedId, slotIndex);
        setSelectedId(null);
      } else if (placements[slotIndex] !== null) {
        removeItem(slotIndex);
      }
    },
    [selectedId, placements, placeItem, removeItem, solved]
  );

  // --- Check answers ---
  const handleCheck = useCallback(() => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const newResults: CheckResult[] = placements.map((itemId, slotIndex) => {
      if (itemId === null) return null;
      return itemId === items[slotIndex].id ? "correct" : "wrong";
    });

    setResults(newResults);
    const allCorrect = newResults.every((r) => r === "correct");

    if (allCorrect) {
      setSolved(true);
      onComplete?.(true);
      return;
    }

    // After 2 failed attempts, show the correct answers
    if (newAttempts >= 2) {
      timeoutRef.current = setTimeout(() => {
        // Place correct answers in all slots
        setPlacements(items.map((item) => item.id));
        setResults(items.map(() => "correct"));
        setSolved(true);
        onComplete?.(false);
      }, 1500);
      return;
    }

    // First failed attempt — return wrong items to bank after delay
    timeoutRef.current = setTimeout(() => {
      setPlacements((prev) => {
        const next = [...prev];
        newResults.forEach((r, i) => {
          if (r === "wrong") next[i] = null;
        });
        return next;
      });
      setResults((prev) => {
        const next = [...prev];
        newResults.forEach((r, i) => {
          if (r === "wrong") next[i] = null;
        });
        return next;
      });
    }, 1500);
  }, [placements, items, onComplete, attempts]);

  const formatNumber = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
      {/* Drop zone rows */}
      <div className="flex flex-col gap-4 sm:gap-4">
        {items.map((item, slotIndex) => {
          const placedId = placements[slotIndex];
          const placedItem = placedId !== null ? getItemById(placedId) : null;
          const result = results[slotIndex];
          const isOver = dragOverSlot === slotIndex;
          const showTapHint = selectedId !== null && placedId === null;

          let borderStyle = {
            border: "1px dashed var(--slide-card-border)",
            backgroundColor: "var(--slide-card-bg)",
          };
          let extraClass = "backdrop-blur-sm";
          if (placedItem) {
            borderStyle = {
              border: "1px solid var(--slide-text-faint)",
              backgroundColor: "var(--slide-card-bg)",
            };
          }
          if (isOver) {
            borderStyle = { border: "2px solid rgba(239,68,68,0.6)", backgroundColor: "rgba(239,68,68,0.1)" };
          }
          if (result === "correct") {
            borderStyle = { border: "1px solid #22c55e", backgroundColor: "rgba(34,197,94,0.1)" };
            extraClass = "backdrop-blur-sm shadow-[0_0_12px_rgba(34,197,94,0.25)]";
          }
          if (result === "wrong") {
            borderStyle = { border: "1px solid #ef4444", backgroundColor: "rgba(239,68,68,0.1)" };
            extraClass = "backdrop-blur-sm shadow-[0_0_12px_rgba(239,68,68,0.25)]";
          }

          return (
            <div
              key={item.id}
              className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4 lg:gap-5"
            >
              {/* Number + Drop zone row */}
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                {/* Number circle */}
                <div
                  className="shrink-0 flex items-center justify-center rounded-full border-2"
                  style={{ width: 32, height: 32, minWidth: 32, backgroundColor: 'var(--slide-card-bg)', borderColor: 'var(--slide-text-faint)' }}
                >
                  <span
                    className="text-red-400 font-bold text-xs"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {formatNumber(slotIndex + 1)}
                  </span>
                </div>

                {/* Drop zone - full width on mobile, fixed on desktop */}
                <div
                  className={`relative flex-1 sm:flex-initial rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center ${extraClass}`}
                  style={{
                    minWidth: 0,
                    height: 44,
                    ...borderStyle,
                  }}
                  onDragOver={(e) => handleDragOver(e, slotIndex)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, slotIndex)}
                  onClick={() => handleSlotTap(slotIndex)}
                >
                  <AnimatePresence mode="wait">
                    {placedItem ? (
                      <motion.span
                        key={`placed-${placedItem.id}`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="text-xs sm:text-base font-medium px-2 sm:px-3 truncate select-none"
                        style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text)' }}
                      >
                        {placedItem.role}
                      </motion.span>
                    ) : showTapHint ? (
                      <motion.span
                        key="tap-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] sm:text-xs italic select-none"
                        style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text-faint)' }}
                      >
                        Tap to place
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              {/* Description */}
              <p
                className="leading-snug line-clamp-2 sm:line-clamp-3 min-w-0 pl-10 sm:pl-0"
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "var(--fs-body, 13px)",
                  color: "var(--slide-text-muted)",
                }}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-3 mt-2 sm:mt-4">
        {/* Check button — always occupies space */}
        <div className="flex items-center justify-center">
          {allPlaced && !solved && (
            <motion.button
              onClick={handleCheck}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-8 py-2.5 rounded-lg bg-red-500/90 hover:bg-red-500 text-white text-base font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Check Answers{attempts > 0 ? ` (Attempt ${attempts + 1}/2)` : ""}
            </motion.button>
          )}
          {solved && (
            <span
              className="text-base font-semibold px-5 py-2 rounded-full"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                color: "var(--slide-text)",
                backgroundColor: "var(--slide-card-bg)",
                border: "1px solid var(--slide-card-border)",
              }}
            >
              {attempts <= 2 && results.every((r) => r === "correct") && attempts <= 1
                ? "All correct!"
                : "Correct answers shown"}
            </span>
          )}
        </div>

        {/* Label bank */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center sm:justify-center gap-2 sm:gap-4 min-h-[52px] w-full sm:w-auto">
          <AnimatePresence>
            {bankItems.map((item) => {
              const isSelected = selectedId === item.id;
              const isDragging = draggedId === item.id;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isDragging ? 0.5 : 1,
                    scale: isDragging ? 1.05 : 1,
                    rotate: isDragging ? 2 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  draggable={!solved}
                  onDragStart={() => handleDragStart(item.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleBankTap(item.id)}
                  className={`
                    select-none rounded-lg px-4 sm:px-6 py-2.5 sm:py-3 text-center
                    text-sm sm:text-base font-medium transition-all duration-300
                    ${solved ? "cursor-default" : "cursor-grab active:cursor-grabbing"}
                    ${
                      isSelected
                        ? "bg-red-500/20 border-2 border-red-500 shadow-[0_0_14px_rgba(239,68,68,0.35)]"
                        : "bg-red-500/10 border border-red-500/40 hover:bg-red-500/20 hover:border-red-500/60 hover:shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                    }
                    ${isDragging ? "shadow-lg shadow-red-500/30" : ""}
                  `}
                  style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text)' }}
                >
                  {item.role}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {bankItems.length === 0 && !solved && (
            <span
              className="text-xs italic"
              style={{ fontFamily: "'Work Sans', sans-serif", color: 'var(--slide-text-faint)' }}
            >
              All labels placed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
