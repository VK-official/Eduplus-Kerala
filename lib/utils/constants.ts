// ── Eduplus Kerala Academic Map (Class 1-10 ONLY) ──────────────────────────
// Structure: Class → Subject → Part → Chapters[]

export type Part = { label: string; chapters: string[] };
export type SubjectData = { parts: Part[] };
export type ClassData = Record<string, SubjectData>;

export const ACADEMIC_MAP: Record<string, ClassData> = {
  // ── LP (1-4) ────────────────────────────────────────────────────────────
  "1": {
    Malayalam:   { parts: [{ label: "Full Text", chapters: ["Letters and Words", "Simple Sentences", "Stories"] }] },
    English:     { parts: [{ label: "Full Text", chapters: ["Alphabet", "Phonics", "Simple Stories"] }] },
    EVS:         { parts: [{ label: "Full Text", chapters: ["My Family", "Plants Around Us", "Animals"] }] },
    Mathematics: { parts: [{ label: "Full Text", chapters: ["Numbers 1-10", "Addition", "Shapes"] }] },
  },
  "2": {
    Malayalam:   { parts: [{ label: "Full Text", chapters: ["Rhymes", "Stories", "Grammar Basics"] }] },
    English:     { parts: [{ label: "Full Text", chapters: ["Reading", "Writing", "Basic Grammar"] }] },
    EVS:         { parts: [{ label: "Full Text", chapters: ["Water", "Air", "Food"] }] },
    Mathematics: { parts: [{ label: "Full Text", chapters: ["Numbers to 100", "Subtraction", "Measurement"] }] },
  },
  "3": {
    Malayalam:   { parts: [{ label: "Full Text", chapters: ["Poems", "Stories", "Composition"] }] },
    English:     { parts: [{ label: "Full Text", chapters: ["Reading Comprehension", "Grammar", "Writing"] }] },
    EVS:         { parts: [{ label: "Full Text", chapters: ["Living Things", "Earth & Sky", "Community"] }] },
    Mathematics: { parts: [{ label: "Full Text", chapters: ["Multiplication", "Division", "Fractions Intro"] }] },
  },
  "4": {
    Malayalam:   { parts: [{ label: "Full Text", chapters: ["Prose", "Verse", "Grammar"] }] },
    English:     { parts: [{ label: "Full Text", chapters: ["Stories", "Poems", "Grammar & Usage"] }] },
    EVS:         { parts: [{ label: "Full Text", chapters: ["Natural Resources", "Human Body", "Environment"] }] },
    Mathematics: { parts: [{ label: "Full Text", chapters: ["Large Numbers", "Fractions", "Patterns"] }] },
  },

  // ── UP (5-7) ────────────────────────────────────────────────────────────
  "5": {
    Malayalam:      { parts: [{ label: "Part 1", chapters: ["Ch 1 – Poem", "Ch 2 – Story", "Ch 3 – Drama"] }, { label: "Part 2", chapters: ["Ch 4 – Prose", "Ch 5 – Poem", "Ch 6 – Story"] }] },
    English:        { parts: [{ label: "Part 1", chapters: ["Ch 1 – Story", "Ch 2 – Poem", "Ch 3 – Grammar"] }, { label: "Part 2", chapters: ["Ch 4 – Reading", "Ch 5 – Writing", "Ch 6 – Usage"] }] },
    Hindi:          { parts: [{ label: "Full Text", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4", "Ch 5"] }] },
    "Basic Science": {
      parts: [
        { label: "Part 1", chapters: ["Ch 1 – Living World", "Ch 2 – Plants", "Ch 3 – Animals", "Ch 4 – Our Body"] },
        { label: "Part 2", chapters: ["Ch 5 – Matter", "Ch 6 – Water", "Ch 7 – Air & Atmosphere", "Ch 8 – Earth & Sky"] },
      ],
    },
    "Social Science": { parts: [{ label: "Part 1", chapters: ["Ch 1 – Maps", "Ch 2 – Natural Features"] }, { label: "Part 2", chapters: ["Ch 3 – History", "Ch 4 – Governance"] }] },
    Mathematics:     { parts: [{ label: "Part 1", chapters: ["Ch 1 – Numbers", "Ch 2 – Operations", "Ch 3 – Fractions"] }, { label: "Part 2", chapters: ["Ch 4 – Geometry", "Ch 5 – Measurement", "Ch 6 – Data"] }] },
  },
  "6": {
    Malayalam:      { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
    English:        { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
    Hindi:          { parts: [{ label: "Full Text", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }] },
    "Basic Science":{ parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }, { label: "Part 2", chapters: ["Ch 5", "Ch 6", "Ch 7", "Ch 8"] }] },
    "Social Science":{ parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2"] }, { label: "Part 2", chapters: ["Ch 3", "Ch 4"] }] },
    Mathematics:    { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
  },
  "7": {
    Malayalam:      { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
    English:        { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
    Hindi:          { parts: [{ label: "Full Text", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }] },
    "Basic Science":{ parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }, { label: "Part 2", chapters: ["Ch 5", "Ch 6", "Ch 7", "Ch 8"] }] },
    "Social Science":{ parts: [{ label: "Part 1", chapters: ["History Ch 1", "History Ch 2"] }, { label: "Part 2", chapters: ["Geography Ch 1", "Civics Ch 1"] }] },
    Mathematics:    { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
  },

  // ── HS (8-10) ───────────────────────────────────────────────────────────
  "8": {
    Malayalam:       { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
    English:         { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
    Hindi:           { parts: [{ label: "Full Text", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }] },
    Physics:         { parts: [{ label: "Full Text", chapters: ["Force & Motion", "Work & Energy", "Light", "Heat"] }] },
    Chemistry:       { parts: [{ label: "Full Text", chapters: ["Matter", "Atoms", "Chemical Reactions", "Acids & Bases"] }] },
    Biology:         { parts: [{ label: "Full Text", chapters: ["Cell", "Plant Kingdom", "Animal Kingdom", "Nutrition"] }] },
    "Social Science":{ parts: [{ label: "Part 1", chapters: ["History", "Geography"] }, { label: "Part 2", chapters: ["Civics", "Economics"] }] },
    Mathematics:     { parts: [{ label: "Part 1", chapters: ["Algebra", "Geometry", "Statistics"] }, { label: "Part 2", chapters: ["Trigonometry", "Coordinate Geometry", "Probability"] }] },
    IT:              { parts: [{ label: "Full Text", chapters: ["HTML", "CSS", "Spreadsheets", "Networking"] }] },
  },
  "9": {
    Malayalam:       { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
    English:         { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
    Hindi:           { parts: [{ label: "Full Text", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }] },
    Physics:         { parts: [{ label: "Full Text", chapters: ["Laws of Motion", "Gravitation", "Work & Energy", "Sound"] }] },
    Chemistry:       { parts: [{ label: "Full Text", chapters: ["Matter & States", "Atoms & Molecules", "Chemical Reactions", "Carbon Compounds"] }] },
    Biology:         { parts: [{ label: "Full Text", chapters: ["Cell Biology", "Life Processes", "Reproduction", "Heredity"] }] },
    "Social Science":{ parts: [{ label: "Part 1", chapters: ["Modern History", "Contemporary World"] }, { label: "Part 2", chapters: ["Indian Geography", "Democracy & Constitution"] }] },
    Mathematics:     { parts: [{ label: "Part 1", chapters: ["Number System", "Polynomials", "Pair of Equations"] }, { label: "Part 2", chapters: ["Quadratics", "Arithmetic Progressions", "Circles"] }] },
    IT:              { parts: [{ label: "Full Text", chapters: ["Advanced HTML", "JavaScript Basics", "Database", "Cyber Safety"] }] },
  },
  "10": {
    Malayalam:       { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
    English:         { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
    Hindi:           { parts: [{ label: "Full Text", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }] },
    Physics:         { parts: [{ label: "Full Text", chapters: ["Effects of Electric Current", "Magnetic Field", "Electromagnetic Induction", "Nuclear Energy"] }] },
    Chemistry:       { parts: [{ label: "Full Text", chapters: ["Periodic Table", "Chemical Bonding", "Organic Chemistry", "Metallurgy"] }] },
    Biology:         { parts: [{ label: "Full Text", chapters: ["Life Processes", "Nervous System", "Hormones", "Ecology"] }] },
    "Social Science":{ parts: [{ label: "Part 1", chapters: ["Rise of Nationalism", "World War II", "India Post-Independence"] }, { label: "Part 2", chapters: ["Indian Geography", "Economics", "Political Science"] }] },
    Mathematics:     { parts: [{ label: "Part 1", chapters: ["Real Numbers", "Polynomials", "Quadratic Equations"] }, { label: "Part 2", chapters: ["Trigonometry", "Statistics", "Probability"] }] },
    IT:              { parts: [{ label: "Full Text", chapters: ["Python Basics", "Web Development", "AI Intro", "Project Work"] }] },
  },
};

// ── Helper Functions ────────────────────────────────────────────────────────
export const CLASS_LIST = Array.from({ length: 10 }, (_, i) => String(i + 1));

export function getSubjectsForClass(classNum: string): string[] {
  return Object.keys(ACADEMIC_MAP[classNum] ?? {});
}

export function getPartsForSubject(classNum: string, subject: string): Part[] {
  return ACADEMIC_MAP[classNum]?.[subject]?.parts ?? [];
}

export function getChaptersForPart(classNum: string, subject: string, partLabel: string): string[] {
  const parts = getPartsForSubject(classNum, subject);
  return parts.find(p => p.label === partLabel)?.chapters ?? [];
}