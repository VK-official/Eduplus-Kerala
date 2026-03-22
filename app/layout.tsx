import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header";
import { ThemeProvider } from "../components/theme-provider";
import { BottomNavWrapper } from "../components/BottomNavWrapper";
import { GSAPProvider } from "../components/GSAPProvider";
import { MarqueeBanner } from "../components/MarqueeBanner";
import FeedbackWidget from "../components/FeedbackWidget";

const inter = Inter({ subsets: ["latin"] });

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Eduplus Kerala',
    default: 'Eduplus Kerala - Free SCERT Study Materials & Notes',
  },
  description: 'The ultimate community-driven learning vault for Kerala SCERT students. Download free previous year questions, focus area notes, and teacher-verified study materials.',
  keywords: ['Kerala syllabus', 'SCERT notes', 'SSLC previous question papers', 'Plus Two study materials', 'Eduplus Kerala', 'Free educational resources'],
  openGraph: {
    title: 'Eduplus Kerala | Free SCERT Study Vault',
    description: 'Download verified study materials, notes, and previous year question papers for absolutely free.',
    url: 'https://edupluskerala.com', // Replace with actual domain later
    siteName: 'Eduplus Kerala',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduplus Kerala | Study Vault',
    description: 'Free SCERT study materials for Kerala students.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-[#001E2B] text-white pb-32`} suppressHydrationWarning>
        <GSAPProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
            <MarqueeBanner />
            <Header />
            <main className="flex-1 w-full bg-[#001E2B] pb-32 relative z-0 pt-20">
              {children}
            </main>
            <BottomNavWrapper />
            <div className="flex justify-center pb-6 mt-12">
              <div className="bg-slate-800 text-slate-300 font-bold py-1 px-4 rounded-md shadow-inner text-sm tracking-widest border border-slate-700">
                © V.K
              </div>
            </div>
          </ThemeProvider>
        </GSAPProvider>
        <FeedbackWidget />
      </body>
    </html>
  );
}
