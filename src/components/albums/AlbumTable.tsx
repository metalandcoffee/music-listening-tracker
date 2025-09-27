import { Table, Badge, Box } from '@chakra-ui/react';
import { type Album } from '../../types/album';
import { formatDate } from '../../utils/dateUtils';

interface AlbumTableProps {
  albums: Album[];
}

const AlbumTable = ({ albums }: AlbumTableProps) => {
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
            <Table.ColumnHeader>Artist</Table.ColumnHeader>
            <Table.ColumnHeader>Album</Table.ColumnHeader>
            <Table.ColumnHeader>Release Date</Table.ColumnHeader>
            <Table.ColumnHeader>Genre</Table.ColumnHeader>
            <Table.ColumnHeader>Rating</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {albums.map((album) => (
            <Table.Row key={album.id} _hover={{ bg: 'gray.50' }}>
              <Table.Cell fontWeight='semibold'>{album.artist}</Table.Cell>
              <Table.Cell>{album.albumName}</Table.Cell>
              <Table.Cell>{album.releaseDate}</Table.Cell>
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
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default AlbumTable;
