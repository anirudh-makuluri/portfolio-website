import PortfolioMainLoading from "@/components/portfolio-main-loading";

/** Shown while cookie-backed shell resolves — avoids a blank Suspense gap. */
export default function AppShellFallback() {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-gray-50 dark:bg-gray-900" />
      <PortfolioMainLoading />
    </>
  );
}
