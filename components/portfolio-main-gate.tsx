"use client";

import dynamic from "next/dynamic";
import PortfolioMainLoading from "@/components/portfolio-main-loading";

const PortfolioMain = dynamic(() => import("@/components/portfolio-main"), {
  ssr: false,
  loading: () => <PortfolioMainLoading />,
});

export default function PortfolioMainGate() {
  return <PortfolioMain />;
}
