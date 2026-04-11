"use client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useViewMode } from "@/context/view-mode-context";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useCoinCounter } from "./coin-context";

const BLOCK_TIPS = [
  "Tip: Scroll down to explore each world — your journey begins here.",
  "Tip: Power-up cards in the Trophy Room grant coins when revealed.",
  "Tip: Hover the Star Coins in Badges to read details.",
  "Tip: The progress pipe on the left fills as you scroll deeper.",
  "Tip: EXIT GAME anytime to return to the clean portfolio view.",
];

function QuestionBlock({ index, delay }: { index: number; delay: number }) {
  const { addCoins } = useCoinCounter();

  const onTap = () => {
    toast(BLOCK_TIPS[index] ?? "?", {
      duration: 3500,
      style: {
        fontSize: "12px",
        maxWidth: "min(90vw, 22rem)",
        background: "#0d0d20",
        color: "#fcbc3c",
        border: "1px solid rgba(252,188,60,0.3)",
        borderRadius: "8px",
      },
    });
    const key = `intro-q-${index}`;
    if (typeof window !== "undefined" && window.sessionStorage.getItem(key) === "1") return;
    addCoins(1);
    if (typeof window !== "undefined") window.sessionStorage.setItem(key, "1");
  };

  return (
    <motion.button
      type="button"
      aria-label={`Mystery block ${index + 1}`}
      className="w-10 h-10 sm:w-12 sm:h-12 rpg-card !rounded-md relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fcbc3c]/50 !border-[#fcbc3c]/20 hover:!border-[#fcbc3c]/40 hover:!bg-[#fcbc3c]/[0.06]"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
      whileTap={{ scale: 0.9, y: 4 }}
      onClick={onTap}
    >
      <div className="absolute inset-0 flex items-center justify-center text-[#fcbc3c]/80 font-[family-name:var(--font-pixel)] text-[10px] pointer-events-none">
        ?
      </div>
    </motion.button>
  );
}

const FLOAT_SHAPES = [
  { top: "12%", left: "8%", size: "w-2.5 h-2.5", border: "border-[#fcbc3c]/15", rotate: 45, dur: 9, delay: 0 },
  { top: "22%", right: "12%", size: "w-3 h-3", border: "border-[#00d4ff]/12", rounded: true, dur: 11, delay: 1.5 },
  { top: "65%", left: "15%", size: "w-2 h-2", border: "border-[#c84c0c]/15", rotate: 45, dur: 8, delay: 2.5 },
  { top: "40%", right: "6%", size: "w-2 h-2", border: "border-[#fcbc3c]/10", rotate: 45, dur: 10, delay: 0.5 },
  { top: "75%", right: "20%", size: "w-3 h-3", border: "border-[#30a050]/12", rounded: true, dur: 12, delay: 3 },
  { top: "50%", left: "5%", size: "w-1.5 h-1.5", border: "border-white/8", rounded: true, dur: 7, delay: 4 },
];

export default function IntroRPG() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { triggerTransition } = useViewMode();

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative px-4 pt-20 pb-24"
    >
      {/* Floating decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FLOAT_SHAPES.map((s, i) => (
          <motion.div
            key={i}
            className={`absolute ${s.size} border ${s.border} ${s.rounded ? "rounded-full" : ""}`}
            style={{
              top: s.top,
              left: "left" in s ? s.left : undefined,
              right: "right" in s ? s.right : undefined,
              rotate: s.rotate ?? 0,
            }}
            animate={{ y: [0, -14, 0], rotate: s.rotate ? [s.rotate, s.rotate + 90, s.rotate] : 0 }}
            transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          />
        ))}
      </div>

      {/* Title block */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-[family-name:var(--font-pixel)] text-2xl sm:text-4xl md:text-5xl text-[#fcbc3c] rpg-glow-gold mb-4 leading-relaxed tracking-wide">
          ANIRUDH&apos;S WORLD
        </h1>
        <motion.p
          className="font-[family-name:var(--font-pixel)] text-[9px] sm:text-xs text-white/40 tracking-[0.25em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          FULL-STACK ENGINEER &times; AI BUILDER
        </motion.p>
      </motion.div>

      {/* Press Start blink */}
      <motion.p
        className="font-[family-name:var(--font-pixel)] text-[9px] sm:text-[10px] text-[#fcbc3c]/70 mt-8 mb-6"
        animate={{ opacity: [0.8, 0.2, 0.8] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        ▶ PRESS START
      </motion.p>

      {/* Question blocks */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-2 px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {BLOCK_TIPS.map((_, i) => (
          <QuestionBlock key={i} index={i} delay={i * 0.3} />
        ))}
      </motion.div>
      <motion.p
        className="font-[family-name:var(--font-pixel)] text-[6px] text-white/15 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        TAP BLOCKS FOR HINTS + COINS
      </motion.p>

      {/* Description */}
      <motion.p
        className="text-base sm:text-lg text-white/50 max-w-md mx-auto text-center leading-relaxed mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Building AI products, developer tools, and cloud-native applications
        with React, Next.js, and modern infrastructure.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          href="#contact"
          className="group flex items-center gap-2 rpg-card !rounded-md px-6 py-3 !border-[#fcbc3c]/30 hover:!border-[#fcbc3c]/50 hover:!bg-[#fcbc3c]/[0.08] text-[#fcbc3c] font-[family-name:var(--font-pixel)] text-[9px] sm:text-[10px] w-full sm:w-auto justify-center"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          WARP ZONE{" "}
          <BsArrowRight className="opacity-70 transition group-hover:translate-x-1" />
        </Link>

        <a
          className="group flex items-center gap-2 rpg-card !rounded-md px-6 py-3 text-white/60 font-[family-name:var(--font-pixel)] text-[9px] sm:text-[10px] w-full sm:w-auto justify-center"
          href="/Anirudh_Raghavendra_Makuluri_resume.pdf"
          download
        >
          GET CV{" "}
          <HiDownload className="opacity-60 transition group-hover:translate-y-0.5" />
        </a>

        <a
          className="rpg-card !rounded-md p-3 text-white/40 hover:text-[#0077b5] hover:!border-[#0077b5]/30"
          href="https://www.linkedin.com/in/anirudh-makuluri/"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="rpg-card !rounded-md p-3 text-[1.1rem] text-white/40 hover:text-white/80 hover:!border-white/20"
          href="https://github.com/anirudh-makuluri"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>

      {/* Exit game */}
      <motion.button
        className="mt-10 font-[family-name:var(--font-pixel)] text-[7px] text-white/15 hover:text-white/40 transition-colors"
        onClick={() => triggerTransition("simple")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        EXIT GAME
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-[family-name:var(--font-pixel)] text-[6px] text-white/15">
          SCROLL
        </span>
        <motion.div
          className="w-4 h-7 rounded-full border border-white/10 flex items-start justify-center p-1.5"
        >
          <motion.div
            className="w-1 h-1.5 bg-white/30 rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
