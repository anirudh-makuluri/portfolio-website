"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type GraphHighlightContextType = {
	highlightedNodes: string[];
	setHighlightedNodes: (nodes: string[]) => void;
	addHighlightedNodes: (nodes: string[]) => void;
	clearHighlightedNodes: () => void;
};

const GraphHighlightContext = createContext<GraphHighlightContextType | null>(null);

export function GraphHighlightProvider({ children }: { children: ReactNode }) {
	const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);

	const addHighlightedNodes = (nodes: string[]) => {
		setHighlightedNodes(prev => {
			const newNodes = [...prev];
			nodes.forEach(node => {
				if (!newNodes.includes(node)) {
					newNodes.push(node);
				}
			});
			return newNodes;
		});
	};

	const clearHighlightedNodes = () => {
		setHighlightedNodes([]);
	};

	return (
		<GraphHighlightContext.Provider
			value={{
				highlightedNodes,
				setHighlightedNodes,
				addHighlightedNodes,
				clearHighlightedNodes,
			}}
		>
			{children}
		</GraphHighlightContext.Provider>
	);
}

export function useGraphHighlight() {
	const context = useContext(GraphHighlightContext);
	if (!context) {
		throw new Error("useGraphHighlight must be used within GraphHighlightProvider");
	}
	return context;
}


