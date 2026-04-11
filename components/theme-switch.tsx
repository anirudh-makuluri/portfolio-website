"use client";

import { useTheme } from "@/context/theme-context";
import { useSiteMode } from "@/context/site-mode-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const { isMinimalMode } = useSiteMode();

  return (
    <button
      className={`fixed right-4 z-[999] flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/90 text-gray-800 shadow-lg backdrop-blur transition hover:scale-105 dark:border-white/10 dark:bg-gray-900/85 dark:text-gray-100 sm:right-5 sm:h-11 sm:w-11 ${
        isMinimalMode ? "top-4" : "bottom-5"
      }`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <BsMoon /> : <BsSun />}
    </button>
  );
}
