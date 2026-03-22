"use client";
import { useEffect, useState } from "react";
import { getAnnouncement } from "../lib/actions/admin.actions";
import { AlertCircle } from "lucide-react";

export function MarqueeBanner() {
  const [text, setText] = useState("");
  
  useEffect(() => {
    getAnnouncement().then(t => {
      if (t) setText(t);
    });
  }, []);

  if (!text) return null;

  return (
    <div className="w-full bg-[#00ED64] text-[#001E2B] overflow-hidden whitespace-nowrap py-1.5 relative z-[100] border-b border-[#001E2B]/20">
      <div className="inline-flex animate-[marquee_20s_linear_infinite] items-center gap-12 font-black uppercase tracking-[0.2em] text-[10px]">
        {/* Repeating text spans to ensure continuous scroll flow without breaking */}
        <span className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 animate-pulse" /> GLOBAL ALERT: {text}</span>
        <span className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 animate-pulse" /> GLOBAL ALERT: {text}</span>
        <span className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 animate-pulse" /> GLOBAL ALERT: {text}</span>
        <span className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 animate-pulse" /> GLOBAL ALERT: {text}</span>
        <span className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 animate-pulse" /> GLOBAL ALERT: {text}</span>
      </div>
    </div>
  );
}
