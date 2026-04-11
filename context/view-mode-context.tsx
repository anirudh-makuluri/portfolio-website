"use client";

import React, {
  useLayoutEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";

type ViewMode = "simple" | "rpg";

type ViewModeContextType = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isTransitioning: boolean;
  triggerTransition: (targetMode: ViewMode) => void;
};

const ViewModeContext = createContext<ViewModeContextType | null>(null);

const VIEW_MODE_COOKIE = "viewMode";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function persistViewMode(mode: ViewMode) {
  try {
    window.localStorage.setItem("viewMode", mode);
  } catch {
    /* ignore */
  }
  try {
    document.cookie = `${VIEW_MODE_COOKIE}=${mode}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export default function ViewModeProvider({
  children,
  initialViewMode = "simple",
}: {
  children: React.ReactNode;
  /** From server cookie so first paint matches refresh preference. */
  initialViewMode?: ViewMode;
}) {
  const [viewMode, setViewModeState] = useState<ViewMode>(initialViewMode);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useLayoutEffect(() => {
    try {
      const ls = window.localStorage.getItem("viewMode") as ViewMode | null;
      if (ls === "rpg" || ls === "simple") {
        setViewModeState((current) => {
          if (ls !== current) {
            persistViewMode(ls);
            return ls;
          }
          return current;
        });
      } else {
        window.localStorage.setItem("viewMode", initialViewMode);
      }
    } catch {
      /* ignore */
    }
  }, [initialViewMode]);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    persistViewMode(mode);
  }, []);

  const triggerTransition = useCallback(
    (targetMode: ViewMode) => {
      setIsTransitioning(true);
      setTimeout(() => {
        setViewMode(targetMode);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 600);
      }, 800);
    },
    [setViewMode]
  );

  return (
    <ViewModeContext.Provider
      value={{ viewMode, setViewMode, isTransitioning, triggerTransition }}
    >
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === null) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context;
}
