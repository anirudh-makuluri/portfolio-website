"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-2 left-1/2 h-[4.5rem] w-[calc(100%-0.75rem)] max-w-[22rem] -translate-x-1/2 rounded-[1.5rem] border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[44rem] sm:max-w-none sm:rounded-full dark:border-black/40 dark:bg-gray-950 dark:bg-opacity-75"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      <nav className="fixed top-[0.35rem] left-1/2 flex h-12 w-[calc(100%-0.75rem)] max-w-[22rem] -translate-x-1/2 items-center justify-center py-2 sm:top-[1.7rem] sm:h-[initial] sm:w-auto sm:max-w-none sm:py-0">
        <ul className="flex w-full flex-wrap items-center justify-center gap-x-1 gap-y-1 px-2 text-[0.78rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5 sm:px-0 sm:text-[0.9rem]">
          {links.map((link) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center rounded-full px-2 py-2 transition hover:text-gray-950 sm:px-3 sm:py-3 dark:text-gray-500 dark:hover:text-gray-300",
                  {
                    "text-gray-950 dark:text-gray-200":
                      activeSection === link.name,
                  }
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {link.name}

                {link.name === activeSection && (
                  <motion.span
                    className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
