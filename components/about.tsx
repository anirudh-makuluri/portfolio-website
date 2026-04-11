"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useViewMode } from "@/context/view-mode-context";
import AboutRPG from "./rpg/about-rpg";

export default function About() {
  const { viewMode } = useViewMode();
  if (viewMode === "rpg") return <AboutRPG />;
  return <AboutSimple />;
}

function AboutSimple() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>My story so far</SectionHeading>
      <p className="mb-3">
        I'm a <span className="font-medium">full-stack engineer and AI builder</span> focused on shipping practical products
        across web, mobile, cloud, and developer tooling. Lately, that has meant building systems around
        <span className="font-medium"> AI-assisted deployment, infrastructure generation, and real-time applications</span>.
      </p>
      
      <p className="mb-3">
        I previously worked at <span className="font-medium">Shardings</span> as a full-stack engineer, where I built
        scalable web and mobile experiences. Alongside that, I've been going deeper on systems, cloud, and applied AI
        through both independent projects and graduate work at <span className="font-medium">Arizona State University</span>.
      </p>

      <p className="mb-3">
        <span className="italic">What drives me?</span> I like turning messy technical workflows into products that feel
        simple to use. Whether it's deployment automation, repo analysis, knowledge systems, or real-time communication,
        I enjoy building things that are both technically solid and genuinely useful.
      </p>

      <p>
        <span className="font-medium">When I'm not coding</span>, I'm usually digging through AI research, testing new
        frameworks, or refining ideas into the next product worth shipping.
      </p>
    </motion.section>
  );
}
