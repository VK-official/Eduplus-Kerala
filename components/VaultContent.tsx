"use client";

import { useState, useMemo, useEffect } from "react";
import { SidebarFilter } from "./SidebarFilter";
import { getFiles } from "../lib/actions/fetch.actions";
import Link from "next/link";
import { FileText, BookOpen, FileQuestion, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Resource {
  id: string;
  title: string;
  class: number;
  subject: string;
  part?: string;
  chapter?: string;
  resource_type: "notes" | "question_paper" | "a_plus";
  file_size?: string;
  description?: string;
  specialty_tag?: string;
  resource_link: string;
  comments?: any[];
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

export function VaultContent({ initialFiles = [] }: { initialFiles?: Resource[] }) {
  const [allResources, setAllResources] = useState<Resource[]>(initialFiles);
  const [loading, setLoading] = useState(initialFiles.length === 0);
  
  // Strict Client-Side State (No Router)
  const [q, setQ] = useState("");
  const [selectedClass, setSelectedClass] = useState("10"); // Default to Class 10 as requested
  const [selectedSubject, setSelectedSubject] = useState("All");

  useEffect(() => {
    async function init() {
      try {
        const data = await getFiles();
        setAllResources(data as Resource[]);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const filteredResources = useMemo(() => {
    return allResources.filter(r => {
      const matchQ = !q || 
        r.title.toLowerCase().includes(q.toLowerCase()) ||
        r.subject.toLowerCase().includes(q.toLowerCase()) ||
        r.description?.toLowerCase().includes(q.toLowerCase()) ||
        r.specialty_tag?.toLowerCase().includes(q.toLowerCase());
      
      const matchClass = selectedClass === "All" || r.class === Number(selectedClass);
      const matchSubject = selectedSubject === "All" || r.subject.toLowerCase() === selectedSubject.toLowerCase();
      
      return matchQ && matchClass && matchSubject;
    });
  }, [allResources, q, selectedClass, selectedSubject]);

  // Group by specialty_tag
  const grouped: Record<string, Resource[]> = {};
  for (const r of filteredResources) {
    const tag = r.specialty_tag || "General";
    if (!grouped[tag]) grouped[tag] = [];
    grouped[tag].push(r);
  }

  const sortedTags = Object.keys(grouped).sort((a, b) => {
    const ai = TAG_ORDER.indexOf(a);
    const bi = TAG_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="h-10 w-10 text-[#00ED64] animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Syncing Resources...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <SidebarFilter 
          searchQuery={q} setSearchQuery={setQ}
          classNum={selectedClass} setClassNum={setSelectedClass}
          subject={selectedSubject} setSubject={setSelectedSubject}
        />
      </div>

      <div className="lg:col-span-3 space-y-10">
        <AnimatePresence mode="popLayout">
          {filteredResources.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-white/5 bg-[#012B39]/30"
            >
              <FileText className="h-12 w-12 text-slate-700 mb-4" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No Materials Found</p>
              <p className="text-slate-600 text-sm mt-2">Try adjusting your filters or search keywords.</p>
            </motion.div>
          ) : (
            sortedTags.map(tag => (
              <motion.section 
                key={tag}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="px-4 py-1.5 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-black uppercase tracking-widest whitespace-nowrap">
                    {tag}
                  </span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="space-y-3">
                  {grouped[tag].map((res) => {
                    const Icon = TYPE_ICON[res.resource_type] || FileText;
                    return (
                      <Link key={res.id} href={`/vault/${res.id}`}>
                        <div className="group flex items-center gap-4 p-4 md:p-5 rounded-2xl border border-white/5 bg-[#012B39]/40 backdrop-blur-md hover:border-[#00ED64]/30 hover:bg-[#012B39]/70 transition-all cursor-pointer">
                          <div className="p-3 bg-[#00ED64]/10 rounded-xl shrink-0">
                            <Icon className="h-5 w-5 text-[#00ED64]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-bold truncate group-hover:text-[#00ED64] transition-colors">{res.title}</p>
                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Class {res.class}</span>
                              <span className="text-slate-700">·</span>
                              <span className="text-slate-500 text-xs font-semibold">{res.subject}</span>
                              {res.part && <><span className="text-slate-700">·</span><span className="text-slate-600 text-xs">{res.part}</span></>}
                              {res.file_size && <><span className="text-slate-700">·</span><span className="text-slate-600 text-xs">{res.file_size}</span></>}
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
