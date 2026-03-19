"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { CustomSelect } from "./CustomSelect";

const ACADEMIC_MAP: Record<string, string[]> = {
  "LP":  ["Malayalam", "English", "EVS", "Mathematics"],
  "UP":  ["Malayalam", "English", "Hindi", "Basic Science", "Social Science", "Mathematics"],
  "HS":  ["Malayalam", "English", "Hindi", "Physics", "Chemistry", "Biology", "Social Science", "Mathematics", "IT"],
  "HSS": ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "Accountancy", "Economics", "Business Studies", "Political Science", "History"],
};

function getSubjectsForClassNum(classNum: string): string[] {
  if (classNum === "All") return Array.from(new Set(Object.values(ACADEMIC_MAP).flat()));
  const num = Number(classNum);
  if (num >= 1  && num <= 4)  return ACADEMIC_MAP["LP"];
  if (num >= 5  && num <= 7)  return ACADEMIC_MAP["UP"];
  if (num >= 8  && num <= 10) return ACADEMIC_MAP["HS"];
  if (num >= 11 && num <= 12) return ACADEMIC_MAP["HSS"];
  return [];
}

export function SidebarFilter() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  // Local state — never caused by router.push
  const [query,    setQuery]    = useState(searchParams.get("q")       || "");
  const [classNum, setClassNum] = useState(searchParams.get("class")   || "All");
  const [subject,  setSubject]  = useState(searchParams.get("subject") || "All");

  const [availableSubjects, setAvailableSubjects] = useState<string[]>(getSubjectsForClassNum(classNum));

  // Update subjects silently when class changes — no router interaction
  useEffect(() => {
    const subjects = getSubjectsForClassNum(classNum);
    setAvailableSubjects(subjects);
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
    const timer = setTimeout(() => pushFilters(query, classNum, subject), 400);
    return () => clearTimeout(timer);
  }, [query, classNum, subject, pushFilters]);

  const classOptions   = ["All Classes", ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)];
  const subjectOptions = ["All Subjects", ...availableSubjects];
  const displayClass   = classNum  === "All" ? "All Classes"  : `Class ${classNum}`;
  const displaySubject = subject   === "All" ? "All Subjects" : subject;

  return (
    <div className="bg-[#012B39]/80 p-6 rounded-xl border border-white/5 backdrop-blur-md hover:border-[#00ED64]/40 transition-colors sticky top-28 shadow-xl z-30">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-[#00ED64]" />
        <h2 className="text-xl font-extrabold tracking-[-0.04em] text-white">Filters</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 tracking-widest uppercase">Search</label>
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
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
