"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ShieldAlert, Check } from "lucide-react";
import { updateCommentStatus } from "../lib/actions/fetch.actions";

interface Comment {
  user: string;
  text: string;
  resolved?: boolean;
  createdAt: Date;
}

interface FileWithComments {
  _id: string;
  title: string;
  subject: string;
  class: number;
  comments: Comment[];
}

export function TeacherCommentDashboard({ initialFiles }: { initialFiles: FileWithComments[] }) {
  const [files, setFiles] = useState(initialFiles);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleResolve = async (fileId: string, commentIdx: number, currentStatus: boolean) => {
    setLoadingId(`${fileId}-${commentIdx}`);
    try {
      await updateCommentStatus(fileId, commentIdx, !currentStatus);
      // Update local state for immediate feedback
      setFiles(prev => prev.map(f => {
        if (f._id === fileId) {
          const newComments = [...f.comments];
          newComments[commentIdx] = { ...newComments[commentIdx], resolved: !currentStatus };
          return { ...f, comments: newComments };
        }
        return f;
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  if (files.length === 0) return null;

  return (
    <section className="mt-12 rounded-3xl p-8 md:p-10 border border-[#00ED64]/10 bg-[#012B39]/30 backdrop-blur-3xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#00ED64]/10 rounded-xl">
          <ShieldAlert className="h-6 w-6 text-[#00ED64]" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">File Reports & Comments</h2>
          <p className="text-slate-500 text-sm">Review feedback and Malayalam error reports for your uploads.</p>
        </div>
      </div>

      <div className="space-y-6">
        {files.map((file) => (
          <div key={file._id} className="rounded-2xl border border-white/5 bg-[#001E2B]/50 p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-white font-bold">{file.title}</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                  Class {file.class} · {file.subject}
                </p>
              </div>
              <span className="text-[10px] font-black px-2 py-1 rounded bg-[#00ED64]/10 text-[#00ED64] uppercase">
                {file.comments.filter(c => !c.resolved).length} Pending
              </span>
            </div>

            <div className="space-y-4">
              {file.comments.map((comment, idx) => (
                <div key={`${file._id}-${idx}`} className={`p-4 rounded-xl border ${comment.resolved ? "border-white/5 bg-transparent opacity-50" : "border-[#00ED64]/20 bg-[#00ED64]/5"} transition-all`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-slate-300 uppercase">{comment.user}</span>
                        <span className="text-[10px] text-slate-600">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                        {comment.text.includes("തെറ്റ്") && (
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-red-500/20 text-red-500 uppercase tracking-tighter">
                            Reported Error
                          </span>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed ${comment.resolved ? "text-slate-500 line-through" : "text-slate-300"}`}>
                        {comment.text}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleResolve(file._id, idx, !!comment.resolved)}
                      disabled={loadingId === `${file._id}-${idx}`}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                        comment.resolved 
                        ? "bg-slate-800 text-slate-500 hover:bg-slate-700" 
                        : "bg-[#00ED64] text-[#012B39] hover:opacity-90 shadow-[0_0_15px_rgba(0,237,100,0.3)]"
                      }`}
                    >
                      {loadingId === `${file._id}-${idx}` ? (
                        "Updating..."
                      ) : comment.resolved ? (
                        <>Reopen</>
                      ) : (
                        <><Check className="h-3 w-3" /> Mark Resolved</>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
