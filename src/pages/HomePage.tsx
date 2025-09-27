import { Container, VStack } from '@chakra-ui/react';
import { useAlbums } from '../hooks/useAlbums';
import PageHeader from '../components/ui/PageHeader';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorAlert from '../components/ui/ErrorAlert';
import AlbumTable from '../components/albums/AlbumTable';
import EmptyAlbumState from '../components/albums/EmptyAlbumState';

const HomePage = () => {
  const { albums, loading, error } = useAlbums();

  if (loading) {
    return (
      <Container maxW='7xl' py={8}>
        <LoadingSpinner message='Loading albums...' />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW='7xl' py={8}>
        <ErrorAlert message={error} />
      </Container>
    );
  }

  return (
    <Container maxW='7xl' py={8}>
      <VStack gap={6} align='stretch'>
        <PageHeader title='Music Listening Tracker' showAddButton />

        {albums.length === 0 ? (
          <EmptyAlbumState />
        ) : (
          <AlbumTable albums={albums} />
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
