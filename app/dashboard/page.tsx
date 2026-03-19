"use client";

import { useState, useEffect } from "react";
import { uploadDriveFile } from "../../lib/actions/upload.actions";
import { CustomSelect } from "../../components/CustomSelect";
import { getSubjectsForClass } from "../../lib/constants";
import { UploadCloud, CheckCircle2, AlertCircle, BarChart3 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { LiquidGlass } from "../../components/LiquidGlass";

const activityData = [
  { name: 'Mon', uploads: 12 }, { name: 'Tue', uploads: 45 },
  { name: 'Wed', uploads: 28 }, { name: 'Thu', uploads: 80 },
  { name: 'Fri', uploads: 59 }, { name: 'Sat', uploads: 110 }, { name: 'Sun', uploads: 95 },
];

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
    if (sessionStatus === "unauthenticated") router.push("/");
  }, [sessionStatus, router]);

  if (sessionStatus === "loading" || sessionStatus === "unauthenticated") return null;

  const availableSubjects = getSubjectsForClass(classNum);
  const classOptions = Array.from({length: 12}, (_, i) => String(i + 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setStatus(null);
    try {
      if (!driveUrl.startsWith("http")) throw new Error("Invalid Google Drive URL");
      await uploadDriveFile({ title, description, classNum: Number(classNum), subject, type: "notes", driveUrl });
      setStatus({ type: "success", msg: "Transmission successful! Vault updated." });
      setTitle(""); setDescription(""); setDriveUrl("");
    } catch (error: any) {
      setStatus({ type: "error", msg: error.message || "Upload transmission failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-4 h-full min-h-[400px]">
          <LiquidGlass className="h-full rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h2 className="text-xl font-black text-white tracking-[-0.02em] uppercase">Activity</h2>
                <div className="p-2 bg-[#00ED64]/10 rounded-lg"><BarChart3 className="h-5 w-5 text-[#00ED64]" /></div>
              </div>
              <div className="mb-2 text-sm font-bold text-slate-400 uppercase tracking-widest relative z-10">Total Uploads (7D)</div>
              <div className="text-5xl font-black text-[#00ED64] glow-text relative z-10">429</div>
            </div>
            
            <div className="h-48 w-full mt-8 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ED64" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00ED64" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ backgroundColor: '#012B39', borderColor: 'rgba(0,237,100,0.2)', borderRadius: '12px' }} itemStyle={{ color: '#00ED64', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="uploads" stroke="#00ED64" strokeWidth={3} fillOpacity={1} fill="url(#colorUploads)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </LiquidGlass>
        </div>

        <div className="lg:col-span-8">
          <LiquidGlass className="w-full p-8 md:p-12 rounded-3xl relative overflow-visible">
            <div className="flex flex-col items-center text-center gap-4 mb-10 border-b border-white/5 pb-8 relative z-10">
              <div className="p-4 bg-[#00ED64]/10 rounded-full"><UploadCloud className="h-10 w-10 text-[#00ED64]" /></div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-[-0.02em] uppercase">Teacher Console</h1>
                <p className="text-slate-400 font-medium mt-2">Initialize material upload to the deep storage vault.</p>
              </div>
            </div>

            {status && (
              <div className={`relative z-10 p-4 rounded-xl mb-8 flex items-center gap-3 font-semibold ${status.type === 'success' ? 'bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64]' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                {status.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Document Title</label>
                  <input required value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="e.g. Gravity and Motion Notes" className="w-full bg-[#001E2B] border border-gray-600 rounded-xl p-4 text-white focus:border-[#00ED64] outline-none transition-all shadow-sm" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</label>
                  <textarea required value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Brief description..." className="w-full bg-[#001E2B] border border-gray-600 rounded-xl p-4 text-white focus:border-[#00ED64] outline-none transition-all shadow-sm min-h-[100px] resize-none" />
                </div>
                <div className="space-y-3 z-50">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target Class</label>
                  <CustomSelect options={classOptions.map(c=>`Class ${c}`)} value={`Class ${classNum}`} onChange={(val)=>{const newC=val.replace("Class ",""); setClassNum(newC); const newSubs=getSubjectsForClass(newC); if(!newSubs.includes(subject)) setSubject(newSubs[0]||"");}} />
                </div>
                <div className="space-y-3 z-40">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                  <CustomSelect options={availableSubjects} value={subject} onChange={setSubject} />
                </div>
                <div className="space-y-3 md:col-span-2 relative z-10">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Google Drive Link</label>
                  <input required type="url" value={driveUrl} onChange={(e)=>setDriveUrl(e.target.value)} placeholder="https://drive.google..." className="w-full bg-[#001E2B] border border-gray-600 rounded-xl p-4 text-white focus:border-[#00ED64] outline-none transition-all shadow-sm" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-5 rounded-xl bg-[#00ED64] hover:bg-[#00ea60] text-[#001E2B] font-black text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest glow-button mt-4">
                {loading ? "TRANSMITTING..." : "SECURE UPLOAD"}
              </button>
            </form>
          </LiquidGlass>
        </div>
      </div>
    </div>
  );
}
