import { projectsData, skillsData, experiencesData, certificatesData } from "./data";

export interface GraphNode {
	id: string;
	label: string;
	type: 'person' | 'project' | 'skill' | 'experience' | 'certificate' | 'company' | 'technology' | 'visa';
	color: string;
	val?: number; // size of node
	metadata?: any;
	section?: string; // which portfolio section this belongs to
}

export interface GraphLink {
	source: string;
	target: string;
	label: string;
	color?: string;
}

export interface KnowledgeGraph {
	nodes: GraphNode[];
	links: GraphLink[];
}

// Color scheme for different node types
const NODE_COLORS = {
	person: '#78C1F3',
	project: '#9BE8D8',
	skill: '#E0AED0',
	experience: '#FFB6C1',
	certificate: '#FFD700',
	company: '#FFA07A',
	technology: '#98D8C8',
	visa: '#A78BFA',
};

const NODE_SIZES = {
	person: 50,
	project: 35,
	skill: 25,
	experience: 30,
	certificate: 30,
	company: 32,
	technology: 20,
	visa: 18,
};

export function buildKnowledgeGraph(): KnowledgeGraph {
	const nodes: GraphNode[] = [];
	const links: GraphLink[] = [];

	// Central node - You
	nodes.push({
		id: 'anirudh',
		label: 'Anirudh Makuluri',
		type: 'person',
		color: NODE_COLORS.person,
		val: NODE_SIZES.person,
		section: 'home',
		metadata: {
			role: 'Full-Stack Developer & AI/ML Engineer',
			education: 'M.S. Computer Science @ ASU',
			citizenship: 'Indian Citizen',
			location: 'United States'
		}
	});

	// Visa/Work Authorization node
	const visaId = 'f1-visa';
	nodes.push({
		id: visaId,
		label: 'F-1 Visa',
		type: 'visa',
		color: NODE_COLORS.visa,
		val: NODE_SIZES.visa,
		section: 'home',
		metadata: {
			visaType: 'F-1 Student Visa',
			citizenship: 'Indian Citizen',
			workAuthorization: 'Eligible for OPT and STEM OPT',
			totalWorkMonths: 36,
			breakdown: 'OPT (12 months) + STEM OPT Extension (24 months)',
			status: 'Currently on F-1 visa',
			description: 'Indian citizen on F-1 visa, eligible to work in the USA for a total of 36 months through OPT and STEM OPT programs'
		}
	});

	// Link person to visa
	links.push({
		source: 'anirudh',
		target: visaId,
		label: 'HAS_VISA',
		color: 'rgba(167, 139, 250, 0.3)',
	});

	// Extract companies from experiences
	const companies = new Set<string>();
	experiencesData.forEach((exp) => {
		if (exp.location && !exp.title.includes('B.Tech') && !exp.title.includes('M.S')) {
			companies.add(exp.location);
		}
	});

	// Add company nodes
	companies.forEach((company) => {
		const companyId = company?.toLowerCase().replace(/[^a-z0-9]/g, '-');
		nodes.push({
			id: companyId,
			label: company,
			type: 'company',
			color: NODE_COLORS.company,
			val: NODE_SIZES.company,
			section: 'experience',
		});
	});

	// Add experience nodes
	experiencesData.forEach((exp, index) => {
		const expId = `exp-${index}`;
		nodes.push({
			id: expId,
			label: exp.title,
			type: 'experience',
			color: NODE_COLORS.experience,
			val: NODE_SIZES.experience,
			section: 'experience',
			metadata: {
				date: exp.date,
				location: exp.location,
				description: exp.description,
			}
		});

		// Link person to experience
		links.push({
			source: 'anirudh',
			target: expId,
			label: 'HAS_EXPERIENCE',
			color: 'rgba(120, 193, 243, 0.3)',
		});

		// Link experience to company if applicable
		if (exp.location && !exp.title.includes('B.Tech') && !exp.title.includes('M.S')) {
			const companyId = exp.location.toLowerCase().replace(/[^a-z0-9]/g, '-');
			links.push({
				source: expId,
				target: companyId,
				label: 'AT_COMPANY',
				color: 'rgba(255, 160, 122, 0.3)',
			});
		}
	});

	// Add project nodes
	projectsData.forEach((project, index) => {
		const projectId = `project-${index}`;
		nodes.push({
			id: projectId,
			label: project.title,
			type: 'project',
			color: NODE_COLORS.project,
			val: NODE_SIZES.project,
			section: 'projects',
			metadata: {
				description: project.description,
				tags: project.tags,
				githubLink: project.githubLink,
				liveLink: project.liveLink,
			}
		});

		// Link person to project
		links.push({
			source: 'anirudh',
			target: projectId,
			label: 'BUILT',
			color: 'rgba(155, 232, 216, 0.3)',
		});

		// Add technology nodes and links
		project.tags.forEach((tech) => {
			const techId = tech.toLowerCase().replace(/[^a-z0-9]/g, '-');
			
			// Add tech node if not exists
			if (!nodes.find(n => n.id === techId)) {
				nodes.push({
					id: techId,
					label: tech,
					type: 'technology',
					color: NODE_COLORS.technology,
					val: NODE_SIZES.technology,
					section: 'skills',
				});
			}

			// Link project to technology
			links.push({
				source: projectId,
				target: techId,
				label: 'USES',
				color: 'rgba(152, 216, 200, 0.2)',
			});
		});
	});

	// Add skill nodes
	skillsData.forEach((skill) => {
		const skillId = skill.toLowerCase().replace(/[^a-z0-9]/g, '-');
		
		// Add skill node if not already added as technology
		if (!nodes.find(n => n.id === skillId)) {
			nodes.push({
				id: skillId,
				label: skill,
				type: 'skill',
				color: NODE_COLORS.skill,
				val: NODE_SIZES.skill,
				section: 'skills',
			});
		}

		// Link person to skill
		links.push({
			source: 'anirudh',
			target: skillId,
			label: 'HAS_SKILL',
			color: 'rgba(224, 174, 208, 0.2)',
		});
	});

	// Add certificate nodes
	certificatesData.forEach((cert, index) => {
		const certId = `cert-${index}`;
		nodes.push({
			id: certId,
			label: cert.name,
			type: 'certificate',
			color: NODE_COLORS.certificate,
			val: NODE_SIZES.certificate,
			section: 'certificates',
			metadata: {
				issuedBy: cert.issuedBy,
				date: cert.date,
				link: cert.link,
				description: cert.description,
			}
		});

		// Link person to certificate
		links.push({
			source: 'anirudh',
			target: certId,
			label: 'EARNED',
			color: 'rgba(255, 215, 0, 0.3)',
		});

		// Link certificates to related skills
		if (cert.name.includes('AI') || cert.name.includes('Machine Learning')) {
			const aiSkills = ['gen-ai', 'langchain', 'tensorflow', 'scikit-learn'];
			aiSkills.forEach(skillId => {
				if (nodes.find(n => n.id === skillId)) {
					links.push({
						source: certId,
						target: skillId,
						label: 'VALIDATES',
						color: 'rgba(255, 215, 0, 0.2)',
					});
				}
			});
		}

		if (cert.name.includes('Cloud') || cert.name.includes('Oracle')) {
			const cloudSkills = ['google-cloud-platform', 'oracle-cloud-infrastructure'];
			cloudSkills.forEach(skillId => {
				if (nodes.find(n => n.id === skillId)) {
					links.push({
						source: certId,
						target: skillId,
						label: 'VALIDATES',
						color: 'rgba(255, 215, 0, 0.2)',
					});
				}
			});
		}

		if (cert.name.includes('C#')) {
			const csharpId = 'c';
			if (nodes.find(n => n.id === csharpId)) {
				links.push({
					source: certId,
					target: csharpId,
					label: 'VALIDATES',
					color: 'rgba(255, 215, 0, 0.2)',
				});
			}
		}
	});

	return { nodes, links };
}

// Helper function to get nodes by section
export function getNodesBySection(section: string, graph: KnowledgeGraph): string[] {
	return graph.nodes
		.filter(node => node.section === section)
		.map(node => node.id);
}

// Helper function to get connected nodes
export function getConnectedNodes(nodeId: string, graph: KnowledgeGraph): string[] {
	const connected = new Set<string>();
	
	graph.links.forEach(link => {
		if (link.source === nodeId) {
			connected.add(typeof link.target === 'string' ? link.target : (link.target as any).id);
		}
		if (link.target === nodeId) {
			connected.add(typeof link.source === 'string' ? link.source : (link.source as any).id);
		}
	});
	
	return Array.from(connected);
}

// Query function for chatbot
export function queryGraph(query: string, graph: KnowledgeGraph): GraphNode[] {
	const lowerQuery = query?.toLowerCase() || '';
	const results: GraphNode[] = [];

	// Simple keyword matching for now
	graph.nodes.forEach(node => {
		if (
			node.label.toLowerCase().includes(lowerQuery) ||
			node.type.toLowerCase().includes(lowerQuery) 
			// JSON.stringify(node.metadata).toLowerCase().includes(lowerQuery)
		) {
			results.push(node);
		}
	});

	return results;
}

// Get path between two nodes (for chatbot reasoning)
export function findPath(
	startId: string,
	endId: string,
	graph: KnowledgeGraph,
	maxDepth: number = 3
): string[][] {
	const paths: string[][] = [];
	const visited = new Set<string>();

	function dfs(currentId: string, targetId: string, path: string[], depth: number) {
		if (depth > maxDepth) return;
		if (currentId === targetId) {
			paths.push([...path, currentId]);
			return;
		}

		visited.add(currentId);
		const neighbors = getConnectedNodes(currentId, graph);

		neighbors.forEach(neighbor => {
			if (!visited.has(neighbor)) {
				dfs(neighbor, targetId, [...path, currentId], depth + 1);
			}
		});

		visited.delete(currentId);
	}

	dfs(startId, endId, [], 0);
	return paths;
}


