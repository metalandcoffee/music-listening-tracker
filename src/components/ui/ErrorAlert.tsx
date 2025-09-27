import { Alert } from '@chakra-ui/react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <Alert.Root status='error'>
      <Alert.Indicator />
      <Alert.Title>Error</Alert.Title>
      <Alert.Description>{message}</Alert.Description>
    </Alert.Root>
  );
};

export default ErrorAlert;
