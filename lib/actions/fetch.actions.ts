"use server";

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";

/* 
  Eduplus Kerala - Phase 9 (Supabase Stabilization)
  - Added safety guards for null supabase client.
  - Purged all MongoDB references.
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
