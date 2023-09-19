import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import lexiguessImg from "@/public/lexiguess.png";
import shardingsImg from "@/public/shardings.png"

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Certificates",
    hash: '#certificates'
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
    {
        title: "Software Engineeer Intern",
        location: "",
        description:
        "I worked as a Software Engineer Intern for Shardings. I developed a Google Calendar Workspace Add-on , payment system integration and UI enhancements. ",
        icon: React.createElement(CgWorkAlt),
        date: "July 2021 - Dec 2021",
    },
    {
        title: "Graduated B.Tech",
        location: "Hyderabad, India",
        description:
        "I graduated from BITS Pilani with a major in Electronics & Instrumentation in 2022",
        icon: React.createElement(LuGraduationCap),
        date: "2022",
    },
    {
        title: "Software Engineer",
        location: "",
        description:
        "I worked as a software engineer for Shardings for 1 year. I was responsible for maintaining both the front end and back end. ",
        icon: React.createElement(CgWorkAlt),
        date: "June 2022 - August 2023",
    }
] as const;

export const projectsData = [
  {
    title: "Shardings Meet",
    description:
      "I worked as a full-stack developer on this startup project for 1 year. Shardings-Meet offers customizable virtual environments for diverse virtual experiences.",
    tags: ["React", "React Native", "Node.js", "Firebase", , "WebRTC", "Google Cloud Platform"],
    imageUrl: shardingsImg,
    link: "https://shardings.com/"
  },
  {
    title: "LexiGuess",
    description:
      "LexiGuess is an engaging word-guessing website with three game modes and customizable word settings. It offers educational word meanings in \"Hard Word\" mode.",
    tags: ["React", "Next.js", "Redis", "Tailwind CSS"],
    imageUrl: lexiguessImg,
    link: "https://lexiguess.vercel.app/"
  },
  {
    title: "E- Commerce app",
    description:
      "In my third year, I designed and developed a feature-rich e-commerce Android app using Java, showcasing strong object-oriented programming skills. I created an intuitive UI, implemented secure user authentication, and collaborated effectively with a team for planning, and development.",
    tags: ["Java", "Android Development", "Firebase"],
    imageUrl: "",
    link: "https://github.com/Arm8tron/ecommerce"
  }
] as const;

export const skillsData = [
  "React.js",
  "Node.js",
  "JavaScript",
  "TypeScript",
  "React Native",
  "Redux",
  "Next.js",
  "Tailwind CSS",
  "Firebase",
  "Redis",
  "Google Cloud Platform",
  "Oracle Cloud Infrastructure",
  "Socket.IO",
  "WebRTC",
  "C#",
  "Java",
  "CodePush",
  "Firebase Cloud Messaging",
  "Fastlane",
  "Framer Motion"
] as const;

export const certificatesData = [
    {
        name: "Oracle Certified Foundations Associate",
        issuedBy: "Oracle",
        date: "September 2023",
        link: "/oracle-foundations-associate-cert.pdf",
        badge: "https://media.licdn.com/dms/image/D4E0BAQHYCgYovUuPtQ/company-logo_100_100/0/1665755678671?e=1703116800&v=beta&t=dWMLQH8xokgNoP5kaiP9uKPrIBTl1xKveg1Sd31QzTE",
        description: "Obtaining this certificate significantly improved my proficiency in cloud infrastructure. The course covered essential topics including Identity and Access Management (IAM), Networking, Computing, Storage, Databases, Security, Governance, and Administration."
    },
    {
        name: "Foundational C# with Microsoft",
        issuedBy: "freeCodeCamp",
        date: "September 2023",
        link: "https://www.freecodecamp.org/certification/Anirudh_Makuluri/foundational-c-sharp-with-microsoft",
        badge: "https://media.licdn.com/dms/image/C4E0BAQGLKj3JHcof0w/company-logo_100_100/0/1589990867649?e=1703116800&v=beta&t=qFV6iyyiaAVNhK1Lv1xvoABy3TDiHbnQ0NF5vRqBwuQ",
        description: "This certificate was a fantastic introduction to the world of C#. I learned how to create my first C# app, code simple applications, create methods, add logic, work with variable data, and even debug C# apps. It laid a strong foundation for my C# journey."
    }
] as const;
