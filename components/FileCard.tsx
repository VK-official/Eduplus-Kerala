"use client";
import { Download, FileText, BookOpen, FileQuestion } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { LiquidGlass } from "./LiquidGlass";
import { getDirectLink } from "../lib/drive";
import { gsap } from "gsap";

interface FileCardProps {
  title: string;
  subject: string;
  classNum: number;
  type: string;
  driveUrl: string;
  id: string;
  featured?: boolean;
}

export function FileCard({ title, subject, classNum, type, driveUrl, id, featured = false }: FileCardProps) {
  const Icon = type === "notes" ? BookOpen : type === "question_paper" ? FileQuestion : FileText;
  const directUrl = getDirectLink(driveUrl);
  
  const cardRef   = useRef<HTMLDivElement>(null);
  const dlBtnRef  = useRef<HTMLButtonElement>(null);

  // 3D Bento Tilt — getBoundingClientRect() math (Awwwards standard)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect   = cardRef.current.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;
    gsap.to(cardRef.current, {
      rotateX, rotateY, scale: 0.97, duration: 0.3, ease: "power1.out", transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)", transformPerspective: 1000,
    });
  };

  const handleDlEnter = () => {
    gsap.fromTo(dlBtnRef.current,
      { boxShadow: "0 0 15px rgba(0,237,100,0.2)" },
      { boxShadow: "0 0 45px rgba(0,237,100,0.8)", scale: 1.05, duration: 0.4, ease: "elastic.out(1, 0.3)" }
    );
  };
  const handleDlLeave = () => {
    gsap.to(dlBtnRef.current, { boxShadow: "0 0 15px rgba(0,237,100,0.2)", scale: 1, duration: 0.4, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`h-full w-full group rounded-3xl relative ${featured ? "min-h-[360px]" : "min-h-[280px]"}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-px rounded-[calc(1.5rem-1px)] overflow-hidden">
        <LiquidGlass noHover className="h-full w-full p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className={`p-4 bg-[#00ED64]/10 rounded-2xl shadow-inner ${featured ? "scale-110 origin-top-left" : ""}`}>
                <Icon className="h-6 w-6 text-[#00ED64]" />
              </div>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-slate-300 tracking-wider">
                CLASS {classNum}
              </span>
            </div>

            <h3 className={`font-black text-white mb-3 relative z-10 leading-tight tracking-[-0.04em] ${featured ? "text-4xl lg:text-5xl line-clamp-3" : "text-2xl line-clamp-2"}`}>
              {title}
            </h3>

            <p className="text-slate-400 text-sm mb-6 font-bold uppercase tracking-widest relative z-10 max-w-full">
              {subject}
            </p>
          </div>

          <div className={`flex items-center gap-4 relative z-10 mt-auto ${featured ? "flex-col sm:flex-row" : "flex-col"}`}>
            <a href={directUrl} target="_blank" rel="noopener noreferrer" className={featured ? "flex-1 w-full" : "w-full"}>
              <button
                ref={dlBtnRef}
                onMouseEnter={handleDlEnter}
                onMouseLeave={handleDlLeave}
                className="w-full py-4 rounded-xl bg-[#00ED64] text-[#012B39] font-black text-sm flex items-center justify-center gap-2 uppercase tracking-widest"
                style={{ boxShadow: "0 0 15px rgba(0,237,100,0.2)" }}
              >
                <Download className="h-5 w-5" /> Download
              </button>
            </a>
            <Link href={`/file/${id}`} className={featured ? "flex-1 w-full" : "w-full"}>
              <button className="w-full py-4 rounded-xl bg-white/5 hover:bg-[#00ED64]/15 text-white font-bold text-sm border border-white/5 text-center tracking-widest uppercase transition-colors">
                Details
              </button>
            </Link>
          </div>
        </LiquidGlass>
      </div>
    </div>
  );
}
