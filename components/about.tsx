"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
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
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        Currently pursuing an <span className="font-medium">M.S. in Computer Science at Arizona State University</span>, 
        I'm specializing in <span className="font-medium">generative AI</span> and designing models that create rich, 
        context-aware content to enhance user experiences.
      </p>
      
      <p className="mb-3">
        After graduating from <span className="font-medium">BITS Pilani</span> in 2022 with a degree in Electronics & 
        Instrumentation, I transitioned into software development and haven't looked back since. I've had the privilege 
        of working at <span className="font-medium">Shardings</span> as a full-stack engineer, where I built scalable 
        web and mobile applications using modern technologies.
      </p>

      <p className="mb-3">
        <span className="italic">What drives me?</span> I love the challenge of turning complex problems into elegant, 
        user-friendly solutions. Whether it's building real-time communication systems with WebRTC, deploying AI models, 
        or creating seamless mobile experiences with React Native, I'm always excited to learn and build something new.
      </p>

      <p>
        <span className="font-medium">When I'm not coding</span>, you'll find me exploring the latest AI research papers, 
        or experimenting with new frameworks and tools.
      </p>
    </motion.section>
  );
}
