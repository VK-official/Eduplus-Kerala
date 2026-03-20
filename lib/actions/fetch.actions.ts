"use server";

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";

/* 
  Eduplus Kerala - Phase 7 (Supabase Sync)
  Strict Postgres Schema:
  - class (integer)
  - subject (text)
  - part (text)
  - chapter (text)
  - resource_type (text: 'notes', 'question_paper', 'a_plus')
  - file_size (text)
  - description (text)
  - specialty_tag (text)
  - resource_link (text)
  - comments (jsonb)
  - total_stars (integer)
  - rating_count (integer)
*/

export async function getFiles() {
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
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('total_stars', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching top resources:", error);
    return [];
  }
}

export async function deleteFile(fileId: string) {
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
