import { cacheLife, cacheTag } from "next/cache";
import HomePage from "@/components/home-page";

export default async function Home() {
  "use cache";
  cacheLife("max");
  cacheTag("portfolio");

  return <HomePage />;
}
