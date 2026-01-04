import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildKnowledgeGraph, queryGraph, getConnectedNodes } from '@/lib/knowledge-graph';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Graph-RAG with Gemini implementation
export async function POST(request: NextRequest) {
	try {
		const { message, history } = await request.json();

		if (!message) {
			return NextResponse.json(
				{ error: 'Message is required' },
				{ status: 400 }
			);
		}

		// Check if API key is configured
		if (!process.env.GEMINI_API_KEY) {
			return NextResponse.json(
				{ error: 'Gemini API key not configured' },
				{ status: 500 }
			);
		}

		// Build knowledge graph
		const graph = buildKnowledgeGraph();

		// Query the graph for relevant nodes
		const relevantNodes = queryGraph(message.toLowerCase(), graph);
		
		// Get IDs of relevant nodes for highlighting
		const highlightedNodeIds = relevantNodes.map(node => node.id);

		// Build rich context from knowledge graph
		let context = buildKnowledgeGraphContext(graph, relevantNodes);

		// Initialize Gemini model
		const model = genAI.getGenerativeModel({ 
			model: 'gemini-2.5-flash',
			systemInstruction: `You are an AI assistant for Anirudh Raghavendra Makuluri's portfolio. Your role is to answer questions about his background, skills, projects, and experience.

KNOWLEDGE GRAPH CONTEXT:
${context}

INSTRUCTIONS:
- Answer questions and prioritize answering the recent questions accurately based on the knowledge graph
- Be conversational and friendly
- Highlight connections between projects, skills, and experience
- If asked about something not in the knowledge graph, politely say you don't have that information
- Keep responses concise but informative (1-2 paragraphs max)
- Use specific details from the metadata when relevant`
		});

		let chatHistory: any[] = [];
		if (history && history.length > 1) {
			const validHistory = history.slice(1, -1); // Exclude current message
			chatHistory = validHistory.slice(-10).map((msg: any) => ({
				role: msg.role === 'user' ? 'user' : 'model',
				parts: [{ text: msg.content }]
			}));
			
			// Ensure first message is from user
			if (chatHistory.length > 0 && chatHistory[0].role !== 'user') {
				chatHistory = chatHistory.slice(1);
			}
		}

		// Generate response with Gemini
		const chat = model.startChat({
			history: chatHistory,
			generationConfig: {
				temperature: 0.3,
			},
		});

		console.log(chatHistory);
		console.log(message);

		const result = await chat.sendMessage(message);
		const response = result.response.text();

		return NextResponse.json({
			response,
			highlightedNodes: highlightedNodeIds,
			nodesFound: relevantNodes.length,
		});

	} catch (error) {
		console.error('Chat API Error:', error);
		return NextResponse.json(
			{ error: 'Failed to generate response. Please try again.' },
			{ status: 500 }
		);
	}
}

// Build comprehensive context from knowledge graph
function buildKnowledgeGraphContext(graph: any, relevantNodes: any[]): string {
	const nodeDetails: string[] = [];

	// If no specific nodes found, provide overview
	if (relevantNodes.length === 0) {
		relevantNodes = graph.nodes.slice(0, 20); // Get first 20 nodes as overview
	}

	relevantNodes.forEach(node => {
		let detail = `\n[${node.type.toUpperCase()}] ${node.label}`;
		
		if (node.metadata) {
			Object.entries(node.metadata).forEach(([key, value]) => {
				if (typeof value === 'object') {
					detail += `\n  - ${key}: ${JSON.stringify(value)}`;
				} else {
					detail += `\n  - ${key}: ${value}`;
				}
			});
		}

		// Get connected nodes for more context
		const connected = getConnectedNodes(node.id, graph);
		const connectedLabels = connected
			.map((id: string) => graph.nodes.find((n: any) => n.id === id)?.label)
			.filter(Boolean)
			.slice(0, 5);
		
		if (connectedLabels.length > 0) {
			detail += `\n  - Connected to: ${connectedLabels.join(', ')}`;
		}

		nodeDetails.push(detail);
	});

	return nodeDetails.join('\n');
}



