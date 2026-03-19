"use client";

import { useState } from "react";
import { uploadDriveLink } from "../../lib/actions/file.actions";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

export function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const driveUrl = formData.get("driveUrl") as string;

    if (!driveUrl.startsWith("http")) {
      setErrorMessage("Drive Link must start with http or https");
      setLoading(false);
      return;
    }

    try {
      await uploadDriveLink(formData);
      setSuccessMessage("File uploaded successfully!");
      e.currentTarget.reset();
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to upload file");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 rounded-2xl border border-white/20 bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {successMessage && (
          <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-700 dark:text-green-300">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-700 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full rounded-lg border border-gray-300/50 bg-white/50 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700/50 dark:bg-black/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="class" className="text-sm font-medium">Class</label>
            <select
              id="class"
              name="class"
              required
              className="w-full rounded-lg border border-gray-300/50 bg-white/50 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700/50 dark:bg-black/50"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1} className="dark:bg-transparent dark:text-black">Class {i + 1}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">File Type</label>
            <select
              id="type"
              name="type"
              required
              className="w-full rounded-lg border border-gray-300/50 bg-white/50 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700/50 dark:bg-black/50"
            >
              <option value="notes" className="dark:bg-transparent dark:text-black">Notes</option>
              <option value="question_paper" className="dark:bg-transparent dark:text-black">Question Paper</option>
              <option value="a_plus" className="dark:bg-transparent dark:text-black">A+ Materials</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">Subject</label>
          <select
            id="subject"
            name="subject"
            required
            className="w-full rounded-lg border border-gray-300/50 bg-white/50 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700/50 dark:bg-black/50"
          >
            {[
              "Malayalam", "English", "Mathematics", "Social Science", 
              "Basic Science", "Physics", "Chemistry", "Biology", "IT"
            ].map(sub => (
              <option key={sub} value={sub} className="dark:bg-transparent dark:text-black">{sub}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="chapter" className="text-sm font-medium">Chapter</label>
          <input
            id="chapter"
            name="chapter"
            type="text"
            required
            className="w-full rounded-lg border border-gray-300/50 bg-white/50 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700/50 dark:bg-black/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="driveUrl" className="text-sm font-medium">Google Drive Link</label>
          <input
            id="driveUrl"
            name="driveUrl"
            type="url"
            required
            placeholder="https://drive.google.com/..."
            className="w-full rounded-lg border border-gray-300/50 bg-white/50 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700/50 dark:bg-black/50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-900"
        >
          {loading ? (
            <>
              <LoadingSpinner className="h-5 w-5" />
              <span>Uploading...</span>
            </>
          ) : (
            <span>Upload File</span>
          )}
        </button>
      </form>
    </div>
  );
}
