"use client";

import { useState, useEffect } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { UploadForm } from "../../components/UploadForm";
import { TeacherCommentDashboard } from "../../components/TeacherCommentDashboard";
import { ActivitySidebar } from "../../components/ActivitySidebar";
import { supabase } from "../../lib/supabase";
import { getTeacherFilesWithComments } from "../../lib/actions/fetch.actions";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, Key, Loader2, ShieldAlert } from "lucide-react";

export default function DashboardPage() {
  const [step, setStep] = useState<"auth" | "dashboard">("auth");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [teacherFiles, setTeacherFiles] = useState<any[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setVerifiedEmail(data.user.email!);
        setStep("dashboard");
        loadData();
      }
    };
    checkUser();
  }, []);

  const loadData = async () => {
    const files = await getTeacherFilesWithComments();
    setTeacherFiles(files);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setError("OTP SENT. Check your email.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const { data, error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' });
      if (error) throw error;
      if (data.user) {
        setVerifiedEmail(data.user.email!);
        setStep("dashboard");
        loadData();
      }
    } catch (err: any) {
      setError("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "dashboard") {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#001E2B] py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <aside className="lg:col-span-1">
                <div className="mb-6 px-6 py-4 rounded-3xl bg-[#00ED64]/10 border border-[#00ED64]/20 flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#00ED64]" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-black text-[#00ED64] uppercase tracking-widest">Logged Identity</p>
                    <p className="text-white text-xs font-bold truncate">{verifiedEmail}</p>
                  </div>
                </div>
                <ActivitySidebar email={verifiedEmail} />
              </aside>

              <main className="lg:col-span-2 space-y-8">
                <UploadForm verifiedEmail={verifiedEmail} />
                <TeacherCommentDashboard initialFiles={teacherFiles} />
              </main>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-[#012B39]/60 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00ED64]/5 rounded-full blur-[80px]" />
          
          <div className="relative z-10 text-center mb-10">
            <div className="inline-block p-4 bg-[#00ED64]/10 rounded-3xl border border-[#00ED64]/20 mb-6">
              <ShieldAlert className="h-10 w-10 text-[#00ED64]" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2 leading-none">Safe Console</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">IT ACT 2000 GATED ACCESS</p>
          </div>

          <form onSubmit={otp ? handleVerifyOtp : handleSendOtp} className="space-y-6 relative z-10">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input 
                  required type="email" value={email} onChange={e=>setEmail(e.target.value)}
                  placeholder="ACADEMIC EMAIL..."
                  className="w-full bg-[#001E2B] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-slate-700 focus:border-[#00ED64] outline-none transition-all font-black uppercase text-xs tracking-widest"
                />
              </div>

              <AnimatePresence>
                {email && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input 
                      type="text" maxLength={6} value={otp} onChange={e=>setOtp(e.target.value)}
                      placeholder="6-DIGIT OTP..."
                      className="w-full bg-[#001E2B] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-slate-700 focus:border-[#00ED64] outline-none transition-all font-black uppercase text-xs tracking-widest"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {error && <p className="text-[10px] font-black uppercase tracking-widest text-[#00ED64] text-center">{error}</p>}

            <button 
              disabled={loading}
              className="w-full py-5 rounded-2xl bg-[#00ED64] text-[#012B39] font-black uppercase tracking-[0.15em] hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,237,100,0.15)]"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin"/> : (otp ? "VERIFY IDENTITY" : "REQUEST ACCESS")}
            </button>
          </form>

          <p className="mt-10 text-[9px] text-slate-600 font-black leading-relaxed text-center uppercase tracking-widest px-4">
            Identity logging is mandatory for Intermediary Safe Harbour under Section 79 of the IT Act.
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
