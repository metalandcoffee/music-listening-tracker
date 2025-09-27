/**
 * API service functions for album data operations
 */
import type { Album, CreateAlbumData, SupabaseAlbum } from '../types/album';
import { createClient } from '@supabase/supabase-js';
import {
  transformSupabaseAlbum,
  transformToSupabaseAlbum,
} from '../utils/transforms';

const { VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY } = import.meta.env;
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY);

/**
 * Fetches all albums from the API
 */
export const fetchAlbums = async (): Promise<Album[]> => {
  console.log('fetching albums...');
  const { data, error } = await supabase.from('tmp_album_tracking').select();

  if (error) {
    throw new Error(`Failed to fetch albums: ${error.message}`);
  }

  if (!data) {
    return [];
  }

  const typedData = data as SupabaseAlbum[];

  return typedData.map(transformSupabaseAlbum);
};

/**
 * Fetches a single album by ID
 */
export const fetchAlbumById = async (id: string): Promise<Album | null> => {
  const { data, error } = await supabase
    .from('tmp_album_tracking')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    throw new Error(`Failed to fetch album: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  const typedData = data as SupabaseAlbum;
  return transformSupabaseAlbum(typedData);
};

/**
 * Creates a new album in the database
 */
export const createAlbum = async (
  albumData: CreateAlbumData
): Promise<Album> => {
  const supabaseData = transformToSupabaseAlbum(albumData);

  const { data, error } = await supabase
    .from('tmp_album_tracking')
    .insert(supabaseData)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create album: ${error.message}`);
  }

  if (!data) {
    throw new Error('No data returned from album creation');
  }

  const typedData = data as SupabaseAlbum;
  return transformSupabaseAlbum(typedData);
};

/**
 * Updates an existing album in the database
 */
export const updateAlbum = async (
  id: string,
  updates: Partial<CreateAlbumData>
): Promise<Album> => {
  const supabaseUpdates = transformToSupabaseAlbum(updates as CreateAlbumData);

  const { data, error } = await supabase
    .from('tmp_album_tracking')
    .update(supabaseUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update album: ${error.message}`);
  }

  if (!data) {
    throw new Error('Album not found or no data returned from update');
  }

  const typedData = data as SupabaseAlbum;
  return transformSupabaseAlbum(typedData);
};

/**
 * Deletes an album from the database
 */
export const deleteAlbum = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('tmp_album_tracking')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete album: ${error.message}`);
  }
};
