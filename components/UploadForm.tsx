"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";

import { addResource } from "../lib/actions/fetch.actions";
import { CustomSelect } from "./CustomSelect";
import {
  CLASS_LIST, getSubjectsForClass, getPartsForSubject,
  getChaptersForPart, getSpecialtyTags,
} from "../lib/utils/constants";
import { validateResourceLink, validateForm } from "../lib/utils/validator";

const DOC_TYPES  = ["notes", "question_paper", "a_plus"] as const;
const DOC_LABELS: Record<string, string> = { notes: "Study Notes", question_paper: "Question Paper", a_plus: "A+ Material" };

export function UploadForm() {
  const [classNum,     setClassNum]     = useState("");
  const [subject,      setSubject]      = useState("");
  const [part,         setPart]         = useState("");
  const [chapter,      setChapter]      = useState("");
  const [format,       setFormat]       = useState<"PDF"|"MP4"|"MP3">("PDF");
  const [fileSize,     setFileSize]     = useState("");
  const [specialtyTag, setSpecialtyTag] = useState("");
  const [docType,      setDocType]      = useState<"notes"|"question_paper"|"a_plus">("notes");
  const [title,        setTitle]        = useState("");
  const [coveredAreas, setCoveredAreas] = useState("");
  const [description,  setDescription]  = useState("");
  const [credits,      setCredits]      = useState("");
  const [uploaderName, setUploaderName] = useState("");
  const [driveUrl,     setDriveUrl]     = useState("");

  // Cascading resets
  useEffect(() => { setSubject(""); setPart(""); setChapter(""); setSpecialtyTag(""); }, [classNum]);
  useEffect(() => { setPart(""); setChapter(""); }, [subject]);
  useEffect(() => { setChapter(""); }, [part]);

  const subjects        = classNum ? getSubjectsForClass(classNum) : [];
  const parts           = (classNum && subject) ? getPartsForSubject(classNum, subject).map((p: any) => p.label) : [];
  const chapters        = (classNum && subject && part) ? getChaptersForPart(classNum, subject, part) : [];
  const specialtyOptions = classNum ? getSpecialtyTags(classNum) : [];

  const linkValidation = driveUrl ? validateResourceLink(driveUrl) : null;
  const linkError      = linkValidation && !linkValidation.valid ? linkValidation.reason : null;
  const formValid      = validateForm({ title, classNum, subject, part, chapter, resourceType: format, resourceLink: driveUrl });
  const canSubmit      = formValid.valid && !linkError;

  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState<{ type: "success"|"error"; msg: string } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true); setResult(null);
    try {
      await addResource({ title, classNum: Number(classNum), subject, part, chapter, format, fileSize, specialtyTag, type: docType, coveredAreas, description, credits, uploaderName: uploaderName || undefined, driveUrl });
      setResult({ type: "success", msg: "TRANSMISSION SUCCESSFUL. Material is now live in the Vault." });
      setTitle(""); setFileSize(""); setCoveredAreas(""); setDescription(""); setCredits(""); setDriveUrl(""); setSpecialtyTag("");
    } catch (err: any) {
      setResult({ type: "error", msg: err.message || "Upload failed." });
    } finally {
      setLoading(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl p-8 md:p-10 border border-[#00ED64]/20"
      style={{ background: "rgba(0,30,43,0.40)", backdropFilter: "blur(24px)" }}>
      <div className="flex items-center gap-4 mb-10 pb-8 border-b border-white/5">
        <div className="p-4 bg-[#00ED64]/10 rounded-2xl"><UploadCloud className="h-8 w-8 text-[#00ED64]" /></div>
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-[-0.04em]">Teacher Console</h1>
          <p className="text-slate-500 text-sm mt-1">Classes 5–10 · UP & HS Platform</p>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div ref={resultRef} initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            className={`flex items-start gap-3 p-4 rounded-xl mb-8 text-sm font-semibold border ${result.type === "success" ? "bg-[#00ED64]/10 border-[#00ED64]/25 text-[#00ED64]" : "bg-red-500/10 border-red-500/25 text-red-400"}`}>
            {result.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5"/> : <AlertCircle className="h-5 w-5 shrink-0 mt-0.5"/>}
            {result.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <F label="Your Name (Optional)"><input value={uploaderName} onChange={e=>setUploaderName(e.target.value)} placeholder="e.g. Rahul T." className={I}/></F>
        <F label="Resource Title *"><input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Chapter 3 – Motion Notes" className={I}/></F>

        <F label="Target Class * (5–10)">
          <CustomSelect options={["Select Class",...CLASS_LIST.map((c: any)=>`Class ${c}`)]} value={classNum ? `Class ${classNum}` : "Select Class"}
            onChange={(val: any)=>setClassNum(val==="Select Class"?"":val.replace("Class ",""))}/>
        </F>
        <F label="Subject *">
          <CustomSelect options={subjects.length?subjects:["Select Class First"]} value={subject||(subjects.length?"Select Subject":"Select Class First")}
            onChange={(val: any)=>{if(subjects.includes(val))setSubject(val);}}/>
        </F>
        <F label="Textbook Part *">
          <CustomSelect options={parts.length?parts:["Select Subject First"]} value={part||(parts.length?"Select Part":"Select Subject First")}
            onChange={(val: any)=>{if(parts.includes(val))setPart(val);}}/>
        </F>
        <F label="Chapter *">
          <CustomSelect options={chapters.length?chapters:["Select Part First"]} value={chapter||(chapters.length?"Select Chapter":"Select Part First")}
            onChange={(val: any)=>{if(chapters.includes(val))setChapter(val);}}/>
        </F>
        <F label="Format *">
          <CustomSelect options={["PDF","MP4","MP3"]} value={format} onChange={(val: any)=>setFormat(val as any)}/>
        </F>
        <F label="File Size Estimate">
          <input value={fileSize} onChange={e=>setFileSize(e.target.value)} placeholder="e.g. 12 MB, 500 KB" className={I}/>
        </F>

        {/* Conditional SSLC / General Specialty Tag */}
        <F label={classNum==="10" ? "SSLC Tag *" : "Specialty Tag"} span={2}>
          <CustomSelect
            options={specialtyOptions.length?specialtyOptions:["Select Class First"]}
            value={specialtyTag||(specialtyOptions.length?(classNum==="10"?"Select SSLC Tag":"Select Tag"):"Select Class First")}
            onChange={(val: any)=>{if(specialtyOptions.includes(val))setSpecialtyTag(val);}}/>
          {classNum==="10"&&<p className="text-xs font-bold text-yellow-400 mt-2 tracking-wider">SSLC CLASS DETECTED — Board Exam tags active.</p>}
        </F>

        <F label="Material Category *" span={2}>
          <CustomSelect options={DOC_TYPES.map(t=>DOC_LABELS[t])} value={DOC_LABELS[docType]}
            onChange={(val: any)=>{const f=DOC_TYPES.find(t=>DOC_LABELS[t]===val);if(f)setDocType(f);}}/>
        </F>
        <F label="Covered Topics / Areas" span={2}>
          <textarea value={coveredAreas} onChange={e=>setCoveredAreas(e.target.value)} rows={3} placeholder="e.g. Newton's Laws, Friction..." className={`${I} resize-none`}/>
        </F>
        <F label="Description / Methodology" span={2}>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} placeholder="This content covers... Made using..." className={`${I} resize-none`}/>
        </F>
        <F label="Credits / Source">
          <input value={credits} onChange={e=>setCredits(e.target.value)} placeholder="e.g. Notebook App, Self-made" className={I}/>
        </F>
        <F label="Resource Link * (Drive/YouTube)" span={2}>
          <input required type="url" value={driveUrl} onChange={e=>setDriveUrl(e.target.value)}
            placeholder="https://drive.google.com/file/d/... or https://youtu.be/..."
            className={`${I} ${linkError?"border-red-500 focus:border-red-500":""}`}/>
          <AnimatePresence>
            {linkError&&(
              <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}
                className="flex items-start gap-2 mt-2 text-xs font-bold text-red-400">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5"/>
                {linkError}
              </motion.div>
            )}
          </AnimatePresence>
        </F>
      </div>

      <button type="submit" disabled={!canSubmit||loading}
        className="w-full mt-8 py-5 rounded-xl font-black text-base uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background:canSubmit?"#00ED64":"rgba(0,237,100,0.15)", color:canSubmit?"#012B39":"#00ED64", boxShadow:canSubmit?"0 0 30px rgba(0,237,100,0.35)":"none" }}>
        {loading?"TRANSMITTING TO VAULT...":"SECURE UPLOAD"}
      </button>
    </form>
  );
}

const I = "w-full bg-[#001E2B] border border-gray-700 rounded-xl p-3.5 text-slate-200 placeholder:text-slate-600 focus:border-[#00ED64] outline-none transition-colors text-sm font-medium";
function F({ label, children, span=1 }: { label:string; children:React.ReactNode; span?:1|2 }) {
  return <div className={span===2?"md:col-span-2":""}><label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</label>{children}</div>;
}
