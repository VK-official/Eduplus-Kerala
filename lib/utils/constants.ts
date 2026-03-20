// ── Eduplus Kerala Academic Map (Strict Phase 3: UP & HS only) ──────────────
// This file is the single source of truth for academic structure.
// Classes 1-4 and 11-12 are PERMANENTLY REMOVED.

export const CLASSES = ['Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

export type Part       = { label: string; chapters: string[] };
export type SubjectData = { parts: Part[] };
export type ClassData  = Record<string, SubjectData>;

export const ACADEMIC_MAP: Record<string, ClassData> = {
  "5": {
    Malayalam:       { parts: [{ label: "Part 1", chapters: ["Ch 1 – Poem", "Ch 2 – Story", "Ch 3 – Drama"] }, { label: "Part 2", chapters: ["Ch 4 – Prose", "Ch 5 – Poem", "Ch 6 – Story"] }] },
    English:         { parts: [{ label: "Part 1", chapters: ["Ch 1 – Story", "Ch 2 – Poem", "Ch 3 – Grammar"] }, { label: "Part 2", chapters: ["Ch 4 – Reading", "Ch 5 – Writing", "Ch 6 – Usage"] }] },
    Hindi:           { parts: [{ label: "Full Text", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4", "Ch 5"] }] },
    "Basic Science": { parts: [{ label: "Part 1", chapters: ["Ch 1 – Living World", "Ch 2 – Plants", "Ch 3 – Animals", "Ch 4 – Our Body"] }, { label: "Part 2", chapters: ["Ch 5 – Matter", "Ch 6 – Water", "Ch 7 – Air & Atmosphere", "Ch 8 – Earth & Sky"] }] },
    "Social Science":{ parts: [{ label: "Part 1", chapters: ["Ch 1 – Maps & Features", "Ch 2 – Natural World"] }, { label: "Part 2", chapters: ["Ch 3 – History", "Ch 4 – Governance"] }] },
    Mathematics:     { parts: [{ label: "Part 1", chapters: ["Ch 1 – Numbers", "Ch 2 – Operations", "Ch 3 – Fractions"] }, { label: "Part 2", chapters: ["Ch 4 – Geometry", "Ch 5 – Measurement", "Ch 6 – Data Handling"] }] },
  },
  "6": {
    Malayalam:       { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }, { label: "Part 2", chapters: ["Ch 5", "Ch 6", "Ch 7", "Ch 8"] }] },
    English:         { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }, { label: "Part 2", chapters: ["Ch 5", "Ch 6", "Ch 7", "Ch 8"] }] },
    Hindi:           { parts: [{ label: "Full Text", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4", "Ch 5"] }] },
    "Basic Science": { parts: [{ label: "Part 1", chapters: ["Ch 1 – Living Things", "Ch 2 – Plant Kingdom", "Ch 3 – Animal Kingdom", "Ch 4 – Microbes"] }, { label: "Part 2", chapters: ["Ch 5 – Matter & Properties", "Ch 6 – Physical Change", "Ch 7 – Chemical Change", "Ch 8 – Light"] }] },
    "Social Science":{ parts: [{ label: "Part 1", chapters: ["Ch 1 – Ancient Civilizations", "Ch 2 – Mediaeval India"] }, { label: "Part 2", chapters: ["Ch 3 – Natural Vegetation", "Ch 4 – Civics"] }] },
    Mathematics:     { parts: [{ label: "Part 1", chapters: ["Ch 1 – Integers", "Ch 2 – Fractions & Decimals", "Ch 3 – Algebraic Expressions"] }, { label: "Part 2", chapters: ["Ch 4 – Geometry", "Ch 5 – Mensuration", "Ch 6 – Statistics"] }] },
  },
  "7": {
    Malayalam:       { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }, { label: "Part 2", chapters: ["Ch 5", "Ch 6", "Ch 7", "Ch 8"] }] },
    English:         { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3"] }, { label: "Part 2", chapters: ["Ch 4", "Ch 5", "Ch 6"] }] },
    Hindi:           { parts: [{ label: "Full Text", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4", "Ch 5"] }] },
    "Basic Science": { parts: [{ label: "Part 1", chapters: ["Ch 1 – Nutrition", "Ch 2 – Respiration", "Ch 3 – Transportation", "Ch 4 – Excretion"] }, { label: "Part 2", chapters: ["Ch 5 – Heat", "Ch 6 – Acids & Bases", "Ch 7 – Metals & Non-metals", "Ch 8 – Motion"] }] },
    "Social Science":{ parts: [{ label: "Part 1", chapters: ["History Ch 1 – Rise of Empires", "History Ch 2 – Mughal India"] }, { label: "Part 2", chapters: ["Geography – Land Resources", "Civics – Local Government"] }] },
    Mathematics:     { parts: [{ label: "Part 1", chapters: ["Ch 1 – Rational Numbers", "Ch 2 – Equations", "Ch 3 – Triangles"] }, { label: "Part 2", chapters: ["Ch 4 – Circles", "Ch 5 – Statistics", "Ch 6 – Probability Intro"] }] },
  },
  "8": {
    Malayalam:       { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }, { label: "Part 2", chapters: ["Ch 5", "Ch 6", "Ch 7", "Ch 8"] }] },
    English:         { parts: [{ label: "Part 1", chapters: ["Unit 1", "Unit 2", "Unit 3"] }, { label: "Part 2", chapters: ["Unit 4", "Unit 5", "Unit 6"] }] },
    Hindi:           { parts: [{ label: "Full Text", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4", "Ch 5"] }] },
    Physics:         { parts: [{ label: "Full Text", chapters: ["Ch 1 – Force & Motion", "Ch 2 – Work & Energy", "Ch 3 – Light – Reflection", "Ch 4 – Heat"] }] },
    Chemistry:       { parts: [{ label: "Full Text", chapters: ["Ch 1 – Matter", "Ch 2 – Atoms & Molecules", "Ch 3 – Chemical Reactions", "Ch 4 – Acids & Bases"] }] },
    Biology:         { parts: [{ label: "Full Text", chapters: ["Ch 1 – Cell", "Ch 2 – Plant Kingdom", "Ch 3 – Animal Kingdom", "Ch 4 – Nutrition in Plants"] }] },
    "Social Science":{ parts: [{ label: "Part 1", chapters: ["History – Modern India", "Geography – Land & Soil"] }, { label: "Part 2", chapters: ["Civics – Parliament", "Economics – Agriculture"] }] },
    Mathematics:     { parts: [{ label: "Part 1", chapters: ["Ch 1 – Rational Numbers", "Ch 2 – Linear Equations", "Ch 3 – Quadrilaterals"] }, { label: "Part 2", chapters: ["Ch 4 – Practical Geometry", "Ch 5 – Mensuration", "Ch 6 – Probability"] }] },
    IT:              { parts: [{ label: "Full Text", chapters: ["Unit 1 – HTML & CSS", "Unit 2 – Spreadsheets", "Unit 3 – Networking Basics", "Unit 4 – Cyber Safety"] }] },
  },
  "9": {
    Malayalam:       { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }, { label: "Part 2", chapters: ["Ch 5", "Ch 6", "Ch 7", "Ch 8"] }] },
    English:         { parts: [{ label: "Part 1", chapters: ["Unit 1", "Unit 2", "Unit 3"] }, { label: "Part 2", chapters: ["Unit 4", "Unit 5", "Unit 6"] }] },
    Hindi:           { parts: [{ label: "Full Text", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4", "Ch 5"] }] },
    Physics:         { parts: [{ label: "Full Text", chapters: ["Ch 1 – Laws of Motion", "Ch 2 – Gravitation", "Ch 3 – Work & Energy", "Ch 4 – Sound"] }] },
    Chemistry:       { parts: [{ label: "Full Text", chapters: ["Ch 1 – Matter & States", "Ch 2 – Atoms & Molecules", "Ch 3 – Chemical Reactions", "Ch 4 – Carbon Compounds"] }] },
    Biology:         { parts: [{ label: "Full Text", chapters: ["Ch 1 – Cell Biology", "Ch 2 – Life Processes", "Ch 3 – Reproduction", "Ch 4 – Heredity"] }] },
    "Social Science":{ parts: [{ label: "Part 1", chapters: ["History – French Revolution", "History – Russian Revolution", "Contemporary World"] }, { label: "Part 2", chapters: ["Indian Geography", "Democracy", "Constitution"] }] },
    Mathematics:     { parts: [{ label: "Part 1", chapters: ["Ch 1 – Number System", "Ch 2 – Polynomials", "Ch 3 – Pair of Linear Equations"] }, { label: "Part 2", chapters: ["Ch 4 – Quadratic Equations", "Ch 5 – Arithmetic Progressions", "Ch 6 – Circles & Tangents"] }] },
    IT:              { parts: [{ label: "Full Text", chapters: ["Unit 1 – Advanced HTML", "Unit 2 – JavaScript Basics", "Unit 3 – Database Concepts", "Unit 4 – Digital Safety"] }] },
  },
  "10": {
    Malayalam:       { parts: [{ label: "Part 1", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4"] }, { label: "Part 2", chapters: ["Ch 5", "Ch 6", "Ch 7", "Ch 8"] }] },
    English:         { parts: [{ label: "Part 1", chapters: ["Unit 1", "Unit 2", "Unit 3"] }, { label: "Part 2", chapters: ["Unit 4", "Unit 5", "Unit 6"] }] },
    Hindi:           { parts: [{ label: "Full Text", chapters: ["Ch 1", "Ch 2", "Ch 3", "Ch 4", "Ch 5"] }] },
    Physics:         { parts: [{ label: "Full Text", chapters: ["Ch 1 – Effects of Electric Current", "Ch 2 – Magnetic Field", "Ch 3 – Electromagnetic Induction", "Ch 4 – Nuclear Energy"] }] },
    Chemistry:       { parts: [{ label: "Full Text", chapters: ["Ch 1 – Periodic Table", "Ch 2 – Chemical Bonding", "Ch 3 – Organic Chemistry", "Ch 4 – Metallurgy"] }] },
    Biology:         { parts: [{ label: "Full Text", chapters: ["Ch 1 – Life Processes", "Ch 2 – Nervous System", "Ch 3 – Hormones & Reproduction", "Ch 4 – Ecology & Environment"] }] },
    "Social Science":{ parts: [{ label: "Part 1", chapters: ["History – Rise of Nationalism", "History – World War II", "History – India Post Independence"] }, { label: "Part 2", chapters: ["Indian Geography", "Indian Economics", "Political Science"] }] },
    Mathematics:     { parts: [{ label: "Part 1", chapters: ["Ch 1 – Real Numbers", "Ch 2 – Polynomials", "Ch 3 – Quadratic Equations"] }, { label: "Part 2", chapters: ["Ch 4 – Trigonometry", "Ch 5 – Statistics", "Ch 6 – Probability"] }] },
    IT:              { parts: [{ label: "Full Text", chapters: ["Unit 1 – Python Basics", "Unit 2 – Web Development", "Unit 3 – AI Intro", "Unit 4 – Project Work"] }] },
  },
};

export const CLASS_LIST = CLASSES.map(c => c.split(' ')[1]);

export const SSLC_TAGS    = ["SSLC Notes", "SSLC Question Name", "SSLC Model Question Paper", "SSLC Special"];
export const GENERAL_TAGS = ["Normal Text", "Model Question Papers", "Notes", "Previous Year Questions"];

export function getSpecialtyTags(classNum: string): string[] {
  return classNum === "10" ? SSLC_TAGS : GENERAL_TAGS;
}

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