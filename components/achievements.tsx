"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCode, FaGraduationCap, FaStar, FaTrophy } from "react-icons/fa";
import SectionHeading from "./section-heading";

type AchievementLink = {
  label: string;
  href: string;
};

type AchievementEntry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlight: string;
  links?: AchievementLink[];
};

const achievementsData: AchievementEntry[] = [
  {
    icon: FaTrophy,
    title: "Hackathon Wins",
    description:
      "Won 2nd Place in the Google Track, \"Build With AI: The Agentic Frontier,\" and 1st Place for Best Use of Auth0 AI Agents at Innovation Hacks 2.0 in April 2026. Built the frontend for TravelMate, an AI travel planner recognized among 300+ participants.",
    highlight: "2 Awards",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/anirudh-makuluri/travelMate"
      },
      {
        label: "Devpost",
        href: "https://devpost.com/software/travelmate-gvs09r"
      }
    ]
  },
  {
    icon: FaCode,
    title: "Product Builder",
    description: "Building and shipping full-stack products across developer tools, AI workflows, and real-time apps",
    highlight: "Shipped"
  },
  {
    icon: FaStar,
    title: "AI + Cloud Depth",
    description: "Hands-on experience across GenAI, Bedrock, Gemini, Docker, AWS, GCP, and production-oriented systems",
    highlight: "Certified"
  },
  {
    icon: FaGraduationCap,
    title: "Open to the Right Team",
    description: "Focused primarily on building, while staying open to strong engineering roles where I can contribute fast",
    highlight: "Selective"
  }
];

export default function Achievements() {
  return (
    <section className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40">
      <SectionHeading>Highlights</SectionHeading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {achievementsData.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.2 }
            }}
            className="cursor-default rounded-lg border border-black/5 bg-white p-6 shadow-lg transition-transform dark:border-white/10 dark:bg-white/10"
          >
            <div className="mb-3 flex items-center gap-4">
              <div className="rounded-full bg-blue-500 p-3 text-white dark:bg-blue-600">
                <achievement.icon className="text-xl" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold">{achievement.title}</h3>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                  {achievement.highlight}
                </span>
              </div>
            </div>
            <p className="text-left text-sm text-gray-700 dark:text-white/70">
              {achievement.description}
            </p>
            {achievement.links?.length ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {achievement.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    className={`rounded-full px-4 py-2 text-sm transition hover:scale-105 ${
                      link.label === "GitHub"
                        ? "bg-gray-900 text-white dark:bg-white/10"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
