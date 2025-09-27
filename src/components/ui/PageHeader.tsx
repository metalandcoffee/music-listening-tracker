import { HStack, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { LuPlus } from 'react-icons/lu';

interface PageHeaderProps {
  title: string;
  showAddButton?: boolean;
}

const PageHeader = ({ title, showAddButton = false }: PageHeaderProps) => {
  return (
    <HStack justify='space-between' align='center'>
      <Heading size='lg' color='teal.600'>
        {title}
      </Heading>
      {showAddButton && (
        <RouterLink to='/add'>
          <Button colorPalette='teal' size='md'>
            <LuPlus />
            Add Album
          </Button>
        </RouterLink>
      )}
    </HStack>
  );
};

export default PageHeader;
