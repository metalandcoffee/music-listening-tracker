export interface Album {
  id: string;
  artist: string;
  albumName: string;
  releaseDate: string;
  genre: string;
  rating: 'good' | 'bad';
  createdAt?: string;
}

export type CreateAlbumData = Omit<Album, 'id' | 'createdAt'>;
