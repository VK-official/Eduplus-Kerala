"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { addComment, getComments } from "../lib/actions/comment.actions";
import { Loader2, Send } from "lucide-react";

export function CommentSection({ fileId }: { fileId: string }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      const data = await getComments(fileId);
      setComments(data);
      setFetching(false);
    }
    fetchComments();
  }, [fileId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const newComment = await addComment(fileId, text);
      setComments([newComment, ...comments]);
      setText("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
      <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Discussion</h3>

      {session?.user ? (
        <form onSubmit={handleSubmit} className="mb-8 relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add to the discussion..."
            className="w-full rounded-xl border border-slate-300/50 bg-white/70 p-4 pr-12 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700/50 dark:bg-slate-950/70 dark:text-white dark:placeholder-slate-400 min-h-[100px] resize-none"
            required
          />
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="absolute bottom-4 right-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-center border border-blue-100 dark:border-blue-800/30">
          Please log in to leave a comment.
        </div>
      )}

      {fetching ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-900 dark:text-white">{comment.userName}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
