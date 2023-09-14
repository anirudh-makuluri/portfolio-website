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
            As a graduate from <strong>BITS Pilani</strong> in <strong>2022</strong> with a major in <strong>Electronics and Instrumentation</strong>, 
            I'm passionate about technology and proficient in <strong>React, Next.js, React Native, Java, and C#</strong>. 
            I'm currently seeking a position where I can apply my skills and expertise to create innovative digital solutions that make a real impact.
      </p>
    </motion.section>
  );
}
