import { useActiveSectionContext } from "@/context/active-section-context";
import { useGraphHighlight } from "@/context/graph-highlight-context";
import { useEffect, useRef } from "react";
import type { SectionName } from "./types";
import { buildKnowledgeGraph, getNodesBySection } from "./knowledge-graph";

export function useSectionInView(sectionName: SectionName, threshold = 0.35) {
  const ref = useRef<HTMLElement | null>(null);
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();
  const { setHighlightedNodes } = useGraphHighlight();

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || Date.now() - timeOfLastClick <= 1000) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const activationLine = 140;
      const viewportHeight = window.innerHeight;
      const visibleHeight =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const isSectionActive =
        rect.top <= activationLine &&
        rect.bottom >= activationLine &&
        visibleHeight >= Math.min(200, rect.height * threshold);

      if (isSectionActive) {
        setActiveSection(sectionName);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [setActiveSection, timeOfLastClick, sectionName, threshold]);

  // Highlight graph nodes when section is in view (DISABLED FOR NOW)
  // useEffect(() => {
  //   if (inView) {
  //     const graph = buildKnowledgeGraph();
  //     const sectionMap: Record<string, string> = {
  //       'Home': 'home',
  //       'About': 'home',
  //       'Projects': 'projects',
  //       'Skills': 'skills',
  //       'Experience': 'experience',
  //       'Certificates': 'certificates',
  //     };
  //     
  //     const mappedSection = sectionMap[sectionName] || sectionName.toLowerCase();
  //     const nodesToHighlight = getNodesBySection(mappedSection, graph);
  //     
  //     setHighlightedNodes(nodesToHighlight);
  //   } else {
  //     setHighlightedNodes([]);
  //   }
  // }, [inView, sectionName, setHighlightedNodes]);

  return {
    ref,
  };
}

// Hook to highlight graph nodes when section comes into view (DISABLED FOR NOW)
export function useSectionGraphHighlight(sectionName: string, threshold = 0.5) {
  const ref = useRef<HTMLElement | null>(null);
  // const { setHighlightedNodes } = useGraphHighlight();

  // useEffect(() => {
  //   if (inView) {
  //     const graph = buildKnowledgeGraph();
  //     const sectionMap: Record<string, string> = {
  //       'Home': 'home',
  //       'About': 'home',
  //       'Projects': 'projects',
  //       'Skills': 'skills',
  //       'Experience': 'experience',
  //       'Certificates': 'certificates',
  //     };
  //     
  //     const mappedSection = sectionMap[sectionName] || sectionName.toLowerCase();
  //     const nodesToHighlight = getNodesBySection(mappedSection, graph);
  //     
  //     setHighlightedNodes(nodesToHighlight);
  //   } else {
  //     setHighlightedNodes([]);
  //   }
  // }, [inView, sectionName, setHighlightedNodes]);

  return {
    ref,
  };
}
