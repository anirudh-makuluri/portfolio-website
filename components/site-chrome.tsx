"use client";

import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import Chatbot from "@/components/chatbot";
import { useSiteMode } from "@/context/site-mode-context";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMinimalMode } = useSiteMode();

  return (
    <>
      {!isMinimalMode && <Header />}
      {children}
      {!isMinimalMode && (
        <Suspense>
          <Footer />
        </Suspense>
      )}
      {!isMinimalMode && <ScrollToTop />}
      {!isMinimalMode && <Chatbot />}
    </>
  );
}
