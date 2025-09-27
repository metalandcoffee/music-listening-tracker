/**
 * Empty state component shown when no albums exist
 *
 * @example <EmptyAlbumState />
 */
import { VStack, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const EmptyAlbumState = () => {
  return (
    <VStack gap={4} py={8}>
      <Text fontSize='lg' color='gray.500'>
        No albums tracked yet
      </Text>
      <RouterLink to='/add'>
        <Button colorPalette='teal' size='lg'>
          Add Your First Album
        </Button>
      </RouterLink>
    </VStack>
  );
};

export default EmptyAlbumState;
