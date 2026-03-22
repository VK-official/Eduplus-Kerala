"use client";
import { use } from 'react';
import { User, ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function TeacherProfile({ params }: { params: Promise<{ name: string }> }) {
  // Unwrap the params using React.use()
  const { name } = use(params);
  const decodedName = decodeURIComponent(name);

  // Mock data (to be replaced with Supabase filter: .eq('uploader_name', decodedName))
  const teacherMaterials = [
    { id: 1, title: 'Physics Focus Area', class: 'HS (8-10)', subject: 'Physics', upvotes: 120 }
  ];

  return (
    <main className="min-h-screen bg-[#001E2B] text-white pt-28 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href="/vault" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#00ED64] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> BACK TO VAULT
        </Link>

        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-12 p-8 bg-slate-900/50 border border-slate-800 rounded-3xl">
          <div className="w-20 h-20 bg-[#00ED64]/10 rounded-full flex items-center justify-center border border-[#00ED64]/30">
            <User className="w-10 h-10 text-[#00ED64]" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">{decodedName}</h1>
            <p className="text-[#00ED64] font-bold tracking-widest text-sm uppercase mt-1">Verified Contributor</p>
          </div>
        </div>

        {/* Uploads Grid */}
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <BookOpen className="w-5 h-5 text-slate-400" /> UPLOADS BY {decodedName.toUpperCase()}
        </h2>
        
        {teacherMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teacherMaterials.map(mat => (
              <div key={mat.id} className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                <p className="text-xs font-bold text-[#00ED64] mb-2">{mat.class} • {mat.subject}</p>
                <h3 className="text-lg font-bold text-white mb-4">{mat.title}</h3>
                <div className="text-slate-500 text-sm font-bold">👍 {mat.upvotes} Upvotes</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border border-slate-800 rounded-2xl bg-slate-900/20 text-slate-500">
            No uploads found for this profile yet.
          </div>
        )}
      </div>
    </main>
  );
}
