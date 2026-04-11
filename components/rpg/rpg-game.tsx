"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/theme-context";
import { useViewMode } from "@/context/view-mode-context";
import { useCoinCounter } from "./coin-context";
import {
  projectsData,
  experiencesData,
  certificatesData,
  categorizedSkills,
} from "@/lib/data";
import { sendEmail } from "@/actions/sendEmail";
import toast from "react-hot-toast";
import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";
import {
  FaGithubSquare,
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { useFormStatus } from "react-dom";

/* ━━━ Types & Data ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type Loc = {
  id: string;
  name: string;
  icon: string;
  subtitle: string;
  x: number;
  y: number;
  color: string;
};

const LOCATIONS: Loc[] = [
  { id: "home", name: "HOME BASE", icon: "🏠", subtitle: "Your Story", x: 50, y: 38, color: "#f59e0b" },
  { id: "experience", name: "QUEST LOG", icon: "📜", subtitle: "Journey", x: 24, y: 14, color: "#a855f7" },
  { id: "projects", name: "WORKSHOP", icon: "⚒️", subtitle: "Builds", x: 76, y: 18, color: "#06b6d4" },
  { id: "skills", name: "ARSENAL", icon: "⚔️", subtitle: "Power-Ups", x: 18, y: 58, color: "#f97316" },
  { id: "achievements", name: "TROPHIES", icon: "🏆", subtitle: "Wins", x: 78, y: 56, color: "#eab308" },
  { id: "certificates", name: "STAR VAULT", icon: "⭐", subtitle: "Badges", x: 32, y: 80, color: "#22c55e" },
  { id: "contact", name: "WARP PIPE", icon: "📮", subtitle: "Message", x: 68, y: 82, color: "#ec4899" },
];

const CONNECTIONS: [string, string][] = [
  ["experience", "home"],
  ["projects", "home"],
  ["home", "skills"],
  ["home", "achievements"],
  ["skills", "certificates"],
  ["achievements", "contact"],
  ["certificates", "contact"],
];

const MAP_COINS = [
  { id: "mc1", x: 38, y: 24 },
  { id: "mc2", x: 62, y: 48 },
  { id: "mc3", x: 46, y: 68 },
  { id: "mc4", x: 15, y: 36 },
];

/** Curved ink trail between map nodes (0–100 coords, matches viewBox). */
function curvedPath(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  bend: number
): string {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`;
}

/* ━━━ HUD ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function GameHud({
  explored,
  total,
  onExit,
}: {
  explored: number;
  total: number;
  onExit: () => void;
}) {
  const { coins } = useCoinCounter();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="absolute top-3 left-3 right-3 sm:left-6 sm:right-6 z-50">
      <div
        className="mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-2xl border-[3px] border-neutral-900 bg-[#fff6e4] px-3 py-2.5 shadow-[4px_5px_0_#111] dark:border-neutral-950 dark:bg-[#1c1410] dark:shadow-[4px_5px_0_rgba(0,0,0,0.75)] sm:px-5"
        style={{
          boxShadow:
            "4px 5px 0 #111, inset 0 2px 0 rgba(255,255,255,0.45)",
        }}
      >
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-2 rounded-xl border-2 border-neutral-900 bg-[#ffe8a8] px-2 py-1 shadow-[2px_2px_0_#111] dark:bg-[#2d2210] dark:shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
            <motion.span
              className="text-base leading-none drop-shadow-sm"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              style={{ display: "inline-block" }}
            >
              🪙
            </motion.span>
            <span className="font-[family-name:var(--font-pixel)] text-[9px] text-neutral-900 dark:text-[#fcbc3c]">
              {coins}
            </span>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="font-[family-name:var(--font-pixel)] text-[7px] text-neutral-600/80 dark:text-white/35">
              AREAS
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 w-2.5 rounded-sm border border-neutral-900 ${
                    i < explored
                      ? "bg-amber-400 shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] dark:bg-[#fcbc3c]"
                      : "bg-[#e8dcc8] dark:bg-white/[0.08]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <span className="hidden min-[420px]:inline font-[family-name:var(--font-pixel)] text-[8px] text-neutral-800 drop-shadow-[0_1px_0_rgba(255,255,255,0.5)] dark:text-[#fcbc3c]/90 sm:text-[9px]">
          ANIRUDH&apos;S WORLD
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-neutral-900 bg-[#f0e4d4] text-sm shadow-[2px_3px_0_#111] transition-transform hover:translate-y-px hover:shadow-[1px_2px_0_#111] active:translate-y-[2px] active:shadow-none dark:bg-[#2a221c] dark:shadow-[2px_3px_0_rgba(0,0,0,0.7)]"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button
            type="button"
            onClick={onExit}
            className="rounded-xl border-2 border-neutral-900 bg-[#ff6b6b] px-3 py-2 font-[family-name:var(--font-pixel)] text-[7px] text-neutral-900 shadow-[2px_3px_0_#111] transition-transform hover:translate-y-px hover:shadow-[1px_2px_0_#111] active:translate-y-[2px] active:shadow-none sm:text-[8px] dark:bg-[#c94c4c] dark:text-white"
          >
            EXIT
          </button>
        </div>
      </div>
    </div>
  );
}

/* ━━━ Map Node ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function MapNode({
  loc,
  isExplored,
  isActive,
  onClick,
  index,
}: {
  loc: Loc;
  isExplored: boolean;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1.5 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff6e4] dark:focus-visible:ring-offset-[#1a1210]"
      style={{
        left: `${loc.x}%`,
        top: `${loc.y}%`,
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
      whileHover={{
        scale: 1.06,
        rotateX: -6,
        rotateY: 4,
        z: 24,
      }}
      whileTap={{ scale: 0.96, rotateX: 0, rotateY: 0 }}
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
        delay: 0.08 + index * 0.06,
      }}
    >
      <div className="relative rounded-2xl border-[3px] border-neutral-900 bg-[#fffdf7] p-1 shadow-[4px_5px_0_#111,inset_0_2px_0_rgba(255,255,255,0.65)] dark:bg-[#261c18] dark:shadow-[4px_5px_0_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div
          className="relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-xl border-2 border-neutral-900 sm:h-16 sm:w-16"
          style={{
            background: `linear-gradient(165deg, ${loc.color}55 0%, #fff8e8 38%, #f0e4d4 100%)`,
            boxShadow: isActive
              ? `0 0 0 2px #111, 0 0 18px ${loc.color}66`
              : "inset 0 -4px 0 rgba(0,0,0,0.06)",
          }}
        >
          <span
            className="text-[1.35rem] drop-shadow-[1px_2px_0_rgba(0,0,0,0.25)] sm:text-2xl"
            style={{ filter: "contrast(1.05)" }}
          >
            {loc.icon}
          </span>

          {!isExplored && (
            <motion.div
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-900 bg-[#ff3b3b] shadow-[2px_2px_0_#111]"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <span className="font-[family-name:var(--font-pixel)] text-[6px] font-bold text-white">
                !
              </span>
            </motion.div>
          )}

          {isExplored && (
            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-900 bg-[#34c759] shadow-[2px_2px_0_#111]">
              <span className="text-[8px] font-black text-white">✓</span>
            </div>
          )}
        </div>
      </div>

      <p className="max-w-[5.5rem] text-center font-[family-name:var(--font-pixel)] text-[5px] leading-tight text-neutral-800 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] dark:text-[#fcbc3c]/85 sm:max-w-none sm:text-[6px]">
        {loc.name}
      </p>
    </motion.button>
  );
}

/* ━━━ Hidden Coin ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function HiddenCoin({
  coin,
  onCollect,
}: {
  coin: { id: string; x: number; y: number };
  onCollect: () => void;
}) {
  return (
    <motion.button
      type="button"
      className="absolute z-[5] flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[3px] border-neutral-900 bg-gradient-to-b from-[#ffe566] to-[#f5c542] shadow-[3px_4px_0_#111] hover:brightness-105 focus:outline-none"
      style={{ left: `${coin.x}%`, top: `${coin.y}%` }}
      onClick={onCollect}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      whileTap={{ scale: 0.88, rotate: -8 }}
      aria-label="Hidden coin"
    >
      <span className="font-[family-name:var(--font-pixel)] text-[8px] text-neutral-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
        $
      </span>
    </motion.button>
  );
}

/* ━━━ World Map ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function WorldMap({
  explored,
  activeId,
  onSelect,
  collectedCoins,
  onCollectCoin,
}: {
  explored: Set<string>;
  activeId: string | null;
  onSelect: (id: string) => void;
  collectedCoins: Set<string>;
  onCollectCoin: (id: string) => void;
}) {
  return (
    <div className="relative h-full w-full">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-amber-900/25 dark:text-[#fcbc3c]/18"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        {CONNECTIONS.map(([from, to]) => {
          const a = LOCATIONS.find((l) => l.id === from)!;
          const b = LOCATIONS.find((l) => l.id === to)!;
          const d = curvedPath(a.x, a.y, b.x, b.y, 5.5);
          return (
            <g key={`${from}-${to}`}>
              <path
                d={d}
                fill="none"
                stroke="#0a0a0a"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeDasharray="5 5"
                className="opacity-35 dark:opacity-50"
                style={{ animation: "rpg-path-flow 4s linear infinite" }}
              />
              <path
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={0.55}
                strokeLinecap="round"
                strokeDasharray="5 5"
                style={{ animation: "rpg-path-flow 4s linear infinite" }}
              />
            </g>
          );
        })}
      </svg>

      {/* Hidden coins */}
      {MAP_COINS.filter((c) => !collectedCoins.has(c.id)).map((coin) => (
        <HiddenCoin
          key={coin.id}
          coin={coin}
          onCollect={() => onCollectCoin(coin.id)}
        />
      ))}

      {/* Location nodes */}
      {LOCATIONS.map((loc, i) => (
        <MapNode
          key={loc.id}
          loc={loc}
          isExplored={explored.has(loc.id)}
          isActive={activeId === loc.id}
          onClick={() => onSelect(loc.id)}
          index={i}
        />
      ))}

      {/* Ambient floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-gray-300/40 dark:bg-white/[0.06] pointer-events-none"
          style={{
            left: `${(i * 13 + 7) % 95}%`,
            top: `${(i * 17 + 12) % 90}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{
            duration: 5 + i * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
}

/* ━━━ Panel Content ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const cardCls =
  "bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.04] rounded-xl p-4";
const labelCls =
  "font-[family-name:var(--font-pixel)] text-[6px] text-gray-400 dark:text-white/20 tracking-widest";
const chipCls =
  "font-[family-name:var(--font-pixel)] text-[6px] sm:text-[7px] bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-white/35 px-2 py-0.5 rounded-md border border-gray-200/60 dark:border-white/[0.04]";

function AboutContent() {
  const stats = [
    { label: "CLASS", value: "Full-Stack Engineer" },
    { label: "REALM", value: "AI / Cloud / DevTools" },
    { label: "BASE", value: "Arizona State University" },
    { label: "STATUS", value: "Building & Exploring" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div key={s.label} className={cardCls}>
            <span className={`${labelCls} block mb-1`}>{s.label}</span>
            <span className="font-[family-name:var(--font-pixel)] text-[7px] sm:text-[8px] text-gray-800 dark:text-white/70">
              {s.value}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2.5 text-[13px] text-gray-600 dark:text-white/45 leading-relaxed">
        <p>
          Full-stack engineer and AI builder shipping practical products across
          web, mobile, cloud, and developer tooling.
        </p>
        <p>
          Previously at Shardings as a full-stack engineer. Now pursuing graduate
          work at Arizona State University in AI/ML and systems.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <a
          href="/Anirudh_Raghavendra_Makuluri_resume.pdf"
          download
          className="flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[7px] text-gray-500 dark:text-white/30 hover:text-amber-700 dark:hover:text-[#fcbc3c] transition-colors"
        >
          <HiDownload /> RESUME
        </a>
        <a
          href="https://www.linkedin.com/in/anirudh-makuluri/"
          target="_blank"
          className="flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[7px] text-gray-500 dark:text-white/30 hover:text-blue-600 transition-colors"
        >
          <BsLinkedin /> LINKEDIN
        </a>
        <a
          href="https://github.com/anirudh-makuluri"
          target="_blank"
          className="flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[7px] text-gray-500 dark:text-white/30 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <FaGithubSquare /> GITHUB
        </a>
      </div>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="space-y-3">
      <p className={labelCls}>
        {projectsData.length} BUILDS COMPLETED
      </p>
      {projectsData.map((p) => (
        <div key={p.title} className={cardCls}>
          <h3 className="font-[family-name:var(--font-pixel)] text-[8px] text-gray-800 dark:text-white/70 mb-1">
            {p.title.toUpperCase()}
          </h3>
          <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed mb-3">
            {p.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {p.tags.map((t) => (
              <span key={t} className={chipCls}>
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {p.projectLinks?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                className="font-[family-name:var(--font-pixel)] text-[7px] text-gray-500 dark:text-white/30 hover:text-gray-800 dark:hover:text-white/60 flex items-center gap-1 transition-colors"
              >
                {link.label === "GitHub" ? <FaGithub /> : <FaExternalLinkAlt className="text-[6px]" />}
                {link.label.toUpperCase()}
              </Link>
            ))}
            {!p.projectLinks?.length && p.githubLink && (
              <Link
                href={p.githubLink}
                target="_blank"
                className="font-[family-name:var(--font-pixel)] text-[7px] text-gray-500 dark:text-white/30 hover:text-gray-800 dark:hover:text-white/60 flex items-center gap-1 transition-colors"
              >
                <FaGithub /> CODE
              </Link>
            )}
            {p.liveLink && (
              <Link
                href={p.liveLink}
                target="_blank"
                className="font-[family-name:var(--font-pixel)] text-[7px] text-emerald-600 dark:text-[#30a050] hover:text-emerald-800 dark:hover:text-[#50c070] flex items-center gap-1 transition-colors"
              >
                <FaExternalLinkAlt className="text-[6px]" /> LIVE
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="space-y-0">
      {experiencesData.map((item, i) => (
        <div key={i} className="relative pl-7 pb-5 last:pb-0">
          <div
            className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
              i === 0
                ? "bg-amber-400 dark:bg-[#fcbc3c] border-amber-500 dark:border-[#c89c1c]"
                : "bg-gray-200 dark:bg-white/10 border-gray-300 dark:border-white/[0.08]"
            }`}
          />
          {i < experiencesData.length - 1 && (
            <div className="absolute left-[6px] top-5 bottom-0 w-px bg-gray-200 dark:bg-white/[0.05]" />
          )}
          <div className={cardCls}>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-[family-name:var(--font-pixel)] text-[8px] text-gray-800 dark:text-white/70">
                {item.title.toUpperCase()}
              </h3>
              {i === 0 && (
                <span className="font-[family-name:var(--font-pixel)] text-[5px] text-amber-600 dark:text-[#fcbc3c]/60 bg-amber-50 dark:bg-[#fcbc3c]/[0.08] border border-amber-200 dark:border-[#fcbc3c]/15 px-1.5 py-0.5 rounded-md">
                  ACTIVE
                </span>
              )}
            </div>
            <p className="font-[family-name:var(--font-pixel)] text-[6px] text-gray-400 dark:text-white/20 mb-2">
              {item.location} · {item.date}
            </p>
            <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsContent() {
  return (
    <div className="space-y-5">
      {Object.entries(categorizedSkills).map(([cat, skills]) => (
        <div key={cat}>
          <span className={`${labelCls} block mb-2`}>
            {cat.toUpperCase()} [{skills.length}]
          </span>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span key={s} className={chipCls}>
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AchievementsContent() {
  const data = [
    {
      icon: "🏆",
      title: "Hackathon Wins",
      desc: '2nd Google Track + 1st Auth0 AI Agents at Innovation Hacks 2.0, April 2026.',
      tag: "2 AWARDS",
    },
    {
      icon: "🚀",
      title: "Product Builder",
      desc: "Full-stack products across dev tools, AI workflows, and real-time apps.",
      tag: "SHIPPED",
    },
    {
      icon: "☁️",
      title: "AI + Cloud Depth",
      desc: "GenAI, Bedrock, Gemini, Docker, AWS, GCP — production systems.",
      tag: "CERTIFIED",
    },
    {
      icon: "🎓",
      title: "Open to the Right Team",
      desc: "Building first, open to strong engineering roles.",
      tag: "SELECTIVE",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {data.map((a) => (
        <div key={a.title} className={cardCls}>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-xl">{a.icon}</span>
            <div>
              <h3 className="font-[family-name:var(--font-pixel)] text-[7px] text-gray-800 dark:text-white/70">
                {a.title.toUpperCase()}
              </h3>
              <span className="font-[family-name:var(--font-pixel)] text-[5px] text-amber-600 dark:text-[#fcbc3c]/50">
                {a.tag}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed">
            {a.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

function CertificatesContent() {
  return (
    <div className="space-y-3">
      {certificatesData.map((cert) => (
        <Link
          key={cert.name}
          href={cert.link}
          target="_blank"
          className={`${cardCls} block hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors group`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-[#fcbc3c]/10 border border-amber-200 dark:border-[#fcbc3c]/15 flex items-center justify-center text-sm shrink-0">
              ⭐
            </div>
            <div className="min-w-0">
              <h3 className="font-[family-name:var(--font-pixel)] text-[7px] text-gray-800 dark:text-white/70 group-hover:text-amber-700 dark:group-hover:text-[#fcbc3c]/80 transition-colors truncate">
                {cert.name.toUpperCase()}
              </h3>
              <p className="font-[family-name:var(--font-pixel)] text-[5px] text-gray-400 dark:text-white/20">
                {cert.issuedBy} · {cert.date}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-white/35 mt-2 leading-relaxed">
            {cert.description}
          </p>
        </Link>
      ))}
    </div>
  );
}

function ContactSubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-10 rounded-xl bg-amber-500 dark:bg-[#fcbc3c]/20 border border-amber-600 dark:border-[#fcbc3c]/30 text-white dark:text-[#fcbc3c] font-[family-name:var(--font-pixel)] text-[8px] sm:text-[9px] hover:bg-amber-600 dark:hover:bg-[#fcbc3c]/30 disabled:opacity-50 transition-colors"
    >
      {pending ? "SENDING..." : "SEND MESSAGE"}
    </button>
  );
}

function ContactContent() {
  const inputCls =
    "w-full px-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-800 dark:text-white text-sm placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-amber-400 dark:focus:border-[#fcbc3c]/30 transition-colors";

  return (
    <div className="space-y-4">
      <p className="text-[13px] text-gray-500 dark:text-white/40">
        Send a message or reach out at{" "}
        <a
          href="mailto:anirudh.makuluri@gmail.com"
          className="text-amber-700 dark:text-[#fcbc3c]/70 underline underline-offset-4 hover:text-amber-900 dark:hover:text-[#fcbc3c] transition-colors"
        >
          anirudh.makuluri@gmail.com
        </a>
      </p>

      <form
        className="space-y-3"
        action={async (formData) => {
          const { error } = await sendEmail(formData);
          if (error) {
            toast.error(error);
            return;
          }
          toast.success("Message sent!");
        }}
      >
        <input
          type="text"
          name="botcheck"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />
        <input
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
          className={`${inputCls} h-10`}
        />
        <textarea
          name="message"
          required
          maxLength={5000}
          placeholder="Your message"
          className={`${inputCls} h-28 py-3 resize-none`}
        />
        <ContactSubmitBtn />
      </form>

      <div className="flex gap-4 pt-1">
        <a
          href="https://www.linkedin.com/in/anirudh-makuluri/"
          target="_blank"
          className="flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[7px] text-gray-500 dark:text-white/30 hover:text-blue-600 transition-colors"
        >
          <BsLinkedin /> LINKEDIN
        </a>
        <a
          href="https://github.com/anirudh-makuluri"
          target="_blank"
          className="flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[7px] text-gray-500 dark:text-white/30 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <FaGithubSquare /> GITHUB
        </a>
      </div>
    </div>
  );
}

function PanelContent({ locationId }: { locationId: string }) {
  switch (locationId) {
    case "home":
      return <AboutContent />;
    case "projects":
      return <ProjectsContent />;
    case "experience":
      return <ExperienceContent />;
    case "skills":
      return <SkillsContent />;
    case "achievements":
      return <AchievementsContent />;
    case "certificates":
      return <CertificatesContent />;
    case "contact":
      return <ContactContent />;
    default:
      return null;
  }
}

/* ━━━ Location Panel ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function LocationPanel({
  location,
  onClose,
}: {
  location: Loc;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-40 flex items-center justify-center p-3 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/35 backdrop-blur-[3px] dark:bg-black/60"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative flex max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border-[3px] border-neutral-900 bg-[#fffef6] dark:bg-[#1c1410]"
        style={{
          boxShadow:
            "8px 10px 0 rgba(0,0,0,0.32), inset 0 2px 0 rgba(255,255,255,0.45)",
        }}
        initial={{ scale: 0.88, y: 40, opacity: 0, rotateX: 12 }}
        animate={{ scale: 1, y: 0, opacity: 1, rotateX: 4 }}
        exit={{ scale: 0.9, y: 24, opacity: 0, rotateX: 8 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
      >
        <div
          className="flex items-center justify-between border-b-[3px] border-neutral-900 bg-[#ffe8a8] px-4 py-3 dark:bg-[#2d2218]"
          style={{
            boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl drop-shadow-[1px_2px_0_rgba(0,0,0,0.2)]">
              {location.icon}
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-pixel)] text-[10px] text-neutral-900 dark:text-[#fcbc3c]/95 sm:text-xs">
                {location.name}
              </h2>
              <p className="font-[family-name:var(--font-pixel)] text-[6px] text-neutral-700/80 dark:text-white/35">
                {location.subtitle.toUpperCase()}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-neutral-900 bg-[#ff6b6b] text-sm font-bold text-neutral-900 shadow-[2px_3px_0_#111] transition-transform hover:translate-y-px hover:shadow-[1px_2px_0_#111] active:translate-y-[2px] active:shadow-none dark:bg-[#c94c4c] dark:text-white"
            aria-label="Close panel"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[70vh] flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 sm:max-h-[640px]">
          <PanelContent locationId={location.id} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ━━━ Main Game ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function RpgGame() {
  const { triggerTransition } = useViewMode();
  const { addCoins } = useCoinCounter();

  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [explored, setExplored] = useState<Set<string>>(new Set());
  const [collectedCoins, setCollectedCoins] = useState<Set<string>>(new Set());
  const [discoveryBanner, setDiscoveryBanner] = useState<{
    name: string;
    icon: string;
  } | null>(null);

  const handleSelect = useCallback(
    (id: string) => {
      setActiveLocation(id);
      if (!explored.has(id)) {
        const loc = LOCATIONS.find((l) => l.id === id);
        setExplored((prev) => new Set(prev).add(id));
        addCoins(2);
        if (loc) {
          setDiscoveryBanner({ name: loc.name, icon: loc.icon });
          setTimeout(() => setDiscoveryBanner(null), 2000);
        }
      }
    },
    [explored, addCoins]
  );

  const handleCollectCoin = useCallback(
    (id: string) => {
      if (collectedCoins.has(id)) return;
      setCollectedCoins((prev) => new Set(prev).add(id));
      addCoins(3);
      toast("🪙 +3 coins!", {
        duration: 1200,
        style: {
          fontSize: "12px",
          background: "var(--toast-bg, #1a1a2e)",
          color: "var(--toast-fg, #fcbc3c)",
          border: "1px solid var(--toast-border, rgba(252,188,60,0.2))",
          borderRadius: "10px",
        },
      });
    },
    [collectedCoins, addCoins]
  );

  const handleClose = useCallback(() => setActiveLocation(null), []);
  const handleExit = useCallback(
    () => triggerTransition("simple"),
    [triggerTransition]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const activeLoc = activeLocation
    ? LOCATIONS.find((l) => l.id === activeLocation) ?? null
    : null;

  const allExplored = explored.size === LOCATIONS.length;

  return (
    <div className="fixed inset-0 z-[9997] flex select-none flex-col bg-gradient-to-b from-[#fef3dc] via-[#f5e6d0] to-[#e8d4bc] dark:from-[#1a0c0c] dark:via-[#120a14] dark:to-[#08060c]">
      <div className="rpg-film-grain absolute inset-0 z-[1]" aria-hidden />

      <div className="absolute inset-0 rpg-stars hidden dark:block pointer-events-none" />

      <div className="pointer-events-none absolute left-[12%] top-[8%] h-[32vh] w-[42vw] rounded-full bg-amber-200/50 blur-[90px] dark:hidden" />
      <div className="pointer-events-none absolute bottom-[8%] right-[10%] h-[28vh] w-[36vw] rounded-full bg-rose-200/35 blur-[80px] dark:hidden" />

      <div
        className="pointer-events-none absolute left-[10%] top-[6%] hidden h-[38vh] w-[48vw] rounded-full bg-[#4a1830]/35 blur-[120px] dark:block"
        style={{ animation: "rpg-nebula 30s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute bottom-[12%] right-[8%] hidden h-[30vh] w-[40vw] rounded-full bg-[#0a2048]/30 blur-[100px] dark:block"
        style={{ animation: "rpg-nebula 25s ease-in-out infinite reverse" }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] dark:bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.06)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />

      <GameHud
        explored={explored.size}
        total={LOCATIONS.length}
        onExit={handleExit}
      />

      <div className="relative z-[2] mt-[4.25rem] flex min-h-0 flex-1 flex-col px-2 pb-2 sm:px-4">
        <div className="cuphead-perspective relative mx-auto flex h-full min-h-[280px] w-full max-w-5xl flex-1 flex-col">
          <div
            className="pointer-events-none absolute inset-x-[6%] top-[10%] bottom-[8%] -rotate-[0.35deg] rounded-[2rem] border-[3px] border-neutral-900 bg-[#dcbfa2] shadow-[6px_8px_0_rgba(0,0,0,0.22)] dark:bg-[#2a1810] dark:shadow-[6px_8px_0_rgba(0,0,0,0.55)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-[4%] top-[6%] bottom-[12%] rotate-[0.25deg] rounded-[2rem] border-[3px] border-neutral-900 bg-[#f2e0c8] opacity-95 shadow-[8px_10px_0_rgba(0,0,0,0.18),inset_0_2px_0_rgba(255,255,255,0.5)] dark:bg-[#3d2618] dark:opacity-90 dark:shadow-[8px_10px_0_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]"
            aria-hidden
          />

          <div className="cuphead-map-tilt relative z-[1] mx-auto flex h-full min-h-[260px] w-[96%] flex-1 sm:w-[94%]">
            <WorldMap
              explored={explored}
              activeId={activeLocation}
              onSelect={handleSelect}
              collectedCoins={collectedCoins}
              onCollectCoin={handleCollectCoin}
            />

            <AnimatePresence>
              {activeLoc && (
                <LocationPanel location={activeLoc} onClose={handleClose} />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {discoveryBanner && (
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-10 z-50 -translate-x-1/2"
                  initial={{ opacity: 0, y: -16, scale: 0.88, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 2 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  <div className="rounded-2xl border-[3px] border-neutral-900 bg-[#fff6e4] px-6 py-3 text-center shadow-[5px_6px_0_#111] dark:bg-[#241a14] dark:shadow-[5px_6px_0_rgba(0,0,0,0.65)]">
                    <p className="font-[family-name:var(--font-pixel)] text-[7px] text-neutral-800 dark:text-[#fcbc3c]/90">
                      NEW STAGE
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-pixel)] text-[10px] text-neutral-900 dark:text-white/85">
                      {discoveryBanner.icon} {discoveryBanner.name}
                    </p>
                    <p className="mt-1.5 font-[family-name:var(--font-pixel)] text-[6px] text-emerald-700 dark:text-[#4ade80]">
                      +2 COINS
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="relative z-[2] py-2 text-center">
        <p className="font-[family-name:var(--font-pixel)] text-[6px] text-neutral-600/70 dark:text-white/25 sm:text-[7px]">
          {allExplored
            ? "ALL STAGES CLEAR — NICE RUN!"
            : `TAP A PLAQUE TO OPEN · SNAG COINS · ${explored.size} / ${LOCATIONS.length} CLEARED`}
        </p>
      </div>
    </div>
  );
}
