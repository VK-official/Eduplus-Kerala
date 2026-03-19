"use client";

import { FileText, Download, ExternalLink, FileQuestion, BookOpen } from "lucide-react";

interface FileCardProps {
  title: string;
  subject: string;
  classNum: number;
  type: string;
  driveUrl: string;
}

export function FileCard({ title, subject, classNum, type, driveUrl }: FileCardProps) {
  const getIcon = () => {
    switch (type) {
      case "notes":
        return <BookOpen className="h-8 w-8 text-blue-500 mb-3" />;
      case "question_paper":
        return <FileQuestion className="h-8 w-8 text-purple-500 mb-3" />;
      case "a_plus":
        return <FileText className="h-8 w-8 text-yellow-500 mb-3" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500 mb-3" />;
    }
  };

  const getBadgeColor = () => {
    switch (type) {
      case "notes":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "question_paper":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "a_plus":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        {getIcon()}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
            Class {classNum}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
            {subject}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor()}`}>
            {type.replace("_", " ").toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-auto">
        <a 
          href={driveUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex"
        >
          <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
            <ExternalLink className="h-4 w-4" />
            <span>Open in Drive</span>
          </button>
        </a>
      </div>
    </div>
  );
}
