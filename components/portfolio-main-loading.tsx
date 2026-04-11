/** Shown while client-only portfolio shell loads — matches RPG map backdrop to avoid a white flash. */
export default function PortfolioMainLoading() {
  return (
    <main
      className="min-h-[100dvh] w-full bg-gradient-to-b from-[#f0f5fa] via-[#e8f0e6] to-[#f5f0e0] dark:from-[#0c0c24] dark:via-[#0a0f1e] dark:to-[#060610]"
      aria-busy="true"
      aria-label="Loading portfolio"
    />
  );
}
