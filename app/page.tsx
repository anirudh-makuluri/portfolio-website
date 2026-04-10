import { cacheLife, cacheTag } from "next/cache";
import Achievements from "@/components/achievements";
import About from "@/components/about";
import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";

export default async function Home() {
  "use cache";
  cacheLife("max");
  cacheTag("portfolio");

  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <Achievements />
      <Projects />
      <About />
      <Experience />
      <Skills />
      <Certificates />
      <Contact />
    </main>
  );
}
