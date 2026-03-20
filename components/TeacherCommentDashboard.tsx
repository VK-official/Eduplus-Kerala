"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ShieldAlert, Check, Trash2 } from "lucide-react";
import { updateCommentStatus, deleteFile } from "../lib/actions/fetch.actions";

interface Comment {
  user: string;
  text: string;
  resolved?: boolean;
  createdAt: Date;
}

interface FileWithComments {
  id: string;
  title: string;
  subject: string;
  class: number;
  comments: Comment[];
}

export function TeacherCommentDashboard({ initialFiles }: { initialFiles: FileWithComments[] }) {
  const [files, setFiles] = useState(initialFiles);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleResolve = async (fileId: string, commentIdx: number, isResolved: boolean) => {
    setLoadingId(`${fileId}-${commentIdx}`);
    try {
      const newStatus = isResolved ? 'pending' : 'resolved';
      await updateCommentStatus(fileId, commentIdx, newStatus);
      
      setFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          const newComments = [...f.comments];
          newComments[commentIdx] = { ...newComments[commentIdx], resolved: !isResolved };
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

  const handleDelete = async (fileId: string) => {
    if (!confirm("Are you sure you want to PERMANENTLY delete this file? This cannot be undone.")) return;
    try {
      await deleteFile(fileId);
      setFiles(prev => prev.filter(f => f.id !== fileId));
    } catch (e) {
      console.error(e);
      alert("Failed to delete file.");
    }
  };

  if (files.length === 0) return null;

  return (
    <section className="mt-12 rounded-3xl p-8 md:p-10 border border-red-500/20 bg-red-500/5 backdrop-blur-3xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-red-500/10 rounded-xl">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight italic">Action Required: File Reports</h2>
          <p className="text-slate-500 text-sm">Students have reported issues with these files. Review below.</p>
        </div>
      </div>

      <div className="space-y-6">
        {files.map((file) => (
          <div key={file.id} className="rounded-2xl border border-white/5 bg-[#001E2B]/50 p-6 overflow-hidden">
            <div className="flex items-start justify-between mb-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-white font-bold">{file.title}</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                  Class {file.class} · {file.subject}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black px-2 py-1 rounded bg-[#00ED64]/10 text-[#00ED64] uppercase h-fit">
                  {(file.comments || []).filter(c => !c.resolved).length} Pending
                </span>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                  title="Delete File Permanently"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {(file.comments || []).map((comment, idx) => (
                <div key={`${file.id}-${idx}`} className={`p-4 rounded-xl border ${comment.resolved ? "border-white/5 bg-[rgba(0,0,0,0)] opacity-50" : "border-[#00ED64]/20 bg-[#00ED64]/5"} transition-all`}>
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
                      onClick={() => handleResolve(file.id, idx, !!comment.resolved)}
                      disabled={loadingId === `${file.id}-${idx}`}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                        comment.resolved 
                        ? "bg-slate-800 text-slate-500 hover:bg-slate-700" 
                        : "bg-[#00ED64] text-[#012B39] hover:opacity-90 shadow-[0_0_15px_rgba(0,237,100,0.3)]"
                      }`}
                    >
                      {loadingId === `${file.id}-${idx}` ? (
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
