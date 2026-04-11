"use client";

import React, { useState } from "react";
import { certificatesData } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import Link from "next/link";

function getCoinStyle(issuer: string) {
  if (issuer.includes("Oracle"))
    return {
      ring: "border-[#fcbc3c]/40",
      glow: "shadow-[0_0_20px_rgba(252,188,60,0.15)]",
      bg: "bg-gradient-to-br from-[#fcbc3c]/80 to-[#c89c1c]/80",
    };
  if (issuer.includes("Stanford") || issuer.includes("DeepLearning"))
    return {
      ring: "border-white/20",
      glow: "shadow-[0_0_15px_rgba(255,255,255,0.08)]",
      bg: "bg-gradient-to-br from-white/40 to-white/20",
    };
  return {
    ring: "border-[#cd7f32]/30",
    glow: "shadow-[0_0_12px_rgba(205,127,50,0.1)]",
    bg: "bg-gradient-to-br from-[#cd7f32]/60 to-[#8b5a2b]/60",
  };
}

function StarCoin({
  cert,
  index,
}: {
  cert: (typeof certificatesData)[number];
  index: number;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const style = getCoinStyle(cert.issuedBy);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, type: "spring", damping: 15 }}
      onMouseEnter={() => setShowDialog(true)}
      onMouseLeave={() => setShowDialog(false)}
    >
      <Link href={cert.link} target="_blank">
        <div className="rpg-card !rounded-xl flex flex-col items-center gap-4 p-6 cursor-pointer group">
          {/* Spinning coin */}
          <motion.div
            className={`w-16 h-16 rounded-full border-2 ${style.ring} ${style.glow} ${style.bg} flex items-center justify-center`}
            whileInView={{ rotateY: [0, 360] }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.3 + index * 0.12,
              ease: "easeInOut",
            }}
            whileHover={{ rotateY: 360, transition: { duration: 0.6 } }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="text-lg drop-shadow-lg">★</span>
          </motion.div>

          <div className="text-center">
            <h3 className="font-[family-name:var(--font-pixel)] text-[7px] sm:text-[8px] text-white/60 leading-relaxed mb-1 group-hover:text-[#fcbc3c]/80 transition-colors">
              {cert.name.toUpperCase()}
            </h3>
            <p className="font-[family-name:var(--font-pixel)] text-[6px] text-white/20">
              {cert.issuedBy.toUpperCase()}
            </p>
            <p className="font-[family-name:var(--font-pixel)] text-[6px] text-white/10 mt-1">
              {cert.date}
            </p>
          </div>
        </div>
      </Link>

      {/* Tooltip */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            <div className="bg-[#0d0d20]/95 border border-white/[0.08] rounded-lg p-4 backdrop-blur-sm">
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0d0d20]/95 border-r border-b border-white/[0.08] rotate-45" />
              <p className="font-[family-name:var(--font-pixel)] text-[7px] text-[#fcbc3c]/70 mb-2">
                {cert.name.toUpperCase()}
              </p>
              <p className="text-xs text-white/50 leading-relaxed">
                {cert.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CertificatesRPG() {
  const { ref } = useSectionInView("Certificates");

  return (
    <section
      id="certificates"
      ref={ref}
      className="py-16 sm:py-24 w-full"
    >
      <div className="max-w-[53rem] mx-auto px-4">
        <motion.h2
          className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-[#fcbc3c] rpg-glow-gold mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          STAR COINS
        </motion.h2>
        <motion.p
          className="font-[family-name:var(--font-pixel)] text-[7px] text-white/20 text-center mb-12 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {certificatesData.length} COLLECTED
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {certificatesData.map((cert, i) => (
            <StarCoin key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
