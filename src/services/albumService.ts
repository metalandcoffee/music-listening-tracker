import { type Album, type CreateAlbumData } from '../types/album';

export const fetchAlbums = async (): Promise<Album[]> => {
  // Simulate API delay.
  await new Promise((resolve) => setTimeout(resolve, 1000));

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

// Placeholder function for API submission.
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
