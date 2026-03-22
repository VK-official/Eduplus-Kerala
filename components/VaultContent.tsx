"use client";

import { useState, useMemo, useEffect } from "react";
import { getFiles, incrementUpvote } from "../lib/actions/fetch.actions";
import Link from "next/link";
import { FileText, BookOpen, FileQuestion, ChevronRight, Loader2, ThumbsUp, Eye, Award, Search, X, ShieldCheck, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Resource {
  id: string;
  title: string;
  class: number;
  subject: string;
  part?: string;
  chapter?: string;
  resource_type: string;
  file_format?: string;
  medium?: string;
  is_pyq?: boolean;
  uploader_name?: string;
  upvotes?: number;
  file_size?: string;
  description?: string;
  specialty_tag?: string;
  resource_link: string;
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
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedMedium, setSelectedMedium] = useState("ALL");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const data = await getFiles();
        if (initialFiles.length === 0) {
          setAllResources(data as Resource[]);
        }
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [initialFiles]);

  const handleUpvote = async (id: string) => {
    setAllResources(prev => prev.map(r => r.id === id ? { ...r, upvotes: (r.upvotes || 0) + 1 } : r));
    try {
      await incrementUpvote(id);
    } catch (e) {
      console.error("Failed to upvote", e);
    }
  };

  const filteredResources = useMemo(() => {
    return allResources.filter(r => {
      const matchesSearch = !searchQuery || 
        r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.uploader_name?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesClass = selectedClass === "All" || r.class === Number(selectedClass);
      const matchesSubject = selectedSubject === "All" || r.subject?.toLowerCase() === selectedSubject.toLowerCase();
      const matchesMedium = selectedMedium === "ALL" || r.medium?.toUpperCase() === selectedMedium;
      
      return matchesSearch && matchesClass && matchesSubject && matchesMedium;
    });
  }, [allResources, searchQuery, selectedClass, selectedSubject, selectedMedium]);

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
      <div className="flex flex-col items-center justify-center py-40 w-full">
        <Loader2 className="h-10 w-10 text-[#00ED64] animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Syncing Resources...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl">
        {/* FILTERS GRID */}
        <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <input 
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, subject, teacher..." 
            className="w-full bg-[#001E2B] border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00ED64] outline-none transition-all placeholder:text-slate-700 font-bold text-sm" 
          />
          <select 
            value={selectedClass} onChange={e=>setSelectedClass(e.target.value)}
            className="w-full bg-[#001E2B] border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00ED64] outline-none transition-all font-bold text-sm"
          >
            <option value="All">All Classes</option>
            {[5,6,7,8,9,10].map(c => <option key={c} value={c}>Class {c}</option>)}
          </select>
          <select 
            value={selectedSubject} onChange={e=>setSelectedSubject(e.target.value)}
            className="w-full bg-[#001E2B] border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-[#00ED64] outline-none transition-all font-bold text-sm"
          >
            <option value="All">All Subjects</option>
            {["Physics", "Chemistry", "Biology", "Mathematics", "IT", "Social Science", "English", "Malayalam"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="flex w-full bg-[#001E2B] border border-slate-700 rounded-lg overflow-hidden">
            {["ALL", "ENGLISH", "MALAYALAM"].map(m => (
              <button 
                key={m} onClick={() => setSelectedMedium(m)}
                className={`flex-1 py-3 transition-colors ${selectedMedium === m ? 'bg-[#00ED64] text-[#001E2B] font-bold' : 'text-white hover:bg-slate-800'}`}
              >
                {m === "ALL" ? "ALL" : m === "ENGLISH" ? "ENG" : "MAL"}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="w-full flex flex-col gap-8 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredResources.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/20"
              >
                <Search className="h-12 w-12 text-slate-700 mb-4" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No Materials Found</p>
                <p className="text-slate-600 text-sm mt-2">Try adjusting your filters or search keywords.</p>
              </motion.div>
            ) : (
              sortedTags.map(tag => (
                <motion.section key={tag} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="px-4 py-1.5 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                      {tag}
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {grouped[tag].map((res) => (
                      <div key={res.id} className="group relative flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-[2rem] border border-white/5 bg-[#012B39]/40 backdrop-blur-3xl hover:border-[#00ED64]/30 hover:bg-[#012B39]/70 transition-all">
                        <div className="flex-1 min-w-0">
                          {/* BADGES */}
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            {res.is_pyq && <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[8px] font-black uppercase tracking-tighter animate-pulse rounded-full shadow-[0_0_10px_rgba(234,179,8,0.3)]">BOARD EXAM PYQ</span>}
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter border ${res.file_format === 'YouTube Link' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-500'}`}>
                              {res.file_format || 'PDF'}
                            </span>
                            <span className={`px-3 py-1 border text-[8px] font-black uppercase tracking-tighter rounded-full ${res.medium === 'English' ? 'bg-white/10 border-white/20 text-white' : 'bg-[#00ED64]/10 border-[#00ED64]/20 text-[#00ED64]'}`}>
                              {res.medium === 'English' ? 'ENG' : 'MAL'}
                            </span>
                          </div>
                          <h3 className="text-lg font-black text-white group-hover:text-[#00ED64] transition-colors line-clamp-1">{res.title}</h3>
                          <div className="flex items-center gap-4 mt-3">
                            <Link href={`/teacher/${encodeURIComponent(res.uploader_name || "Faculty Member")}`} className="text-sm font-bold text-slate-400 hover:text-[#00ED64] transition-colors flex items-center gap-1 group">
                              <User className="w-3 h-3 group-hover:scale-110 transition-transform" />
                              {res.uploader_name || "Faculty Member"}
                            </Link>
                            <span className="text-slate-800">|</span>
                            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{res.subject}</span>
                            <span className="text-slate-800">|</span>
                            <span className="text-slate-500 text-[10px] font-bold">Class {res.class}</span>
                          </div>
                        </div>

                        {/* V67.0 Action Buttons */}
                        <div className="flex items-center justify-between w-full mt-6 pt-4 border-t border-slate-700/50">
                          {/* Upvote Button */}
                          <button onClick={() => handleUpvote(res.id)} className="flex items-center gap-2 text-slate-400 hover:text-[#00ED64] transition-colors group">
                            <ThumbsUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                            <span className="font-bold">{res.upvotes || 0}</span>
                          </button>

                          <div className="flex flex-wrap items-center gap-3 mt-4">
                            {/* Quick Preview Button */}
                            <button 
                              onClick={() => setPreviewUrl(res.resource_link)}
                              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold transition-colors">
                              <Eye className="w-4 h-4" /> PREVIEW
                            </button>
                            
                            {/* Download Button */}
                            <a href={res.resource_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#00ED64] hover:bg-[#00ff6e] text-[#001E2B] rounded-lg text-sm font-black transition-colors">
                              DOWNLOAD
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              ))
            )}
          </AnimatePresence>

          {/* V67.0 Quick Preview Modal */}
          {previewUrl && (
            <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">
              <div className="w-full max-w-5xl bg-[#001E2B] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[85vh]">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900/50">
                  <div className="flex items-center gap-2 text-[#00ED64]">
                    <Eye className="w-5 h-5" />
                    <span className="font-bold tracking-widest uppercase text-sm">Document Preview</span>
                  </div>
                  <button onClick={() => setPreviewUrl(null)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {/* Iframe Container */}
                <div className="flex-1 w-full bg-slate-900 relative">
                  <iframe src={previewUrl.replace('/view', '/preview')} className="w-full h-full absolute inset-0 border-0" allow="autoplay"></iframe>
                </div>
                {/* Footer Warning */}
                <div className="p-3 text-center text-xs text-slate-500 bg-slate-900/80">
                  Low Data Mode: Previewing compresses the file to save your internet bandwidth.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
