import { BookmarkMinus } from "lucide-react";
import { PageWrapper } from "../../components/PageWrapper";

export default async function BookmarksPage() {
  // NextAuth & MongoDB Eradicated - Phase 10
  // Bookmarks system will be migrated to Supabase soon.
  
  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-3xl bg-blue-500/10 border border-blue-500/20 mb-6">
            <BookmarkMinus className="h-10 w-10 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-[-0.04em] uppercase mb-4">
            Bookmarks <span className="text-blue-400">Syncing</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            We are currently migrating our bookmarking system to Supabase. Your saved materials will return shortly in a faster, more secure experience.
          </p>
          <div className="mt-10">
            <a href="/vault" className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
              Return to Vault
            </a>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
