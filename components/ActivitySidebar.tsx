"use client";

import { BarChart3 } from "lucide-react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

const ACTIVITY = [
  { d: "Mon", u: 12 },
  { d: "Tue", u: 45 },
  { d: "Wed", u: 28 },
  { d: "Thu", u: 80 },
  { d: "Fri", u: 59 },
  { d: "Sat", u: 110 },
  { d: "Sun", u: 95 }
];

export function ActivitySidebar({ email }: { email: string | null | undefined }) {
  return (
    <div className="h-full rounded-3xl p-8 flex flex-col gap-8 border border-[#00ED64]/15"
      style={{ background: "rgba(1,43,57,0.55)", backdropFilter: "blur(24px)" }}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-white uppercase tracking-widest">Weekly Activity</h2>
        <BarChart3 className="h-5 w-5 text-[#00ED64]" />
      </div>
      <div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Total This Week</p>
        <p className="text-5xl font-black text-[#00ED64]" style={{ textShadow: "0 0 20px rgba(0,237,100,0.4)" }}>429</p>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ACTIVITY}>
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ED64" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#00ED64" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip contentStyle={{ backgroundColor: "#012B39", borderColor: "rgba(0,237,100,0.2)", borderRadius: "12px", fontSize: "12px" }} itemStyle={{ color: "#00ED64", fontWeight: 700 }} />
            <Area type="monotone" dataKey="u" name="Uploads" stroke="#00ED64" strokeWidth={2.5} fill="url(#cg)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-auto pt-6 border-t border-white/5">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Session</p>
        <p className="text-sm font-semibold text-slate-300 truncate">{email || "Not signed in"}</p>
      </div>
    </div>
  );
}
