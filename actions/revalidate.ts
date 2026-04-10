"use server";

import { revalidateTag } from "next/cache";

export async function revalidatePortfolio() {
  revalidateTag("portfolio", "max");
  revalidateTag("knowledge-graph", "max");
}
