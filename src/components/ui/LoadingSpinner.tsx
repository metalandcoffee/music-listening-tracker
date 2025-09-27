import { VStack, Spinner, Text } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <VStack gap={4} py={8}>
      <Spinner size='xl' colorPalette='teal' />
      <Text color='gray.600'>{message}</Text>
    </VStack>
  );
};

export default LoadingSpinner;
