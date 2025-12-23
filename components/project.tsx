"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
    title,
    description,
    tags,
    imageUrl,
    githubLink,
    liveLink
}: ProjectProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"],
    });
    const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    return (
        <motion.div
            ref={ref}
            style={{
                scale: scaleProgess,
                opacity: opacityProgess,
            }}
            className="group mb-3 sm:mb-8 last:mb-0"
        >
            <section className="bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:min-h-[20rem] hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
                <div className={`pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:pb-10 ${imageUrl ? "sm:max-w-[50%] sm:group-even:ml-[18rem]" : "sm:max-w-full"} flex flex-col`}>
                    <h3 className="text-2xl font-semibold text-center sm:text-left">{title}</h3>
                    <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
                        {description}
                    </p>
                    <ul className="flex flex-wrap mt-4 gap-2">
                        {tags.map((tag, index) => (
                            <li
                                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                                key={index}
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-3 mt-4">
                        {githubLink && (
                            <Link 
                                href={githubLink} 
                                target="_blank"
                                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm hover:scale-105 transition dark:bg-white/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaGithub />
                                Code
                            </Link>
                        )}
                        {liveLink && (
                            <Link 
                                href={liveLink} 
                                target="_blank"
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:scale-105 transition"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaExternalLinkAlt className="text-xs" />
                                Live Demo
                            </Link>
                        )}
                    </div>
                </div>

                    {
                        imageUrl ? (
                            <div className="absolute hidden sm:block top-12 -right-40 w-[28.25rem] rounded-lg shadow-2xl bg-white p-3
                            transition 
                            group-hover:scale-[1.04]
                            group-hover:-translate-x-3
                            group-hover:translate-y-3
                            group-hover:-rotate-2

                            group-even:group-hover:translate-x-3
                            group-even:group-hover:translate-y-3
                            group-even:group-hover:rotate-2

                            group-even:right-[initial] group-even:-left-40">
                                <Image
                                    src={imageUrl}
                                    alt={title}
                                    quality={95}
                                    className="rounded-md w-full h-auto"
                                />
                            </div>
                        ) : null
                    }
            </section>
        </motion.div>
    );
}
