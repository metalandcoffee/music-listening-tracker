import { useState, useEffect } from 'react';
import { type Album } from '../types/album';
import { fetchAlbums } from '../services/albumService';

// Custom hook to fetch albums.
export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAlbums = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAlbums();
      setAlbums(data);
    } catch (err) {
      setError('Failed to load albums');
      console.error('Error fetching albums:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const refetch = () => {
    loadAlbums();
  };

  /**
   * Removes an album from local state after successful API deletion
   */
  const removeAlbumFromState = (albumId: string) => {
    setAlbums((prev) => prev.filter((album) => album.id !== albumId));
  };

  return {
    albums,
    loading,
    error,
    removeAlbumFromState,
    refetch,
  };
};
