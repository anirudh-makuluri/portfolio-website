"use client";

import React from "react";
import { categorizedSkills } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

const CATEGORY_MAP: Record<
  string,
  { name: string; icon: string; accent: string; border: string }
> = {
  Frontend: {
    name: "FIRE FLOWER",
    icon: "🔥",
    accent: "text-orange-400/80",
    border: "!border-orange-500/10 hover:!border-orange-500/20",
  },
  Mobile: {
    name: "WING CAP",
    icon: "🪶",
    accent: "text-sky-400/80",
    border: "!border-sky-500/10 hover:!border-sky-500/20",
  },
  Backend: {
    name: "METAL CAP",
    icon: "🛡️",
    accent: "text-gray-300/80",
    border: "!border-gray-400/10 hover:!border-gray-400/20",
  },
  "Database & Cloud": {
    name: "STAR",
    icon: "⭐",
    accent: "text-[#fcbc3c]/80",
    border: "!border-[#fcbc3c]/10 hover:!border-[#fcbc3c]/20",
  },
  "AI & Machine Learning": {
    name: "1-UP",
    icon: "🍄",
    accent: "text-green-400/80",
    border: "!border-green-500/10 hover:!border-green-500/20",
  },
};

export default function SkillsRPG() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="py-16 sm:py-24 w-full"
    >
      <div className="max-w-[53rem] mx-auto px-4 text-center">
        <motion.h2
          className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-[#fcbc3c] rpg-glow-gold mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          INVENTORY
        </motion.h2>
        <motion.p
          className="font-[family-name:var(--font-pixel)] text-[7px] text-white/20 mb-12 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          POWER-UP COLLECTION
        </motion.p>

        <div className="space-y-5">
          {Object.entries(categorizedSkills).map(
            ([category, skills], catIdx) => {
              const mapped = CATEGORY_MAP[category] || {
                name: category.toUpperCase(),
                icon: "⚡",
                accent: "text-white/80",
                border: "",
              };

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                  viewport={{ once: true }}
                  className={`rpg-card !rounded-xl p-5 sm:p-6 ${mapped.border}`}
                >
                  <div className="flex items-center gap-3 mb-5 justify-center">
                    <span className="text-lg">{mapped.icon}</span>
                    <h3
                      className={`font-[family-name:var(--font-pixel)] text-[8px] sm:text-[9px] ${mapped.accent}`}
                    >
                      {mapped.name}
                    </h3>
                    <span className="font-[family-name:var(--font-pixel)] text-[6px] text-white/15">
                      [{skills.length}]
                    </span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {skills.map((skill, i) => (
                      <motion.div
                        key={skill}
                        className="font-[family-name:var(--font-pixel)] text-[7px] bg-white/[0.03] border border-white/[0.05] text-white/45 px-3 py-2 rounded-md cursor-default hover:bg-white/[0.07] hover:text-white/65 transition-all"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: catIdx * 0.08 + i * 0.02,
                          type: "spring",
                          damping: 15,
                        }}
                        whileHover={{ y: -3, transition: { duration: 0.15 } }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
