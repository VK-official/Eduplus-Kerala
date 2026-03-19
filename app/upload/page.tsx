import { checkIsTeacher } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { UploadForm } from "./UploadForm";

export default async function UploadPage() {
  const isTeacher = await checkIsTeacher();

  if (!isTeacher) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Teacher Upload Dashboard
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Upload class materials securely to the global repository.
        </p>
      </div>

      <UploadForm />
    </div>
  );
}
