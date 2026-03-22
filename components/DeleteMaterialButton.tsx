"use client";
import { Trash2 } from 'lucide-react';
import { deleteMaterialAction } from '../lib/actions/admin.actions';
import { useState } from 'react';

export default function DeleteMaterialButton({ id }: { id: number | string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to permanently delete this material? This cannot be undone.")) {
      setIsDeleting(true);
      await deleteMaterialAction(id);
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-2 rounded-lg transition-all ${isDeleting ? 'text-slate-600' : 'text-slate-400 hover:text-red-500 hover:bg-red-500/10'}`}>
      <Trash2 className={`w-5 h-5 ${isDeleting ? 'animate-pulse' : ''}`} />
    </button>
  );
}
