"use client";
import { Download, FileText, BookOpen, FileQuestion } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FileCardProps {
  title: string;
  subject: string;
  classNum: number;
  type: string;
  driveUrl: string;
  id: string;
}

export function FileCard({ title, subject, classNum, type, driveUrl, id }: FileCardProps) {
  const Icon = type === "notes" ? BookOpen : type === "question_paper" ? FileQuestion : FileText;

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="glass-card bg-atlas-card rounded-2xl p-6 flex flex-col h-full border border-white/5 hover:border-atlas-green/40 shadow-xl group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-atlas-green/10 rounded-xl group-hover:bg-atlas-green/20 transition-colors">
          <Icon className="h-6 w-6 text-atlas-green" />
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-300 tracking-wide">
          CLASS {classNum}
        </span>
      </div>
      
      <h3 className="text-xl flex-grow font-extrabold text-white mb-2 line-clamp-2 leading-tight tracking-tight">
        {title}
      </h3>
      
      <p className="text-slate-400 text-sm mb-6 font-medium mt-auto uppercase tracking-widest">
        {subject}
      </p>

      <div className="flex flex-col gap-3">
        <a href={driveUrl} target="_blank" rel="noopener noreferrer" className="w-full">
          <button className="w-full py-3 rounded-xl bg-atlas-green hover:bg-[#00ea60] text-atlas-bg font-extrabold text-sm transition-all glow-button flex items-center justify-center gap-2 uppercase tracking-wide">
            <Download className="h-5 w-5" /> Download PDF
          </button>
        </a>
        <Link href={`/file/${id}`} className="w-full">
          <button className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/5 shadow-sm text-center">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
