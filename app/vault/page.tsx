import Link from "next/link";
import { motion } from "framer-motion";
import { getFiles } from "../../lib/actions/fetch.actions";
import { BookOpen, FileText, Smile } from "lucide-react";
import { VaultContent } from "../../components/VaultContent";
import { PageWrapper } from "../../components/PageWrapper";

export const metadata = {
  title: "Class Vault | Eduplus Kerala",
  description: "Browse SCERT Kerala study materials by class and subject.",
};

export default async function VaultPage() {
  const allFiles = await getFiles();

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] pt-8">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pb-24">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block py-1.5 px-4 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-bold tracking-widest uppercase mb-4">
                SCERT Kerala · Classes 5–10
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-[-0.04em] leading-none uppercase">Class Vault</h1>
              <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto md:mx-0">Select a class and subject to browse curated materials.</p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6">
              {/* Teacher-to-Student SVG Story - v54.0 Visual Blueprint */}
              <div className="hidden md:flex items-center gap-4 px-6 py-3 bg-[#012B39]/50 rounded-full border border-white/5 backdrop-blur-md">
                <BookOpen className="text-[#00ED64] w-5 h-5 animate-pulse" />
                <div className="relative w-20 h-[1px] bg-slate-800 flex items-center">
                  <motion.div
                    animate={{ x: [0, 80], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute"
                  >
                    <FileText className="text-white w-3 h-3" />
                  </motion.div>
                </div>
                <Smile className="text-[#eab308] w-5 h-5 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
              </div>

              {/* Glowing Aura Button - v54.0 Premium UX */}
              <Link 
                href="/admin" 
                className="relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-[#001E2B] px-10 font-black text-white border border-[#00ED64]/50 shadow-[0_0_15px_rgba(0,237,100,0.4)] transition-all hover:shadow-[0_0_30px_rgba(255,255,0,0.6)] group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00ED64] via-[#eab308] to-[#00ED64] opacity-20 animate-[spin_4s_linear_infinite] blur-lg group-hover:opacity-40" />
                <span className="relative z-10 uppercase text-xs tracking-[0.2em]">Contribute Files</span>
              </Link>
            </div>
          </div>

          <VaultContent initialFiles={allFiles} />
        </div>
      </div>
    </PageWrapper>
  );
}
