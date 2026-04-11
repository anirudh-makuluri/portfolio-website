"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BsArrowRight, BsGithub, BsLinkedin } from "react-icons/bs";
import Achievements from "@/components/achievements";
import About from "@/components/about";
import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import { useSiteMode } from "@/context/site-mode-context";

const minimalHighlights = [
  {
    title: "Flagship projects",
    value: "SmartDeploy + SD-Artifacts",
    description:
      "AI-assisted deployment tooling, repo analysis, and production-ready infrastructure generation.",
  },
  {
    title: "Recent Achievements",
    value: "2 hackathon awards",
    description:
      "Recognized at Innovation Hacks 2.0 for AI product execution and agent-driven workflows.",
  },
  {
    title: "Building now",
    value: "what-if-million-users",
    description:
      "A scale-focused backend systems series exploring caching, async processing, observability, and fault-tolerant design from day one.",
  },
  {
    title: "Current focus",
    value: "M.S. Computer Science at ASU",
    description:
      "Graduate work at Arizona State University alongside independent product building.",
  },
  {
    title: "Experience",
    value: "Ex-founding engineer at Shardings with 2 years of experience",
    description:
      "Built early product surfaces across web and mobile in a startup environment, shipping full-stack features fast.",
  },
];

export default function HomePage() {
  const { isMinimalMode, showFullSite } = useSiteMode();

  useEffect(() => {
    const shouldLockScroll =
      isMinimalMode &&
      window.innerWidth >= 640 &&
      window.innerHeight >= 760;

    document.body.style.overflow = shouldLockScroll ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMinimalMode]);

  if (isMinimalMode) {
    return (
      <main className="flex min-h-dvh items-start justify-center overflow-y-auto px-3 py-3 sm:px-6 sm:py-6 md:items-center md:overflow-hidden md:px-8 md:py-8">
        <section className="flex w-full max-w-5xl flex-col rounded-[1.75rem] border border-black/10 bg-white/88 px-4 py-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-gray-950/78 md:max-h-[calc(100dvh-4rem)] md:overflow-hidden md:rounded-[2rem] md:px-8 md:py-8 lg:p-10">
          <div className="grid flex-1 gap-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] md:items-start md:gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(25rem,0.85fr)] lg:items-center lg:gap-8">
            <div className="flex h-full flex-col justify-center md:pt-2 lg:max-w-[35rem]">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400 sm:text-sm">
                Anirudh Makuluri
              </p>
              <h1 className="mt-3 max-w-2xl text-[1.65rem] font-semibold leading-[1.03] text-gray-950 dark:text-gray-50 min-[390px]:text-[1.8rem] sm:mt-4 sm:text-[2.2rem] lg:text-5xl sm:leading-[1.02] lg:leading-tight">
                Full-stack engineer building AI products, developer tools, and cloud systems.
              </h1>
              <p className="mt-3 hidden max-w-xl text-sm leading-6 text-gray-600 dark:text-gray-300 min-[390px]:block sm:mt-4 sm:block sm:text-base sm:leading-7">
                I like turning complex technical workflows into products that feel clear, fast, and useful.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-[0.8rem] text-gray-600 dark:text-gray-300 sm:mt-6 sm:gap-3 sm:text-sm">
                <a
                  href="https://github.com/anirudh-makuluri"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 transition hover:border-black/20 hover:text-gray-950 dark:border-white/10 dark:hover:border-white/20 dark:hover:text-white"
                >
                  <BsGithub />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/anirudh-makuluri/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 transition hover:border-black/20 hover:text-gray-950 dark:border-white/10 dark:hover:border-white/20 dark:hover:text-white"
                >
                  <BsLinkedin />
                  LinkedIn
                </a>
                <a
                  href="/Anirudh_Raghavendra_Makuluri_resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 transition hover:border-black/20 hover:text-gray-950 dark:border-white/10 dark:hover:border-white/20 dark:hover:text-white"
                >
                  Resume
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:self-start lg:self-center">
              {minimalHighlights.map((highlight, index) => (
                <article
                  key={`${highlight.title}-${highlight.value}`}
                  className={`rounded-2xl border border-black/10 bg-gray-50/90 p-3 dark:border-white/10 dark:bg-white/5 sm:rounded-3xl md:min-h-[7.5rem] md:p-3.5 lg:p-4 ${
                    index === minimalHighlights.length - 1 ? "col-span-2" : ""
                  }`}
                >
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 sm:text-xs sm:tracking-[0.2em]">
                    {highlight.title}
                  </p>
                  <h2 className="mt-1.5 text-[0.95rem] font-semibold leading-5 text-gray-950 dark:text-gray-50 sm:mt-2 sm:text-base lg:text-lg">
                    {highlight.value}
                  </h2>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-black/10 pt-4 dark:border-white/10 sm:mt-6 md:mt-5 md:flex-row md:items-center md:justify-between md:pt-5 lg:mt-8 lg:pt-6">
            <p className="hidden text-xs leading-5 text-gray-500 dark:text-gray-400 md:block md:text-sm">
              Open the full site for projects, story, experience, and contact.
            </p>
            <button
              type="button"
              onClick={() => {
                showFullSite();
                window.requestAnimationFrame(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                });
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-black md:w-auto dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
            >
              Know more
              <BsArrowRight />
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center px-4 pt-28 sm:pt-36">
      <Intro />
      <SectionDivider />
      <Achievements />
      <Projects />
      <About />
      <Experience />
      <Skills />
      <Certificates />
      <Contact />
      <div className="mb-10 mt-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="#home" className="underline decoration-black/20 underline-offset-4 dark:decoration-white/20">
          Back to top
        </Link>
      </div>
    </main>
  );
}
