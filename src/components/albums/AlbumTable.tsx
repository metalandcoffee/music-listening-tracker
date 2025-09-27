import { Table, Badge, Box, HStack, IconButton } from '@chakra-ui/react';
import { LuNotebookPen, LuTrash } from 'react-icons/lu';
import { Link as RouterLink } from 'react-router-dom';
import { type Album } from '../../types/album';
import { toaster } from '../ui/toaster';
import { deleteAlbum } from '../../services/albumService';
import { getDefaultArtwork } from '../../services/artworkService';

interface AlbumTableProps {
  albums: Album[];
  onAlbumDeleted: (albumId: string) => void;
}

const AlbumTable = ({ albums, onAlbumDeleted }: AlbumTableProps) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteAlbum(id);
      onAlbumDeleted(id);
      toaster.create({
        title: 'Album deleted successfully',
        type: 'success',
      });
    } catch (err) {
      toaster.create({
        title: 'Failed to delete album',
        type: 'error',
      });
    }
  };
  return (
    <Box
      bg='white'
      shadow='md'
      rounded='lg'
      overflow='hidden'
      border='1px solid'
      borderColor='gray.200'
      _dark={{
        bg: 'gray.800',
        borderColor: 'gray.600',
      }}
    >
      <Table.Root variant='outline'>
        <Table.Header bg='teal.50'>
          <Table.Row>
            <Table.ColumnHeader>Artwork</Table.ColumnHeader>
            <Table.ColumnHeader>Artist</Table.ColumnHeader>
            <Table.ColumnHeader>Album</Table.ColumnHeader>
            <Table.ColumnHeader>Release Date</Table.ColumnHeader>
            <Table.ColumnHeader>Genre</Table.ColumnHeader>
            <Table.ColumnHeader>Rating</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {albums.map((album) => (
            <Table.Row key={album.id} _hover={{ bg: 'gray.50' }}>
              <Table.Cell>
                <img
                  src={album.artwork || getDefaultArtwork()}
                  alt={`${album.albumName} cover`}
                  width='50'
                  height='50'
                  style={{
                    borderRadius: '4px',
                    objectFit: 'cover',
                    backgroundColor: '#f7fafc',
                  }}
                />
              </Table.Cell>
              <Table.Cell fontWeight='semibold'>{album.artist}</Table.Cell>
              <Table.Cell>{album.albumName}</Table.Cell>
              <Table.Cell>{album.releaseYear}</Table.Cell>
              <Table.Cell>
                <Badge colorPalette='blue' variant='subtle'>
                  {album.genre}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Badge
                  colorPalette={album.rating === 'good' ? 'green' : 'red'}
                  variant='solid'
                >
                  {album.rating.toUpperCase()}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <HStack gap={2}>
                  <RouterLink to={`/edit/${album.id}`}>
                    <IconButton
                      aria-label='Edit album'
                      size='sm'
                      variant='ghost'
                    >
                      <LuNotebookPen />
                    </IconButton>
                  </RouterLink>
                  <IconButton
                    aria-label='Delete album'
                    size='sm'
                    variant='ghost'
                    colorPalette='red'
                    onClick={() => handleDelete(album.id)}
                  >
                    <LuTrash />
                  </IconButton>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default AlbumTable;
