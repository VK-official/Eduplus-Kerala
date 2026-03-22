"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageWrapper } from "../../components/PageWrapper";
import { UploadForm } from "../../components/UploadForm";
import { supabase } from "../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, Key, Loader2, AlertCircle, LogOut } from "lucide-react";
import { SuperAdminDashboard } from "../../components/SuperAdminDashboard";

const SUPER_ADMIN_EMAIL = "edupluskerala90@gmail.com";

export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp" | "verified">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploaderEmail, setUploaderEmail] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUploaderEmail(data.user.email!);
        setStep("verified");
      }
    };
    checkSession();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/vault");
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      if (!email.toLowerCase().endsWith('@edupluskerala.in') && !email.toLowerCase().endsWith('@gmail.com') && !email.toLowerCase().endsWith('@kerala.gov.in') && !email.toLowerCase().endsWith('@eduplus.edu')) {
        setErrorMsg("Unauthorized. This portal is strictly for verified educators.");
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          shouldCreateUser: false // Teacher must already exist or be invited
        }
      });
      if (error) {
        console.error("Supabase OTP Error:", error);
        if (error.status === 429 || error.message.toLowerCase().includes("rate limit") || error.message.toLowerCase().includes("too many requests")) {
          setErrorMsg("Login limit reached for security. Please try again after some time. If this persists, use the Report button below.");
          return;
        }
        setErrorMsg(error.message);
        return;
      }
      setErrorMsg(null);
      setStep("otp");
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      // MANDATORY: 6-Digit OTP Verification (No Magic Links) - v51.0
      const { data, error } = await supabase.auth.verifyOtp({ 
        email, 
        token: otp, 
        type: 'email' 
      });
      if (error) throw error;
      if (data?.user) {
        setUploaderEmail(data.user.email!);
        setStep("verified");
      }
    } catch (err: any) {
      setError("Invalid OTP. Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "verified") {
    const isSuperAdmin = uploaderEmail === SUPER_ADMIN_EMAIL;

    return (
      <PageWrapper>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-[#00ED64] uppercase tracking-[0.3em] opacity-40 z-50">
          Eduplus Kerala {isSuperAdmin ? "Super Admin" : "Faculty"} Console
        </div>
        <div className="min-h-screen bg-[#001E2B] pt-12 pb-32">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 w-fit">
                <ShieldCheck className="h-5 w-5 text-[#00ED64]" />
                <span className="text-[#00ED64] text-xs font-black uppercase tracking-widest">
                  Authenticated: {uploaderEmail}
                </span>
              </div>
              
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest hover:bg-red-500/10 transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span>Secure Sign Out</span>
              </button>
            </div>

            {isSuperAdmin ? (
              <SuperAdminDashboard />
            ) : (
              <div className="max-w-4xl">
                <UploadForm verifiedEmail={uploaderEmail} />
              </div>
            )}
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#012B39]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00ED64]/5 rounded-full blur-[80px]" />
          
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-[#00ED64] uppercase tracking-[0.3em] opacity-40">
            DEBUG: Auth Status - PENDING
          </div>
          
          <div className="relative z-10 text-center mb-10">
            <div className="inline-block p-4 bg-[#00ED64]/10 rounded-3xl border border-[#00ED64]/20 mb-6">
              <ShieldCheck className="h-10 w-10 text-[#00ED64]" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-3">Faculty Login</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Verify Identity to contribute</p>
          </div>

          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/50 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-amber-500 font-bold uppercase tracking-wide text-sm mb-1">Critical Session Notice</h3>
              <p className="text-amber-500/80 text-xs leading-relaxed">Due to platform security protocols, you can only sign in to your account once per active session. Please do not log out unless you are switching devices.</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.form 
                key="email" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                onSubmit={handleSendOtp} className="space-y-6"
              >
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input 
                    required type="email" value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="Enter Teacher Email for Verification"
                    className="w-full bg-[#001E2B] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-slate-600 focus:border-[#00ED64] outline-none transition-all font-bold text-sm tracking-widest"
                  />
                </div>
                <button 
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-[#00ED64] text-[#012B39] font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin"/> : "Request 8-Digit Code"}
                </button>
                {errorMsg && (
                  <p className="text-red-500 text-xs font-bold mt-4 border border-red-500/20 p-4 rounded-2xl bg-red-500/5 text-center leading-relaxed">
                    {errorMsg}
                  </p>
                )}
                <p className="text-center text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-wider">
                  By requesting a secure login code, you agree to our <a href='/terms' className='underline text-[#00ED64] hover:text-white'>Terms & Conditions</a> and <a href='/privacy' className='underline text-[#00ED64] hover:text-white'>Privacy Policy</a>.
                </p>
              </motion.form>
            ) : (
              <motion.form 
                key="otp" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                onSubmit={handleVerifyOtp} className="space-y-6"
              >
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input 
                    required type="text" maxLength={8} value={otp} onChange={e=>setOtp(e.target.value)}
                    placeholder="ENTER 8-DIGIT CODE"
                    className="w-full bg-[#001E2B] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-slate-600 focus:border-[#00ED64] outline-none transition-all font-bold text-sm tracking-widest"
                  />
                </div>
                {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{error}</p>}
                <button 
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-[#00ED64] text-[#012B39] font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin"/> : "Verify & Access Console"}
                </button>
                <button 
                  type="button" onClick={()=>setStep("email")}
                  className="w-full text-slate-600 text-[10px] font-black uppercase tracking-widest hover:text-slate-400 transition-colors"
                >
                  Use different email
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="mt-10 text-[10px] text-slate-600 font-bold leading-relaxed text-center uppercase tracking-wider">
            Safe Harbour Protection Section 79 Active. By proceeding, you agree to fulfill the Intermediary Guidelines.
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
