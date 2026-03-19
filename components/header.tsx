import Link from 'next/link';
import { AuthButton } from './AuthButton';
import { NavLinks } from './NavLinks';
import { getServerSession } from "next-auth/next";
import User from "../models/User";
import dbConnect from "../lib/mongodb";
import { Activity } from "lucide-react";

export async function Header() {
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

  return (
    <header className="flex justify-between items-center w-full px-6 md:px-10 pt-6 pb-4 bg-[#012B39] border-b border-gray-700 sticky top-0 z-50 shadow-lg relative min-h-[85px]">
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity z-10 w-1/4">
        <Activity className="h-8 w-8 text-[#00ED64]" />
        <h1 className="text-2xl font-extrabold tracking-tight text-white hidden xl:block uppercase">
          Eduplus <span className="text-[#00ED64] glow-text">Kerala</span>
        </h1>
      </Link>
      
      <div className="flex-1 flex justify-center items-center hidden lg:flex">
        <NavLinks isTeacher={isTeacher} />
      </div>

      <div className="flex items-center gap-4 z-10 w-1/4 justify-end">
        <AuthButton />
      </div>
    </header>
  );
}
