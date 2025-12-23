"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900">
        <motion.div
          className="absolute top-[-6rem] right-[11rem] w-[31.25rem] h-[31.25rem] bg-[#9BE8D8] dark:bg-[#0E2954] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[10rem] opacity-70 dark:opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[-1rem] left-[-35rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] w-[50rem] h-[31.25rem] bg-[#78C1F3] dark:bg-[#1F6E8C] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[10rem] opacity-70 dark:opacity-30"
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${(i * 13 + 10) % 100}%`,
              top: `${(i * 17 + 15) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {i % 3 === 0 ? (
              <div className="w-3 h-3 border-2 border-[#78C1F3]/30 dark:border-[#78C1F3]/20 rotate-45" />
            ) : i % 3 === 1 ? (
              <div className="w-4 h-4 rounded-full border-2 border-[#9BE8D8]/30 dark:border-[#9BE8D8]/20" />
            ) : (
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-[#78C1F3]/30 dark:border-b-[#78C1F3]/20" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />

      {/* Interactive Cursor Glow */}
      <motion.div
        className="pointer-events-none absolute w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(120, 193, 243, 0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 200,
          mass: 0.1,
        }}
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] bg-noise" />
    </div>
  );
}

