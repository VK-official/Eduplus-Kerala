// ── Zero-Cost Security Shield ───────────────────────────────────────────────
// No external dependencies — pure regex validation.

const DANGEROUS_EXTENSIONS = /\.(exe|apk|bat|msi|zip|rar|tar|gz|7z|dmg|iso|sh|cmd|ps1)(\?|$)/i;

const ALLOWED_PATTERNS = [
  /^https:\/\/drive\.google\.com\/file\/d\//i,
  /^https:\/\/drive\.google\.com\/open\?id=/i,
  /^https:\/\/(www\.)?youtube\.com\/watch\?v=/i,
  /^https:\/\/(www\.)?youtube\.com\/embed\//i,
  /^https:\/\/youtu\.be\//i,
];

export type ValidationResult =
  | { valid: true }
  | { valid: false; reason: string };

export function validateResourceLink(url: string): ValidationResult {
  if (!url || url.trim() === "") {
    return { valid: false, reason: "Resource link cannot be empty." };
  }

  if (DANGEROUS_EXTENSIONS.test(url)) {
    return {
      valid: false,
      reason: "SECURITY SHIELD: Executable and archive file types (.exe, .apk, .zip, etc.) are strictly blocked.",
    };
  }

  const isAllowed = ALLOWED_PATTERNS.some(pattern => pattern.test(url));
  if (!isAllowed) {
    return {
      valid: false,
      reason: "SECURITY SHIELD: Only secure Google Drive (drive.google.com/file/d/...) or YouTube links are permitted.",
    };
  }

  return { valid: true };
}

export function validateForm(fields: {
  title: string;
  classNum: string;
  subject: string;
  part: string;
  chapter: string;
  resourceType: string;
  resourceLink: string;
}): ValidationResult {
  if (!fields.title.trim())       return { valid: false, reason: "Title is required." };
  if (!fields.classNum)           return { valid: false, reason: "Please select a class." };
  if (!fields.subject)            return { valid: false, reason: "Please select a subject." };
  if (!fields.part)               return { valid: false, reason: "Please select a textbook part." };
  if (!fields.chapter)            return { valid: false, reason: "Please select a chapter." };
  if (!fields.resourceType)       return { valid: false, reason: "Please select a resource type." };
  return validateResourceLink(fields.resourceLink);
}
