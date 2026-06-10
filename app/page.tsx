import { cacheLife, cacheTag } from "next/cache";
import HomePageV2 from "@/components/home-page-v2";

export default async function Home() {
  "use cache";
  cacheLife("max");
  cacheTag("portfolio");

  return <HomePageV2 />;
}
