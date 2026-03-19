export const ACADEMIC_MAP = {
    "LP (1-4)": ["Malayalam", "English", "EVS", "Mathematics"],
    "UP (5-7)": ["Malayalam", "English", "Hindi", "Basic Science", "Social Science", "Mathematics"],
    "HS (8-10)": ["Malayalam", "English", "Hindi", "Physics", "Chemistry", "Biology", "Social Science", "Mathematics", "IT"],
    "HSS (11-12)": ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "Accountancy", "Economics", "Business Studies", "Political Science", "History"]
};

export const getSubjectsForClass = (className: string): string[] => {
    if (className.includes("1-4")) return ACADEMIC_MAP["LP (1-4)"];
    if (className.includes("5-7")) return ACADEMIC_MAP["UP (5-7)"];
    if (className.includes("8-10")) return ACADEMIC_MAP["HS (8-10)"];
    if (className.includes("11-12")) return ACADEMIC_MAP["HSS (11-12)"];
    return [];
};