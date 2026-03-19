"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { CustomSelect } from "./CustomSelect";

// Local bulletproof mapping to override any bad constants.ts logic
const ACADEMIC_MAP: Record<string, string[]> = {
  "LP": ["Malayalam", "English", "EVS", "Mathematics"],
  "UP": ["Malayalam", "English", "Hindi", "Basic Science", "Social Science", "Mathematics"],
  "HS": ["Malayalam", "English", "Hindi", "Physics", "Chemistry", "Biology", "Social Science", "Mathematics", "IT"],
  "HSS": ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "Accountancy", "Economics", "Business Studies", "Political Science", "History"]
};

function getSubjectsForClassNum(classNum: string): string[] {
  if (classNum === "All") return ["All Subjects", ...Array.from(new Set(Object.values(ACADEMIC_MAP).flat()))];
  const num = Number(classNum);
  if (num >= 1 && num <= 4) return ["All Subjects", ...ACADEMIC_MAP["LP"]];
  if (num >= 5 && num <= 7) return ["All Subjects", ...ACADEMIC_MAP["UP"]];
  if (num >= 8 && num <= 10) return ["All Subjects", ...ACADEMIC_MAP["HS"]];
  if (num >= 11 && num <= 12) return ["All Subjects", ...ACADEMIC_MAP["HSS"]];
  return ["All Subjects"];
}

export function SidebarFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [classNum, setClassNum] = useState(searchParams.get("class") || "All");
  const [subject, setSubject] = useState(searchParams.get("subject") || "All");

  const [availableSubjects, setAvailableSubjects] = useState<string[]>(["All Subjects"]);

  useEffect(() => {
    const allowed = getSubjectsForClassNum(classNum);
    setAvailableSubjects(allowed);
    
    const subjectValue = subject === "All" ? "All Subjects" : subject;
    if (subjectValue !== "All Subjects" && !allowed.includes(subjectValue)) {
      setSubject("All");
    }
  }, [classNum]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (classNum && classNum !== "All") params.set("class", classNum);
      if (subject && subject !== "All" && subject !== "All Subjects") params.set("subject", subject);
      
      router.push(pathname + "?" + params.toString());
    }, 400); 
    return () => clearTimeout(timeout);
  }, [query, classNum, subject, pathname, router]);

  const classOptions = ["All Classes", ...Array.from({length: 12}, (_, i) => `Class ${i + 1}`)];
  const displayClass = classNum === "All" ? "All Classes" : `Class ${classNum}`;
  const displaySubject = subject === "All" ? "All Subjects" : subject;

  return (
    <div className="bg-[#012B39]/80 p-6 rounded-xl border border-white/5 backdrop-blur-md transition-all hover:border-[#00ED64]/50 sticky top-28 shadow-xl z-30">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-[#00ED64]" />
        <h2 className="text-xl font-extrabold tracking-[-0.02em] text-white">Filters</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 tracking-widest uppercase">Search Keyword</label>
          <div className="relative z-10">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Gravity..."
              className="w-full bg-[#001E2B] border border-gray-600 rounded-lg p-3 pl-11 pr-3 text-white focus:border-[#00ED64] outline-none transition-colors shadow-sm focus:shadow-[0_0_15px_rgba(0,237,100,0.1)]"
            />
          </div>
        </div>

        <div className="space-y-2 z-50 relative">
          <label className="text-xs font-bold text-slate-300 tracking-widest uppercase">Target Class</label>
          <CustomSelect 
            options={classOptions}
            value={displayClass}
            onChange={(val) => setClassNum(val === "All Classes" ? "All" : val.replace("Class ", ""))}
          />
        </div>

        <div className="space-y-2 z-40 relative">
          <label className="text-xs font-bold text-slate-300 tracking-widest uppercase">Academic Subject</label>
          <CustomSelect 
            options={availableSubjects}
            value={displaySubject}
            onChange={(val) => setSubject(val === "All Subjects" ? "All" : val)}
          />
        </div>
      </div>
    </div>
  );
}
