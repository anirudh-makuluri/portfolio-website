"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { buildKnowledgeGraph, KnowledgeGraph } from '@/lib/knowledge-graph';
import { useGraphHighlight } from '@/context/graph-highlight-context';

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
	ssr: false,
});

export default function KnowledgeGraphBackground() {
	const graphRef = useRef<any>();
	const [graph, setGraph] = useState<KnowledgeGraph>({ nodes: [], links: [] });
	const { highlightedNodes } = useGraphHighlight();
	const [dimensions, setDimensions] = useState({ width: 400, height: 800 });
	const [isMinimized, setIsMinimized] = useState(false);

	// Build knowledge graph on mount
	useEffect(() => {
		const kg = buildKnowledgeGraph();
		setGraph(kg);
	}, []);

	// Configure forces to spread nodes out more
	useEffect(() => {
		if (graphRef.current) {
			// Increase repulsion force between nodes
			graphRef.current.d3Force('charge').strength(-800).distanceMax(1000);
			
			// Increase link distance
			graphRef.current.d3Force('link').distance(200);
			
			// Add collision detection based on node size
			const forceCollide = require('d3-force').forceCollide();
			graphRef.current.d3Force('collide', forceCollide.radius((node: any) => (node.val || 5) + 30).strength(1));
			
			// Reheat simulation
			graphRef.current.d3ReheatSimulation();
		}
	}, [graph]);

	// Update dimensions on resize
	useEffect(() => {
		const updateDimensions = () => {
			// Full screen background
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, []);

	// Custom node rendering - bigger and more visible
	const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
		const label = node.label;
		const fontSize = 16 / globalScale;
		const isPerson = node.type === 'person';
		const nodeSize = node.val || 5;

		// Draw node circle with prominent glow
		ctx.beginPath();
		ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
		
		// Add prominent shadow for depth
		ctx.shadowBlur = 20;
		ctx.shadowColor = node.color;
		ctx.fillStyle = node.color;
		ctx.fill();
		ctx.shadowBlur = 0;

		// Draw label for all nodes
		if (globalScale > 0.5 || isPerson) {
			ctx.font = `bold ${fontSize}px Sans-Serif`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			
			// Add text shadow for better readability
			ctx.shadowBlur = 4;
			ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
			ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
			ctx.fillText(label, node.x, node.y + nodeSize + fontSize + 4);
			ctx.shadowBlur = 0;
		}
	}, []);

	// Custom link rendering - thicker and more visible
	const paintLink = useCallback((link: any, ctx: CanvasRenderingContext2D) => {
		const start = link.source;
		const end = link.target;

		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(end.x, end.y);
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
		ctx.lineWidth = 2;
		ctx.stroke();
	}, []);

	if (isMinimized) {
		return (
			<motion.button
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				onClick={() => setIsMinimized(false)}
				className="fixed left-5 bottom-20 z-40 bg-gradient-to-br from-blue-500 to-teal-400 w-[3rem] h-[3rem] rounded-full shadow-xl hover:scale-[1.15] active:scale-105 transition-all flex items-center justify-center"
				title="Show Knowledge Graph Background"
			>
				<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>
			</motion.button>
		);
	}

	return (
		<>
			{/* Full-screen background graph */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.5 }}
				transition={{ delay: 0.5, duration: 1 }}
				className="fixed inset-0 z-0 pointer-events-none"
			>
				<ForceGraph2D
					ref={graphRef}
					graphData={graph}
					nodeLabel={(node: any) => node.label}
					nodeCanvasObject={paintNode}
					linkCanvasObject={paintLink}
					width={dimensions.width}
					height={dimensions.height}
					backgroundColor="rgba(0,0,0,0)"
					enableZoomInteraction={false}
					enablePanInteraction={false}
					enableNodeDrag={false}
					linkDirectionalParticles={3}
					linkDirectionalParticleSpeed={0.008}
					linkDirectionalParticleWidth={2.5}
					cooldownTime={15000}
					d3VelocityDecay={0.05}
					d3AlphaDecay={0.01}
					warmupTicks={100}
					onEngineStop={() => graphRef.current?.zoomToFit(400, 50)}
				/>
			</motion.div>

			{/* Floating controls */}
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 1 }}
				className="fixed left-5 bottom-20 z-40 pointer-events-auto"
			>
				{/* Hide button */}
				<button
					onClick={() => setIsMinimized(true)}
					className="bg-white/10 backdrop-blur-md w-[3rem] h-[3rem] rounded-full shadow-xl hover:scale-[1.15] active:scale-105 transition-all flex items-center justify-center border border-white/20 hover:bg-white/20"
					title="Hide Knowledge Graph"
				>
					<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
					</svg>
				</button>
			</motion.div>
		</>
	);
}

