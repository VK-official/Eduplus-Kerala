import { PageWrapper } from "../../components/PageWrapper";

export const metadata = {
  title: "Official Textbooks | Eduplus Kerala",
  description: "SCERT Kerala official digital textbooks for all classes.",
};

const TEXTBOOKS = [
  { class: "Class 1–4", title: "Lower Primary Textbooks", subjects: ["Malayalam", "English", "EVS", "Maths"], url: "https://scert.kerala.gov.in" },
  { class: "Class 5–7", title: "Upper Primary Textbooks", subjects: ["Malayalam", "English", "Hindi", "Science", "Social", "Maths"], url: "https://scert.kerala.gov.in" },
  { class: "Class 8–10", title: "High School Textbooks", subjects: ["Malayalam", "English", "Hindi", "Physics", "Chemistry", "Biology", "Maths"], url: "https://scert.kerala.gov.in" },
  { class: "Class 11–12", title: "Higher Secondary Textbooks", subjects: ["Science Group", "Commerce Group", "Humanities Group"], url: "https://scert.kerala.gov.in" },
];

export default function BooksPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] pt-8 pb-32">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <div className="inline-block py-1.5 px-4 rounded-full bg-[#00ED64]/10 border border-[#00ED64]/20 text-[#00ED64] text-xs font-bold tracking-widest uppercase mb-4">
              Official SCERT
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-[-0.04em] leading-none uppercase">Textbooks</h1>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl">Direct links to official SCERT Kerala digital textbooks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEXTBOOKS.map((book) => (
              <a
                key={book.class}
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 rounded-3xl border border-white/5 bg-[#012B39]/60 backdrop-blur-md hover:border-[#00ED64]/40 hover:bg-[#012B39]/80 transition-all"
              >
                <div className="text-xs font-bold text-[#00ED64] tracking-widest uppercase mb-2">{book.class}</div>
                <h2 className="text-2xl font-black text-white mb-4">{book.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {book.subjects.map(s => (
                    <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-semibold">{s}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
