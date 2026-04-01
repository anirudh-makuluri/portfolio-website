import React from "react";

export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        &copy; {new Date().getFullYear()} Makuluri Anirudh Raghavendra. All rights reserved.
      </small>
      <p className="text-xs">
        Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and a lightweight knowledge-graph chatbot.
      </p>
    </footer>
  );
}
