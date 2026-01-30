import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap, LuBook } from "react-icons/lu";
import lexiguessImg from "@/public/lexiguess.png";
import shardingsImg from "@/public/shardings.png";
import codecraftImg from "@/public/codecraft.png";
import smartdeployImg from "@/public/smartdeploy.png"
import chatifyImg from "@/public/chatify.png"

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
		title: "M.S Computer Science",
		location: "Tempe, USA",
		description: "Pursuing my Masters in Computer Science at Arizona State University",
		icon: React.createElement(LuBook),
		date: "August 2024 - Present"
	},
	{
		title: "Software Engineer",
		location: "Shardings",
		description:
			"I worked as a software engineer for Shardings for 1 year. I was responsible for maintaining both the front end and back end.",
		icon: React.createElement(CgWorkAlt),
		date: "June 2022 - August 2023",
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
		title: "Software Engineer Intern",
		location: "Shardings",
		description:
			"I worked as a Software Engineer Intern for Shardings. I developed a Google Calendar Workspace Add-on, payment system integration and UI enhancements.",
		icon: React.createElement(CgWorkAlt),
		date: "July 2021 - Dec 2021",
	}
] as const;

export const projectsData = [
	{
		title: "SmartDeploy",
		description: "Lightweight DevOps automation platform that connects your GitHub repo, auto-analyzes your stack with AI, and deploys to AWS services or Google Cloud Run in just a few clicks.",
		tags: ["LLM", "Next.js", "Tailwind CSS", "Firebase", "AWS", "Google Cloud Platform", "Docker"],
		imageUrl: smartdeployImg,
		githubLink: "https://github.com/anirudh-makuluri/smart-deploy/",
		liveLink: "https://smart-deploy.anirudh-makuluri.xyz/"
	},
	{
		title: "Shardings Meet",
		description:
			"I worked as a full-stack developer on this startup project for 1 year. Shardings-Meet offers customizable virtual environments for diverse virtual experiences.",
		tags: ["React", "React Native", "Node.js", "Firebase", "WebRTC", "Google Cloud Platform"],
		imageUrl: shardingsImg,
		githubLink: null,
		liveLink: "https://shardings.com/"
	},
	{
		title: "LexiGuess",
		description:
			"LexiGuess is an engaging word-guessing website with three game modes and customizable word settings. It offers educational word meanings in \"Hard Word\" mode.",
		tags: ["Next.js", "Tailwind CSS"],
		imageUrl: lexiguessImg,
		githubLink: "https://github.com/anirudh-makuluri/lexiguess",
		liveLink: "https://lexiguess.vercel.app/"
	},
	{
		title: "CodeCraft",
		description: "Real-time web design platform allowing direct HTML, CSS, and JS editing. Features seamless Shadcn and Tailwind CSS integration for responsive interfaces. Utilizes JWT for user authentication.",
		tags: ["Next.js", ".Net", "MSSQL"],
		imageUrl: codecraftImg,
		githubLink: "https://github.com/anirudh-makuluri/code-craft/",
		liveLink: null
	},
	{
		title: "Chatify",
		description: "Chatify is a real-time chat application featuring one-to-one and group messaging, voice and video calls, Google OAuth secure authentication, and responsive design.",
		tags: ["Next.js", "React", "Node.js", "Firebase", "Socket.io", "WebRTC"],
		imageUrl: chatifyImg,
		githubLink: "https://github.com/anirudh-makuluri/chatify-next",
		liveLink: "https://chatify-a.vercel.app/"
	},
	{
		title: "E-Commerce App",
		description: "Feature-rich e-commerce Android app using Java, showcasing strong object-oriented programming skills. Created an intuitive UI, implemented secure user authentication, and collaborated effectively with a team for planning and development.",
		tags: ["Java", "Android Development", "Firebase"],
		imageUrl: null,
		githubLink: "https://github.com/anirudh-makuluri/ecommerce",
		liveLink: null
	},
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
	"MSSQL",
	".Net",
	"Google Cloud Platform",
	"Oracle Cloud Infrastructure",
	"Socket.IO",
	"WebRTC",
	"C#",
	"Java",
	"CodePush",
	"Firebase Cloud Messaging",
	"Fastlane",
	"Framer Motion",
	"Gen AI",
	"Langchain",
	"Tensorflow",
	"Scikit-Learn",
	"XGBoost"
] as const;

export const categorizedSkills = {
	"Frontend": ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux", "Framer Motion"],
	"Mobile": ["React Native", "CodePush", "Firebase Cloud Messaging", "Fastlane"],
	"Backend": ["Node.js", ".Net", "C#", "Java", "Socket.IO", "WebRTC"],
	"Database & Cloud": ["Firebase", "MSSQL", "Google Cloud Platform", "Oracle Cloud Infrastructure"],
	"AI & Machine Learning": ["Gen AI", "Langchain", "Tensorflow", "Scikit-Learn", "XGBoost"]
} as const;

export const certificatesData = [
	{
		name: "Oracle Certified Generative AI Professional",
		issuedBy: "Oracle",
		date: "August 2025",
		link: "/oracle_gen_ai_professional.pdf",
		badge: "/oracle_logo.jpeg",
		description: "Obtaining this certificate significantly improved my knowledge in generative AI. The course covered advanced knowledge in generative AI technologies including LLMs, RAG, and Langchain frameworks."
	},
	{
		name: "Machine Learning Specialization",
		issuedBy: "DeepLearning.AI, Coursera, Stanford",
		date: "May 2024",
		link: "https://coursera.org/verify/specialization/KBBR5JA7LM6S",
		badge: "/ml_logo.jpeg",
		description: "This course introduced me to modern machine learning concepts including supervised learning, unsupervised learning, recommender systems and reinforcement learning. "
	},
	{
		name: "Oracle Certified Foundations Associate",
		issuedBy: "Oracle",
		date: "September 2023",
		link: "/oracle-foundations-associate-cert.pdf",
		badge: "/oracle_logo.jpeg",
		description: "Obtaining this certificate significantly improved my proficiency in cloud infrastructure. The course covered essential topics including Identity and Access Management (IAM), Networking, Computing, Storage, Databases, Security, Governance, and Administration."
	},
	{
		name: "Foundational C# with Microsoft",
		issuedBy: "freeCodeCamp",
		date: "September 2023",
		link: "https://www.freecodecamp.org/certification/Anirudh_Makuluri/foundational-c-sharp-with-microsoft",
		badge: "/free_code_camp_logo.jpeg",
		description: "This certificate was a fantastic introduction to the world of C#. I learned how to create my first C# app, code simple applications, create methods, add logic, work with variable data, and even debug C# apps. It laid a strong foundation for my C# journey."
	}
] as const;
