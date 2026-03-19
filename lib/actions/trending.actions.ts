"use server";

import dbConnect from "../mongodb";
import FileModel from "../../models/File";

export async function getTrendingFiles() {
  try {
    await dbConnect();
    const files = await FileModel.find().sort({ downloads: -1 }).limit(5).lean();
    return JSON.parse(JSON.stringify(files));
  } catch (error) {
    console.error("Error fetching trending files:", error);
    return [];
  }
}
