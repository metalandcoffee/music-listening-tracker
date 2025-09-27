/**
 * API service functions for album artwork operations
 */

const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const LASTFM_BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

/**
 * Fetches album artwork URL from Last.fm
 */
export const getAlbumArtwork = async (
  artist: string,
  album: string
): Promise<string | null> => {
  if (!LASTFM_API_KEY) {
    console.warn('Last.fm API key not configured');
    return null;
  }

  try {
    const params = new URLSearchParams({
      method: 'album.getinfo',
      api_key: LASTFM_API_KEY,
      artist: artist.trim(),
      album: album.trim(),
      format: 'json',
    });

    const response = await fetch(`${LASTFM_BASE_URL}?${params}`);
    const data = await response.json();

    if (data.album?.image) {
      // Get the largest available image.
      const images = data.album.image;
      const largeImage =
        images.find((img: any) => img.size === 'extralarge') ||
        images.find((img: any) => img.size === 'large') ||
        images[images.length - 1];

      const artworkUrl = largeImage?.['#text'];
      return artworkUrl && artworkUrl !== '' ? artworkUrl : null;
    }

    return null;
  } catch (error) {
    console.error('Error fetching album artwork:', error);
    return null;
  }
};

/**
 * Default artwork placeholder
 */
export const getDefaultArtwork = () => '/default-album-cover.png';
