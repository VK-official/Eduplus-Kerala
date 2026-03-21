"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import { Database, TrendingUp, Calendar, Users, FileText, Loader2 } from "lucide-react";

export function SuperAdminDashboard() {
  const [stats, setStats] = useState({ total: 0, monthly: 0, today: 0 });
  const [recentFiles, setRecentFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: allFiles, error } = await supabase
          .from("resources")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const startOfToday = new Date(now.setHours(0,0,0,0)).toISOString();

        setStats({
          total: allFiles.length,
          monthly: allFiles.filter((f: any) => f.created_at >= startOfMonth).length,
          today: allFiles.filter((f: any) => f.created_at >= startOfToday).length
        });

        setRecentFiles(allFiles);
      } catch (err) {
        console.error("Super Admin Stats Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-[#00ED64] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Resources" val={stats.total} icon={<Database />} color="text-[#00ED64]" />
        <StatCard title="This Month" val={stats.monthly} icon={<TrendingUp />} color="text-[#00ED64]" />
        <StatCard title="Uploaded Today" val={stats.today} icon={<Calendar />} color="text-[#00ED64]" />
      </div>

      {/* Oversight Table */}
      <div className="bg-[#012B39]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-[#00ED64]" />
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Access & Audit Logs</h2>
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Identity Logging Strict Mode Active
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#001E2B]/50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Resource</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Uploader Email</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentFiles.map((file) => (
                <tr key={file.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-[#00ED64]/50" />
                      <span className="text-sm font-bold text-white uppercase">{file.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {file.resource_type}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-[#00ED64]">
                    {file.uploader_email}
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-mono">
                    {new Date(file.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, val, icon, color }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      className="bg-[#012B39]/60 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden"
    >
      <div className={`absolute -right-4 -bottom-4 opacity-5 scale-[2] ${color}`}>{icon}</div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.25em] mb-4">{title}</p>
      <h3 className="text-4xl font-black text-white leading-none">{val}</h3>
    </motion.div>
  );
}
