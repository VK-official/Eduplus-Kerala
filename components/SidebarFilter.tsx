"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, Book, BookOpen, User, Calendar, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { CustomSelect } from "./CustomSelect";

import { ACADEMIC_MAP, CLASS_LIST } from "../lib/utils/constants";

function getSubjectsForClassNum(classNum: string): string[] {
  if (classNum === "All") {
    const all = Object.values(ACADEMIC_MAP).flatMap(c => Object.keys(c));
    return Array.from(new Set(all));
  }
  const cls = ACADEMIC_MAP[classNum];
  return cls ? Object.keys(cls) : [];
}

interface SidebarFilterProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  classNum: string;
  setClassNum: (c: string) => void;
  subject: string;
  setSubject: (s: string) => void;
}

export function SidebarFilter({
  searchQuery,
  setSearchQuery,
  classNum,
  setClassNum,
  subject,
  setSubject,
}: SidebarFilterProps) {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Update subjects silently when class changes — no router interaction
  useEffect(() => {
    const subjects = getSubjectsForClassNum(classNum);
    // Only reset subject if it's no longer valid for the new class
    if (subject !== "All" && !subjects.includes(subject)) {
      setSubject("All");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classNum]);

  // Debounced push — ALWAYS goes to /vault, never back to /
  const pushFilters = useCallback((q: string, cls: string, sub: string) => {
    const params = new URLSearchParams();
    if (q)                               params.set("q",       q);
    if (cls !== "All")                   params.set("class",   cls);
    if (sub !== "All")                   params.set("subject", sub);
    const qs = params.toString();
    router.push("/vault" + (qs ? "?" + qs : ""));
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => pushFilters(searchQuery, classNum, subject), 400);
    return () => clearTimeout(timer);
  }, [searchQuery, classNum, subject, pushFilters]);

  const classOptions   = ["All Classes", ...CLASS_LIST.map(c => `Class ${c}`)];
  const subjectsForClass = classNum !== "All" ? ACADEMIC_MAP[classNum] || {} : {};
  const subjectOptions = ["All Subjects", ...Object.keys(subjectsForClass)];
  const displayClass   = classNum  === "All" ? "All Classes"  : `Class ${classNum}`;
  const displaySubject = subject   === "All" ? "All Subjects" : subject;

  return (
    <div className="bg-[#012B39]/80 p-6 rounded-xl border border-white/5 backdrop-blur-md hover:border-[#00ED64]/40 transition-colors sticky top-28 shadow-xl z-30">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-[#00ED64]" />
        <h2 className="text-xl font-extrabold tracking-[-0.04em] text-white">Filters</h2>
      </div>

      <div className="space-y-6">
        {/* Category Striker Tabs */}
        <div className="grid grid-cols-2 gap-2 mb-4 p-1 rounded-xl bg-[#001E2B] border border-white/5">
          <button
            onClick={() => { if (classNum === "All" || Number(classNum) > 7) setClassNum("5"); }}
            className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              (Number(classNum) >= 5 && Number(classNum) <= 7)
                ? "bg-[#00ED64]/10 text-[#00ED64] border border-[#00ED64]/30 shadow-[0_0_20px_rgba(0,237,100,0.15)]"
                : "text-slate-500 hover:text-slate-300 border border-[rgba(0,0,0,0)]"
            }`}
          >
            UP (5–7)
          </button>
          <button
            onClick={() => { if (Number(classNum) < 8) setClassNum("8"); }}
            className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              Number(classNum) >= 8 && Number(classNum) <= 10
                ? "bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                : "text-slate-500 hover:text-slate-300 border border-[rgba(0,0,0,0)]"
            }`}
          >
            HS (8–10)
          </button>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 tracking-widest uppercase">Search</label>
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="e.g. Gravity..."
              className="w-full bg-[#001E2B] border border-gray-700 rounded-lg p-3 pl-11 text-slate-200 placeholder:text-slate-600 focus:border-[#00ED64] outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2 relative z-50">
          <label className="text-xs font-bold text-slate-400 tracking-widest uppercase">Class</label>
          <CustomSelect
            options={classOptions}
            value={displayClass}
            onChange={val => setClassNum(val === "All Classes" ? "All" : val.replace("Class ", ""))}
          />
        </div>

        <div className="space-y-2 relative z-40">
          <label className="text-xs font-bold text-slate-400 tracking-widest uppercase">Subject</label>
          <CustomSelect
            options={subjectOptions}
            value={displaySubject}
            onChange={val => setSubject(val === "All Subjects" ? "All" : val)}
          />
        </div>
      </div>
    </div>
  );
}
