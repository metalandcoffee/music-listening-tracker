/**
 * Add album form using shared AlbumForm component
 */

import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toaster } from '../../components/ui/toaster';
import { type CreateAlbumData } from '../../types/album';
import { createAlbum } from '../../services/albumService';
import AlbumForm from './AlbumForm';

interface FormData {
  artist: string;
  albumName: string;
  releaseYear: string;
  genre: string;
  rating: 'good' | 'bad' | '';
}

const AddAlbumForm = () => {
  const [formData, setFormData] = useState<FormData>({
    artist: '',
    albumName: '',
    releaseYear: '',
    genre: '',
    rating: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    if (
      !formData.artist ||
      !formData.albumName ||
      !formData.releaseYear ||
      !formData.genre ||
      !formData.rating
    ) {
      setError('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const albumData: CreateAlbumData = {
        artist: formData.artist.trim(),
        albumName: formData.albumName.trim(),
        releaseYear: formData.releaseYear,
        genre: formData.genre,
        rating: formData.rating as 'good' | 'bad',
      };

      await createAlbum(albumData);

      toaster.create({
        title: 'Album added successfully!',
        description: `${albumData.artist} - ${albumData.albumName} has been added to your tracker.`,
        type: 'success',
        duration: 4000,
      });

      navigate('/');
    } catch (err) {
      setError('Failed to save album. Please try again.');
      console.error('Error submitting album:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlbumForm
      formData={formData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
      submitButtonText='Add Album'
      loadingText='Adding Album...'
    />
  );
};

export default AddAlbumForm;
