"use server";

import dbConnect from "../mongodb";
import Comment from "../../models/Comment";
import User from "../../models/User";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

export async function addComment(fileId: string, text: string) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user || !session.user.email) {
      throw new Error("Unauthorized");
    }

    await dbConnect();

    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) throw new Error("User not found");

    const newComment = await Comment.create({
      text,
      fileId,
      userId: user._id,
      userName: user.name || session.user.name || "Unknown User",
    });

    revalidatePath(`/file/${fileId}`);
    return JSON.parse(JSON.stringify(newComment));
  } catch (error: any) {
    console.error("Error adding comment:", error);
    throw new Error(error.message || "Failed to add comment");
  }
}

export async function getComments(fileId: string) {
  try {
    await dbConnect();
    const comments = await Comment.find({ fileId }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}
