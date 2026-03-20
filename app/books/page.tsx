"use client";

import { PageWrapper } from "../../components/PageWrapper";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Book, Download, ExternalLink, ChevronRight } from "lucide-react";

export interface Textbook {
  id: string;
  title: string;
  classNum: string;
  part: string;
  subjects: string[];
  link: string;
}

const TEXTBOOKS: Textbook[] = [
  { id: "1", title: "Upper Primary Textbooks", classNum: "Class 5–7", part: "Full Sets", subjects: ["Malayalam", "English", "Hindi", "Basic Science", "Social Science", "Mathematics"], link: "https://drive.google.com/file/d/1_dummy_up_id/view" },
  { id: "2", title: "High School Textbooks", classNum: "Class 8–10", part: "Full Sets", subjects: ["Malayalam", "English", "Hindi", "Physics", "Chemistry", "Biology", "Social Science", "Mathematics", "IT"], link: "https://drive.google.com/file/d/1_dummy_hs_id/view" },
  { id: "3", title: "SSLC Special Edition", classNum: "Class 10", part: "Revision", subjects: ["All Subjects", "Focus Area", "Model Papers"], link: "https://drive.google.com/file/d/1_dummy_sslc_id/view" },
];

function getDirectDownload(link: string): string {
  if (link.includes("drive.google.com/file/d/")) {
    const id = link.split("/d/")[1]?.split("/")[0];
    return `https://drive.google.com/uc?export=download&id=${id}`;
  }
  return link;
}

export default function BooksPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] pt-12 pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Header */}
          <div className="mb-16">
            <div className="inline-block py-1.5 px-4 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-bold tracking-widest uppercase mb-4">
              Official SCERT Kerala
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-[-0.04em] leading-none uppercase">
              Textbook <span className="text-[#00ED64]">Vault</span>
            </h1>
            <p className="text-slate-400 mt-6 text-xl max-w-2xl leading-relaxed">
              Premium 3D Bento Access to official digital textbooks. 
              Classes 5–10 only. Optimized for direct offline storage.
            </p>
          </div>

          {/* 3D Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEXTBOOKS.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-20 p-8 rounded-3xl border border-white/5 bg-[#012B39]/20 text-center">
            <p className="text-slate-500 text-sm font-medium">
              All textbooks are sourced from the official SCERT Kerala portal. 
              Eduplus provides enhanced direct-download mirrors for student convenience.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

function BookCard({ book }: { book: Textbook }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const downloadUrl = getDirectDownload(book.link);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative p-8 rounded-[2rem] border border-white/5 bg-[#012B39]/40 backdrop-blur-3xl overflow-hidden cursor-default"
      style={{
        transformStyle: "preserve-3d",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      }}
    >
      {/* Liquid Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ED64]/5 to-[rgba(0,0,0,0)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-px border border-[#00ED64]/0 group-hover:border-[#00ED64]/20 rounded-[2rem] transition-colors duration-500" />

      <div style={{ transform: "translateZ(50px)" }}>
        <div className="flex items-center justify-between mb-6">
          <div className="p-4 bg-[#00ED64]/10 rounded-2xl">
            <Book className="h-6 w-6 text-[#00ED64]" />
          </div>
          <span className="text-[10px] font-black text-[#00ED64] uppercase tracking-[0.2em] bg-[#00ED64]/10 px-3 py-1 rounded-full">
            {book.classNum}
          </span>
        </div>

        <h3 className="text-2xl font-black text-white mb-2 leading-tight uppercase tracking-tight group-hover:text-[#00ED64] transition-colors">
          {book.title}
        </h3>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">
          {book.part} Edition
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {book.subjects.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              {s}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            View
          </a>
          <a
            href={downloadUrl}
            download
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#00ED64] text-[#012B39] text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-[0_10px_20px_rgba(0,237,100,0.2)]"
          >
            <Download className="h-3 w-3" />
            Download
          </a>
        </div>
      </div>

      {/* Glossy Reflection */}
      <div className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-white/5 to-[rgba(0,0,0,0)] -translate-y-full group-hover:translate-y-0 transition-transform duration-[1.2s] ease-in-out pointer-events-none" />
    </motion.div>
  );
}
