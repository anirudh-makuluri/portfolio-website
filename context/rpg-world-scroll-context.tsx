"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useMemo,
  useState,
} from "react";

type RpgWorldScrollContextValue = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollToHash: (hash: string) => void;
  scrollByPanels: (delta: number) => void;
  scrollContainerEpoch: number;
  bumpScrollContainerEpoch: () => void;
};

const RpgWorldScrollContext = createContext<RpgWorldScrollContextValue | null>(
  null
);

export function RpgWorldScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollContainerEpoch, setScrollContainerEpoch] = useState(0);

  const bumpScrollContainerEpoch = useCallback(() => {
    setScrollContainerEpoch((n) => n + 1);
  }, []);

  const scrollToHash = useCallback((hash: string) => {
    const c = containerRef.current;
    if (!c) return;
    const id = hash.replace(/^#/, "");
    if (!id) return;
    let el: HTMLElement | null = null;
    try {
      el = c.querySelector(`#${CSS.escape(id)}`) as HTMLElement | null;
    } catch {
      el = c.querySelector(`#${id}`) as HTMLElement | null;
    }
    if (!el) return;
    const cRect = c.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    const left = c.scrollLeft + (eRect.left - cRect.left);
    c.scrollTo({ left, behavior: "smooth" });
  }, []);

  const scrollByPanels = useCallback((delta: number) => {
    const c = containerRef.current;
    if (!c || delta === 0) return;
    c.scrollBy({ left: delta * c.clientWidth, behavior: "smooth" });
  }, []);

  const value = useMemo(
    () => ({
      containerRef,
      scrollToHash,
      scrollByPanels,
      scrollContainerEpoch,
      bumpScrollContainerEpoch,
    }),
    [scrollToHash, scrollByPanels, scrollContainerEpoch, bumpScrollContainerEpoch]
  );

  return (
    <RpgWorldScrollContext.Provider value={value}>
      {children}
    </RpgWorldScrollContext.Provider>
  );
}

export function useRpgWorldScroll() {
  const ctx = useContext(RpgWorldScrollContext);
  if (!ctx) {
    throw new Error("useRpgWorldScroll must be used within RpgWorldScrollProvider");
  }
  return ctx;
}

export function useRpgWorldScrollOptional() {
  return useContext(RpgWorldScrollContext);
}
