import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header";
import AuthProvider from "../components/AuthProvider";
import { ThemeProvider } from "../components/theme-provider";
import { BottomNavWrapper } from "../components/BottomNavWrapper";
import { GSAPProvider } from "../components/GSAPProvider";

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
            <AuthProvider>
              <Header />
              <main className="flex-1 w-full bg-[#001E2B] pb-32 relative z-0 pt-20">
                {children}
              </main>
              <BottomNavWrapper />
            </AuthProvider>
          </ThemeProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
