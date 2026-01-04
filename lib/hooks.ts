import { useActiveSectionContext } from "@/context/active-section-context";
import { useGraphHighlight } from "@/context/graph-highlight-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";
import { buildKnowledgeGraph, getNodesBySection } from "./knowledge-graph";

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();
  const { setHighlightedNodes } = useGraphHighlight();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

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
  const { ref, inView } = useInView({
    threshold,
  });
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
