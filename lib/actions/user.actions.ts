"use server"

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";

export async function checkIsTeacher(): Promise<boolean> {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user || !session.user.email) {
      return false;
    }

    await dbConnect();
    
    const user = await User.findOne({ email: session.user.email }).lean();
    
    if (!user) {
      return false;
    }
    
    return user.role === "teacher" || user.role === "admin";
  } catch (error) {
    console.error("Error in checkIsTeacher:", error);
    return false;
  }
}
