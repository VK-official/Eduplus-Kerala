"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { BookOpen } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const isAdmin = pathname === "/admin";

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();

    // Real-time listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#001E2B]/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 py-4 shadow-lg">
      <Link href="/" className="flex items-center gap-3 group cursor-pointer hover:opacity-90 transition-opacity">
        <div className="w-10 h-10 bg-slate-900/80 border border-slate-700 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,237,100,0.2)] group-hover:border-[#00ED64]/50 transition-colors">
          <BookOpen className="w-6 h-6 text-[#00ED64]" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-white font-black text-xl tracking-tighter">EDUPLUS</span>
          <span className="text-[#00ED64] font-bold text-[10px] tracking-[0.3em] uppercase">Kerala</span>
        </div>
      </Link>
      
      <div className="flex items-center gap-6 text-slate-300 font-black tracking-widest text-[10px]">
        {!isAdmin && (
          <Link href="/vault" className="hover:text-[#00ED64] transition-colors uppercase">
            Vault
          </Link>
        )}
        {user && (
          <button
            onClick={handleSignOut}
            className="px-6 py-2 rounded-full border border-white/10 hover:text-[#00ED64] hover:bg-white/5 transition-colors uppercase"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}
