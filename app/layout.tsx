import { Suspense } from "react";
import "./globals.css";
import { Inter, Press_Start_2P } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import AppShell from "@/components/app-shell";
import AppShellFallback from "@/components/app-shell-fallback";

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-pixel" });

export const metadata = {
  metadataBase: new URL("https://anirudh-makuluri.xyz"),
  title: "Anirudh Makuluri | Full-Stack & AI/ML Developer",
  description: "Full-stack engineer building AI products, developer tools, and cloud-native applications with React, Next.js, React Native, and modern infrastructure.",
  keywords: [
    'Anirudh Makuluri', 
    'Anirudh Raghavendra Makuluri',
    'Full Stack Developer', 
    'React Developer', 
    'Next.js Developer',
    'React Native Developer',
    'AI/ML Engineer',
    'Developer Tools',
    'DevOps',
    'Cloud Infrastructure',
    'Generative AI',
    'Machine Learning',
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
    <html lang="en" className="!scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${inter.className} ${pressStart2P.variable} bg-transparent text-gray-950 relative pt-28 sm:pt-36 dark:bg-transparent dark:text-gray-50 dark:text-opacity-90`}
        suppressHydrationWarning
      >
        <Suspense fallback={<AppShellFallback />}>
          <AppShell>{children}</AppShell>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
