"use client";
import { Trophy, Medal, Award, Upload, ThumbsUp } from 'lucide-react';

export default function LeaderboardSection() {
  // Mock aggregated data (To be replaced with a Supabase grouped query later)
  const leaders = [
    { rank: 1, name: "Eduplus Contributor", role: "Veteran Uploader", uploads: 142, upvotes: 3800 },
    { rank: 2, name: "Suresh Math", role: "Top Teacher", uploads: 89, upvotes: 2100 },
    { rank: 3, name: "Anjali S.", role: "Student Contributor", uploads: 45, upvotes: 1200 },
    { rank: 4, name: "Rahul Dev", role: "Contributor", uploads: 30, upvotes: 850 },
    { rank: 5, name: "Priya M.", role: "Contributor", uploads: 22, upvotes: 400 },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto py-24 px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
          Hall of <span className="text-[#00ED64]">Fame</span>
        </h2>
        <p className="text-slate-400 text-lg">The energy behind Eduplus. Top contributors this month.</p>
      </div>

      <div className="space-y-4">
        {leaders.map((user) => {
          const isGold = user.rank === 1;
          const isSilver = user.rank === 2;
          const isBronze = user.rank === 3;
          
          return (
            <div key={user.rank} className={`flex items-center justify-between p-6 rounded-2xl border transition-all hover:scale-[1.01] ${isGold ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.1)]' : isSilver ? 'bg-slate-300/10 border-slate-300/50' : isBronze ? 'bg-amber-600/10 border-amber-600/50' : 'bg-slate-900/50 border-slate-800'}`}>
              
              <div className="flex items-center gap-6">
                {/* Rank Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900">
                  {isGold ? <Trophy className="w-6 h-6 text-yellow-500" /> : isSilver ? <Medal className="w-6 h-6 text-slate-300" /> : isBronze ? <Award className="w-6 h-6 text-amber-600" /> : <span className="text-xl font-black text-slate-500">#{user.rank}</span>}
                </div>
                
                {/* User Info */}
                <div>
                  <h3 className={`text-xl font-black uppercase tracking-wide ${isGold ? 'text-yellow-500' : isSilver ? 'text-slate-300' : isBronze ? 'text-amber-500' : 'text-white'}`}>{user.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{user.role}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8">
                <div className="text-center hidden md:block">
                  <div className="flex items-center gap-2 text-slate-300"><Upload className="w-4 h-4 text-[#00ED64]" /><span className="text-xl font-black">{user.uploads}</span></div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">Files</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-2 text-slate-300"><ThumbsUp className="w-4 h-4 text-[#00ED64]" /><span className="text-xl font-black">{user.upvotes}</span></div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">Upvotes</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
