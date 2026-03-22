"use server";
import fs from "fs";
import path from "path";
import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";

const FILE_PATH = path.join(process.cwd(), "announcement.json");

export async function updateAnnouncement(text: string) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify({ text }));
    return { ok: true };
  } catch (e) {
    return { ok: false };
  }
}

export async function getAnnouncement() {
  try {
    if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, "utf8");
      return JSON.parse(data).text;
    }
  } catch (e) {}
  return "";
}

export async function secureUploadHandler(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const subject = formData.get('subject') as string;
    const classLevel = formData.get('classLevel') as string;
    const uploaderName = formData.get('uploaderName') as string;
    const medium = formData.get('medium') as string || 'ENGLISH';
    const format = formData.get('format') as string || 'PDF';
    const fileUrl = formData.get('fileUrl') as string;

    const part = formData.get('part') as string;
    const chapter = formData.get('chapter') as string;
    const resource_type = formData.get('resource_type') as string;
    const specialty_tag = formData.get('specialty_tag') as string;
    const description = formData.get('description') as string;
    const file_size = formData.get('file_size_estimate') as string;
    const is_anonymous = formData.get('is_anonymous') === 'true';
    const is_pyq = formData.get('is_pyq') === 'true';

    if (!title || !fileUrl) {
      throw new Error("Missing required fields: Title and File URL are mandatory.");
    }

    // Insert payload into Supabase 'resources' table
    const { error } = await supabase.from('resources').insert([{ 
        title, subject, class: Number(classLevel), 
        uploader_name: is_anonymous ? "Anonymous" : (uploaderName || "Teacher"), 
        medium, file_format: format, resource_link: fileUrl,
        part, chapter, resource_type, specialty_tag, description,
        file_size, is_pyq 
    }]);

    if(error) throw error;
    
    revalidatePath("/vault");
    console.log("Upload received:", { title, uploaderName, medium });
    return { success: true, message: "Material successfully secured in the vault." };
    
  } catch (error: any) {
    console.error("Upload Error:", error);
    return { success: false, message: error.message || "Failed to upload material." };
  }
}

export async function deleteMaterialAction(id: number | string) {
  try {
    const { error } = await supabase.from('resources').delete().eq('id', id);
    if (error) throw new Error(error.message);

    console.log(`Material ${id} deleted successfully.`);
    revalidatePath('/admin/dashboard');
    revalidatePath('/vault');
    return { success: true };
  } catch (error: any) {
    console.error("Delete Error:", error);
    return { success: false, message: error.message };
  }
}
