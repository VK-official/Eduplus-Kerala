import Link from "next/link";
import { HeroSection } from "../components/HeroSection";
import FaqSection from '../components/FaqSection';
import SpecialitiesSection from '../components/SpecialitiesSection';
import { PageWrapper } from "../components/PageWrapper";
import { BookOpen, Trophy, Star, TrendingUp, Users, Target } from "lucide-react";
import { getTopResources } from "../lib/actions/fetch.actions";
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '600', '700', '900'], display: 'swap' });

export default async function HomePage() {
  const topResources = await getTopResources(5);
  return (
    <PageWrapper>
      <div className="w-full bg-[#001E2B]">

        {/* ── HERO ── */}
        <HeroSection />

        <FaqSection />

        <SpecialitiesSection />

        {/* ── OUR MISSION ── */}
        <section className={`border-y border-white/5 py-24 px-4 md:px-8 ${poppins.className}`}>
          <div className="max-w-4xl mx-auto">
            <div className="inline-block py-1.5 px-4 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-bold tracking-widest uppercase mb-8">
              Our Mission
            </div>
            <p className="text-slate-300 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-[65ch]">
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
