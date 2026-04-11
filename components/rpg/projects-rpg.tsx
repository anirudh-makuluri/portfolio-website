"use client";

import React from "react";
import { projectsData } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import type { ProjectLink } from "@/lib/data";

const FEATURED = ["SmartDeploy", "SD-Artifacts", "TravelMate", "Chatify"];

function WorldCard({
  title,
  description,
  tags,
  githubLink,
  liveLink,
  projectLinks,
  worldNum,
  isStar,
  index,
}: (typeof projectsData)[number] & { worldNum: string; isStar: boolean; index: number }) {
  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, type: "spring", damping: 20 }}
    >
      <div
        className={`rpg-card !rounded-xl p-5 sm:p-7 ${
          isStar ? "!border-[#fcbc3c]/15 hover:!border-[#fcbc3c]/30" : ""
        }`}
      >
        {/* Header badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="font-[family-name:var(--font-pixel)] text-[7px] text-[#fcbc3c]/60 bg-[#fcbc3c]/[0.06] border border-[#fcbc3c]/10 px-2.5 py-1 rounded-md">
            WORLD {worldNum}
          </span>
          {isStar && (
            <span className="font-[family-name:var(--font-pixel)] text-[7px] text-[#fcbc3c]/70 flex items-center gap-1">
              ★ STAR
            </span>
          )}
          <span className="font-[family-name:var(--font-pixel)] text-[6px] text-[#30a050]/70">
            CLEAR ✓
          </span>
        </div>

        {/* Title & description */}
        <h3 className="font-[family-name:var(--font-pixel)] text-[10px] sm:text-xs text-white/90 mb-2">
          {title.toUpperCase()}
        </h3>
        <p className="text-sm text-white/45 leading-relaxed mb-5">
          {description}
        </p>

        {/* Tags */}
        <div className="mb-5">
          <span className="font-[family-name:var(--font-pixel)] text-[6px] text-white/20 mb-2 block tracking-widest">
            ITEMS
          </span>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-[family-name:var(--font-pixel)] text-[6px] sm:text-[7px] bg-white/[0.04] border border-white/[0.06] text-white/40 px-2.5 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2">
          {projectLinks?.length
            ? projectLinks.map((link: ProjectLink) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  className="font-[family-name:var(--font-pixel)] text-[7px] flex items-center gap-2 rpg-card !rounded-md px-4 py-2 text-white/50 hover:text-white/80"
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.label === "GitHub" ? (
                    <FaGithub />
                  ) : (
                    <FaExternalLinkAlt className="text-[7px]" />
                  )}
                  {link.label.toUpperCase()}
                </Link>
              ))
            : githubLink && (
                <Link
                  href={githubLink}
                  target="_blank"
                  className="font-[family-name:var(--font-pixel)] text-[7px] flex items-center gap-2 rpg-card !rounded-md px-4 py-2 text-white/50 hover:text-white/80"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub /> CODE
                </Link>
              )}
          {liveLink && (
            <Link
              href={liveLink}
              target="_blank"
              className="font-[family-name:var(--font-pixel)] text-[7px] flex items-center gap-2 rpg-card !rounded-md !border-[#30a050]/20 hover:!border-[#30a050]/40 px-4 py-2 text-[#30a050]/70 hover:text-[#30a050]"
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt className="text-[7px]" /> PLAY
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsRPG() {
  const { ref } = useSectionInView("Projects", 0.3);
  const featured = projectsData.filter((p) => FEATURED.includes(p.title));
  const others = projectsData.filter((p) => !FEATURED.includes(p.title));

  let worldCounter = 0;

  return (
    <section ref={ref} id="projects" className="py-16 sm:py-24 w-full">
      <div className="max-w-[54rem] mx-auto px-4">
        <motion.h2
          className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-[#fcbc3c] rpg-glow-gold mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          WORLD SELECT
        </motion.h2>
        <motion.p
          className="font-[family-name:var(--font-pixel)] text-[7px] text-white/20 text-center mb-12 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {projectsData.length} WORLDS CLEARED
        </motion.p>

        <div>
          {featured.map((project, i) => {
            worldCounter++;
            return (
              <WorldCard
                key={project.title}
                {...project}
                worldNum={`1-${worldCounter}`}
                isStar={
                  project.title === "SmartDeploy" ||
                  project.title === "SD-Artifacts"
                }
                index={i}
              />
            );
          })}
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-[family-name:var(--font-pixel)] text-[8px] sm:text-[9px] text-white/30 text-center mb-8 tracking-widest">
            BONUS WORLDS
          </h3>
          <div>
            {others.map((project, i) => {
              worldCounter++;
              return (
                <WorldCard
                  key={project.title}
                  {...project}
                  worldNum={`2-${worldCounter - featured.length}`}
                  isStar={false}
                  index={i}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
