import Link from 'next/link';
import { Search, Activity, Upload, Bookmark } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { AuthButton } from './AuthButton';
import { getServerSession } from "next-auth/next";
import User from "../models/User";
import dbConnect from "../lib/mongodb";

export async function Header() {
  const session = await getServerSession();
  let role = "student";

  if (session?.user?.email) {
    try {
      await dbConnect();
      const user = await User.findOne({ email: session.user.email }).lean();
      if (user) role = user.role;
    } catch(e) {}
  }

  const isTeacher = role === "teacher" || role === "admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/10 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
          <Activity className="h-6 w-6 text-blue-400" />
          <span className="text-xl font-bold tracking-tight text-white">
            BioVision <span className="text-blue-400">Remake</span>
          </span>
        </Link>
        
        <div className="flex flex-1 items-center justify-center px-6 hidden md:flex">
          <div className="relative w-full max-w-xl flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden lg:block whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/10">
              All Notes
            </Link>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-full border border-white/10 bg-black/40 py-2 pl-11 pr-4 text-sm text-white placeholder-slate-400 backdrop-blur-md transition-all focus:border-blue-500 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                placeholder="Global Search..."
              />
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          {session?.user && (
            <Link href="/bookmarks" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-white/10">
              <Bookmark className="h-4 w-4" />
              <span className="hidden lg:inline">Saved</span>
            </Link>
          )}

          {isTeacher && (
            <Link href="/upload" className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2 rounded-full hover:bg-white/10">
              <Upload className="h-4 w-4" />
              <span className="hidden xl:inline">Teacher Dashboard</span>
            </Link>
          )}

          <ThemeToggle />
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}
