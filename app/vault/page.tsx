import { getFiles } from "../../lib/actions/fetch.actions";
import { SidebarFilter } from "../../components/SidebarFilter";
import { PageWrapper } from "../../components/PageWrapper";
import Link from "next/link";
import { FileText, BookOpen, FileQuestion, ChevronRight } from "lucide-react";
import { SearchInput } from "../../components/SearchInput";

export const metadata = {
  title: "Class Vault | Eduplus Kerala",
  description: "Browse SCERT Kerala study materials by class and subject.",
};

const TYPE_ICON: Record<string, any> = {
  notes: BookOpen,
  question_paper: FileQuestion,
  a_plus: FileText,
};

const TAG_ORDER = [
  "SSLC Notes", "SSLC Model Question Paper", "SSLC Question Name", "SSLC Special",
  "Notes", "Normal Text", "Model Question Papers", "Previous Year Questions",
];

export default async function VaultPage(props: {
  searchParams: Promise<{ q?: string; class?: string; subject?: string }>;
}) {
  const sp    = (await props.searchParams) || {};
  const files = await getFiles(sp.q, sp.class, sp.subject);

  // Group by specialtyTag
  const grouped: Record<string, typeof files> = {};
  for (const f of files) {
    const tag = f.specialtyTag || "General";
    if (!grouped[tag]) grouped[tag] = [];
    grouped[tag].push(f);
  }

  // Sort groups by TAG_ORDER, unknown tags at end
  const sortedTags = Object.keys(grouped).sort((a, b) => {
    const ai = TAG_ORDER.indexOf(a);
    const bi = TAG_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] pt-8">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pb-24">
          <div className="mb-10">
            <div className="inline-block py-1.5 px-4 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-bold tracking-widest uppercase mb-4">
              SCERT Kerala · Classes 5–10
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-[-0.04em] leading-none uppercase">Class Vault</h1>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl">Select a class and subject to browse curated materials.</p>
          </div>

          {/* Global Search Engine */}
          <SearchInput />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <SidebarFilter />
            </div>

            <div className="lg:col-span-3 space-y-10">
              {files.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-white/5 bg-[#012B39]/30">
                  <FileText className="h-12 w-12 text-slate-700 mb-4" />
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No materials found</p>
                  <p className="text-slate-600 text-sm mt-2">Select a class and subject from the filter panel</p>
                </div>
              ) : (
                sortedTags.map(tag => (
                  <section key={tag}>
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px flex-1 bg-white/5" />
                      <span className="px-4 py-1.5 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-black uppercase tracking-widest whitespace-nowrap">
                        {tag}
                      </span>
                      <div className="h-px flex-1 bg-white/5" />
                    </div>

                    {/* Resource List */}
                    <div className="space-y-3">
                      {grouped[tag].map((file: any) => {
                        const Icon = TYPE_ICON[file.type] || FileText;
                        return (
                          <Link key={file._id} href={`/vault/${file._id}`}>
                            <div className="group flex items-center gap-4 p-4 md:p-5 rounded-2xl border border-white/5 bg-[#012B39]/40 backdrop-blur-md hover:border-[#00ED64]/30 hover:bg-[#012B39]/70 transition-all cursor-pointer">
                              <div className="p-3 bg-[#00ED64]/10 rounded-xl shrink-0">
                                <Icon className="h-5 w-5 text-[#00ED64]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-bold truncate group-hover:text-[#00ED64] transition-colors">{file.title}</p>
                                <div className="flex items-center gap-3 mt-1 flex-wrap">
                                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Class {file.class}</span>
                                  <span className="text-slate-700">·</span>
                                  <span className="text-slate-500 text-xs font-semibold">{file.subject}</span>
                                  {file.chapter && <><span className="text-slate-700">·</span><span className="text-slate-500 text-xs font-semibold truncate max-w-[200px]">{file.chapter}</span></>}
                                  {file.fileSize && <><span className="text-slate-700">·</span><span className="text-slate-600 text-xs">{file.fileSize}</span></>}
                                </div>
                              </div>
                              <ChevronRight className="h-5 w-5 text-slate-700 group-hover:text-[#00ED64] shrink-0 transition-colors" />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
