import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import { Analytics } from '@vercel/analytics/react';
import ScrollToTop from "@/components/scroll-to-top";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anirudh Makuluri | Full-Stack & AI/ML Developer",
  description: "Full-Stack Developer and AI/ML Engineer specializing in React, Next.js, React Native, and Generative AI. Currently pursuing M.S. in Computer Science at Arizona State University.",
  keywords: [
    'Anirudh Makuluri', 
    'Anirudh Raghavendra Makuluri',
    'Full Stack Developer', 
    'React Developer', 
    'Next.js Developer',
    'React Native Developer',
    'AI/ML Engineer',
    'Generative AI',
    'Machine Learning',
    'Arizona State University',
    'ASU',
    'Software Engineer',
    'Web Developer',
    'TypeScript',
    'Node.js',
    'Firebase',
    'Google Cloud Platform',
    'Oracle Cloud'
  ],
  authors: [{ name: 'Anirudh Makuluri' }],
  creator: 'Anirudh Makuluri',
  publisher: 'Anirudh Makuluri',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anirudh-makuluri.xyz',
    title: 'Anirudh Makuluri | Full-Stack & AI/ML Developer',
    description: 'Full-Stack Developer and AI/ML Engineer specializing in React, Next.js, React Native, and Generative AI.',
    siteName: 'Anirudh Makuluri Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anirudh Makuluri | Full-Stack & AI/ML Developer',
    description: 'Full-Stack Developer and AI/ML Engineer specializing in React, Next.js, React Native, and Generative AI.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth dark">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#9BE8D8] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#0E2954]"></div>
        <div className="bg-[#78C1F3] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#1F6E8C]"></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />

            <Toaster position="top-right" />
            <ThemeSwitch />
            <ScrollToTop />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
		<Analytics/>
      </body>
    </html>
  );
}
