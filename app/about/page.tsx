import { PageWrapper } from "../../components/PageWrapper";

export const metadata = {
  title: "About Us | Eduplus Kerala",
  description: "Our mission to democratize academic resources for SCERT Kerala students.",
};

const STATS = [
  { value: "12", label: "Classes" },
  { value: "40+", label: "Subjects" },
  { value: "Free", label: "Forever" },
];

// Static server component — no Framer Motion, no animation, no transparent strings
// Simplest stable implementation that fixes the /about Turbopack panic
export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] pt-8 pb-32">
        <div className="max-w-4xl mx-auto px-4 md:px-8">

          {/* Badge */}
          <div className="inline-block py-1.5 px-4 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-bold tracking-widest uppercase mb-8">
            Eduplus Kerala
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-[-0.04em] leading-none uppercase mb-8">
            Our Mission
          </h1>

          {/* Mission Card — standard Tailwind backdrop-blur, no inline filter */}
          <div className="rounded-3xl p-8 md:p-12 border border-[#00ED64]/15 bg-[#012B39]/50 backdrop-blur-xl mb-10">
            <p className="text-slate-300 text-xl md:text-2xl font-medium leading-relaxed max-w-[65ch]">
              To democratize high-quality academic resources for SCERT Kerala students — making model questions,
              previous papers, and special revision notes accessible to every student, regardless of location
              or financial circumstance.
            </p>
            <p className="text-slate-500 text-lg mt-6 leading-relaxed max-w-[65ch]">
              Every material on this platform is teacher-curated and aligned with the 2025–26 SCERT Kerala
              syllabus. We believe that every student deserves a fair shot at academic excellence.
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-8 flex-wrap">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-black text-[#00ED64]">{stat.value}</div>
                  <div className="text-slate-400 text-sm uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
                {i < STATS.length - 1 && <div className="w-px h-12 bg-white/10"></div>}
              </div>
            ))}
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
