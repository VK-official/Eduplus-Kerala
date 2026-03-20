"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const pushQuery = useCallback((q: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (q) params.set("q", q);
    else params.delete("q");
    router.push(`/vault?${params.toString()}`);
  }, [router, searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== (searchParams.get("q") || "")) {
        pushQuery(query);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query, pushQuery, searchParams]);

  return (
    <div className="relative max-w-3xl mx-auto mb-16 px-4">
      <div className="absolute inset-0 bg-[#00ED64]/5 blur-3xl rounded-full opacity-50 pointer-events-none" />
      <div className="relative flex items-center bg-[#001E2B]/60 backdrop-blur-xl border border-[#00ED64]/30 rounded-full px-6 py-4 transition-all focus-within:border-[#00ED64] focus-within:shadow-[0_0_30px_rgba(0,237,100,0.15)] group">
        <Search className="h-5 w-5 text-[#00ED64] mr-4 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, subject, chapter, or tags (e.g. SSLC)..."
          className="w-full bg-[rgba(0,0,0,0)] border-none outline-none text-white text-lg placeholder:text-slate-600 font-medium"
        />
        {query && (
          <button 
            onClick={() => setQuery("")}
            className="p-1 hover:bg-white/5 rounded-full transition-colors ml-2"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        )}
      </div>
      
      {/* Search Tags Suggestion */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {["SSLC Notes", "Physics", "Chemistry", "Mathematics", "Class 10"].map(tag => (
          <button
            key={tag}
            onClick={() => setQuery(tag)}
            className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/5 text-slate-500 hover:text-[#00ED64] hover:border-[#00ED64]/30 transition-all"
          >
            # {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
