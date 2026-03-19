import { getFiles } from "../lib/actions/fetch.actions";
import { FileCard } from "../components/FileCard";
import { SidebarFilter } from "../components/SidebarFilter";
import { FileQuestion, GraduationCap } from "lucide-react";

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; class?: string; subject?: string };
}) {
  const files = await getFiles(searchParams.q, searchParams.class, searchParams.subject);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          BioVision <span className="text-blue-600 dark:text-blue-400">Hub</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Search and download essential study notes, previous year question papers, and A+ materials.
        </p>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <SidebarFilter />
        </div>

        <div className="md:col-span-3">
          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 backdrop-blur-sm min-h-[400px]">
              <GraduationCap className="h-16 w-16 text-blue-500 mb-6" />
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Welcome to BioVision Remake</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md">
                No materials uploaded yet. Teachers, head over to the Dashboard to add the first notes!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file: any) => (
                <FileCard
                  key={file._id}
                  title={file.title}
                  subject={file.subject}
                  classNum={file.class}
                  type={file.type}
                  driveUrl={file.driveUrl}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
