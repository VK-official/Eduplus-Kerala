"use client";

import { useState, useMemo, useEffect } from "react";
import { SidebarFilter } from "./SidebarFilter";
import { SearchInput } from "./SearchInput"; // We already have this, we'll sync them
import Link from "next/link";
import { FileText, BookOpen, FileQuestion, ChevronRight, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface File {
  _id: string;
  title: string;
  class: number;
  subject: string;
  chapter?: string;
  type: "notes" | "question_paper" | "a_plus";
  fileSize?: string;
  specialtyTag?: string;
  description?: string;
}

const TYPE_ICON: Record<string, any> = {
  notes: BookOpen,
  question_paper: FileQuestion,
  a_plus: FileText,
};

const TAG_ORDER = [
  "SSLC Notes", "SSLC Model Question Paper", "SSLC Question Name", "SSLC Special",
  "Notes", "Normal Text", "Model Question Papers", "Previous Year Questions",
];

export function VaultContent({ initialFiles }: { initialFiles: File[] }) {
  const [q, setQ] = useState("");
  const [classNum, setClassNum] = useState("All");
  const [subject, setSubject] = useState("All");

  // Sync with SearchInput component's logic if needed, but for Zero-Reload, 
  // we focus on local filtering.

  const filteredFiles = useMemo(() => {
    return initialFiles.filter(f => {
      const matchQ = !q || 
        f.title.toLowerCase().includes(q.toLowerCase()) ||
        f.subject.toLowerCase().includes(q.toLowerCase()) ||
        f.description?.toLowerCase().includes(q.toLowerCase()) ||
        f.specialtyTag?.toLowerCase().includes(q.toLowerCase());
      
      const matchClass = classNum === "All" || f.class === Number(classNum);
      const matchSubject = subject === "All" || f.subject.toLowerCase() === subject.toLowerCase();
      
      return matchQ && matchClass && matchSubject;
    });
  }, [initialFiles, q, classNum, subject]);

  // Group by specialtyTag
  const grouped: Record<string, File[]> = {};
  for (const f of filteredFiles) {
    const tag = f.specialtyTag || "General";
    if (!grouped[tag]) grouped[tag] = [];
    grouped[tag].push(f);
  }

  const sortedTags = Object.keys(grouped).sort((a, b) => {
    const ai = TAG_ORDER.indexOf(a);
    const bi = TAG_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <SidebarFilter 
          searchQuery={q} setSearchQuery={setQ}
          classNum={classNum} setClassNum={setClassNum}
          subject={subject} setSubject={setSubject}
        />
      </div>

      <div className="lg:col-span-3 space-y-10">
        {/* We can also render SearchInput here or pass setters to it */}
        {/* For now, we'll keep the top-level search if we want, or just use the sidebar one */}
        
        <AnimatePresence mode="popLayout">
          {filteredFiles.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-white/5 bg-[#012B39]/30"
            >
              <FileText className="h-12 w-12 text-slate-700 mb-4" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No materials found</p>
              <p className="text-slate-600 text-sm mt-2">Try adjusting your filters.</p>
            </motion.div>
          ) : (
            sortedTags.map(tag => (
              <motion.section 
                key={tag}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="px-4 py-1.5 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-black uppercase tracking-widest whitespace-nowrap">
                    {tag}
                  </span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                {/* Resource List */}
                <div className="space-y-3">
                  {grouped[tag].map((file) => {
                    const Icon = TYPE_ICON[file.type] || FileText;
                    return (
                      <Link key={file._id} href={`/vault/${file._id}`}>
                        <div className="group flex items-center gap-4 p-4 md:p-5 rounded-2xl border border-white/5 bg-[#012B39]/40 backdrop-blur-md hover:border-[#00ED64]/30 hover:bg-[#012B39]/70 transition-all cursor-pointer">
                          <div className="p-3 bg-[#00ED64]/10 rounded-xl shrink-0">
                            <Icon className="h-5 w-5 text-[#00ED64]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-bold truncate group-hover:text-[#00ED64] transition-colors">{file.title}</p>
                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Class {file.class}</span>
                              <span className="text-slate-700">·</span>
                              <span className="text-slate-500 text-xs font-semibold">{file.subject}</span>
                              {file.chapter && <><span className="text-slate-700">·</span><span className="text-slate-500 text-xs font-semibold truncate max-w-[200px]">{file.chapter}</span></>}
                              {file.fileSize && <><span className="text-slate-700">·</span><span className="text-slate-600 text-xs">{file.fileSize}</span></>}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-700 group-hover:text-[#00ED64] shrink-0 transition-colors" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.section>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
