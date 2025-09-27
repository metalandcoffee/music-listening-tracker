/**
 * Form component for adding new albums
 * Handles form state, validation, and submission
 *
 * @example <AddAlbumForm />
 */
import {
  Box,
  Button,
  VStack,
  HStack,
  Field,
  Input,
  NativeSelectRoot,
  NativeSelectField,
} from '@chakra-ui/react';
import { toaster } from '../ui/toaster';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { type CreateAlbumData } from '../../types/album';
import { createAlbum } from '../../services/albumService';
import { GENRES } from '../../constants/genres';
import ErrorAlert from '../ui/ErrorAlert';

interface FormData {
  artist: string;
  albumName: string;
  releaseDate: string;
  genre: string;
  rating: 'good' | 'bad' | '';
}

const AddAlbumForm = () => {
  const [formData, setFormData] = useState<FormData>({
    artist: '',
    albumName: '',
    releaseDate: '',
    genre: '',
    rating: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  /**
   * Updates form field and clears errors
   */
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  /**
   * Validates all required fields are filled
   */
  const validateForm = (): boolean => {
    if (
      !formData.artist ||
      !formData.albumName ||
      !formData.releaseDate ||
      !formData.genre ||
      !formData.rating
    ) {
      setError('Please fill in all fields');
      return false;
    }
    return true;
  };

  /**
   * Handles form submission and API call
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const albumData: CreateAlbumData = {
        artist: formData.artist.trim(),
        albumName: formData.albumName.trim(),
        releaseDate: formData.releaseDate,
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
    <>
      {error && (
        <Box mb={6}>
          <ErrorAlert message={error} />
        </Box>
      )}

      <Box
        as='form'
        onSubmit={handleSubmit}
        bg='white'
        p={8}
        rounded='lg'
        shadow='md'
        border='1px solid'
        borderColor='gray.200'
        _dark={{
          bg: 'gray.800',
          borderColor: 'gray.600',
        }}
      >
        <VStack gap={6}>
          <Field.Root required>
            <Field.Label>
              Artist/Band Name
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              value={formData.artist}
              onChange={(e) => handleInputChange('artist', e.target.value)}
              placeholder='Enter artist or band name'
              size='lg'
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Album Name
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              value={formData.albumName}
              onChange={(e) => handleInputChange('albumName', e.target.value)}
              placeholder='Enter album name'
              size='lg'
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Release Date
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type='date'
              value={formData.releaseDate}
              onChange={(e) => handleInputChange('releaseDate', e.target.value)}
              size='lg'
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Genre
              <Field.RequiredIndicator />
            </Field.Label>
            <NativeSelectRoot size='lg'>
              <NativeSelectField
                value={formData.genre}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                placeholder='Select genre'
              >
                <option value=''>Select genre</option>
                {GENRES.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Rating
              <Field.RequiredIndicator />
            </Field.Label>
            <NativeSelectRoot size='lg'>
              <NativeSelectField
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', e.target.value)}
                placeholder='Select rating'
              >
                <option value='good'>Good</option>
                <option value='bad'>Bad</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Field.Root>

          <HStack gap={4} width='100%' pt={4}>
            <RouterLink to='/'>
              <Button variant='outline' size='lg' flex={1}>
                Cancel
              </Button>
            </RouterLink>
            <Button
              type='submit'
              colorPalette='teal'
              size='lg'
              flex={1}
              loading={isSubmitting}
              loadingText='Adding Album...'
            >
              Add Album
            </Button>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default AddAlbumForm;
