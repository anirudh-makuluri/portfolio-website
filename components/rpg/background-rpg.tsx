"use client";

export default function BackgroundRPG() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c24] via-[#0a0f1e] to-[#060610]" />

      {/* Nebula glow blobs */}
      <div
        className="absolute top-[5%] left-[15%] w-[50vw] h-[40vh] rounded-full blur-[150px] bg-[#1a0a40]/30"
        style={{ animation: "rpg-nebula 30s ease-in-out infinite" }}
      />
      <div
        className="absolute top-[35%] right-[5%] w-[40vw] h-[30vh] rounded-full blur-[120px] bg-[#0a2040]/25"
        style={{ animation: "rpg-nebula 25s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute bottom-[15%] left-[25%] w-[35vw] h-[25vh] rounded-full blur-[100px] bg-[#200a30]/20"
        style={{ animation: "rpg-nebula 35s ease-in-out infinite" }}
      />

      {/* Star field (CSS-only, two offset layers) */}
      <div className="absolute inset-0 rpg-stars" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,.03) 2px,rgba(255,255,255,.03) 4px)",
        }}
      />
    </div>
  );
}
