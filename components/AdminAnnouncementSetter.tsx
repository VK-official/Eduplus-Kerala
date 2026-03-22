"use client";
import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { updateAnnouncement, getAnnouncement } from '../lib/actions/admin.actions';
import { useRouter } from 'next/navigation';

export function AdminAnnouncementSetter() {
  const [announcement, setAnnouncement] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getAnnouncement().then(res => setAnnouncement(res || ''));
  }, []);

  const handleBroadcast = async () => {
    setLoading(true);
    await updateAnnouncement(announcement);
    setLoading(false);
    alert('Broadcast Sent'); // Basic feedback
    router.refresh();
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-4">
      <div className="flex items-center gap-2 text-yellow-500">
        <AlertCircle className="w-5 h-5" />
        <h2 className="font-bold uppercase tracking-widest">Global Announcement</h2>
      </div>
      <div className="flex gap-4">
        <input 
          value={announcement} 
          onChange={(e) => setAnnouncement(e.target.value)} 
          placeholder="Type a message to broadcast to all students..." 
          className="flex-1 bg-[#001E2B] border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all" 
        />
        <button 
          onClick={handleBroadcast}
          disabled={loading}
          className="px-8 py-3 bg-yellow-500 text-[#001E2B] font-black rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50"
        >
          {loading ? "BROADCASTING..." : "BROADCAST"}
        </button>
      </div>
    </div>
  );
}
