import { notFound } from "next/navigation";
import { getFileById } from "../../../lib/actions/fetch.actions";
import { getComments } from "../../../lib/actions/comment.actions";
import { getDirectLink } from "../../../lib/drive";
import { ResourceActions } from "../../../components/ResourceActions";
import { CommentSection } from "../../../components/CommentSection";
import { PageWrapper } from "../../../components/PageWrapper";
import { BookOpen, FileText, HardDrive, User, Tag, Layers } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const file = await getFileById(id);
  if (!file) return { title: "Resource Not Found | Eduplus Kerala" };
  
  // High-performance SEO: Class + Subject + Chapter indexing
  return {
    title: `Class ${file.class} ${file.subject} - ${file.chapter} | Eduplus Kerala Vault`,
    description: file.description || `Download Class ${file.class} ${file.subject} revision materials, model questions, and notes for SCERT Kerala 2026 syllabus.`,
    keywords: [`Class ${file.class}`, file.subject, file.chapter, "SCERT Kerala", "Model Questions", "Revision Notes"],
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [file, comments] = await Promise.all([getFileById(id), getComments(id)]);

  if (!file) notFound();

  const downloadLink = getDirectLink(file.driveUrl);
  const viewLink     = file.driveUrl.includes("drive.google.com")
    ? file.driveUrl.replace("/view", "/preview").replace(/\?.*$/, "")
    : file.driveUrl;

  const avgRating = file.ratingCount > 0
    ? (file.totalStars / file.ratingCount).toFixed(1)
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
            className="rounded-3xl p-8 md:p-10 border border-[#00ED64]/15 mb-8"
            style={{ background: "rgba(1,43,57,0.55)", backdropFilter: "blur(24px)" }}
          >
            {/* Class + Subject Badge Row */}
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <span className="px-3 py-1 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-black uppercase tracking-widest">
                Class {file.class}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-wider">
                {file.subject}
              </span>
              {file.specialtyTag && (
                <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                  {file.specialtyTag}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-wider">
                {file.format || "PDF"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-[-0.04em] leading-tight mb-6">
              {file.title}
            </h1>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <MetaItem icon={Layers}    label="Chapter"   value={file.chapter  || "—"} />
              <MetaItem icon={HardDrive} label="File Size" value={file.fileSize || "—"} />
              <MetaItem icon={User}      label="Uploader"  value={file.uploaderName || "Anonymous"} />
              <MetaItem icon={Tag}       label="Category"  value={file.type?.replace("_", " ") || "Notes"} />
            </div>

            {/* Description */}
            {file.description && (
              <div className="p-5 rounded-2xl bg-[#001E2B]/60 border border-white/5 mb-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description</p>
                <p className="text-slate-300 text-sm leading-relaxed">{file.description}</p>
              </div>
            )}

            {/* Covered Areas */}
            {file.coveredAreas && (
              <div className="p-5 rounded-2xl bg-[#001E2B]/60 border border-white/5 mb-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Topics Covered</p>
                <p className="text-slate-300 text-sm leading-relaxed">{file.coveredAreas}</p>
              </div>
            )}

            {/* ── Malayalam Warning ── */}
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 mt-4">
              <p className="text-red-500 font-bold mt-0 text-sm leading-relaxed">
                ശ്രദ്ധിക്കുക: ഈ ഫയലിൽ എന്തെങ്കിലും തെറ്റുകൾ ഉണ്ടെങ്കിൽ ദയവായി താഴെ കമന്റ് വഴി അറിയിക്കുക.
              </p>
            </div>
          </div>

          {/* ── Action Buttons (Client Island) ── */}
          <ResourceActions
            fileId={file._id}
            viewLink={viewLink}
            downloadLink={downloadLink}
            initialRating={avgRating ? Number(avgRating) : 0}
            ratingCount={file.ratingCount || 0}
          />

          {/* ── Discussions & Reports (Client Island) ── */}
          <CommentSection
            fileId={file._id}
            initialComments={comments}
            uploaderName={file.uploaderName}
          />
        </div>
      </div>
    </PageWrapper>
  );
}

function MetaItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#001E2B]/50 border border-white/5">
      <Icon className="h-4 w-4 text-[#00ED64] mt-0.5 shrink-0" />
      <div>
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{label}</p>
        <p className="text-slate-300 text-sm font-semibold mt-0.5 break-words">{value}</p>
      </div>
    </div>
  );
}
