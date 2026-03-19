"use server";

import dbConnect from "../mongodb";
import FileModel from "../../models/File";

export async function getFiles(searchQuery?: string, classNum?: string, subject?: string) {
  try {
    await dbConnect();
    const query: any = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { subject: { $regex: searchQuery, $options: "i" } },
      ];
    }

    if (classNum && classNum !== "All") {
      query.class = Number(classNum);
    }

    if (subject && subject !== "All") {
      query.subject = { $regex: subject, $options: "i" };
    }

    const results = await FileModel.find(query).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(results));
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
}
