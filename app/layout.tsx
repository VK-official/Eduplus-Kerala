import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header";
import AuthProvider from "../components/AuthProvider";
import { ThemeProvider } from "../components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eduplus Kerala | Academic Excellence",
  description: "Premium educational resources for SCERT Kerala students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-atlas-bg text-gray-200 flex flex-col font-sans antialiased overflow-x-hidden`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
            <Header />
            <main className="flex-1 w-full bg-atlas-bg">{children}</main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
