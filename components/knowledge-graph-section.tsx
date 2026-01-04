"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import KnowledgeGraphViz from "./knowledge-graph-viz";
import { useGraphHighlight } from "@/context/graph-highlight-context";
import { GraphNode } from "@/lib/knowledge-graph";

export default function KnowledgeGraphSection() {
	const { highlightedNodes } = useGraphHighlight();
	const [isFullscreen, setIsFullscreen] = useState(false);

	const handleNodeClick = (node: GraphNode) => {
		console.log("Node clicked:", node);
		// Could navigate to relevant section
		if (node.section) {
			const element = document.getElementById(node.section);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};

	return (
		<section
			id="knowledge-graph"
			className="mb-28 scroll-mt-28 w-full"
		>
			<SectionHeading>Knowledge Graph</SectionHeading>

			<motion.div
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.175 }}
				className="relative"
			>
				{/* Description */}
				<div className="text-center mb-8 max-w-3xl mx-auto">
					<p className="text-gray-600 dark:text-gray-300">
						An interactive visualization of my professional journey, skills, and projects. 
						<span className="block mt-2 text-sm">
							<strong className="text-blue-500">Watch the graph highlight</strong> as you scroll through different sections!
						</span>
					</p>
				</div>

				{/* Graph Container */}
				<div className={`
					relative bg-gradient-to-br from-gray-900 to-gray-800 
					rounded-xl shadow-2xl overflow-hidden border border-gray-700
					${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[600px]'}
				`}>
					<KnowledgeGraphViz
						highlightedNodes={highlightedNodes}
						onNodeClick={handleNodeClick}
						className="w-full h-full"
					/>

					{/* Fullscreen Toggle */}
					<button
						onClick={() => setIsFullscreen(!isFullscreen)}
						className="absolute top-4 right-4 z-20 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg hover:scale-110 transition-transform"
						aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
					>
						{isFullscreen ? (
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
							</svg>
						)}
					</button>

					{/* Stats */}
					<div className="absolute bottom-4 right-4 z-20 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-xl">
						<div className="text-xs space-y-1">
							<div className="flex justify-between gap-4">
								<span className="text-gray-500">Highlighted:</span>
								<span className="font-bold text-blue-500">{highlightedNodes.length}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Features */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
					{[
						{
							icon: '🔍',
							title: 'Scroll-Based Highlighting',
							description: 'Nodes light up as you scroll through portfolio sections'
						},
						{
							icon: '🎯',
							title: 'Interactive Exploration',
							description: 'Click any node to see details and navigate to sections'
						},
						{
							icon: '🤖',
							title: 'AI-Powered Chatbot',
							description: 'Ask the chatbot anything - it uses this graph to answer!'
						}
					].map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 + index * 0.1 }}
							className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
						>
							<div className="text-4xl mb-3">{feature.icon}</div>
							<h3 className="font-bold mb-2">{feature.title}</h3>
							<p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
}


