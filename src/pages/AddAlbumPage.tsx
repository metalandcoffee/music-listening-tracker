import { Container, VStack, HStack, Button, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';
import AddAlbumForm from '../components/albums/AddAlbumForm';

const AddAlbumPage = () => {
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
          Add New Album
        </Heading>

        <AddAlbumForm />
      </VStack>
    </Container>
  );
};

export default AddAlbumPage;
