"use server";

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";

/* 
  Eduplus Kerala - Phase 10 (Supabase resource management)
  - NextAuth Eradicated.
  - Added addResource for Supabase Postgres.
*/

export async function getFiles() {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
}

export async function getFileById(id: string) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching file by id:", error);
    return null;
  }
}

export async function addRating(fileId: string, stars: number) {
  if (!supabase) return { ok: false, error: "Database not connected" };
  try {
    if (stars < 1 || stars > 5) throw new Error("Invalid rating.");
    
    const { data: current, error: getError } = await supabase
      .from('resources')
      .select('total_stars, rating_count')
      .eq('id', fileId)
      .single();

    if (getError) throw getError;

    const { error: updError } = await supabase
      .from('resources')
      .update({
        total_stars: (current.total_stars || 0) + stars,
        rating_count: (current.rating_count || 0) + 1
      })
      .eq('id', fileId);

    if (updError) throw updError;

    revalidatePath(`/vault/${fileId}`);
    return { ok: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function addComment(fileId: string, user: string, text: string) {
  if (!supabase) return { ok: false, error: "Database not connected" };
  try {
    const { data: current, error: getError } = await supabase
      .from('resources')
      .select('comments')
      .eq('id', fileId)
      .single();

    if (getError) throw getError;

    const comments = current.comments || [];
    const newComment = { user, text, createdAt: new Date().toISOString(), resolved: false };
    
    const { error: updError } = await supabase
      .from('resources')
      .update({ comments: [...comments, newComment] })
      .eq('id', fileId);

    if (updError) throw updError;

    revalidatePath(`/vault/${fileId}`);
    return { ok: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getTopResources(limit: number = 5) {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('total_stars', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    // This is the line that triggered the {} error. Added guard above.
    console.error("Error fetching top resources:", error);
    return [];
  }
}

export async function deleteFile(fileId: string) {
  if (!supabase) return { ok: false, error: "Database not connected" };
  try {
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', fileId);

    if (error) throw error;

    revalidatePath("/vault");
    return { ok: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function addResource(data: any) {
  if (!supabase) return { ok: false, error: "Database not connected" };
  try {
    const { data: inserted, error } = await supabase
      .from('resources')
      .insert({
        title: data.title,
        class: data.classNum,
        subject: data.subject,
        part: data.part,
        chapter: data.chapter,
        format: data.format,
        file_size: data.fileSize,
        specialty_tag: data.specialtyTag,
        resource_type: data.type,
        covered_areas: data.coveredAreas,
        description: data.description,
        credits: data.credits,
        uploader_name: data.uploaderName || "Teacher Admin",
        resource_link: data.driveUrl,
        rating_count: 0,
        total_stars: 0,
        comments: []
      })
      .select()
      .single();

    if (error) throw error;
    revalidatePath("/vault");
    revalidatePath("/");
    return inserted;
  } catch (error: any) {
    console.error("Error adding resource:", error);
    throw new Error(error.message);
  }
}

export async function getTeacherFilesWithComments() {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching teacher files:", error);
    return [];
  }
}

export const incrementDownload = async (id: string) => {
  if (!supabase) return;
  try {
    const { data: current, error: getError } = await supabase
      .from('resources')
      .select('downloads')
      .eq('id', id)
      .single();

    if (getError) throw getError;

    await supabase
      .from('resources')
      .update({ downloads: (current.downloads || 0) + 1 })
      .eq('id', id);
  } catch (error) {
    console.error("Error incrementing download:", error);
  }
};

export const getAllFilesForSitemap = async () => {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('id, updated_at');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching sitemap IDs:", error);
    return [];
  }
};

export const updateCommentStatus = async (resourceId: string, commentIndex: number, status: string) => {
  if (!supabase) return;
  try {
    const { data: current, error: getError } = await supabase
      .from('resources')
      .select('comments')
      .eq('id', resourceId)
      .single();

    if (getError) throw getError;

    const comments = [...(current.comments || [])];
    if (comments[commentIndex]) {
      comments[commentIndex].status = status;
      comments[commentIndex].resolved = status === 'resolved';
    }

    await supabase
      .from('resources')
      .update({ comments })
      .eq('id', resourceId);

    revalidatePath(`/vault/${resourceId}`);
  } catch (error) {
    console.error("Error updating comment status:", error);
  }
};

export const getTrendingFiles = async (limit: number = 5) => {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('downloads', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching trending files:", error);
    return [];
  }
};

export const incrementUpvote = async (id: string) => {
  if (!supabase) return;
  try {
    const { data: current, error: getError } = await supabase
      .from('resources')
      .select('upvotes')
      .eq('id', id)
      .single();

    if (getError) throw getError;

    await supabase
      .from('resources')
      .update({ upvotes: (current.upvotes || 0) + 1 })
      .eq('id', id);
  } catch (error) {
    console.error("Error incrementing upvote:", error);
  }
};
