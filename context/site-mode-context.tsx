"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type SiteModeContextType = {
  isMinimalMode: boolean;
  showFullSite: () => void;
};

const SiteModeContext = createContext<SiteModeContextType | null>(null);

export function SiteModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMinimalMode, setIsMinimalMode] = useState(true);

  const value = useMemo(
    () => ({
      isMinimalMode,
      showFullSite: () => setIsMinimalMode(false),
    }),
    [isMinimalMode]
  );

  return (
    <SiteModeContext.Provider value={value}>{children}</SiteModeContext.Provider>
  );
}

export function useSiteMode() {
  const context = useContext(SiteModeContext);

  if (!context) {
    throw new Error("useSiteMode must be used within a SiteModeProvider");
  }

  return context;
}
