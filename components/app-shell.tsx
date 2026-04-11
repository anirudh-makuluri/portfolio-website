import { Suspense } from "react";
import { cookies } from "next/headers";
import Header from "@/components/header";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { GraphHighlightProvider } from "@/context/graph-highlight-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import ViewModeProvider from "@/context/view-mode-context";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/scroll-to-top";
import AnimatedBackground from "@/components/background";
import Chatbot from "@/components/chatbot";
import RpgTransition from "@/components/rpg/rpg-transition";
import XpBar from "@/components/rpg/xp-bar";
import { CoinProvider } from "@/components/rpg/coin-context";
import { RpgWorldScrollProvider } from "@/context/rpg-world-scroll-context";

export default async function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieVm = cookieStore.get("viewMode")?.value;
  const initialViewMode =
    cookieVm === "rpg" || cookieVm === "simple" ? cookieVm : "simple";

  return (
    <ThemeContextProvider>
      <ViewModeProvider initialViewMode={initialViewMode}>
        <CoinProvider>
          <RpgWorldScrollProvider>
            <AnimatedBackground />
            <ActiveSectionContextProvider>
              <GraphHighlightProvider>
                <Header />
                {children}
                <Suspense>
                  <Footer />
                </Suspense>

                <Toaster position="top-right" />
                <ThemeSwitch />
                <ScrollToTop />
                <Chatbot />
                <RpgTransition />
                <XpBar />
              </GraphHighlightProvider>
            </ActiveSectionContextProvider>
          </RpgWorldScrollProvider>
        </CoinProvider>
      </ViewModeProvider>
    </ThemeContextProvider>
  );
}
