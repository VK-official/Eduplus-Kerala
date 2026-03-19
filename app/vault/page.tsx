import { getFiles } from "../../lib/actions/fetch.actions";
import { SidebarFilter } from "../../components/SidebarFilter";
import { VaultGrid } from "../../components/VaultGrid";
import { PageWrapper } from "../../components/PageWrapper";

export const metadata = {
  title: "Class Vault | Eduplus Kerala",
  description: "Browse SCERT Kerala study materials by class and subject.",
};

export default async function VaultPage(props: {
  searchParams: Promise<{ q?: string; class?: string; subject?: string }>;
}) {
  const sp    = (await props.searchParams) || {};
  const files = await getFiles(sp.q, sp.class, sp.subject);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] pt-8">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pb-24">
          {/* Vault Header */}
          <div className="mb-10">
            <div className="inline-block py-1.5 px-4 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-bold tracking-widest uppercase mb-4">
              SCERT Kerala
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-[-0.04em] leading-none uppercase">Class Vault</h1>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl">Browse curated study materials filtered by class, subject, and type.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <SidebarFilter />
            </div>
            <div className="lg:col-span-3">
              <VaultGrid files={files} />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
