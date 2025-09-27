/**
 * API service functions for album data operations
 */
import { type Album, type CreateAlbumData } from '../types/album';

/**
 * Fetches all albums from the API
 *
 * @returns {Promise<Album[]>} Promise that resolves to array of albums
 * @throws {Error} When API request fails
 * @example
 * const albums = await fetchAlbums()
 */
export const fetchAlbums = async (): Promise<Album[]> => {
  // Simulate API delay.
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      id: '1',
      artist: 'Radiohead',
      albumName: 'OK Computer',
      releaseDate: '1997-06-16',
      genre: 'Alternative Rock',
      rating: 'good',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      artist: 'Kendrick Lamar',
      albumName: 'To Pimp a Butterfly',
      releaseDate: '2015-03-15',
      genre: 'Hip Hop',
      rating: 'good',
      createdAt: '2024-01-14',
    },
    {
      id: '3',
      artist: 'Taylor Swift',
      albumName: 'Midnights',
      releaseDate: '2022-10-21',
      genre: 'Pop',
      rating: 'bad',
      createdAt: '2024-01-13',
    },
    {
      id: '4',
      artist: 'Pink Floyd',
      albumName: 'The Dark Side of the Moon',
      releaseDate: '1973-03-01',
      genre: 'Progressive Rock',
      rating: 'good',
      createdAt: '2024-01-12',
    },
  ];
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

  // Mock sucessful response - replace with actual Supabase insert.
  return {
    ...albumData,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
};
