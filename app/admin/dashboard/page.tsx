import { FileText, Users, HardDrive } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { redirect } from 'next/navigation';
import { AdminAnnouncementSetter } from '../../../components/AdminAnnouncementSetter';
import DeleteMaterialButton from '../../../components/DeleteMaterialButton';
import { getFiles } from '../../../lib/actions/fetch.actions';

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { data: { user } } = await supabase.auth.getUser();

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL || "edupluskerala90@gmail.com";

  if (!user || user.email !== adminEmail) {
    redirect('/');
  }

  const materials = await getFiles();
  const totalFiles = materials.length;
  const uniqueUploaders = new Set(materials.map((m: any) => m.uploader_name)).size;
  
  let storageMb = 0;
  materials.forEach((m: any) => {
    if (m.file_size) {
      const match = m.file_size.match(/([\d\.]+)\s*(MB|KB)/i);
      if (match) {
        const val = parseFloat(match[1]);
        if (match[2].toUpperCase() === 'MB') storageMb += val;
        else if (match[2].toUpperCase() === 'KB') storageMb += (val / 1024);
      } else {
         storageMb += 2.5; 
      }
    } else {
      storageMb += 2.5; 
    }
  });

  const storageStr = storageMb > 1024 ? (storageMb / 1024).toFixed(1) + ' GB' : Math.round(storageMb) + ' MB';

  return (
    <main className="min-h-screen bg-[#001E2B] text-white pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-[#00ED64]">Command Center</h1>
          <p className="text-slate-400">Manage platform resources and global alerts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-4 bg-[#00ED64]/10 text-[#00ED64] rounded-xl"><FileText className="w-8 h-8" /></div>
            <div><p className="text-slate-400 text-sm font-bold">Total Vault Files</p><p className="text-3xl font-black">{totalFiles}</p></div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-4 bg-blue-500/10 text-blue-500 rounded-xl"><Users className="w-8 h-8" /></div>
            <div><p className="text-slate-400 text-sm font-bold">Active Contributors</p><p className="text-3xl font-black">{uniqueUploaders}</p></div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-4 bg-purple-500/10 text-purple-500 rounded-xl"><HardDrive className="w-8 h-8" /></div>
            <div><p className="text-slate-400 text-sm font-bold">Storage Used</p><p className="text-3xl font-black">{storageStr}</p></div>
          </div>
        </div>

        <AdminAnnouncementSetter />

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800"><h2 className="font-bold uppercase tracking-widest text-[#00ED64]">Content Moderation</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 text-sm uppercase tracking-wider">
                <tr><th className="p-4">File Title</th><th className="p-4">Uploader</th><th className="p-4">Date</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {materials.map((mat: any) => (
                  <tr key={mat.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold max-w-xs">{mat.title}</td>
                    <td className="p-4 text-sm">{mat.uploader_name || "Faculty Member"}</td>
                    <td className="p-4 text-sm">{new Date(mat.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <DeleteMaterialButton id={mat.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
