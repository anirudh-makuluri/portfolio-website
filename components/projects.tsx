"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { useViewMode } from "@/context/view-mode-context";
import ProjectsRPG from "./rpg/projects-rpg";

export default function Projects() {
  const { viewMode } = useViewMode();
  if (viewMode === "rpg") return <ProjectsRPG />;
  return <ProjectsSimple />;
}

function ProjectsSimple() {
  const { ref } = useSectionInView("Projects", 0.5);
  const featuredProjects = projectsData.filter((project) =>
    ["SmartDeploy", "SD-Artifacts", "TravelMate", "Chatify"].includes(project.title)
  );
  const otherProjects = projectsData.filter(
    (project) =>
      !["SmartDeploy", "SD-Artifacts", "TravelMate", "Chatify"].includes(project.title)
  );

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 max-w-[54rem]">
      <SectionHeading>What I&apos;ve been building</SectionHeading>
      <p className="mx-auto mb-10 max-w-[42rem] text-center leading-7 text-gray-700 dark:text-white/75">
        The fastest way to understand my work is through the products themselves.
        Most of what I build sits somewhere between AI, infrastructure, and product engineering.
      </p>
      <div>
        {featuredProjects.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>

      <div className="mt-14">
        <h3 className="mb-4 text-center text-xl font-semibold text-gray-900 dark:text-white/90">
          Other things I&apos;ve built
        </h3>
        <p className="mx-auto mb-8 max-w-[38rem] text-center text-sm leading-6 text-gray-600 dark:text-white/65">
          A few more projects across real-time communication, analytics, design tooling, and mobile development.
        </p>
        <div>
          {otherProjects.map((project, index) => (
            <React.Fragment key={index}>
              <Project {...project} compact />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
