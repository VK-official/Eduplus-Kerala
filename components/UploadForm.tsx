"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle2, AlertCircle, ShieldAlert, Gavel, Timer, X } from "lucide-react";
import Link from "next/link";
import { secureUploadHandler } from "../lib/actions/admin.actions";
import { CustomSelect } from "./CustomSelect";
import {
  CLASS_LIST, getSubjectsForClass, getPartsForSubject,
  getChaptersForPart, getSpecialtyTags,
} from "../lib/utils/constants";
import { validateResourceLink, validateForm } from "../lib/utils/validator";

const DOC_TYPES  = ["notes", "question_paper", "a_plus"] as const;
const DOC_LABELS: Record<string, string> = { notes: "Study Notes", question_paper: "Question Paper", a_plus: "A+ Material" };

export function UploadForm({ verifiedEmail }: { verifiedEmail: string }) {
  const [classNum,     setClassNum]     = useState("");
  const [subject,      setSubject]      = useState("");
  const [part,         setPart]         = useState("");
  const [chapter,      setChapter]      = useState("");
  const [format,       setFormat]       = useState<"PDF"|"MP4"|"MP3">("PDF");
  const [specialtyTag, setSpecialtyTag] = useState("");
  const [docType,      setDocType]      = useState<"notes"|"question_paper"|"a_plus">("notes");
  const [title,        setTitle]        = useState("");
  const [description,  setDescription]  = useState("");
  const [uploaderName, setUploaderName] = useState("");
  const [driveUrl,     setDriveUrl]     = useState("");

  const [showLegalModal, setShowLegalModal] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState<{ type: "success"|"error"; msg: string } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setSubject(""); setPart(""); setChapter(""); setSpecialtyTag(""); }, [classNum]);
  useEffect(() => { setPart(""); setChapter(""); }, [subject]);
  useEffect(() => { setChapter(""); }, [part]);

  useEffect(() => {
    let timer: any;
    if (showLegalModal && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showLegalModal, countdown]);

  const subjects        = classNum ? getSubjectsForClass(classNum) : [];
  const parts           = (classNum && subject) ? getPartsForSubject(classNum, subject).map((p: any) => p.label) : [];
  const chapters        = (classNum && subject && part) ? getChaptersForPart(classNum, subject, part) : [];
  let specialtyOptions = classNum ? getSpecialtyTags(classNum) : [];
  if (subject === "IT") {
    specialtyOptions = ["IT Practical", "IT Theory Notes"];
    if (classNum === "10") specialtyOptions.push("IT Record Book Notes");
  }

  const linkValidation = driveUrl ? validateResourceLink(driveUrl) : null;
  const linkError      = linkValidation && !linkValidation.valid ? linkValidation.reason : null;
  const formValid      = validateForm({ title, classNum, subject, part, chapter, resourceType: format, resourceLink: driveUrl });
  const canSubmit      = formValid.valid && !linkError;

  const initiateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setCountdown(10);
    setShowLegalModal(true);
  };

  const handleFinalUpload = async () => {
    if (countdown > 0 || loading) return;
    setLoading(true); setResult(null);
    try {
      const res = await secureUploadHandler({ 
        title, class: Number(classNum), subject, part, chapter, 
        resource_type: docType, specialty_tag: specialtyTag, 
        resource_link: driveUrl, description, uploader_name: uploaderName
      }, verifiedEmail);

      if (res.success) {
        setResult({ type: "success", msg: "LEGAL TRANSMISSION SUCCESSFUL. Identity Logged." });
        setTitle(""); setDescription(""); setDriveUrl(""); setSpecialtyTag("");
        setShowLegalModal(false);
      } else {
        throw new Error(res.error);
      }
    } catch (err: any) {
      setResult({ type: "error", msg: err.message || "Upload failed." });
      setShowLegalModal(false);
    } finally {
      setLoading(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
    }
  };

  return (
    <>
      <form onSubmit={initiateSubmit} className="rounded-[2.5rem] p-8 md:p-12 border border-[#00ED64]/20 shadow-2xl overflow-hidden relative"
        style={{ background: "rgba(0,30,43,0.40)", backdropFilter: "blur(24px)" }}>
        
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00ED64]/5 rounded-full blur-[100px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-white/5">
            <div className="p-4 bg-[#00ED64]/10 rounded-2xl"><UploadCloud className="h-8 w-8 text-[#00ED64]" /></div>
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-[-0.04em]">Secure Console</h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Identity Logged: {verifiedEmail}</p>
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div ref={resultRef} initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                className={`flex items-start gap-3 p-5 rounded-2xl mb-8 text-sm font-bold border uppercase tracking-wide ${result.type === "success" ? "bg-[#00ED64]/10 border-[#00ED64]/25 text-[#00ED64]" : "bg-red-500/10 border-red-500/25 text-red-400"}`}>
                {result.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5"/> : <AlertCircle className="h-5 w-5 shrink-0 mt-0.5"/>}
                {result.msg}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <F label="Display Name (e.g. Rahul T.)"><input value={uploaderName} onChange={e=>setUploaderName(e.target.value)} placeholder="SOURCE ATTRIBUTION" className={I}/></F>
            <F label="Resource Title *"><input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="MAX 100 CHARS" maxLength={100} className={I}/></F>

            <F label="Target Class *">
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
            <F label="Specialty Tag (e.g. SSLC Special)">
              <CustomSelect
                options={specialtyOptions.length?specialtyOptions:["Select Class First"]}
                value={specialtyTag||(specialtyOptions.length?"Select Tag":"Select Class First")}
                onChange={(val: any)=>{if(specialtyOptions.includes(val))setSpecialtyTag(val);}}/>
            </F>
            <F label="Material Category *" span={2}>
              <CustomSelect options={DOC_TYPES.map(t=>DOC_LABELS[t])} value={DOC_LABELS[docType]}
                onChange={(val: any)=>{const f=DOC_TYPES.find(t=>DOC_LABELS[t]===val);if(f)setDocType(f);}}/>
            </F>
            <F label="Resource Brief" span={2}>
              <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} placeholder="DESCRIBE THE RESOURCE METHODOLOGY..." className={`${I} resize-none`}/>
            </F>
            <F label="Google Drive Link * (Must Be drive.google.com)" span={2}>
              <input required type="url" value={driveUrl} onChange={e=>setDriveUrl(e.target.value)}
                placeholder="https://drive.google.com/file/d/..."
                className={`${I} ${linkError?"border-red-500 focus:border-red-500":""}`}/>
              <AnimatePresence>
                {linkError&&(
                  <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}
                    className="flex items-start gap-2 mt-2 text-[10px] font-black text-red-400 uppercase tracking-widest leading-none">
                    <ShieldAlert className="h-3 w-3 shrink-0"/>
                    {linkError}
                  </motion.div>
                )}
              </AnimatePresence>
            </F>
          </div>

          <button type="submit" disabled={!canSubmit||loading}
            className="w-full mt-10 py-5 rounded-[1.5rem] font-black text-lg uppercase tracking-[0.2em] transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            style={{ 
              background: canSubmit ? "#00ED64" : "rgba(0,237,100,0.1)", 
              color: canSubmit ? "#012B39" : "#00ED64", 
              border: canSubmit ? "none" : "1px solid rgba(0,237,100,0.3)",
              boxShadow: canSubmit ? "0 0 40px rgba(0,237,100,0.3)" : "none" 
            }}>
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Verifying Threat Signature...</span>
              </div>
            ) : "Deploy to Vault"}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showLegalModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !loading && setShowLegalModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-[#001E2B] border-4 border-red-500/50 rounded-[3rem] p-8 md:p-12 shadow-[0_0_100px_rgba(239,68,68,0.2)]"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-500/10 rounded-2xl">
                    <Gavel className="h-8 w-8 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">STRICT LEGAL WARNING</h2>
                </div>
                {!loading && (
                  <button onClick={() => setShowLegalModal(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X className="h-6 w-6 text-slate-700" />
                  </button>
                )}
              </div>

              <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 mb-8">
                <p className="text-red-500 font-black text-sm mb-6 uppercase italic tracking-wide">
                  LIABILITY TRANSFER PROTOCOL (IT ACT 2000):
                </p>
                <div className="text-slate-300 text-sm leading-relaxed font-bold space-y-4">
                  <p>
                    STRICT LEGAL WARNING: You are solely and legally responsible for the file you are linking. Uploading malware, executable files (.exe, .bat, .apk), pirated content, or explicit material is a criminal cybercrime under Sections 43 and 66 of the IT Act, 2000. Eduplus Kerala logs your verified email address and upload timestamp. In the event of malicious activity, your details will be handed over to cyber authorities immediately. By proceeding, you agree to fully indemnify the founders of Eduplus Kerala against any legal action.
                  </p>
                </div>
              </div>

              <button 
                disabled={countdown > 0 || loading}
                onClick={handleFinalUpload}
                className="w-full py-6 rounded-2xl font-black text-lg uppercase tracking-[0.2em] transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-4"
                style={{ 
                  background: countdown > 0 ? "rgba(239,68,68,0.1)" : "#ef4444", 
                  color: countdown > 0 ? "#ef4444" : "white",
                  boxShadow: countdown > 0 ? "none" : "0 0 50px rgba(239,68,68,0.4)"
                }}
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin"/> : (
                  countdown > 0 ? (
                    <><Timer className="h-6 w-6"/> Reading time required: {countdown}s...</>
                  ) : "I Agree, Upload File"
                )}
              </button>
              
              <p className="mt-8 text-[10px] text-slate-700 font-bold text-center uppercase tracking-widest">
                Safe Harbour Protection Section 79 Active
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

const I = "w-full bg-[#001E2B]/50 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-700 focus:border-[#00ED64] outline-none transition-all text-sm font-bold tracking-wider";
function F({ label, children, span=1 }: { label:string; children:React.ReactNode; span?:1|2 }) {
  return <div className={span===2?"md:col-span-2":""}><label className="block text-[10px] font-black text-slate-600 uppercase tracking-[0.25em] mb-3 ml-1">{label}</label>{children}</div>;
}

function Loader2(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/>
    </svg>
  );
}
