import dbConnect from "../../lib/mongodb";
import User from "../../models/User";
import FileModel from "../../models/File";
import { getServerSession } from "next-auth/next";
import { FileCard } from "../../components/FileCard";
import { BookmarkMinus } from "lucide-react";

export default async function BookmarksPage() {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Sign In Required</h1>
        <p className="text-slate-600 dark:text-slate-400">Please log in to view and manage your saved materials.</p>
      </div>
    );
  }

  await dbConnect();
  FileModel.init();
  
  const user = await User.findOne({ email: session.user.email }).populate("bookmarks").lean();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
      </div>
    );
  }

  const bookmarks = JSON.parse(JSON.stringify(user.bookmarks || []));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl flex items-center gap-3">
          <BookmarkMinus className="h-8 w-8 text-blue-600" />
          My Saved Materials
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-6">
          Quickly access the resources you've bookmarked for later.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 backdrop-blur-sm min-h-[300px]">
          <BookmarkMinus className="h-16 w-16 text-slate-400 mb-4" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No bookmarks yet</h3>
          <p className="text-slate-600 dark:text-slate-400">
            When you find helpful notes or past papers, save them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((file: any) => (
            <FileCard
              key={file._id}
              title={file.title}
              subject={file.subject}
              classNum={file.class}
              type={file.type}
              driveUrl={`/file/${file._id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
