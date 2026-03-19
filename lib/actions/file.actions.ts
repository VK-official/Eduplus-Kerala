"use server"

import dbConnect from "@/lib/mongodb";
import FileModel from "@/models/File";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";

export async function uploadDriveLink(formData: FormData) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }

    await dbConnect();

    const uploader = await User.findOne({ email: session.user.email }).lean();
    
    if (!uploader) {
      throw new Error("User not found");
    }
    
    if (uploader.role !== "teacher" && uploader.role !== "admin") {
      throw new Error("Only teachers and admins can upload files");
    }

    const title = formData.get("title") as string;
    const classNum = Number(formData.get("class"));
    const subject = formData.get("subject") as string;
    const chapter = formData.get("chapter") as string;
    const type = formData.get("type") as "notes" | "question_paper" | "a_plus";
    const driveUrl = formData.get("driveUrl") as string;

    if (!title || !classNum || !subject || !chapter || !type || !driveUrl) {
      throw new Error("Missing required fields");
    }

    const newFile = await FileModel.create({
      title,
      class: classNum,
      subject,
      chapter,
      type,
      driveUrl,
      uploaderId: uploader._id,
      downloads: 0,
    });

    revalidatePath("/");
    
    return JSON.parse(JSON.stringify(newFile));
  } catch (error: any) {
    console.error("Error in uploadDriveLink:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

export async function incrementDownload(fileId: string) {
  try {
    await dbConnect();
    await FileModel.findByIdAndUpdate(fileId, { $inc: { downloads: 1 } });
    revalidatePath("/");
    revalidatePath(`/file/${fileId}`);
  } catch (error) {
    console.error("Error incrementing downloads:", error);
  }
}
