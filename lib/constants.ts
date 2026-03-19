export const ACADEMIC_MAP: Record<string, string[]> = {
  "LP (1-4)": ["Malayalam", "English", "EVS", "Mathematics"],
  "UP (5-7)": ["Malayalam", "English", "Hindi", "Basic Science", "Social Science", "Mathematics"],
  "HS (8-10)": ["Malayalam", "English", "Hindi", "Physics", "Chemistry", "Biology", "Social Science", "Mathematics", "IT"],
  "HSS (11-12)": ["Science (PCMB/PCMC)", "Commerce", "Humanities"],
};

export function getSubjectsForClass(classNum: string | number): string[] {
  if (classNum === "All") {
    return Array.from(new Set(Object.values(ACADEMIC_MAP).flat()));
  }
  const num = Number(classNum);
  if (num >= 1 && num <= 4) return ACADEMIC_MAP["LP (1-4)"];
  if (num >= 5 && num <= 7) return ACADEMIC_MAP["UP (5-7)"];
  if (num >= 8 && num <= 10) return ACADEMIC_MAP["HS (8-10)"];
  if (num >= 11 && num <= 12) return ACADEMIC_MAP["HSS (11-12)"];
  return [];
}
