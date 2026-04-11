"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiEye } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import profileImg from "@/public/linkedin_pfp.jpg";

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
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
            whileHover={{ scale: 1.02 }}
            className="relative z-10 rounded-full border border-black/10 bg-white p-1.5 shadow-lg dark:border-white/10 dark:bg-white/5"
          >
            <Image
              src={profileImg}
              alt="Anirudh portrait"
              width={192}
              height={192}
              quality={95}
              priority
              className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
            />
          </motion.div>
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-4 px-4 text-xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="mb-2 block">
          Hello, I&apos;m{" "}
          <TypeAnimation
            sequence={[
              "Anirudh Makuluri",
              2000,
              "a Full-Stack Developer",
              2000,
              "an AI/ML Engineer",
              2000,
              "a DevOps Engineer",
              2000,
              "a Problem Solver",
              2000,
            ]}
            wrapper="span"
            speed={50}
            className="bg-gradient-to-r from-[#78C1F3] to-[#9BE8D8] bg-clip-text font-bold text-transparent"
            repeat={Infinity}
          />
        </span>
        <span className="mt-4 block text-lg font-normal text-gray-700 dark:text-gray-300 sm:text-2xl">
          I build full-stack products, AI systems, and developer tools with React, Next.js, React Native, and cloud infrastructure.
        </span>
        <span className="mt-3 block text-base font-normal text-gray-600 dark:text-gray-400 sm:text-lg">
          Currently building products like SmartDeploy and SD-Artifacts while exploring opportunities on the side.
        </span>
      </motion.h1>

      <motion.div
        className="flex flex-col items-center justify-center gap-2 px-4 text-lg font-medium sm:flex-row"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="#contact"
          className="group flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-white outline-none transition hover:scale-110 hover:bg-gray-950 hover:shadow-xl focus:scale-110 active:scale-105"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Get in touch{" "}
          <BsArrowRight className="opacity-70 transition group-hover:translate-x-1 group-hover:opacity-100" />
        </Link>

        <a
          className="group flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3 outline-none transition dark:bg-white/10 borderBlack hover:scale-110"
          href="/Anirudh_Raghavendra_Makuluri_resume.pdf"
			target="_blank"
			rel="noreferrer"
        >
          View CV{" "}
          <HiEye className="opacity-60 transition group-hover:scale-110" />
        </a>

        <a
          className="flex items-center gap-2 rounded-full bg-white p-4 text-gray-700 transition-all focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60 borderBlack hover:scale-[1.15] hover:text-[#0077b5] hover:shadow-lg dark:hover:text-[#0077b5]"
          href="https://www.linkedin.com/in/anirudh-makuluri/"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="flex items-center gap-2 rounded-full bg-white p-4 text-[1.35rem] text-gray-700 transition-all focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60 borderBlack hover:scale-[1.15] hover:text-gray-950 hover:shadow-lg dark:hover:text-white"
          href="https://github.com/anirudh-makuluri"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
