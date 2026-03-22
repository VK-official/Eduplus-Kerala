import Link from "next/link";
import { getFiles } from "../../../lib/actions/fetch.actions";
import { VaultContent } from "../../../components/VaultContent";
import { PageWrapper } from "../../../components/PageWrapper";
import { Award, ArrowLeft } from "lucide-react";

export default async function TeacherProfilePage({ params }: { params: { name: string } }) {
  const decodedName = decodeURIComponent(params.name);
  const allFiles = await getFiles();
  const teacherFiles = allFiles.filter((f: any) => f.uploader_name === decodedName);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] pt-28 pb-12 px-4 md:px-8 flex flex-col items-center">
        <div className="w-full max-w-screen-2xl">
          <Link href="/vault" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#00ED64] transition-colors font-bold text-sm tracking-widest uppercase mb-10">
            <ArrowLeft className="w-4 h-4" /> Back to Vault
          </Link>

          <div className="mb-14 flex items-center gap-6 p-8 bg-slate-900/60 border border-white/5 rounded-[2rem] shadow-2xl backdrop-blur-3xl">
            <div className="w-20 h-20 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/30 flex items-center justify-center shrink-0">
              <Award className="h-10 w-10 text-[#00ED64]" />
            </div>
            <div>
              <div className="inline-block py-1 px-3 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black tracking-widest uppercase mb-2">
                Veteran Uploader
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">{decodedName}</h1>
              <p className="text-slate-400 font-medium mt-2">{teacherFiles.length} Contributions to Eduplus Kerala</p>
            </div>
          </div>

          {/* Render the core vault layout pre-filtered to this teacher */}
          <VaultContent initialFiles={teacherFiles} />
        </div>
      </div>
    </PageWrapper>
  );
}
