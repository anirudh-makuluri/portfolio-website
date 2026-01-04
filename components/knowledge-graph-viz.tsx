"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { buildKnowledgeGraph, KnowledgeGraph, GraphNode } from '@/lib/knowledge-graph';

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
	ssr: false,
	loading: () => (
		<div className="w-full h-full flex items-center justify-center">
			<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
		</div>
	),
});

interface KnowledgeGraphVizProps {
	highlightedNodes?: string[];
	onNodeClick?: (node: GraphNode) => void;
	className?: string;
}

export default function KnowledgeGraphViz({
	highlightedNodes = [],
	onNodeClick,
	className = '',
}: KnowledgeGraphVizProps) {
	const graphRef = useRef<any>();
	const [graph, setGraph] = useState<KnowledgeGraph>({ nodes: [], links: [] });
	const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
	const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
	const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

	// Build knowledge graph on mount
	useEffect(() => {
		const kg = buildKnowledgeGraph();
		setGraph(kg);
	}, []);

	// Update dimensions on resize
	useEffect(() => {
		const updateDimensions = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, []);

	// Handle node click
	const handleNodeClick = useCallback((node: any) => {
		setSelectedNode(node as GraphNode);
		if (onNodeClick) {
			onNodeClick(node as GraphNode);
		}

		// Center camera on node
		if (graphRef.current) {
			graphRef.current.centerAt(node.x, node.y, 1000);
			graphRef.current.zoom(2, 1000);
		}
	}, [onNodeClick]);

	// Handle node hover
	const handleNodeHover = useCallback((node: any) => {
		setHoveredNode(node as GraphNode | null);
	}, []);

	// Custom node rendering with highlighting
	const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
		const label = node.label;
		const fontSize = 12 / globalScale;
		const isHighlighted = highlightedNodes.includes(node.id);
		const isHovered = hoveredNode?.id === node.id;
		const isSelected = selectedNode?.id === node.id;

		// Draw node circle
		ctx.beginPath();
		ctx.arc(node.x, node.y, node.val || 5, 0, 2 * Math.PI, false);
		
		// Apply highlighting effects
		if (isSelected) {
			ctx.strokeStyle = '#FFD700';
			ctx.lineWidth = 3 / globalScale;
			ctx.stroke();
		} else if (isHighlighted) {
			ctx.strokeStyle = '#78C1F3';
			ctx.lineWidth = 2 / globalScale;
			ctx.stroke();
		}

		ctx.fillStyle = node.color || '#999';
		ctx.fill();

		// Add glow effect for highlighted/hovered nodes
		if (isHighlighted || isHovered || isSelected) {
			ctx.shadowBlur = 10;
			ctx.shadowColor = node.color;
			ctx.fill();
			ctx.shadowBlur = 0;
		}

		// Draw label
		if (globalScale >= 0.5 || isHighlighted || isHovered || isSelected) {
			ctx.font = `${fontSize}px Sans-Serif`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = isHighlighted || isSelected ? '#FFD700' : '#fff';
			ctx.fillText(label, node.x, node.y + (node.val || 5) + fontSize);
		}
	}, [highlightedNodes, hoveredNode, selectedNode]);

	// Custom link rendering
	const paintLink = useCallback((link: any, ctx: CanvasRenderingContext2D) => {
		const start = link.source;
		const end = link.target;

		// Check if link is connected to highlighted node
		const isHighlighted = 
			highlightedNodes.includes(start.id) || 
			highlightedNodes.includes(end.id);

		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(end.x, end.y);
		ctx.strokeStyle = isHighlighted ? 'rgba(120, 193, 243, 0.5)' : (link.color || 'rgba(255, 255, 255, 0.2)');
		ctx.lineWidth = isHighlighted ? 2 : 1;
		ctx.stroke();
	}, [highlightedNodes]);

	return (
		<div className={`relative ${className}`}>
			{/* Graph Canvas */}
			<div className="w-full h-full bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden">
				<ForceGraph2D
					ref={graphRef}
					graphData={graph}
					nodeLabel={(node: any) => node.label}
					nodeAutoColorBy="type"
					nodeCanvasObject={paintNode}
					linkCanvasObject={paintLink}
					onNodeClick={handleNodeClick}
					onNodeHover={handleNodeHover}
					width={dimensions.width}
					height={dimensions.height}
					backgroundColor="rgba(0,0,0,0)"
					linkDirectionalParticles={2}
					linkDirectionalParticleSpeed={0.005}
					enableZoomInteraction={true}
					enablePanInteraction={true}
					cooldownTime={3000}
				/>
			</div>

			{/* Node Info Panel */}
			<AnimatePresence>
				{(selectedNode || hoveredNode) && (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
						className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl max-w-xs z-10"
					>
						<div className="flex items-center justify-between mb-2">
							<h3 className="font-bold text-lg">{(selectedNode || hoveredNode)?.label}</h3>
							<span
								className="px-2 py-1 text-xs rounded-full"
								style={{
									backgroundColor: (selectedNode || hoveredNode)?.color + '40',
									color: (selectedNode || hoveredNode)?.color,
								}}
							>
								{(selectedNode || hoveredNode)?.type}
							</span>
						</div>

						{(selectedNode || hoveredNode)?.metadata && (
							<div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
								{Object.entries((selectedNode || hoveredNode)!.metadata).map(([key, value]) => (
									<div key={key}>
										<span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
										{typeof value === 'object' ? JSON.stringify(value) : String(value)}
									</div>
								))}
							</div>
						)}

						{selectedNode && (
							<button
								onClick={() => setSelectedNode(null)}
								className="mt-3 text-sm text-blue-500 hover:text-blue-600"
							>
								Close
							</button>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Legend */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl z-10"
			>
				<h4 className="font-bold mb-2 text-sm">Legend</h4>
				<div className="space-y-1 text-xs">
					{[
						{ type: 'person', label: 'Person', color: '#78C1F3' },
						{ type: 'project', label: 'Projects', color: '#9BE8D8' },
						{ type: 'skill', label: 'Skills', color: '#E0AED0' },
						{ type: 'experience', label: 'Experience', color: '#FFB6C1' },
						{ type: 'certificate', label: 'Certificates', color: '#FFD700' },
						{ type: 'company', label: 'Companies', color: '#FFA07A' },
						{ type: 'technology', label: 'Technologies', color: '#98D8C8' },
					].map((item) => (
						<div key={item.type} className="flex items-center gap-2">
							<div
								className="w-3 h-3 rounded-full"
								style={{ backgroundColor: item.color }}
							/>
							<span>{item.label}</span>
						</div>
					))}
				</div>
			</motion.div>

			{/* Instructions */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
				className="absolute top-4 left-4 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm text-white"
			>
				💡 Click nodes to explore • Scroll to zoom • Drag to pan
			</motion.div>
		</div>
	);
}


