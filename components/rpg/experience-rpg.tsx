"use client";

import React from "react";
import { motion } from "framer-motion";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

export default function ExperienceRPG() {
  const { ref } = useSectionInView("Experience");

  return (
    <section id="experience" ref={ref} className="py-16 sm:py-24 w-full">
      <div className="max-w-[42rem] mx-auto px-4">
        <motion.h2
          className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-[#fcbc3c] rpg-glow-gold mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          QUEST LOG
        </motion.h2>
        <motion.p
          className="font-[family-name:var(--font-pixel)] text-[7px] text-white/20 text-center mb-14 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          JOURNEY SO FAR
        </motion.p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 sm:left-7 top-2 bottom-2 w-px bg-gradient-to-b from-[#fcbc3c]/20 via-white/[0.06] to-transparent" />

          {experiencesData.map((item, index) => {
            const isLatest = index === 0;

            return (
              <motion.div
                key={index}
                className="relative pl-14 sm:pl-18 pb-12 last:pb-0"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, type: "spring", damping: 20 }}
              >
                {/* Node dot */}
                <div className="absolute left-3 sm:left-5 top-2">
                  <motion.div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isLatest
                        ? "bg-[#fcbc3c]/20 border border-[#fcbc3c]/50"
                        : "bg-white/[0.04] border border-white/[0.08]"
                    }`}
                    whileInView={
                      isLatest
                        ? {
                            boxShadow: [
                              "0 0 0px rgba(252,188,60,0)",
                              "0 0 15px rgba(252,188,60,0.3)",
                              "0 0 5px rgba(252,188,60,0.1)",
                            ],
                          }
                        : {}
                    }
                    viewport={{ once: true }}
                    transition={isLatest ? { duration: 2, repeat: Infinity } : {}}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isLatest ? "bg-[#fcbc3c]" : "bg-white/30"
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Card */}
                <div
                  className={`rpg-card !rounded-xl p-5 sm:p-6 ${
                    isLatest
                      ? "!border-[#fcbc3c]/15 hover:!border-[#fcbc3c]/25"
                      : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-[family-name:var(--font-pixel)] text-[8px] sm:text-[9px] text-white/80">
                      {item.title.toUpperCase()}
                    </h3>
                    {isLatest && (
                      <span className="font-[family-name:var(--font-pixel)] text-[6px] text-[#fcbc3c]/70 bg-[#fcbc3c]/[0.06] border border-[#fcbc3c]/15 px-2 py-0.5 rounded-md">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="font-[family-name:var(--font-pixel)] text-[7px] text-white/25 mb-1">
                    {item.location.toUpperCase()}
                  </p>
                  <p className="font-[family-name:var(--font-pixel)] text-[6px] text-white/15 mb-3">
                    {item.date}
                  </p>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
