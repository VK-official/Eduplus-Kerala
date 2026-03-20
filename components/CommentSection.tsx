"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, ShieldAlert, ChevronDown } from "lucide-react";
import { addComment } from "../lib/actions/fetch.actions";

interface Comment {
  user: string;
  text: string;
  createdAt: string;
}

interface Props {
  fileId: string;
  initialComments: Comment[];
  uploaderName?: string;
}

const REPORT_TEMPLATES = [
  "ഈ ഫയലിൽ ഒരു തെറ്റ് ഉണ്ട്.",
  "ലിങ്ക് പ്രവർത്തിക്കുന്നില്ല / Link not working.",
  "ഉള്ളടക്കം തെറ്റായ ക്ലാസ്/വിഷയത്തിലേക്ക് ആണ്.",
  "Thank you — very helpful material!",
];

export function CommentSection({ fileId, initialComments, uploaderName }: Props) {
  const session = null; // NextAuth Eradicated - Phase 10
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const userName = "Guest Student"; // Supabase Auth Coming Soon
      const { ok } = await addComment(fileId, userName, text.trim());
      if (ok) {
        const newComment: Comment = { 
          user: userName, 
          text: text.trim(), 
          createdAt: new Date().toISOString() 
        };
        setComments(prev => [newComment, ...prev]);
        setText("");
      }
    } catch (err: any) {
      setError(err.message || "Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const fillTemplate = (t: string) => {
    setText(t);
    inputRef.current?.focus();
  };

  return (
    <section
      className="rounded-3xl p-6 md:p-8 border border-white/5"
      style={{ background: "rgba(1,43,57,0.40)", backdropFilter: "blur(24px)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
        <div className="p-3 bg-[#00ED64]/10 rounded-xl">
          <MessageCircle className="h-5 w-5 text-[#00ED64]" />
        </div>
        <div>
          <h2 className="text-base font-black text-white uppercase tracking-widest">Discussions & Reports</h2>
          <p className="text-slate-500 text-xs mt-0.5">{comments.length} {comments.length === 1 ? "comment" : "comments"}</p>
        </div>
      </div>

      {/* Quick Report Templates */}
      <div className="mb-5">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Quick Templates</p>
        <div className="flex flex-wrap gap-2">
          {REPORT_TEMPLATES.map((t) => (
            <button
              key={t}
              onClick={() => fillTemplate(t)}
              className="text-[11px] px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:border-[#00ED64]/30 hover:text-[#00ED64] transition-all font-medium"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={text}
            onChange={e => setText(e.target.value)}
            rows={3}
            placeholder="Write a comment, correction, or report…"
            className="w-full bg-[#001E2B] border border-gray-700 rounded-xl p-4 pr-14 text-slate-200 placeholder:text-slate-600 focus:border-[#00ED64] outline-none resize-none text-sm font-medium transition-colors"
          />
          <button
            type="submit"
            disabled={!text.trim() || submitting}
            className="absolute right-3 bottom-3 p-2.5 rounded-xl bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] hover:bg-[#00ED64]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-xs font-bold text-red-400 mt-2">
              <ShieldAlert className="h-3.5 w-3.5" />{error}
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      {/* Comment List */}
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {comments.length === 0 ? (
            <p className="text-slate-600 text-sm text-center py-8">No comments yet. Be the first to discuss!</p>
          ) : (
            comments.map((c, idx) => {
              const isUploader = uploaderName && c.user === uploaderName;
              return (
                <motion.div
                  key={`${c.user}-${idx}-${c.createdAt}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl border border-white/5 bg-[#001E2B]/50"
                >
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-300">{c.user}</span>
                    {isUploader && (
                      <span className="px-2 py-0.5 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-[10px] font-black uppercase tracking-widest">
                        Uploader
                      </span>
                    )}
                    <span className="text-xs text-slate-700 ml-auto">
                      {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{c.text}</p>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
