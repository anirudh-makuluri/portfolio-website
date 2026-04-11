"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCode, FaGraduationCap, FaStar, FaTrophy } from "react-icons/fa";
import { useCoinCounter } from "./coin-context";
import CollectibleCoin from "./collectible-coin";

type AchievementLink = { label: string; href: string };
type AchievementEntry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlight: string;
  powerUp: string;
  links?: AchievementLink[];
};

const achievementsData: AchievementEntry[] = [
  {
    icon: FaTrophy,
    title: "Hackathon Wins",
    description:
      'Won 2nd Place in the Google Track, "Build With AI: The Agentic Frontier," and 1st Place for Best Use of Auth0 AI Agents at Innovation Hacks 2.0 in April 2026.',
    highlight: "2 Awards",
    powerUp: "⭐",
    links: [
      { label: "GitHub", href: "https://github.com/anirudh-makuluri/travelMate" },
      { label: "Devpost", href: "https://devpost.com/software/travelmate-gvs09r" },
    ],
  },
  {
    icon: FaCode,
    title: "Product Builder",
    description:
      "Building and shipping full-stack products across developer tools, AI workflows, and real-time apps",
    highlight: "Shipped",
    powerUp: "🍄",
  },
  {
    icon: FaStar,
    title: "AI + Cloud Depth",
    description:
      "Hands-on experience across GenAI, Bedrock, Gemini, Docker, AWS, GCP, and production-oriented systems",
    highlight: "Certified",
    powerUp: "🌸",
  },
  {
    icon: FaGraduationCap,
    title: "Open to the Right Team",
    description:
      "Focused primarily on building, while staying open to strong engineering roles where I can contribute fast",
    highlight: "Selective",
    powerUp: "🍄",
  },
];

function PowerUpBlock({
  achievement,
  index,
}: {
  achievement: AchievementEntry;
  index: number;
}) {
  const [popped, setPopped] = useState(false);
  const { addCoins } = useCoinCounter();

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", damping: 20 }}
      onViewportEnter={() => {
        if (!popped) {
          setPopped(true);
          addCoins(1);
        }
      }}
    >
      {/* Power-up pop */}
      <motion.div
        className="absolute -top-5 left-1/2 -translate-x-1/2 text-xl pointer-events-none"
        initial={{ y: 0, opacity: 0, scale: 0 }}
        animate={
          popped
            ? { y: -18, opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0.7] }
            : {}
        }
        transition={{ duration: 0.7, delay: 0.15 + index * 0.1 }}
      >
        {achievement.powerUp}
      </motion.div>

      <div className="rpg-card !rounded-xl p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#fcbc3c]/60">
            <achievement.icon className="text-lg" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-[family-name:var(--font-pixel)] text-[8px] sm:text-[9px] text-white/80">
              {achievement.title.toUpperCase()}
            </h3>
            <span className="font-[family-name:var(--font-pixel)] text-[6px] text-[#fcbc3c]/50 bg-[#fcbc3c]/[0.05] border border-[#fcbc3c]/10 px-2 py-0.5 inline-block mt-1 rounded-md">
              {achievement.highlight.toUpperCase()}
            </span>
          </div>
        </div>

        <p className="text-left text-sm text-white/45 leading-relaxed">
          {achievement.description}
        </p>

        {achievement.links?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {achievement.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                className="font-[family-name:var(--font-pixel)] text-[7px] rpg-card !rounded-md px-4 py-2 text-white/50 hover:text-white/80"
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

export default function AchievementsRPG() {
  return (
    <section
      id="achievements"
      className="py-16 sm:py-24 w-full"
    >
      <div className="max-w-[53rem] mx-auto px-4">
        <motion.h2
          className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-[#fcbc3c] rpg-glow-gold mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          TROPHY ROOM
        </motion.h2>
        <motion.p
          className="font-[family-name:var(--font-pixel)] text-[7px] text-white/20 text-center mb-6 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          POWER-UPS COLLECTED
        </motion.p>

        {/* Collectible coins row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-12 px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <p className="w-full text-center font-[family-name:var(--font-pixel)] text-[6px] text-white/15 tracking-widest">
            HIDDEN COINS
          </p>
          <CollectibleCoin storageKey="ach-a" label="Collect bonus coin A" />
          <CollectibleCoin storageKey="ach-b" label="Collect bonus coin B" />
          <CollectibleCoin storageKey="ach-c" label="Collect bonus coin C" />
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {achievementsData.map((a, i) => (
            <PowerUpBlock key={a.title} achievement={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
