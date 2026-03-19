"use server";

import dbConnect from "../mongodb";
import File from "../../models/File";
import User from "../../models/User";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function uploadDriveFile(data: {
  title: string;
  description?: string;
  classNum: number;
  subject: string;
  type: string;
  driveUrl: string;
}) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) throw new Error("Unauthorized Access.");

    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).lean();
    
    if (!user || (user.role !== "teacher" && user.role !== "admin")) {
      throw new Error("ACCESS DENIED: Only certified teachers can upload materials to the Vault.");
    }

    const newFile = await File.create({
      title: data.title,
      class: data.classNum,
      subject: data.subject,
      chapter: "General", 
      type: data.type,
      driveUrl: data.driveUrl,
      uploaderId: user._id,
    });

    revalidatePath("/");
    return JSON.parse(JSON.stringify(newFile));
  } catch (error: any) {
    console.error("Upload Error:", error);
    throw new Error(error.message);
  }
}
