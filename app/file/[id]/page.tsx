import dbConnect from "@/lib/mongodb";
import FileModel from "@/models/File";
import { notFound } from "next/navigation";
import { FileText, Download, ExternalLink, BookOpen, FileQuestion, GraduationCap } from "lucide-react";
import { DownloadButton } from "./DownloadButton";

export default async function FileDetailPage({ params }: { params: { id: string } }) {
  await dbConnect();
  
  let file;
  try {
    const fileDoc = await FileModel.findById(params.id).populate('uploaderId', 'name email').lean();
    if (!fileDoc) return notFound();
    file = JSON.parse(JSON.stringify(fileDoc));
  } catch (e) {
    return notFound();
  }

  const uploaderName = file.uploaderId?.name || file.uploaderId?.email || "Unknown User";

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-8 border-b border-slate-200 dark:border-slate-800 gap-6">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-2xl">
              {file.type === "notes" ? <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400" /> :
               file.type === "question_paper" ? <FileQuestion className="h-12 w-12 text-purple-600 dark:text-purple-400" /> :
               <FileText className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />}
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {file.title}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2 text-lg">
                <GraduationCap className="h-5 w-5" /> 
                Uploaded by <span className="font-semibold text-slate-700 dark:text-slate-300">{uploaderName}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-2">Subject</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{file.subject}</p>
          </div>
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-2">Class</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">Class {file.class}</p>
          </div>
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-2">Type</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white capitalize">{file.type.replace('_', ' ')}</p>
          </div>
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-2">Downloads</p>
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Download className="h-5 w-5" /> {file.downloads}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <DownloadButton fileId={file._id} driveUrl={file.driveUrl} />
        </div>
      </div>
    </div>
  );
}
