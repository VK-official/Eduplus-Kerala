import { notFound } from "next/navigation";
import { getFileById } from "../../../lib/actions/fetch.actions";
import { ResourceActions } from "../../../components/ResourceActions";
import { CommentSection } from "../../../components/CommentSection";
import { PageWrapper } from "../../../components/PageWrapper";
import { BookOpen, FileText, HardDrive, User, Tag, Layers, GraduationCap } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const file = await getFileById(id);
  if (!file) return { title: "Resource Not Found | Eduplus Kerala" };
  
  return {
    title: `Class ${file.class} ${file.subject} - ${file.chapter} | Eduplus Kerala Vault`,
    description: file.description || `Download Class ${file.class} ${file.subject} revision materials.`,
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const file = await getFileById(id);

  if (!file) notFound();

  const comments     = file.comments || [];
  const avgRating = file.rating_count > 0
    ? (file.total_stars / file.rating_count).toFixed(1)
    : null;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] pt-8 pb-32">
        <div className="max-w-4xl mx-auto px-4 md:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-widest mb-8">
            <a href="/vault" className="hover:text-[#00ED64] transition-colors">Vault</a>
            <span>/</span>
            <span className="text-slate-400 truncate">{file.title}</span>
          </div>

          {/* ── Resource Header Card ── */}
          <div
            className="rounded-[2.5rem] p-8 md:p-10 border border-[#00ED64]/15 mb-8 overflow-hidden relative"
            style={{ background: "rgba(1,43,57,0.55)", backdropFilter: "blur(24px)" }}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00ED64]/5 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 flex-wrap mb-6">
                <span className="px-3 py-1 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-black uppercase tracking-widest">
                  Class {file.class}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  {file.subject}
                </span>
                {file.specialty_tag && (
                  <span className="px-3 py-1 rounded-full bg-[#00ED64]/5 border border-[#00ED64]/10 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    {file.specialty_tag}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white tracking-[-0.04em] leading-tight mb-8 uppercase">
                {file.title}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <MetaItem icon={Layers}    label="Chapter"   value={file.chapter  || "General"} />
                <MetaItem icon={HardDrive} label="Capacity"   value={file.file_size || "—"} />
                <MetaItem icon={GraduationCap}      label="Source"  value={file.uploader_name || "Guest Faculty"} />
                <MetaItem icon={Tag}       label="Category"  value={file.resource_type?.replace("_", " ") || "Notes"} />
              </div>

              {file.description && (
                <div className="p-5 rounded-2xl bg-[#001E2B]/60 border border-white/5 mb-4">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Resource Overview</p>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium">{file.description}</p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 mt-6">
                <p className="text-red-500 font-bold text-[11px] uppercase tracking-wider">
                  ശ്രദ്ധിക്കുക: ഈ ഫയലിൽ എന്തെങ്കിലും തെറ്റുകൾ ഉണ്ടെങ്കിൽ ദയവായി താഴെ റിപ്പോർട്ട് ചെയ്യുക.
                </p>
              </div>
            </div>
          </div>

          <ResourceActions
            fileId={file.id}
            viewLink={file.resource_link}
            downloadLink={file.resource_link}
            initialRating={avgRating ? Number(avgRating) : 0}
            ratingCount={file.rating_count || 0}
          />

          <CommentSection
            fileId={file.id}
            initialComments={comments}
            uploaderName={file.uploader_name}
          />
        </div>
      </div>
    </PageWrapper>
  );
}

function MetaItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#001E2B]/50 border border-white/5 group hover:border-[#00ED64]/20 transition-all">
      <Icon className="h-4 w-4 text-[#00ED64] mt-0.5 shrink-0" />
      <div>
        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{label}</p>
        <p className="text-slate-300 text-xs font-bold mt-0.5 break-words uppercase">{value}</p>
      </div>
    </div>
  );
}
