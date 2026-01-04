"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import profileImg from "@/public/bitmoji.png";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          {/* Rotating Gradient Ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(45deg, #78C1F3, #9BE8D8, #78C1F3)",
              padding: "3px",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full rounded-full bg-gray-50 dark:bg-gray-900" />
          </motion.div>

          {/* Outer Glow */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-50 blur-lg"
            style={{
              background: "radial-gradient(circle, rgba(120, 193, 243, 0.4) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="cursor-pointer relative z-10"
          >
            <Image
              src={profileImg}
              alt="Anirudh portrait"
              width="192"
              height="192"
              quality="95"
              priority={true}
              className="h-24 w-24 rounded-full object-cover shadow-xl border-4 border-gray-50 dark:border-gray-900"
            />
          </motion.div>

          {/* Waving Hand */}
          <motion.span
            className="absolute hidden bottom-0 right-0 text-4xl z-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
            whileHover={{
              rotate: [0, 15, -15, 15, 0],
              transition: { duration: 0.5 },
            }}
          >
            👋
          </motion.span>

          {/* Status Badge */}
          <motion.div
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 px-4 py-1.5 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs whitespace-nowrap font-semibold text-gray-700 dark:text-gray-200">Open to Work</span>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-4 px-4 text-xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="block mb-2">
          Hello, I'm{" "}
          <TypeAnimation
            sequence={[
              'Anirudh Raghavendra Makuluri',
              2000,
              'a Full-Stack Developer',
              2000,
              'an AI/ML Engineer',
              2000,
              'a Problem Solver',
              2000,
            ]}
            wrapper="span"
            speed={50}
            className="bg-gradient-to-r from-[#78C1F3] to-[#9BE8D8] bg-clip-text text-transparent font-bold"
            repeat={Infinity}
          />
        </span>
        <span className="block text-lg sm:text-2xl text-gray-700 dark:text-gray-300 font-normal mt-4">
          Specializing in React, Next.js, React Native, Gen AI and Machine Learning
        </span>
        <span className="block text-base sm:text-lg text-gray-600 dark:text-gray-400 font-normal mt-3">
          Indian Citizen | F-1 Visa | Eligible for OPT & STEM OPT (36 months work authorization in USA)
        </span>
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition hover:shadow-xl"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here{" "}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition" />
        </Link>

        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          href="/Anirudh_Raghavendra_Makuluri__Resume.pdf"
          download
        >
          Download CV{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition-all cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60 hover:text-[#0077b5] dark:hover:text-[#0077b5] hover:shadow-lg"
          href="https://www.linkedin.com/in/anirudh-makuluri/"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition-all cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60 hover:text-gray-950 dark:hover:text-white hover:shadow-lg"
          href="https://github.com/anirudh-makuluri"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
