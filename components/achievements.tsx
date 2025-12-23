"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { FaTrophy, FaCode, FaGraduationCap, FaStar } from "react-icons/fa";

const achievementsData = [
  {
    icon: FaGraduationCap,
    title: "M.S. Computer Science",
    description: "Pursuing Master's at Arizona State University with focus on AI/ML",
    highlight: "Current"
  },
  {
    icon: FaCode,
    title: "Full-Stack Development",
    description: "Built production-ready applications with 1+ year of professional experience",
    highlight: "Professional"
  },
  {
    icon: FaStar,
    title: "Multiple Certifications",
    description: "Oracle Gen AI Professional, Machine Learning Specialization, Cloud Certified",
    highlight: "Certified"
  },
  {
    icon: FaTrophy,
    title: "Published Projects",
    description: "Created and deployed multiple full-stack applications serving real users",
    highlight: "Live Projects"
  }
];

export default function Achievements() {
  const { ref } = useSectionInView("About", 0.5);

  return (
    <section 
      ref={ref} 
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>Highlights</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievementsData.map((achievement, index) => (
          <motion.div
            key={index}
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
            className="bg-white dark:bg-white/10 rounded-lg p-6 shadow-lg transition-transform border border-black/5 dark:border-white/10 cursor-default"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-blue-500 dark:bg-blue-600 p-3 rounded-full text-white">
                <achievement.icon className="text-xl" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-semibold text-lg">{achievement.title}</h3>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                  {achievement.highlight}
                </span>
              </div>
            </div>
            <p className="text-gray-700 dark:text-white/70 text-sm text-left">
              {achievement.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

