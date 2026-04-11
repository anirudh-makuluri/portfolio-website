"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

const STATS = [
  { label: "CLASS", value: "FULL-STACK ENGINEER", bar: 0.95, color: "#fcbc3c" },
  { label: "REALM", value: "AI / CLOUD / DEVTOOLS", bar: 0.9, color: "#00d4ff" },
  { label: "BASE", value: "ARIZONA STATE UNIVERSITY", bar: 0.85, color: "#30a050" },
  { label: "STATUS", value: "BUILDING & EXPLORING", bar: 1, color: "#c84c0c" },
];

const BIO_PARAGRAPHS = [
  "A full-stack engineer and AI builder focused on shipping practical products across web, mobile, cloud, and developer tooling.",
  "Previously served at Shardings as a full-stack engineer, building scalable web and mobile experiences. Alongside that, went deeper on systems, cloud, and applied AI through graduate work at Arizona State University.",
  "Driven by turning messy technical workflows into products that feel simple to use — deployment automation, repo analysis, knowledge systems, real-time communication.",
  "When not coding, usually digging through AI research, testing new frameworks, or refining ideas into the next product worth shipping.",
];

const SPECIALTIES = ["React", "Next.js", "React Native", "AI/ML", "Cloud", "DevOps", "Real-time"];

export default function AboutRPG() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="py-16 sm:py-24 w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="about"
    >
      <div className="max-w-[48rem] mx-auto px-4">
        <motion.h2
          className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-[#fcbc3c] rpg-glow-gold mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          PLAYER PROFILE
        </motion.h2>
        <motion.p
          className="font-[family-name:var(--font-pixel)] text-[7px] text-white/20 text-center mb-12 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          CHARACTER SELECT
        </motion.p>

        {/* Character card */}
        <motion.div
          className="rpg-card !rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, type: "spring", damping: 20 }}
        >
          {/* Card header */}
          <div className="px-5 py-3 border-b border-white/[0.04] flex items-center justify-between">
            <span className="font-[family-name:var(--font-pixel)] text-[8px] text-white/40">
              PLAYER 1
            </span>
            <span className="font-[family-name:var(--font-pixel)] text-[7px] text-[#fcbc3c]/60">
              ★ SELECTED ★
            </span>
          </div>

          <div className="p-5 sm:p-8">
            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <span className="font-[family-name:var(--font-pixel)] text-[6px] text-white/25 block mb-1.5">
                    {stat.label}
                  </span>
                  <span className="font-[family-name:var(--font-pixel)] text-[7px] sm:text-[8px] text-white/80 block mb-2">
                    {stat.value}
                  </span>
                  {/* Stat bar */}
                  <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: stat.color }}
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${stat.bar * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bio */}
            <div className="space-y-4 mb-8">
              {BIO_PARAGRAPHS.map((p, i) => (
                <motion.p
                  key={i}
                  className="text-sm sm:text-[15px] text-white/50 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Specialties */}
            <div>
              <span className="font-[family-name:var(--font-pixel)] text-[7px] text-white/20 block mb-3 text-center tracking-widest">
                SPECIALTIES
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                {SPECIALTIES.map((s, i) => (
                  <motion.span
                    key={s}
                    className="font-[family-name:var(--font-pixel)] text-[7px] bg-white/[0.04] border border-white/[0.06] text-white/50 px-3 py-1.5 rounded-md hover:bg-white/[0.08] hover:text-white/70 transition-all cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.04, type: "spring", damping: 15 }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
