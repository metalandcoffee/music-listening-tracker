/**
 * Edit album page with pre-filled form
 */
import { LuArrowLeft } from 'react-icons/lu';
import { Container, VStack, HStack, Button, Heading } from '@chakra-ui/react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchAlbumById } from '../services/albumService';
import { type Album } from './../types/album';
import EditAlbumForm from '../components/albums/EditAlbumForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorAlert from '../components/ui/ErrorAlert';

const EditAlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    const loadAlbum = async () => {
      try {
        const albumData = await fetchAlbumById(id);
        if (!albumData) {
          setError('Album not found');
          return;
        }
        setAlbum(albumData);
      } catch (err) {
        setError('Failed to load album');
      } finally {
        setLoading(false);
      }
    };

    loadAlbum();
  }, [id, navigate]);

  if (loading) return <LoadingSpinner message='Loading album...' />;
  if (error) return <ErrorAlert message={error} />;
  if (!album) return <ErrorAlert message='Album not found' />;

  return (
    <Container maxW='2xl' py={8}>
      <VStack gap={6} align='stretch'>
        <HStack>
          <RouterLink to='/'>
            <Button variant='ghost' colorPalette='teal'>
              <LuArrowLeft />
              Back to List
            </Button>
          </RouterLink>
        </HStack>

        <Heading size='lg' color='teal.600'>
          Edit Album
        </Heading>
        <EditAlbumForm album={album} />
      </VStack>
    </Container>
  );
};

export default EditAlbumPage;
