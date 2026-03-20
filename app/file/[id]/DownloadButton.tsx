"use client";

import { useState, useEffect } from "react";
import { ExternalLink, ShieldCheck, X, AlertTriangle } from "lucide-react";
import { incrementDownload } from "../../../lib/actions/fetch.actions";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function DownloadButton({ fileId, driveUrl }: { fileId: string; driveUrl: string }) {
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleDownload = async () => {
    if (!agreed) return;
    try {
      await incrementDownload(fileId);
    } catch (e) {
      console.error("Failed to increment download count", e);
    }
    if (driveUrl) {
      window.open(driveUrl, "_blank", "noopener,noreferrer");
      setShowModal(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="w-full sm:w-[400px] flex items-center justify-center space-x-3 rounded-[1.5rem] bg-[#00ED64] px-8 py-5 text-xl font-black text-[#012B39] transition-all hover:bg-[#00ED64]/90 hover:shadow-[0_0_40px_rgba(0,237,100,0.3)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#00ED64] uppercase tracking-widest"
      >
        <ExternalLink className="h-7 w-7" />
        <span>Secure Download</span>
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#012B39] border border-[#00ED64]/30 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rgba(0,0,0,0) via-[#00ED64]/50 to-rgba(0,0,0,0)" />
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <ShieldCheck className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tight">Legal Access Protocol</h2>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="h-6 w-6 text-slate-500" />
                </button>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-2xl p-6 mb-8 max-h-[40vh] overflow-y-auto">
                <p className="text-white font-black text-sm mb-4 leading-relaxed uppercase italic">
                  LEGAL DISCLAIMER & ASSUMPTION OF RISK:
                </p>
                <p className="text-slate-400 text-[13px] leading-relaxed font-medium">
                  Eduplus Kerala acts solely as an intermediary search directory under Section 79 of the Information Technology Act, 2000. 
                  We provide links 'As-Is' and make no warranties regarding safety, accuracy, or reliability. 
                  We do not host, own, or scan the files linked on this platform; they reside entirely on third-party servers (Google Drive). 
                  In no event shall the founders or owners of Eduplus Kerala be held liable for any device damage, data loss, malware infection, or legal issues arising from the use of these links.
                </p>
              </div>

              <div className="space-y-6">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center mt-1">
                    <input 
                      type="checkbox" 
                      checked={agreed} 
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="peer appearance-none w-6 h-6 border-2 border-[#00ED64]/30 rounded-lg checked:bg-[#00ED64] checked:border-[#00ED64] transition-all cursor-pointer"
                    />
                    <CheckIcon className="absolute w-4 h-4 text-[#012B39] opacity-0 peer-checked:opacity-100 left-1 transition-opacity pointer-events-none" />
                  </div>
                  <span className="text-slate-400 text-sm font-bold leading-snug group-hover:text-slate-200 transition-colors">
                    I have read the <Link href="/terms" className="text-[#00ED64] underline hover:text-[#00ED64]/80">Terms & Conditions</Link> and acknowledge that I am downloading this file at my own absolute risk.
                  </span>
                </label>

                <button 
                  disabled={!agreed}
                  onClick={handleDownload}
                  className="w-full py-5 rounded-2xl font-black text-base uppercase tracking-widest transition-all disabled:opacity-30 disabled:grayscale"
                  style={{ 
                    background: agreed ? "#00ED64" : "rgba(0,237,100,0.1)", 
                    color: agreed ? "#012B39" : "#00ED64",
                    boxShadow: agreed ? "0 0 40px rgba(0,237,100,0.3)" : "none"
                  }}
                >
                  Proceed to Download
                </button>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                <AlertTriangle className="h-3 w-3" />
                Intermediary Safe Harbour Active (IT ACT 2000)
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function CheckIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
