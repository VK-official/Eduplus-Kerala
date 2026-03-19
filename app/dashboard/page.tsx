"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle2, AlertCircle, ShieldAlert, BarChart3 } from "lucide-react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

import { uploadDriveFile } from "../../lib/actions/upload.actions";
import { CustomSelect } from "../../components/CustomSelect";
import {
  CLASS_LIST,
  getSubjectsForClass,
  getPartsForSubject,
  getChaptersForPart,
} from "../../lib/utils/constants";
import { validateResourceLink, validateForm } from "../../lib/utils/validator";

const RESOURCE_TYPES = ["PDF", "Audio", "Video"] as const;
const DOC_TYPES      = ["notes", "question_paper", "a_plus"] as const;
const DOC_LABELS     = { notes: "Study Notes", question_paper: "Question Paper", a_plus: "A+ Material" };

const ACTIVITY_DATA = [
  { day: "Mon", u: 12 }, { day: "Tue", u: 45 }, { day: "Wed", u: 28 },
  { day: "Thu", u: 80 }, { day: "Fri", u: 59 }, { day: "Sat", u: 110 }, { day: "Sun", u: 95 },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  // ── Form state (cascading dropdowns) ─────────────────────────────────────
  const [uploaderName,  setUploaderName]  = useState("");
  const [title,         setTitle]         = useState("");
  const [classNum,      setClassNum]      = useState("");
  const [subject,       setSubject]       = useState("");
  const [part,          setPart]          = useState("");
  const [chapter,       setChapter]       = useState("");
  const [resourceType,  setResourceType]  = useState<"PDF" | "Audio" | "Video">("PDF");
  const [docType,       setDocType]       = useState<"notes" | "question_paper" | "a_plus">("notes");
  const [coveredAreas,  setCoveredAreas]  = useState("");
  const [description,   setDescription]   = useState("");
  const [credits,       setCredits]       = useState("");
  const [driveUrl,      setDriveUrl]      = useState("");

  // ── Cascading data ────────────────────────────────────────────────────────
  const subjects = classNum ? getSubjectsForClass(classNum) : [];
  const parts    = (classNum && subject) ? getPartsForSubject(classNum, subject).map(p => p.label) : [];
  const chapters = (classNum && subject && part) ? getChaptersForPart(classNum, subject, part) : [];

  // Reset downstream on cascade change
  useEffect(() => { setSubject(""); setPart(""); setChapter(""); }, [classNum]);
  useEffect(() => { setPart("");    setChapter(""); }, [subject]);
  useEffect(() => { setChapter(""); }, [part]);

  // ── Validation ────────────────────────────────────────────────────────────
  const linkValidation  = driveUrl ? validateResourceLink(driveUrl) : null;
  const linkError       = linkValidation && !linkValidation.valid ? linkValidation.reason : null;
  const formValidation  = validateForm({ title, classNum, subject, part, chapter, resourceType, resourceLink: driveUrl });
  const canSubmit       = formValidation.valid;

  // ── Submission ────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true); setResult(null);
    try {
      await uploadDriveFile({
        title, classNum: Number(classNum), subject, part, chapter,
        resourceType, type: docType, coveredAreas, description, credits,
        uploaderName: uploaderName || undefined, driveUrl,
      });
      setResult({ type: "success", msg: "TRANSMISSION SUCCESSFUL. Material is now live in the Vault." });
      setTitle(""); setCoveredAreas(""); setDescription(""); setCredits(""); setDriveUrl("");
    } catch (err: any) {
      setResult({ type: "error", msg: err.message || "Upload failed." });
    } finally {
      setLoading(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
    }
  };

  if (status === "loading" || status === "unauthenticated") return null;

  const classOptions   = CLASS_LIST.map(c => `Class ${c}`);
  const subjectOptions = subjects.length ? subjects : [];
  const partOptions    = parts.length ? parts : [];
  const chapterOptions = chapters.length ? chapters : [];

  return (
    <div className="min-h-screen bg-[#001E2B] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Activity Panel ── */}
        <div className="lg:col-span-1">
          <div
            className="h-full rounded-3xl p-8 flex flex-col gap-8 border border-[#00ED64]/15"
            style={{ background: "rgba(1,43,57,0.55)", backdropFilter: "blur(24px)" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-white uppercase tracking-widest">Weekly Activity</h2>
              <BarChart3 className="h-5 w-5 text-[#00ED64]" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Total This Week</p>
              <p className="text-5xl font-black text-[#00ED64]" style={{ textShadow: "0 0 20px rgba(0,237,100,0.4)" }}>429</p>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ACTIVITY_DATA}>
                  <defs>
                    <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ED64" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#00ED64" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ backgroundColor: "#012B39", borderColor: "rgba(0,237,100,0.2)", borderRadius: "12px", fontSize: "12px" }} itemStyle={{ color: "#00ED64", fontWeight: 700 }} />
                  <Area type="monotone" dataKey="u" name="Uploads" stroke="#00ED64" strokeWidth={2.5} fill="url(#cg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Session info */}
            <div className="mt-auto pt-6 border-t border-white/5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Logged in as</p>
              <p className="text-sm font-semibold text-slate-300 truncate">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* ── Upload Form ── */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl p-8 md:p-10 border border-[#00ED64]/15"
            style={{ background: "rgba(1,43,57,0.40)", backdropFilter: "blur(24px)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-white/5">
              <div className="p-4 bg-[#00ED64]/10 rounded-2xl">
                <UploadCloud className="h-8 w-8 text-[#00ED64]" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white uppercase tracking-[-0.04em]">Teacher Console</h1>
                <p className="text-slate-500 text-sm font-medium mt-1">Upload materials to the Secure Vault</p>
              </div>
            </div>

            {/* Result Banner */}
            <AnimatePresence>
              {result && (
                <motion.div
                  ref={resultRef}
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className={`flex items-start gap-3 p-4 rounded-xl mb-8 text-sm font-semibold border ${
                    result.type === "success"
                      ? "bg-[#00ED64]/10 border-[#00ED64]/25 text-[#00ED64]"
                      : "bg-red-500/10 border-red-500/25 text-red-400"
                  }`}
                >
                  {result.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" /> : <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />}
                  {result.msg}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Uploader Name (optional) */}
              <Field label="Your Name (Optional)" span={1}>
                <input value={uploaderName} onChange={e => setUploaderName(e.target.value)}
                  placeholder="e.g. Rahul T." className={INPUT} />
              </Field>

              {/* Title */}
              <Field label="Resource Title *" span={1}>
                <input required value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Chapter 3 – Motion Notes" className={INPUT} />
              </Field>

              {/* Class */}
              <Field label="Target Class *" span={1}>
                <CustomSelect
                  options={["Select Class", ...classOptions]}
                  value={classNum ? `Class ${classNum}` : "Select Class"}
                  onChange={val => setClassNum(val === "Select Class" ? "" : val.replace("Class ", ""))}
                />
              </Field>

              {/* Subject */}
              <Field label="Subject *" span={1}>
                <CustomSelect
                  options={subjectOptions.length ? subjectOptions : ["Select Class First"]}
                  value={subject || (subjectOptions.length ? "Select Subject" : "Select Class First")}
                  onChange={val => { if (subjectOptions.includes(val)) setSubject(val); }}
                />
              </Field>

              {/* Textbook Part */}
              <Field label="Textbook Part *" span={1}>
                <CustomSelect
                  options={partOptions.length ? partOptions : ["Select Subject First"]}
                  value={part || (partOptions.length ? "Select Part" : "Select Subject First")}
                  onChange={val => { if (partOptions.includes(val)) setPart(val); }}
                />
              </Field>

              {/* Chapter */}
              <Field label="Chapter *" span={1}>
                <CustomSelect
                  options={chapterOptions.length ? chapterOptions : ["Select Part First"]}
                  value={chapter || (chapterOptions.length ? "Select Chapter" : "Select Part First")}
                  onChange={val => { if (chapterOptions.includes(val)) setChapter(val); }}
                />
              </Field>

              {/* Resource Type */}
              <Field label="Resource Type *" span={1}>
                <CustomSelect
                  options={RESOURCE_TYPES as any}
                  value={resourceType}
                  onChange={val => setResourceType(val as any)}
                />
              </Field>

              {/* Document Type */}
              <Field label="Material Category *" span={1}>
                <CustomSelect
                  options={DOC_TYPES.map(t => DOC_LABELS[t])}
                  value={DOC_LABELS[docType]}
                  onChange={val => {
                    const found = DOC_TYPES.find(t => DOC_LABELS[t] === val);
                    if (found) setDocType(found);
                  }}
                />
              </Field>

              {/* Covered Topics */}
              <Field label="Covered Topics / Areas" span={2}>
                <textarea value={coveredAreas} onChange={e => setCoveredAreas(e.target.value)}
                  rows={3} placeholder="e.g. Newton's Laws, Friction, Circular Motion..."
                  className={`${INPUT} resize-none`} />
              </Field>

              {/* Description */}
              <Field label="Description / Methodology" span={2}>
                <textarea value={description} onChange={e => setDescription(e.target.value)}
                  rows={3} placeholder="How was this made? Notes from class, textbook summary, handwritten..."
                  className={`${INPUT} resize-none`} />
              </Field>

              {/* Credits */}
              <Field label="Credits / Source" span={1}>
                <input value={credits} onChange={e => setCredits(e.target.value)}
                  placeholder="e.g. Notebook App, Self-made" className={INPUT} />
              </Field>

              {/* Resource Link */}
              <Field label="Resource Link *" span={2}>
                <input
                  required
                  type="url"
                  value={driveUrl}
                  onChange={e => setDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/... or https://youtu.be/..."
                  className={`${INPUT} ${linkError ? "border-red-500 focus:border-red-500" : ""}`}
                />
                <AnimatePresence>
                  {linkError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      className="flex items-start gap-2 mt-2 text-xs font-bold text-red-400"
                      style={{ textShadow: "0 0 10px rgba(239,68,68,0.5)" }}
                    >
                      <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                      {linkError}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Field>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="w-full mt-8 py-5 rounded-xl font-black text-base uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: canSubmit ? "#00ED64" : "rgba(0,237,100,0.2)",
                color: canSubmit ? "#012B39" : "#00ED64",
                boxShadow: canSubmit ? "0 0 30px rgba(0,237,100,0.35)" : "none",
              }}
            >
              {loading ? "TRANSMITTING TO VAULT..." : "SECURE UPLOAD"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────
const INPUT =
  "w-full bg-[#001E2B] border border-gray-700 rounded-xl p-3.5 text-slate-200 placeholder:text-slate-600 focus:border-[#00ED64] outline-none transition-colors text-sm font-medium";

function Field({ label, children, span = 1 }: { label: string; children: React.ReactNode; span?: 1 | 2 }) {
  return (
    <div className={span === 2 ? "md:col-span-2" : ""}>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</label>
      {children}
    </div>
  );
}
