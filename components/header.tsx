"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isVault = pathname === "/vault";
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

  const handleSignIn = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/dashboard`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const bgColor      = useTransform(scrollY, [0, 60], ["rgba(0,30,43,0)", "rgba(0,30,43,0.55)"]);
  const blur         = useTransform(scrollY, [0, 60], ["blur(0px)", "blur(20px)"]);
  const borderRadius = useTransform(scrollY, [0, 60], ["0rem",       "9999px"]);
  const marginTop    = useTransform(scrollY, [0, 60], ["0rem",       "1rem"]);
  const marginX      = useTransform(scrollY, [0, 60], ["0rem",       "1.5rem"]);
  const borderColor  = useTransform(scrollY, [0, 60], ["rgba(0,237,100,0.2)", "rgba(0,237,100,0)"]);

  return (
    <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <motion.header
        className="pointer-events-auto flex justify-between items-center px-6 md:px-8 py-4 border-b border-white/5"
        style={{
          background: bgColor,
          backdropFilter: blur,
          WebkitBackdropFilter: blur,
          borderRadius,
          marginTop,
          marginLeft: marginX,
          marginRight:  marginX,
          borderColor,
        }}
      >
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="32" height="32" rx="9" stroke="#00ED64" strokeWidth="1.5" fill="none" />
            <path
              d="M6 18 L11 18 L14 10 L18 26 L22 14 L25 18 L30 18"
              stroke="#00ED64"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ strokeDasharray: 60, strokeDashoffset: 60, animation: "drawSVG 3s ease-in-out infinite alternate" }}
            />
          </svg>
          <span className="hidden md:block text-xl font-black tracking-[-0.04em] text-white uppercase">
            Eduplus <span className="text-[#00ED64]" style={{ textShadow: "0 0 15px rgba(0,237,100,0.4)" }}>Kerala</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {!isAdmin && (
            <Link href="/vault" className="text-white/70 hover:text-[#00ED64] text-sm font-bold uppercase tracking-widest transition-colors">
              Vault
            </Link>
          )}
          {user && (
            <button
              onClick={handleSignOut}
              className="px-6 py-2 rounded-full border border-white/10 text-slate-400 text-sm font-semibold hover:bg-white/5 transition-colors uppercase tracking-widest"
            >
              Sign Out
            </button>
          )}
        </div>
      </motion.header>

      <style>{`
        @keyframes drawSVG {
          0%   { stroke-dashoffset: 60; }
          60%  { stroke-dashoffset: 0;  }
          100% { stroke-dashoffset: 0;  }
        }
      `}</style>
    </div>
  );
}
