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
              {/* Glowing Aura Button - v55.0 Solid Aura Design */}
              <Link href="/admin" className="relative group inline-block w-full md:w-auto mt-4 md:mt-0">
                {/* The Glowing Aura Behind */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00ED64] via-[#eab308] to-[#00ED64] rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
                
                {/* The Solid Button In Front */}
                <button className="relative w-full px-8 py-4 bg-[#00ED64] hover:bg-[#00c950] text-[#001E2B] font-black uppercase tracking-widest rounded-lg transition-all shadow-xl text-xs">
                  CONTRIBUTE FILES
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
