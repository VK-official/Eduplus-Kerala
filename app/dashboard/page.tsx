"use client";

import { useState, useEffect } from "react";
import { uploadDriveFile } from "../../lib/actions/upload.actions";
import { CustomSelect } from "../../components/CustomSelect";
import { getSubjectsForClass } from "../../lib/constants";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [classNum, setClassNum] = useState("10");
  const [subject, setSubject] = useState("Physics");
  const [driveUrl, setDriveUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error', msg: string} | null>(null);

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/");
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "loading" || sessionStatus === "unauthenticated") {
    return null;
  }

  const availableSubjects = getSubjectsForClass(classNum);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      if (!driveUrl.startsWith("http")) throw new Error("Invalid Google Drive URL");
      await uploadDriveFile({ title, description, classNum: Number(classNum), subject, type: "notes", driveUrl });
      setStatus({ type: "success", msg: "Transmission successful! File added to the Vault." });
      setTitle("");
      setDescription("");
      setDriveUrl("");
    } catch (error: any) {
      setStatus({ type: "error", msg: error.message || "Upload transmission failed." });
    } finally {
      setLoading(false);
    }
  };

  const classOptions = Array.from({length: 12}, (_, i) => String(i + 1));

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl flex items-center justify-center flex-1">
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full bg-[#012B39] p-8 md:p-12 rounded-3xl border border-[#00ED64]/20 shadow-[0_0_50px_rgba(0,237,100,0.05)] relative overflow-visible backdrop-blur-xl"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#001E2B] via-[#00ED64] to-[#001E2B]"></div>
        
        <div className="flex flex-col items-center text-center gap-4 mb-10 border-b border-white/5 pb-8">
          <div className="p-4 bg-[#00ED64]/10 rounded-full">
            <UploadCloud className="h-10 w-10 text-[#00ED64]" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">Teacher Console</h1>
            <p className="text-gray-400 font-medium mt-2">Initialize material upload to the deep storage vault.</p>
          </div>
        </div>

        {status && (
          <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 font-semibold ${status.type === 'success' ? 'bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64]' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
            {status.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Document Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Gravity and Motion Revision Notes"
              className="w-full bg-[#001E2B] border border-gray-600 rounded-xl p-4 text-white focus:border-[#00ED64] outline-none shadow-sm transition-all focus:shadow-[0_0_20px_rgba(0,237,100,0.15)]"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the material..."
              className="w-full bg-[#001E2B] border border-gray-600 rounded-xl p-4 text-white focus:border-[#00ED64] outline-none shadow-sm transition-all focus:shadow-[0_0_20px_rgba(0,237,100,0.15)] min-h-[100px] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-50 relative">
            <div className="space-y-3 relative z-50">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Target Class</label>
              <CustomSelect 
                options={classOptions.map(c => `Class ${c}`)}
                value={`Class ${classNum}`}
                onChange={(val) => {
                  const newClass = val.replace("Class ", "");
                  setClassNum(newClass);
                  const newSubs = getSubjectsForClass(newClass);
                  if (!newSubs.includes(subject)) setSubject(newSubs[0] || "");
                }}
              />
            </div>
            
            <div className="space-y-3 relative z-40">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Academic Subject</label>
              <CustomSelect 
                options={availableSubjects}
                value={subject}
                onChange={setSubject}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Google Drive Link</label>
            <input
              required
              type="url"
              value={driveUrl}
              onChange={(e) => setDriveUrl(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full bg-[#001E2B] border border-gray-600 rounded-xl p-4 text-white focus:border-[#00ED64] outline-none shadow-sm transition-all focus:shadow-[0_0_20px_rgba(0,237,100,0.15)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-10 py-4 rounded-xl bg-[#00ED64] hover:bg-[#00ea60] text-[#001E2B] font-black text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest shadow-[0_0_15px_rgba(0,237,100,0.4)]"
          >
            {loading ? "TRANSMITTING TO VAULT..." : "UPLOAD MATERIAL"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
