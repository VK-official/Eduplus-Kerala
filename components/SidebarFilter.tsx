"use client";

import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
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

/** 
 * Eduplus Kerala - Phase 8 (OBLITERATE THE ROUTER)
 * This component is strictly router-free. No useRouter, no router.push, no SearchParams.
 */
export function SidebarFilter({
  searchQuery,
  setSearchQuery,
  classNum,
  setClassNum,
  subject,
  setSubject,
}: SidebarFilterProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Purely reactive state management — no router pushing
  useEffect(() => {
    const subjects = getSubjectsForClassNum(classNum);
    if (subject !== "All" && !subjects.includes(subject)) {
      setSubject("All");
    }
  }, [classNum, subject, setSubject]);

  const classOptions   = ["All Classes", ...CLASS_LIST.map(c => `Class ${c}`)];
  const subjectsForClass = classNum !== "All" ? ACADEMIC_MAP[classNum] || {} : {};
  const subjectOptions = ["All Subjects", ...Object.keys(subjectsForClass)];
  const displayClass   = classNum  === "All" ? "All Classes"  : `Class ${classNum}`;
  const displaySubject = subject   === "All" ? "All Subjects" : subject;

  return (
    <div className="bg-[#012B39]/80 p-6 rounded-3xl border border-white/5 backdrop-blur-md hover:border-[#00ED64]/40 transition-colors sticky top-28 shadow-xl z-30">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-[#00ED64]" />
        <h2 className="text-xl font-extrabold tracking-[-0.04em] text-white uppercase font-black">Filters</h2>
      </div>

      <div className="space-y-6">
        {/* Category Tabs — Strictly onClick only, NO ROUTING */}
        <div className="grid grid-cols-2 gap-2 mb-4 p-1 rounded-2xl bg-[#001E2B] border border-white/5 overflow-hidden">
          <button
            onClick={(e) => { e.preventDefault(); setClassNum("5"); }}
            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              (Number(classNum) >= 5 && Number(classNum) <= 7)
                ? "bg-[#00ED64]/10 text-[#00ED64] border border-[#00ED64]/30 shadow-[0_0_20px_rgba(0,237,100,0.15)]"
                : "text-slate-500 hover:text-slate-300 border border-[rgba(0,0,0,0)]"
            }`}
          >
            UP (5–7)
          </button>
          <button
            onClick={(e) => { e.preventDefault(); setClassNum("8"); }}
            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              Number(classNum) >= 8 && Number(classNum) <= 10
                ? "bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                : "text-slate-500 hover:text-slate-300 border border-[rgba(0,0,0,0)]"
            }`}
          >
            HS (8–10)
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Direct Search</label>
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="e.g. Physics..."
              className="w-full bg-[#001E2B] border border-gray-800 rounded-xl p-3 pl-11 text-slate-200 placeholder:text-slate-700 focus:border-[#00ED64] outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2 relative z-50">
          <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Class Index</label>
          <CustomSelect
            options={classOptions}
            value={displayClass}
            onChange={val => setClassNum(val === "All Classes" ? "All" : val.replace("Class ", ""))}
          />
        </div>

        <div className="space-y-2 relative z-40">
          <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Subject Range</label>
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
