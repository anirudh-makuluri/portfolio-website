"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "../submit-btn";
import toast from "react-hot-toast";

export default function ContactRPG() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="py-16 sm:py-24 w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-[38rem] mx-auto px-4 text-center">
        <motion.h2
          className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-[#fcbc3c] rpg-glow-gold mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          WARP ZONE
        </motion.h2>
        <motion.p
          className="font-[family-name:var(--font-pixel)] text-[7px] text-white/20 mb-8 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          SEND A MESSAGE
        </motion.p>

        <motion.p
          className="text-white/40 mb-8 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Drop your message into the pipe and it&apos;ll warp straight to{" "}
          <a
            className="text-[#fcbc3c]/70 underline underline-offset-4 hover:text-[#fcbc3c] transition-colors"
            href="mailto:anirudh.makuluri@gmail.com"
          >
            anirudh.makuluri@gmail.com
          </a>
        </motion.p>

        {/* Pipe-styled form */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", damping: 20 }}
        >
          {/* Pipe rim top */}
          <div className="mx-auto w-[92%] h-3 bg-[#30a050]/20 border border-[#30a050]/15 rounded-t-lg relative z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#30a050]/10 via-[#30a050]/20 to-[#30a050]/10 rounded-t-lg" />
          </div>

          {/* Pipe body / form */}
          <div className="mx-auto w-[88%] rpg-card !rounded-none !rounded-b-xl !border-[#30a050]/10 p-5 sm:p-8">
            <form
              className="flex flex-col gap-3 relative z-10"
              action={async (formData) => {
                const { error } = await sendEmail(formData);
                if (error) {
                  toast.error(error);
                  return;
                }
                toast.success("Message warped successfully!");
              }}
            >
              <input
                type="text"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <input
                className="h-12 px-4 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white placeholder-white/20 font-[family-name:var(--font-pixel)] text-[9px] focus:border-[#fcbc3c]/30 focus:outline-none transition-colors"
                name="senderEmail"
                type="email"
                required
                maxLength={500}
                placeholder="YOUR EMAIL"
              />
              <textarea
                className="h-40 p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white placeholder-white/20 font-[family-name:var(--font-pixel)] text-[9px] focus:border-[#fcbc3c]/30 focus:outline-none transition-colors resize-none"
                name="message"
                placeholder="YOUR MESSAGE"
                required
                maxLength={5000}
              />
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <SubmitBtn />
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
