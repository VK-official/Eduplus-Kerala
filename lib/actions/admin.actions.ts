"use server"

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";

export async function secureUploadHandler(data: any, uploaderEmail: string) {
  if (!supabase) return { success: false, error: "Database not connected" };

  // 1. Input Sanitization
  const cleanTitle = (data.title || "").substring(0, 100).replace(/<[^>]*>?/gm, '');
  const url = data.resource_link || "";

  // 2. Regex Scan (Google Drive Only)
  const googleDriveRegex = /^https:\/\/(drive|docs)\.google\.com\/.*/;
  if (!googleDriveRegex.test(url)) {
    return { success: false, error: "SECURITY ERROR: Only official Google Drive links are permitted." };
  }

  // 3. Extension Blocklist
  const blocklist = [".exe", ".bat", ".cmd", ".sh", ".py", ".apk", ".msi", ".vbs", ".scr", ".js"];
  const lowerTitle = cleanTitle.toLowerCase();
  const hasMaliciousExt = blocklist.some(ext => lowerTitle.endsWith(ext) || lowerTitle.includes(ext + " "));
  
  if (hasMaliciousExt) {
    return { success: false, error: "CRITICAL REJECTION: Malicious file extension detected in title. This incident will be logged." };
  }

  // 4. Secure Database Insert with Identity Logging
  try {
    const { error } = await supabase
      .from('resources')
      .insert([
        {
          title: cleanTitle,
          subject: data.subject,
          class: Number(data.class),
          resource_type: data.resource_type,
          resource_link: url,
          description: data.description,
          specialty_tag: data.specialty_tag,
          chapter: data.chapter,
          file_size: data.file_size,
          uploader_name: data.uploader_name || "Guest Faculty",
          uploader_email: uploaderEmail, // STRATEGIC IDENTITY LOGGING
          created_at: new Date().toISOString(),
        }
      ]);

    if (error) throw error;

    revalidatePath("/vault");
    return { success: true };
  } catch (err: any) {
    console.error("Secure Upload Error:", err);
    return { success: false, error: err.message };
  }
}
