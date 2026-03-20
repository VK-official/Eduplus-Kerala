import { getFiles } from "../../lib/actions/fetch.actions";
import { VaultContent } from "../../components/VaultContent";
import { PageWrapper } from "../../components/PageWrapper";

export const metadata = {
  title: "Class Vault | Eduplus Kerala",
  description: "Browse SCERT Kerala study materials by class and subject.",
};

export default async function VaultPage() {
  // Fetch ALL resources once for instant client-side filtering
  // Enforced Class 5-10 strictly in getFiles internal logic
  const allFiles = await getFiles();

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] pt-8">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pb-24">
          <div className="mb-10 text-center md:text-left">
            <div className="inline-block py-1.5 px-4 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-bold tracking-widest uppercase mb-4">
              SCERT Kerala · Classes 5–10
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-[-0.04em] leading-none uppercase">Class Vault</h1>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto md:mx-0">Select a class and subject to browse curated materials.</p>
          </div>

          <VaultContent initialFiles={allFiles} />
        </div>
      </div>
    </PageWrapper>
  );
}
