'use server'

import { createClient } from '@/utils/supabase/server';
import { db } from '@/server/db';
import { scenes, users } from '@/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createScene(formData: FormData) {
  const supabase = createClient();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const dateStr = formData.get('date') as string;
  const file = formData.get('file') as File;

  if (!title || !file) {
    throw new Error('Title and file are required');
  }

  // Parse the date string into a Date object
  const date = dateStr ? new Date(dateStr) : new Date();

  // Format the date as an ISO string (YYYY-MM-DD)
  const formattedDate = date.toISOString().split('T')[0];

  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('scene-images')
      .upload(`${Date.now()}_${file.name}`, file);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    // Get public URL of the uploaded file
    const { data: { publicUrl } } = supabase
      .storage
      .from('scene-images')
      .getPublicUrl(uploadData.path);

    // Create new scene in the database
    const [newScene] = await db.insert(scenes).values({
      title,
      description,
      imageUrl: publicUrl,
      userId: user.id,
      date: sql`${formattedDate}::date`, // Use SQL template literal to ensure proper date formatting
    }).returning();

    revalidatePath('/');
    return newScene;
  } catch (error: any) {
    console.error('Error in createScene:', error);
    throw new Error(error.message || 'An error occurred while creating the scene');
  }
}


export async function getScenes() {
  const supabase = createClient();

  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Fetch scenes for the current user
    const userScenes = await db.query.users.findFirst({
      where: eq(users.id, user.id),
      with: {
        scenes: true,
      },
    });

    return userScenes?.scenes || [];
  } catch (error: any) {
    throw new Error(error.message);
  }
}
