"use client";

import { motion } from "framer-motion";

export default function SectionDividerRPG() {
  return (
    <motion.div
      className="my-24 hidden sm:flex items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125, type: "spring", damping: 12 }}
    >
      <div className="flex flex-col items-center">
        {/* Pipe rim (top, wider) */}
        <div className="w-14 h-3 bg-[#30a050] border-2 border-[#1a6030] rounded-sm" />
        {/* Pipe body */}
        <div className="w-10 h-10 bg-[#30a050] border-x-2 border-[#1a6030] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#40b060] via-[#30a050] to-[#208040]" />
        </div>
        {/* Pipe rim (bottom, wider) */}
        <div className="w-14 h-3 bg-[#30a050] border-2 border-[#1a6030] rounded-sm" />
      </div>
    </motion.div>
  );
}
