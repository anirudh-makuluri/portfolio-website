"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useViewMode } from "@/context/view-mode-context";
import { useRpgWorldScroll } from "@/context/rpg-world-scroll-context";

export default function RpgWorldHud() {
  const { viewMode } = useViewMode();
  const { scrollByPanels } = useRpgWorldScroll();

  useEffect(() => {
    if (viewMode !== "rpg") return;

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollByPanels(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollByPanels(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewMode, scrollByPanels]);

  if (viewMode !== "rpg") return null;

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-[997] flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-6">
      <p className="font-[family-name:var(--font-pixel)] text-[6px] text-white/50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] text-center max-w-[16rem]">
        SWIPE OR ← → FOR NEXT WORLD · SCROLL DOWN TO READ THIS ONE
      </p>
      <div className="pointer-events-auto flex items-center gap-2 rounded-sm border-2 border-[#1a6030] bg-black/75 px-2 py-1 backdrop-blur-sm">
        <motion.button
          type="button"
          aria-label="Previous world"
          className="font-[family-name:var(--font-pixel)] text-[10px] text-[#fcbc3c] px-2 py-1 hover:bg-white/10 rounded-sm"
          onClick={() => scrollByPanels(-1)}
          whileTap={{ scale: 0.92 }}
        >
          ◀
        </motion.button>
        <span className="font-[family-name:var(--font-pixel)] text-[6px] text-white/60 px-1">
          WARP
        </span>
        <motion.button
          type="button"
          aria-label="Next world"
          className="font-[family-name:var(--font-pixel)] text-[10px] text-[#fcbc3c] px-2 py-1 hover:bg-white/10 rounded-sm"
          onClick={() => scrollByPanels(1)}
          whileTap={{ scale: 0.92 }}
        >
          ▶
        </motion.button>
      </div>
    </div>
  );
}
