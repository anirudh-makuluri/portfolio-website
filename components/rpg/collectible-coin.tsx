"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCoinCounter } from "./coin-context";

type CollectibleCoinProps = {
  storageKey: string;
  className?: string;
  label?: string;
};

export default function CollectibleCoin({
  storageKey,
  className = "",
  label = "Bonus coin",
}: CollectibleCoinProps) {
  const { addCoins } = useCoinCounter();
  const [taken, setTaken] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(`cc-${storageKey}`) === "1") {
      setTaken(true);
    }
  }, [storageKey]);

  const collect = useCallback(() => {
    if (taken) return;
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(`cc-${storageKey}`, "1");
    }
    setTaken(true);
    addCoins(3);
  }, [taken, addCoins, storageKey]);

  if (taken) return null;

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={collect}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#fcbc3c]/30 bg-[#fcbc3c]/10 shadow-[0_0_15px_rgba(252,188,60,0.1)] hover:shadow-[0_0_20px_rgba(252,188,60,0.2)] active:translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fcbc3c]/40 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="font-[family-name:var(--font-pixel)] text-[9px] text-[#fcbc3c]/80">
        $
      </span>
      <motion.span
        className="absolute inset-0 rounded-full border border-[#fcbc3c]/20 pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.button>
  );
}
