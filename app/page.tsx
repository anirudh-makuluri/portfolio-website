import { cacheLife, cacheTag } from "next/cache";
import PortfolioMainGate from "@/components/portfolio-main-gate";

export default async function Home() {
  "use cache";
  cacheLife("max");
  cacheTag("portfolio");

  return <PortfolioMainGate />;
}
