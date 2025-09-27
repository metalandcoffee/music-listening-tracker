/**
 * Edit album form using shared AlbumForm component
 * Only makes API calls if data has actually changed
 */

import { useState, type FormEvent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toaster } from '../ui/toaster';
import { type Album, type CreateAlbumData } from '../../types/album';
import { updateAlbum } from '../../services/albumService';
import AlbumForm from './AlbumForm';

interface FormData {
  artist: string;
  albumName: string;
  releaseYear: string;
  genre: string;
  rating: 'good' | 'bad' | '';
}

interface EditAlbumFormProps {
  album: Album;
  onAlbumUpdated?: (updatedAlbum: Album) => void;
}

const EditAlbumForm = ({ album }: EditAlbumFormProps) => {
  const initialFormData: FormData = {
    artist: album.artist,
    albumName: album.albumName,
    releaseYear: album.releaseYear,
    genre: album.genre,
    rating: album.rating,
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * Check if form data has changed from original values
   */
  const hasChanges = useMemo(() => {
    return (
      formData.artist.trim() !== initialFormData.artist ||
      formData.albumName.trim() !== initialFormData.albumName ||
      formData.releaseYear !== initialFormData.releaseYear ||
      formData.genre !== initialFormData.genre ||
      formData.rating !== initialFormData.rating
    );
  }, [formData, initialFormData]);

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

    // Check if anything actually changed
    if (!hasChanges) {
      toaster.create({
        title: 'No changes detected',
        description: 'No modifications were made to the album.',
        type: 'info',
        duration: 3000,
      });
      navigate('/');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Send all form data to API.
      const albumData: CreateAlbumData = {
        artist: formData.artist.trim(),
        albumName: formData.albumName.trim(),
        releaseYear: formData.releaseYear,
        genre: formData.genre,
        rating: formData.rating as 'good' | 'bad',
      };

      await updateAlbum(album.id, albumData);

      toaster.create({
        title: 'Album updated successfully!',
        description: `${albumData.artist} - ${albumData.albumName} has been updated.`,
        type: 'success',
        duration: 4000,
      });

      navigate('/');
    } catch (err) {
      setError('Failed to update album. Please try again.');
      console.error('Error updating album:', err);
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
      submitButtonText={hasChanges ? 'Update Album' : 'No Changes'}
      loadingText='Updating Album...'
    />
  );
};

export default EditAlbumForm;
