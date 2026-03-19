import { getServerSession } from "next-auth/next";
import User from "../models/User";
import dbConnect from "../lib/mongodb";
import { BottomNav } from "./BottomNav";

export async function BottomNavWrapper() {
  const session = await getServerSession();
  let role = "student";

  if (session?.user?.email) {
    try {
      await dbConnect();
      const user = await User.findOne({ email: session.user.email }).lean();
      if (user) role = user.role;
    } catch(e) {}
  }

  const isTeacher = role === "teacher" || role === "admin";

  return <BottomNav isTeacher={isTeacher} />;
}
