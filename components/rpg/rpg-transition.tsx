"use client";

import { useViewMode } from "@/context/view-mode-context";
import { motion, AnimatePresence } from "framer-motion";

export default function RpgTransition() {
  const { isTransitioning } = useViewMode();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#f0f5fa] via-[#e8f0e6] to-[#f5f0e0] dark:from-[#060610] dark:via-[#0a0f1e] dark:to-[#0c0c24]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="text-center px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-[family-name:var(--font-pixel)] text-amber-800/90 dark:text-[#fcbc3c]/80 text-[11px] sm:text-sm mb-2 tracking-wide">
              WORLD MAP
            </p>
            <p className="font-[family-name:var(--font-pixel)] text-gray-500/80 dark:text-white/20 text-[6px] sm:text-[7px] mb-5 tracking-[0.2em]">
              LINKING AREAS
            </p>
            <div className="w-48 h-2 bg-gray-200/80 dark:bg-white/[0.04] border border-gray-300/80 dark:border-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber-500/70 dark:bg-[#fcbc3c]/50 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeInOut" }}
              />
            </div>
            <p className="font-[family-name:var(--font-pixel)] text-gray-400 dark:text-white/15 text-[6px] sm:text-[7px] mt-3 tracking-widest">
              STABILIZING REALM
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
