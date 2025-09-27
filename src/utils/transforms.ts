import type { Album, SupabaseAlbum, CreateAlbumData } from '../types/album';

/**
 * Transforms raw Supabase album data to frontend Album interface
 */
export const transformSupabaseAlbum = (
  supabaseAlbum: SupabaseAlbum
): Album => ({
  id: supabaseAlbum.id,
  artist: supabaseAlbum.artist,
  albumName: supabaseAlbum.album,
  releaseDate: supabaseAlbum.release_date,
  genre: supabaseAlbum.genre,
  rating: supabaseAlbum.rating,
  createdAt: supabaseAlbum.created_at,
});

/**
 * Transforms frontend Album data to Supabase format for creation
 */
export const transformToSupabaseAlbum = (albumData: CreateAlbumData) => ({
  artist: albumData.artist,
  album: albumData.albumName,
  release_date: albumData.releaseDate,
  genre: albumData.genre,
  rating: albumData.rating,
});
