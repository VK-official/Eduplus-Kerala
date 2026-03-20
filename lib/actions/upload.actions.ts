"use server";

import dbConnect from "../mongodb";
import File from "../../models/File";
import User from "../../models/User";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { validateResourceLink } from "../utils/validator";

export interface UploadPayload {
  title: string;
  classNum: number;
  subject: string;
  part: string;
  chapter: string;
  format: "PDF" | "MP4" | "MP3";
  fileSize?: string;
  specialtyTag?: string;
  type: "notes" | "question_paper" | "a_plus";
  coveredAreas?: string;
  description?: string;
  credits?: string;
  uploaderName?: string;
  driveUrl: string;
}

export async function uploadDriveFile(data: UploadPayload) {
  if (data.classNum < 5 || data.classNum > 10) {
    throw new Error("Invalid class. Only Classes 5-10 are supported on this platform.");
  }
  const linkValidation = validateResourceLink(data.driveUrl);
  if (!linkValidation.valid) throw new Error(linkValidation.reason);

  const session = await getServerSession();
  if (!session?.user?.email) throw new Error("Unauthorized: Please sign in.");

  await dbConnect();
  const user = await User.findOne({ email: session.user.email }).lean();
  if (!user || (user.role !== "teacher" && user.role !== "admin")) {
    throw new Error("ACCESS DENIED: Only certified teachers can upload materials.");
  }

  const newFile = await File.create({
    title: data.title, class: data.classNum, subject: data.subject,
    part: data.part, chapter: data.chapter, format: data.format,
    fileSize: data.fileSize, specialtyTag: data.specialtyTag, type: data.type,
    coveredAreas: data.coveredAreas, description: data.description,
    credits: data.credits, uploaderName: data.uploaderName,
    driveUrl: data.driveUrl, uploaderId: user._id,
  });

  revalidatePath("/vault");
  revalidatePath("/");
  return JSON.parse(JSON.stringify(newFile));
}
