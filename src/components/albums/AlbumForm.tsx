/**
 * Reusable form component for adding and editing albums
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
import { Link as RouterLink } from 'react-router-dom';
import { type FormEvent } from 'react';
import { GENRES } from '../../constants/genres';
import ErrorAlert from '../ui/ErrorAlert';

interface FormData {
  artist: string;
  albumName: string;
  releaseYear: string;
  genre: string;
  rating: 'good' | 'bad' | '';
}

interface AlbumFormProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
  error: string | null;
  submitButtonText: string;
  loadingText: string;
}

const AlbumForm = ({
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
  error,
  submitButtonText,
  loadingText,
}: AlbumFormProps) => {
  return (
    <>
      {error && (
        <Box mb={6}>
          <ErrorAlert message={error} />
        </Box>
      )}

      <Box
        as='form'
        onSubmit={onSubmit}
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
              onChange={(e) => onInputChange('artist', e.target.value)}
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
              onChange={(e) => onInputChange('albumName', e.target.value)}
              placeholder='Enter album name'
              size='lg'
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Release Year
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type='number'
              min='1900'
              max={new Date().getFullYear()}
              value={formData.releaseYear}
              onChange={(e) => onInputChange('releaseYear', e.target.value)}
              placeholder='e.g. 1997'
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
                onChange={(e) => onInputChange('genre', e.target.value)}
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
                onChange={(e) => onInputChange('rating', e.target.value)}
              >
                <option value=''>Select rating</option>
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
              loadingText={loadingText}
            >
              {submitButtonText}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default AlbumForm;
