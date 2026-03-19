"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button className="flex items-center justify-center px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white backdrop-blur-md cursor-not-allowed">
        <Loader2 className="h-4 w-4 animate-spin" />
      </button>
    );
  }

  if (session?.user) {
    return (
      <button 
        onClick={() => signOut()}
        className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium transition-colors backdrop-blur-md shadow-sm"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button 
      onClick={() => signIn("google")}
      className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 text-blue-700 dark:text-blue-300 text-sm font-medium transition-colors backdrop-blur-md shadow-sm"
    >
      Sign in with Google
    </button>
  );
}
