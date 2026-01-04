"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGraphHighlight } from "@/context/graph-highlight-context";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	highlightedNodes?: string[];
}

export default function Chatbot() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			role: 'assistant',
			content: "👋 Hi! I'm your AI assistant powered by the knowledge graph. Ask me anything about Anirudh's projects, skills, experience, or education!",
		}
	]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const { setHighlightedNodes } = useGraphHighlight();

	// Auto-scroll to bottom
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	// Auto-focus input when chat opens or after sending message
	useEffect(() => {
		if (isOpen && !isLoading) {
			inputRef.current?.focus();
		}
	}, [isOpen, isLoading, messages]);

	// Handle sending message
	const handleSend = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			role: 'user',
			content: input.trim(),
		};

		setMessages(prev => [...prev, userMessage]);
		setInput('');
		setIsLoading(true);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: input.trim(), history: messages }),
			});

			const data = await response.json();

			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				role: 'assistant',
				content: data.response,
				highlightedNodes: data.highlightedNodes || [],
			};

			setMessages(prev => [...prev, assistantMessage]);

			// Highlight nodes in graph
			if (data.highlightedNodes && data.highlightedNodes.length > 0) {
				setHighlightedNodes(data.highlightedNodes);
			}
		} catch (error) {
			console.error('Error sending message:', error);
			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				role: 'assistant',
				content: "Sorry, I encountered an error. Please try again.",
			};
			setMessages(prev => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	// Sample questions
	const sampleQuestions = [
		"What projects has Anirudh built?",
		"What are his AI/ML skills?",
		"Tell me about his experience",
		"What certifications does he have?",
		"Which projects use React?",
		"What technologies does he know?",
	];

	return (
		<>
			{/* Floating Chat Button */}
			<motion.button
				initial={{ scale: 1 }}
				animate={{ scale: 1 }}
				transition={{ delay: 1, type: 'spring', stiffness: 200 }}
				onClick={() => setIsOpen(!isOpen)}
				className={`
					fixed bottom-20 right-4 z-50
					w-14 h-14 rounded-full
					bg-gradient-to-r from-blue-500 to-teal-400
					shadow-2xl hover:shadow-blue-500/50
					flex items-center justify-center
					transition-all duration-300
					hover:scale-110 active:scale-95
					${isOpen ? 'rotate-90' : ''}
				`}
				aria-label="Toggle chatbot"
			>
				{isOpen ? (
					<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				) : (
					<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
					</svg>
				)}

				{/* Notification Badge */}
				{!isOpen && (
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
					>
						<span className="text-white text-xs font-bold">!</span>
					</motion.div>
				)}
			</motion.button>

			{/* Chat Window */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2.5rem)] h-[600px] max-h-[calc(100vh-10rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
					>
					{/* Header */}
					<div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4 text-white">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
									🤖
								</div>
								<div>
									<h3 className="font-bold">Knowledge Graph AI</h3>
									<p className="text-xs opacity-90">Ask me anything!</p>
								</div>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
								aria-label="Close chat"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>

						{/* Messages */}
						<div className="flex-1 overflow-y-auto p-4 space-y-4">
							{messages.map((message) => (
								<div
									key={message.id}
									className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
								>
									<div
						className={`
							max-w-[80%] p-3 rounded-2xl
							${message.role === 'user'
												? 'bg-blue-500 text-white rounded-br-none'
												: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
											}
										`}
									>
										{message.role === 'user' ? (
											<p className="text-sm whitespace-pre-wrap">{message.content}</p>
										) : (
											<div className="text-sm prose prose-sm dark:prose-invert max-w-none">
												<ReactMarkdown
													remarkPlugins={[remarkGfm]}
													components={{
														p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
														ul: ({ children }) => <ul className="mb-2 ml-4 list-disc">{children}</ul>,
														ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal">{children}</ol>,
														li: ({ children }) => <li className="mb-1">{children}</li>,
														strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
														em: ({ children }) => <em className="italic">{children}</em>,
														code: ({ children }) => (
															<code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">
																{children}
															</code>
														),
														pre: ({ children }) => (
															<pre className="bg-gray-200 dark:bg-gray-800 p-2 rounded my-2 overflow-x-auto">
																{children}
															</pre>
														),
														a: ({ href, children }) => (
															<a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
																{children}
															</a>
														),
													}}
												>
													{message.content}
												</ReactMarkdown>
											</div>
										)}
										{message.highlightedNodes && message.highlightedNodes.length > 0 && (
											<div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
												<p className="text-xs opacity-75">
													💡 Highlighted {message.highlightedNodes.length} nodes in graph
												</p>
											</div>
										)}
									</div>
								</div>
							))}

							{isLoading && (
								<div className="flex justify-start">
									<div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none">
										<div className="flex gap-1">
											<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
											<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
											<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
										</div>
									</div>
								</div>
							)}

							<div ref={messagesEndRef} />
						</div>

						{/* Sample Questions */}
						{messages.length <= 1 && (
							<div className="px-4 pb-2">
								<p className="text-xs text-gray-500 mb-2">Try asking:</p>
								<div className="flex flex-wrap gap-2">
									{sampleQuestions.slice(0, 3).map((question, index) => (
										<button
											key={index}
											onClick={() => setInput(question)}
											className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
										>
											{question}
										</button>
									))}
								</div>
							</div>
						)}

						{/* Input */}
						<div className="p-4 border-t border-gray-200 dark:border-gray-700">
							<div className="flex gap-2">
								<input
									ref={inputRef}
									type="text"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter' && !e.shiftKey) {
											e.preventDefault();
											handleSend();
										}
									}}
									placeholder="Ask me anything..."
									className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
									disabled={isLoading}
									autoFocus
								/>
								<button
									onClick={handleSend}
									disabled={!input.trim() || isLoading}
									className="w-10 h-10 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
								>
									{isLoading ? (
										<svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
										</svg>
									) : (
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
										</svg>
									)}
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}


