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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/20 bg-white/30 dark:border-slate-800/20 dark:bg-black/30 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity">
          <Activity className="h-6 w-6" />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            BioVision <span className="text-blue-600">Remake</span>
          </span>
        </Link>
        
        <div className="flex flex-1 items-center justify-center px-6 hidden md:flex">
          <div className="relative w-full max-w-xl flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors hidden lg:block whitespace-nowrap px-3 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              All Notes
            </Link>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-full border border-slate-300/40 bg-white/40 py-2 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-500 backdrop-blur-md transition-all focus:border-blue-500 focus:bg-white/60 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700/40 dark:bg-black/40 dark:text-white dark:placeholder-slate-400 dark:focus:bg-black/60 shadow-sm"
                placeholder="Global Search..."
              />
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          {session?.user && (
            <Link href="/bookmarks" className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              <Bookmark className="h-4 w-4" />
              <span className="hidden lg:inline">Saved</span>
            </Link>
          )}

          {isTeacher && (
            <Link href="/upload" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
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
