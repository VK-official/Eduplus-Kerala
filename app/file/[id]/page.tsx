import { notFound } from "next/navigation";
import { getFileById } from "../../../lib/actions/fetch.actions";
import { DownloadButton } from "./DownloadButton";
import { CommentSection } from "../../../components/CommentSection";
import { PageWrapper } from "../../../components/PageWrapper";
import { FileText, BookOpen, FileQuestion, GraduationCap, Download, Layers } from "lucide-react";

export default async function FilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const file = await getFileById(id);

  if (!file) return notFound();

  // Map legacy type to icons
  const Icon = file.resource_type === "notes" ? BookOpen :
               file.resource_type === "question_paper" ? FileQuestion : FileText;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-[#012B39]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00ED64]/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 pb-10 border-b border-white/5 gap-6">
                <div className="flex items-center gap-6">
                  <div className="p-5 bg-[#00ED64]/10 rounded-3xl border border-[#00ED64]/20">
                    <Icon className="h-10 w-10 text-[#00ED64]" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-[-0.04em] uppercase leading-tight">
                      {file.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-3">
                      <GraduationCap className="h-4 w-4 text-slate-500" />
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                        Uploader: <span className="text-[#00ED64]">{file.uploader_name || "Guest Faculty"}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <StatCard label="Subject" value={file.subject} />
                <StatCard label="Class"   value={`Class ${file.class}`} />
                <StatCard label="Chapter" value={file.chapter || "Full Text"} />
                <StatCard label="Downloads" value={file.downloads || 0} icon={Download} />
              </div>

              <div className="flex justify-center mb-12">
                <DownloadButton fileId={file.id} driveUrl={file.resource_link} />
              </div>

              {file.description && (
                <div className="p-6 rounded-3xl bg-[#001E2B]/80 border border-white/5 mb-6">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Resource Memo</p>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium">{file.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12">
             <CommentSection fileId={file.id} initialComments={file.comments || []} uploaderName={file.uploader_name} />
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon?: any }) {
  return (
    <div className="p-5 bg-[#001E2B]/40 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-[#00ED64]/30 transition-all">
      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">{label}</p>
      <p className="text-lg font-black text-white flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-[#00ED64]" />}
        {value}
      </p>
    </div>
  );
}
