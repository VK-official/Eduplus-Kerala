import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header";
import { ThemeProvider } from "../components/theme-provider";
import { BottomNavWrapper } from "../components/BottomNavWrapper";
import { GSAPProvider } from "../components/GSAPProvider";
import { MarqueeBanner } from "../components/MarqueeBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eduplus Kerala | Academic Excellence",
  description: "Premium educational resources for SCERT Kerala students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-[#001E2B] text-white`} suppressHydrationWarning>
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
      </body>
    </html>
  );
}
