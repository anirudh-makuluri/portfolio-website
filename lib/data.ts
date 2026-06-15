import React from "react";
import type { StaticImageData } from "next/image";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap, LuBook } from "react-icons/lu";
import lexiguessImg from "@/public/lexiguess.png";
import shardingsImg from "@/public/shardings.png";
import codecraftImg from "@/public/codecraft.png";
import smartdeployImg from "@/public/smartdeploy.png"
import chatifyImg from "@/public/chatify.png"
import accioImg from "@/public/accio.png"

export type ProjectLink = {
	label: string;
	href: string;
};

export type ProjectEntry = {
	title: string;
	description: string;
	tags: readonly string[];
	imageUrl: StaticImageData | null;
	githubLink: string | null;
	liveLink: string | null;
	projectLinks?: readonly ProjectLink[];
};

export const links = [
	{
		name: "Home",
		hash: "#home",
	},
	{
		name: "Projects",
		hash: "#projects",
	},
	{
		name: "About",
		hash: "#about",
	},
	{
		name: "Experience",
		hash: "#experience",
	},
	{
		name: "Skills",
		hash: "#skills",
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
		description: "Graduate studies at Arizona State University focused on AI/ML, systems thinking, and applied engineering.",
		icon: React.createElement(LuBook),
		date: "August 2024 - May 2026"
	},
	{
		title: "Software Engineer",
		location: "Shardings",
		description:
			"Built and maintained full-stack web and mobile product surfaces, working across frontend, backend, and real-time features in a fast-moving startup environment.",
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
			"Built product features including a Google Calendar Workspace add-on, payment integrations, and UI improvements that shipped to users.",
		icon: React.createElement(CgWorkAlt),
		date: "July 2021 - Dec 2021",
	}
] as const;

export type WorkEntry = {
	role: string;
	company: string;
	period: string;
	location: string;
	summary: string;
	highlights: readonly string[];
	stack: readonly string[];
};

export const workExperienceData: readonly WorkEntry[] = [
	{
		role: "Software Engineer",
		company: "Shardings",
		period: "Jun 2022 — Aug 2023",
		location: "Remote · India",
		summary:
			"Built and scaled production collaboration features across web, mobile, backend, and cloud infrastructure for a 12K+ user platform.",
		highlights: [
			"Co-led platform scaling from VM-based deployments to GKE, improving reliability for web, backend, and real-time media services",
			"Owned Node.js APIs and WebSocket systems powering meetings, messaging, session sync, payments, and live collaboration workflows",
			"Shipped AI meeting summaries, CDN performance improvements, and mobile/web release workflows that improved product reliability and user experience",
		],
		stack: ["React", "React Native", "Node.js", "Firebase", "GCP", "GKE", "WebRTC", "Socket.IO"],
	},
	{
		role: "Software Engineer · Intern",
		company: "Shardings",
		period: "Jul 2021 — Dec 2021",
		location: "Remote · India",
		summary:
			"First production codebase. Picked features, shipped them, and watched real users use them.",
		highlights: [
			"Built a Google Calendar Workspace add-on used inside the product",
			"Integrated payments and improved core UI flows that made it into the next release",
		],
		stack: ["JavaScript", "Node.js", "Google Workspace APIs", "Firebase"],
	},
] as const;

export type EducationEntry = {
	degree: string;
	school: string;
	period: string;
	location: string;
	summary: string;
	focus: readonly string[];
};

export type RecommendationEntry = {
	name: string;
	role: string;
	relation: string;
	avatar: string;
	quote: string;
	link?: string;
};

export const recommendationsData: readonly RecommendationEntry[] = [
	{
		name: "Devesh Mittal",
		role: "Founder & CEO @ Shardings",
		relation: "Managed Anirudh directly at Shardings",
		avatar: "/mittal.jpg",
		quote:
			"Anirudh was a core member of the Shardings Meet team and consistently took ownership across multiple areas, from engineering the video player to building the Android and iOS applications. He is a versatile engineer with strong technical skills and the ability to work effectively across platforms. I would highly recommend Anirudh for any software engineering role.",
	},
	{
		name: "Gaurav Yadav",
		role: "Software Engineer @ Shardings",
		relation: "Gaurav worked with Anirudh on the same team",
		avatar: "/gaurav.jpg",
		quote: 
			"I worked closely with Anirudh at Shardings on the web side of Shardings Meet, and he was one of the easiest engineers to collaborate with. We worked through backend changes, deployment issues, and last-minute production bugs together, and he always brought a calm, practical mindset to the problem. " + 
			"What I appreciated most was that Anirudh never treated issues as “someone else’s area.” He would jump in, trace problems end to end, and help get things moving again. He was technically strong, reliable under pressure, and genuinely a joy to work with. I would happily recommend him for any software engineering role."
	}
] as const;

export const educationData: readonly EducationEntry[] = [
	{
		degree: "M.S. Computer Science",
		school: "Arizona State University",
		period: "Aug 2024 — May 2026",
		location: "Tempe, AZ",
		summary:
			"Graduate work focused on AI/ML, distributed systems, and turning research-shaped ideas into things that ship.",
		focus: ["Applied AI", "Cloud Systems", "Graph ML", "Product Building"],
	},
	{
		degree: "B.Tech. Electronics & Instrumentation",
		school: "BITS Pilani, Hyderabad",
		period: "2018 — 2022",
		location: "Hyderabad, India",
		summary:
			"Engineering fundamentals with a long detour through software — most of college was spent building side projects and learning the web stack.",
		focus: ["Signals & Systems", "FPGA Development", "Embedded", "Self-taught Full-Stack"],
	},
] as const;

export const projectsData: readonly ProjectEntry[] = [
	{
		title: "SmartDeploy",
		description:
			"Preview-driven DevOps automation platform that analyzes your GitHub repo, shows the deployment path before release, and deploys static and server apps to AWS with automated builds, DNS, secrets, monitoring, health checks, and rollback.",
		tags: [
			"Next.js",
			"TypeScript",
			"AWS ECS",
			"AWS Fargate",
			"S3",
			"CloudFront",
			"Route 53",
			"CodeBuild",
			"Secrets Manager",
			"CloudWatch",
			"PostgreSQL",
			"TanStack Query",
			"Zustand"
		],
		imageUrl: smartdeployImg,
		githubLink: "https://github.com/anirudh-makuluri/smart-deploy/",
		liveLink: "https://smart-deploy.xyz/"
	},
	{
		title: "SD-Artifacts",
		description:
			"Repository analysis engine for SmartDeploy that inspects a GitHub project, infers its app type and deployment requirements, and returns structured deployment metadata used to route apps to AWS services.",
		tags: [
			"LangGraph",
			"FastAPI",
			"Amazon Bedrock",
			"Supabase",
			"GitHub API",
			"AWS ECS",
			"S3",
			"CloudFront",
			"Route 53",
			"Secrets Manager"
		],
		imageUrl: null,
		githubLink: "https://github.com/anirudh-makuluri/sd-artifacts",
		liveLink: null
	},
	{
		title: "what-if-million-users",
		description: "Scale-focused backend systems series built around one question: what does this look like when a million users show up?",
		tags: ["Go", "Gin", "Redis", "DynamoDB", "Kafka", "Prometheus", "Docker Compose", "Kubernetes"],
		imageUrl: null,
		githubLink: "https://github.com/anirudh-makuluri/what-if-million-users",
		liveLink: null
	},
	{
		title: "Accio — PDF RAG Knowledge System",
		description: "End-to-end PDF knowledge extraction and Q&A system that ingests documents, builds a Neo4j knowledge graph with local vector embeddings, and powers a Streamlit chat UI with grounded citations and PDF highlights.",
		tags: ["RAG", "Neo4j", "FastAPI", "Streamlit", "sentence-transformers", "Docker", "Google Gemini"],
		imageUrl: accioImg,
		githubLink: "https://github.com/anirudh-makuluri/Accio",
		liveLink: null
	},
	{
		title: "GraphStream DPS — Streaming Taxi Graph Analytics",
		description: "Kubernetes-based streaming graph analytics pipeline that loads NYC taxi trips into Neo4j, runs Graph Data Science algorithms, and optionally ingests real-time trip events via Kafka, ZooKeeper, and Kafka Connect.",
		tags: ["Kubernetes", "Kafka", "Neo4j", "Python", "Docker", "Helm", "Graph Data Science"],
		imageUrl: null,
		githubLink: "https://github.com/anirudh-makuluri/graphstream_dps",
		liveLink: null
	},
	// {
	// 	title: "Shardings Meet",
	// 	description:
	// 		"I worked as a full-stack developer on this startup project. Shardings-Meet offers customizable virtual environments for diverse virtual experiences.",
	// 	tags: ["React", "React Native", "Node.js", "Firebase", "WebRTC", "Google Cloud Platform"],
	// 	imageUrl: shardingsImg,
	// 	githubLink: null,
	// 	liveLink: "https://shardings.com/"
	// },
	// {
	// 	title: "LexiGuess",
	// 	description:
	// 		"LexiGuess is an engaging word-guessing website with three game modes and customizable word settings. It offers educational word meanings in \"Hard Word\" mode.",
	// 	tags: ["Next.js", "Tailwind CSS"],
	// 	imageUrl: lexiguessImg,
	// 	githubLink: "https://github.com/anirudh-makuluri/lexiguess",
	// 	liveLink: "https://lexiguess.vercel.app/"
	// },
	// {
	// 	title: "CodeCraft",
	// 	description: "Real-time web design platform allowing direct HTML, CSS, and JS editing. Features seamless Shadcn and Tailwind CSS integration for responsive interfaces. Utilizes JWT for user authentication.",
	// 	tags: ["Next.js", ".Net", "MSSQL"],
	// 	imageUrl: codecraftImg,
	// 	githubLink: "https://github.com/anirudh-makuluri/code-craft/",
	// 	liveLink: null
	// },
	{
		title: "Hoplio",
		description:
			"Secure real-time communication platform with one-to-one and group messaging, voice/video calls, offline-first sync, end-to-end encryption, and an AI assistant with semantic retrieval across mobile and web.",
		tags: [
			"Next.js",
			"React",
			"React Native",
			"Node.js",
			"Socket.IO",
			"WebRTC",
			"Redis",
			"Firebase",
			"End-to-End Encryption",
			"Semantic Search"
		],
		imageUrl: chatifyImg,
		githubLink: "https://github.com/anirudh-makuluri/chatify",
		liveLink: "https://chat.smart-deploy.xyz/"
	},
	{
		title: "TravelMate",
		description: "Hackathon-winning AI travel planner that turns preferences, trip constraints, and destination context into practical itineraries through a polished Next.js frontend and AI-powered planning system.",
		tags: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "Google Gemini", "Auth0", "Google Maps"],
		imageUrl: null,
		githubLink: "https://github.com/anirudh-makuluri/travelMate",
		liveLink: "https://travelmate.smart-deploy.xyz",
		projectLinks: [
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
	// {
	// 	title: "E-Commerce App",
	// 	description: "Feature-rich e-commerce Android app using Java, showcasing strong object-oriented programming skills. Created an intuitive UI, implemented secure user authentication, and collaborated effectively with a team for planning and development.",
	// 	tags: ["Java", "Android Development", "Firebase"],
	// 	imageUrl: null,
	// 	githubLink: "https://github.com/anirudh-makuluri/ecommerce",
	// 	liveLink: null
	// },
] as const;

export const skillsData = [
	"React.js",
	"Next.js",
	"TypeScript",
	"JavaScript",
	"Tailwind CSS",
	"Zustand",
	"TanStack Query",
	"Framer Motion",
	"React Native",
	"Expo",
	"CodePush",
	"Firebase Cloud Messaging",
	"Fastlane",
	"Node.js",
	".Net",
	"C#",
	"Java",
	"Socket.IO",
	"WebRTC",
	"FastAPI",
	"Supabase",
	"Firebase",
	"Neo4j",
	"MSSQL",
	"PostgreSQL",
	"AWS (EC2, ECS, EBS)",
	"Google Cloud Platform",
	"Kubernetes",
	"Helm",
	"Docker",
	"Gen AI",
	"Langchain",
	"CrewAI",
	"Ollama/Mistral",
	"sentence-transformers",
	"Tensorflow",
	"PyTorch Geometric",
	"Scikit-Learn",
	"XGBoost",
	"Graph Data Science"
] as const;

export const categorizedSkills = {
	Frontend: [
		"React.js",
		"Next.js",
		"TypeScript",
		"JavaScript",
		"Tailwind CSS",
		"Zustand",
		"TanStack Query",
		"Framer Motion"
	],
	Mobile: [
		"React Native",
		"Expo",
		"CodePush",
		"Firebase Cloud Messaging",
		"Fastlane"
	],
	Backend: [
		"Node.js",
		".Net",
		"C#",
		"Java",
		"Socket.IO",
		"WebRTC",
		"FastAPI"
	],
	"Database & Cloud": [
		"Supabase",
		"Firebase",
		"Neo4j",
		"MSSQL",
		"PostgreSQL",
		"AWS (EC2, ECS, EBS)",
		"Google Cloud Platform",
		"Kubernetes",
		"Helm",
		"Docker"
	],
	"AI & Machine Learning": [
		"Gen AI",
		"Langchain",
		"CrewAI",
		"Ollama/Mistral",
		"sentence-transformers",
		"Tensorflow",
		"PyTorch Geometric",
		"Scikit-Learn",
		"XGBoost",
		"Graph Data Science"
	]
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
