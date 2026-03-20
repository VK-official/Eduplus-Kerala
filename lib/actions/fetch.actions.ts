"use server";

import dbConnect from "../mongodb";
import File from "../../models/File";
import User from "../../models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function getFiles(searchQuery?: string, classNum?: string, subject?: string) {
  try {
    await dbConnect();
    const query: any = {
      // Enforce strict class 5-10 range at query level
      class: { $gte: 5, $lte: 10 },
    };

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { subject: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { specialtyTag: { $regex: searchQuery, $options: "i" } },
      ];
    }

    if (classNum && classNum !== "All") {
      const n = Number(classNum);
      if (n >= 5 && n <= 10) query.class = n;
    }

    if (subject && subject !== "All") {
      query.subject = { $regex: subject, $options: "i" };
    }

    const results = await File.find(query).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(results));
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
}

export async function getFileById(id: string) {
  try {
    await dbConnect();
    const file = await File.findById(id).lean();
    if (!file) return null;
    return JSON.parse(JSON.stringify(file));
  } catch (error) {
    console.error("Error fetching file by id:", error);
    return null;
  }
}

export async function addRating(fileId: string, stars: number) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) throw new Error("Sign in to rate.");
    if (stars < 1 || stars > 5) throw new Error("Invalid rating.");
    await dbConnect();
    // Use a simple $inc on totalStars and $inc on ratingCount for average calculation
    await File.findByIdAndUpdate(fileId, {
      $inc: { totalStars: stars, ratingCount: 1 },
    });
    revalidatePath(`/vault/${fileId}`);
    return { ok: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getTeacherFilesWithComments() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return [];
    
    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) return [];

    const files = await File.find({ 
      uploaderId: user._id, 
      "comments.0": { $exists: true } 
    }).sort({ updatedAt: -1 }).lean();

    return JSON.parse(JSON.stringify(files));
  } catch (error) {
    console.error("Error fetching teacher files with comments:", error);
    return [];
  }
}

export async function updateCommentStatus(fileId: string, commentIndex: number, resolved: boolean) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) throw new Error("Unauthorized");
    
    await dbConnect();
    const file = await File.findById(fileId);
    if (!file) throw new Error("File not found");

    if (file.comments && file.comments[commentIndex]) {
      file.comments[commentIndex].resolved = resolved;
      // Force Mongoose to track the change in the sub-document array
      file.markModified('comments');
      await file.save();
    }

    revalidatePath("/dashboard");
    return { ok: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteFile(fileId: string) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) throw new Error("Unauthorized");

    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) throw new Error("User not found");

    // Only allow uploader to delete
    const result = await File.deleteOne({ _id: fileId, uploaderId: user._id });
    
    if (result.deletedCount === 0) {
      throw new Error("File not found or permission denied");
    }

    revalidatePath("/dashboard");
    revalidatePath("/vault");
    return { ok: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllFilesForSitemap() {
  try {
    await dbConnect();
    const files = await File.find({}, "_id updatedAt").lean();
    return JSON.parse(JSON.stringify(files));
  } catch (error) {
    console.error("Error fetching files for sitemap:", error);
    return [];
  }
}

export async function getTopResources(limit: number = 5) {
  try {
    await dbConnect();
    // Get top files by ratingCount or totalStars
    const files = await File.find({})
      .sort({ totalStars: -1, ratingCount: -1 })
      .limit(limit)
      .lean();
    return JSON.parse(JSON.stringify(files));
  } catch (error) {
    console.error("Error fetching top resources:", error);
    return [];
  }
}
