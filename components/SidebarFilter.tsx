"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { useState, useEffect, FormEvent } from "react";

export function SidebarFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [classNum, setClassNum] = useState("All");
  const [subject, setSubject] = useState("All");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setClassNum(searchParams.get("class") || "All");
    setSubject(searchParams.get("subject") || "All");
  }, [searchParams]);

  const applyFilters = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    if (classNum && classNum !== "All") {
      params.set("class", classNum);
    } else {
      params.delete("class");
    }

    if (subject && subject !== "All") {
      params.set("subject", subject);
    } else {
      params.delete("subject");
    }

    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Filters</h2>
      </div>

      <form onSubmit={applyFilters} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="search" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              id="search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Keywords..."
              className="block w-full rounded-lg border border-slate-300/50 bg-white/50 py-2 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700/50 dark:bg-slate-950/50 dark:text-white dark:placeholder-slate-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="classNum" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Class
          </label>
          <select
            id="classNum"
            value={classNum}
            onChange={(e) => setClassNum(e.target.value)}
            className="block w-full rounded-lg border border-slate-300/50 bg-white/50 py-2 px-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700/50 dark:bg-slate-950/50 dark:text-white"
          >
            <option value="All" className="dark:bg-slate-900">All Classes</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1} className="dark:bg-slate-900">
                Class {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Subject
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="block w-full rounded-lg border border-slate-300/50 bg-white/50 py-2 px-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700/50 dark:bg-slate-950/50 dark:text-white"
          >
            <option value="All" className="dark:bg-slate-900">All Subjects</option>
            <option value="Physics" className="dark:bg-slate-900">Physics</option>
            <option value="Chemistry" className="dark:bg-slate-900">Chemistry</option>
            <option value="Biology" className="dark:bg-slate-900">Biology</option>
            <option value="Mathematics" className="dark:bg-slate-900">Mathematics</option>
            <option value="English" className="dark:bg-slate-900">English</option>
            <option value="Computer Science" className="dark:bg-slate-900">Computer Science</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
}
