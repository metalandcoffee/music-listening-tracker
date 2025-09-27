/**
 * API service functions for album data operations
 */
import type { Album, CreateAlbumData, SupabaseAlbum } from '../types/album';
import { createClient } from '@supabase/supabase-js';
import { transformSupabaseAlbum } from '../utils/transforms';

const { VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY } = import.meta.env;
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY);

/**
 * Fetches all albums from the API
 *
 * @returns {Promise<Album[]>} Promise that resolves to array of albums
 * @throws {Error} When API request fails
 * @example
 * const albums = await fetchAlbums()
 */
export const fetchAlbums = async (): Promise<Album[]> => {
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
 * Creates a new album in the database
 *
 * @param {CreateAlbumData} albumData - Album data without ID and createdAt
 * @returns {Promise<Album>} Promise that resolves to created album with ID
 * @throws {Error} When creation fails or validation errors occur
 * @example
 * const newAlbum = await createAlbum({
 *   artist: 'The Beatles',
 *   albumName: 'Abbey Road',
 *   releaseDate: '1969-09-26',
 *   genre: 'Rock',
 *   rating: 'good'
 * })
 */
export const createAlbum = async (
  albumData: CreateAlbumData
): Promise<Album> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate potential API error (uncomment to test error handling)
  // if (Math.random() > 0.8) {
  //   throw new Error('Failed to save album')
  // }

  // @todo USE TRANSFORM FUNCTION transformToSupabaseAlbum
  // Mock sucessful response - replace with actual Supabase insert.
  return {
    ...albumData,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
};
