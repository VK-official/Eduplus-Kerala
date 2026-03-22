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
        <div className="book-perspective w-10 h-10 relative">
          {/* THE SPINE */}
          <div className="absolute left-0 top-0 w-1 h-full bg-[#00a340] rounded-sm shadow-[0_0_10px_rgba(0,237,100,0.4)] z-20"></div>
          
          {/* BACK COVER (Static) */}
          <div className="absolute left-1 w-8 h-full bg-[#001E2B] border border-slate-700 rounded-sm"></div>
          
          {/* MIDDLE PAGES (Visual Thickness) */}
          <div className="absolute left-1.5 w-7 h-[90%] top-[5%] bg-slate-200 rounded-sm shadow-inner"></div>
          
          {/* THE FLIPPING PAGE */}
          <div className="absolute left-1 w-8 h-full origin-left z-10 [transform-style:preserve-3d] animate-[realisticFlip_3s_infinite_ease-in-out]">
            {/* Front of flipping page */}
            <div className="absolute inset-0 bg-[#00ED64] rounded-sm flex items-center justify-center backface-hidden border border-[#001E2B]">
              <span className="text-[#001E2B] font-black text-sm">E</span>
            </div>
            {/* Back of flipping page */}
            <div className="absolute inset-0 bg-[#008f3a] rounded-sm [transform:rotateY(180deg)] backface-hidden border border-[#001E2B]"></div>
            {/* Shadow Overlay during flip */}
            <div className="absolute inset-0 bg-black animate-[pageShadow_3s_infinite] pointer-events-none"></div>
          </div>
        </div>

        {/* LOGO TEXT WITH GRADIENT */}
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
