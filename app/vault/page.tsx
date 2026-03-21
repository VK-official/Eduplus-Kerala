import Link from "next/link";
import { getFiles } from "../../lib/actions/fetch.actions";
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
              {/* Supreme Vault Button - v56.0 High-Contrast Entry Point */}
              <Link href="/admin" className="relative group inline-block w-full lg:w-[480px] mt-8 md:mt-0">
                {/* The Powerful Moving Aura */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00ED64] via-yellow-400 to-[#00ED64] rounded-2xl blur-xl opacity-80 group-hover:opacity-100 transition duration-700 animate-pulse" />
                
                {/* The Massive Solid Button */}
                <button className="relative w-full px-12 py-10 bg-[#00ED64] hover:bg-[#00ff6e] text-[#001E2B] text-2xl md:text-3xl font-black uppercase tracking-tighter rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_50px_rgba(0,237,100,0.3)]">
                  CONTRIBUTE STUDY CONTENT FILE
                </button>
              </Link>
            </div>
          </div>

          <VaultContent initialFiles={allFiles} />
        </div>
      </div>
    </PageWrapper>
  );
}
