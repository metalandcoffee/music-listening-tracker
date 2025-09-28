import { useState, useEffect, useCallback } from 'react';
import { type Album } from '../types/album';
import { fetchAlbums } from '../services/albumService';

let albumsCache: Album[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Custom hook to fetch albums.
export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>(albumsCache || []);
  const [loading, setLoading] = useState(!albumsCache);
  const [error, setError] = useState<string | null>(null);

  const loadAlbums = async (force = false) => {
    const now = Date.now();

    // Check cache first
    if (!force && albumsCache && now - lastFetchTime < CACHE_DURATION) {
      console.log('loading from cache...');
      setAlbums(albumsCache);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchAlbums();

      // Update cache
      albumsCache = data;
      lastFetchTime = now;
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

  const updateAlbumInState = (updatedAlbum: Album) => {
    const updatedAlbums = albums.map((album) =>
      album.id === updatedAlbum.id ? updatedAlbum : album
    );
    setAlbums(updatedAlbums);
    albumsCache = updatedAlbums;
  };
  const removeAlbumFromState = (albumId: string) => {
    const updatedAlbums = albums.filter((album) => album.id !== albumId);
    setAlbums(updatedAlbums);
    albumsCache = updatedAlbums;
  };

  const addAlbumToState = (newAlbum: Album) => {
    const updatedAlbums = [newAlbum, ...albums];
    setAlbums(updatedAlbums);
    albumsCache = updatedAlbums;
  };

  return {
    albums,
    loading,
    error,
    refetch,
    updateAlbumInState,
    removeAlbumFromState,
    addAlbumToState,
  };
};
