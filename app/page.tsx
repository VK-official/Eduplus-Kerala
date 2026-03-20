import Link from "next/link";
import { HeroSection } from "../components/HeroSection";
import { PageWrapper } from "../components/PageWrapper";
import { BookOpen, Trophy, Star, TrendingUp, Users, Target } from "lucide-react";
import { getTopResources } from "../lib/actions/fetch.actions";

const EXAM_SPOTLIGHT = [
  {
    label: "SSLC Focus",
    grade: "Class 10",
    icon: Target,
    color: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
    items: ["Model Question Papers", "Previous Year Papers", "Special Revision Notes", "Chapter-wise Summaries"],
  },
  {
    label: "HS Revision",
    grade: "Class 8-9",
    icon: BookOpen,
    color: "from-purple-500/20 to-purple-600/5",
    border: "border-purple-500/20",
    iconColor: "text-purple-400",
    items: ["Terminal Exam Notes", "Important Questions", "Subject Guides", "Practical Tips"],
  },
  {
    label: "UP Foundation",
    grade: "Class 5-7",
    icon: Trophy,
    color: "from-yellow-500/20 to-yellow-600/5",
    border: "border-yellow-500/20",
    iconColor: "text-yellow-400",
    items: ["Basic Science Notes", "Maths Worksheets", "Language Guides", "Skill Development"],
  },
];

export default async function HomePage() {
  const topResources = await getTopResources(5);
  return (
    <PageWrapper>
      <div className="w-full bg-[#001E2B]">

        {/* ── HERO ── */}
        <HeroSection />

        {/* ── EXAM SPOTLIGHT ── */}
        <section className="max-w-screen-xl mx-auto px-4 md:px-8 py-20">
          <div className="mb-12">
            <div className="inline-block py-1.5 px-4 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-bold tracking-widest uppercase mb-4">
              Exam Focus
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-[-0.04em] leading-tight uppercase">Board Exam Vault</h2>
            <p className="text-slate-400 mt-3 max-w-xl">Curated resources for every major board examination stage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXAM_SPOTLIGHT.map((exam) => {
              const Icon = exam.icon;
              return (
                <Link key={exam.label} href="/vault" className="group">
                  <div className={`h-full rounded-3xl border ${exam.border} bg-gradient-to-b ${exam.color} backdrop-blur-md p-8 flex flex-col gap-6 hover:scale-[1.02] transition-transform cursor-pointer`}>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl bg-white/5 ${exam.iconColor}`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{exam.grade}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white">{exam.label}</h3>
                    <ul className="space-y-2">
                      {exam.items.map(item => (
                        <li key={item} className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${exam.iconColor} bg-current`}></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-auto text-sm font-bold ${exam.iconColor} uppercase tracking-widest`}>
                      Browse Vault →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── OUR MISSION ── */}
        <section className="border-y border-white/5 py-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block py-1.5 px-4 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-bold tracking-widest uppercase mb-8">
              Our Mission
            </div>
            <p className="text-slate-300 text-2xl md:text-3xl font-medium leading-relaxed max-w-[65ch]">
              To democratize high-quality academic resources for SCERT Kerala students — making model questions, previous papers, and special revision notes accessible to every student, regardless of location or financial circumstance.
            </p>
            <p className="text-slate-500 text-lg mt-8 max-w-[65ch] leading-relaxed">
              Every material on this platform is teacher-curated and aligned with the 2025–26 SCERT Kerala syllabus. We believe that every student deserves a fair shot at academic excellence.
            </p>
            <div className="mt-12 flex items-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-4xl font-black text-[#00ED64]">6</div>
                <div className="text-slate-400 text-sm uppercase tracking-widest mt-1">Classes Covered</div>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <div className="text-4xl font-black text-[#00ED64]">40+</div>
                <div className="text-slate-400 text-sm uppercase tracking-widest mt-1">Subjects</div>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center">
                <div className="text-4xl font-black text-[#00ED64]">Free</div>
                <div className="text-slate-400 text-sm uppercase tracking-widest mt-1">Forever</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WEEKLY NOTICE BOARD ── */}
        <section className="max-w-screen-xl mx-auto px-4 md:px-8 py-20">
          <div className="mb-10">
            <div className="inline-block py-1.5 px-4 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-bold tracking-widest uppercase mb-4">
              Notice Board
            </div>
            <h2 className="text-4xl font-black text-white tracking-[-0.04em] uppercase">Top This Week</h2>
          </div>

          <div
            className="rounded-3xl border border-[#00ED64]/15 overflow-hidden"
            style={{
              background: "rgba(1,43,57,0.55)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 60px rgba(0,237,100,0.06), inset 0 1px 1px rgba(255,255,255,0.06)",
            }}
          >
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00ED64] shadow-[0_0_8px_rgba(0,237,100,0.8)] animate-pulse"></div>
              <span className="text-[#00ED64] text-xs font-bold uppercase tracking-widest">Live Rankings</span>
            </div>

            <div className="divide-y divide-white/5">
              {topResources.length === 0 ? (
                <div className="px-6 py-12 text-center text-slate-600 font-medium">
                  Syncing Rankings...
                </div>
              ) : (
                topResources.map((mat: any, idx: number) => (
                  <Link key={mat.id} href={`/vault/${mat.id}`}>
                    <div className="flex items-center gap-6 px-6 py-5 hover:bg-white/[0.03] transition-colors group cursor-pointer">
                      <span className="text-3xl font-black text-slate-700 w-8 text-center group-hover:text-[#00ED64] transition-colors">
                        {idx + 1}
                      </span>
                      <div className="p-3 bg-[#00ED64]/10 rounded-xl group-hover:bg-[#00ED64]/20 transition-colors">
                        <BookOpen className="h-5 w-5 text-[#00ED64]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold truncate group-hover:text-[#00ED64] transition-colors">{mat.title}</p>
                        <p className="text-slate-500 text-sm uppercase tracking-wider font-semibold mt-0.5">{mat.subject} · Class {mat.class}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-sm font-bold shrink-0">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {mat.rating_count > 0 ? (mat.total_stars / mat.rating_count).toFixed(1) : "0.0"}
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-slate-500 text-xs">Updated weekly every Sunday 00:00 IST</span>
              <Link href="/vault" className="text-[#00ED64] text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                Browse All →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}
