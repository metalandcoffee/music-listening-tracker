/**
 * TypeScript interfaces and types for Album data structures.
 */
export interface Album {
  id: string;
  artist: string;
  albumName: string;
  releaseYear: string;
  genre: string;
  rating: 'good' | 'bad';
  artwork?: string;
  createdAt?: string;
}

// Create a type for the raw Supabase data.
export interface SupabaseAlbum {
  id: string;
  artist: string;
  album: string;
  release_date: string;
  genre: string;
  rating: 'good' | 'bad';
  artwork?: string;
  created_at?: string;
}

export type CreateAlbumData = Omit<Album, 'id' | 'createdAt'>;
