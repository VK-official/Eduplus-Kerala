import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Upload, Activity } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BioVision Hub",
  description: "Educational Resource Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50`}>
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/30 dark:bg-black/30 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-white">BioVision</span>
            </Link>
            
            <nav className="flex items-center gap-6">
              <Link href="/upload" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900">
                <Upload className="h-4 w-4" />
                Upload Dashboard
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
