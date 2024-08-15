import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { HttpStatus } from '../api';

export const useToastErrorHandler = () => {
  const toast = useToast();
  return useCallback(
    (error) => {
      let errorMessage = 'An unknown error occurred.';
      if (error) {
        if (error.response && error.response.status) {
          switch (error.response.status) {
            case HttpStatus.Unauthorized:
              errorMessage = 'Invalid login.';
              break;
            case HttpStatus.Conflict:
              errorMessage = 'Username already exists.';
              break;
            case HttpStatus.InternalServerError:
              errorMessage = 'An internal server error occurred.';
              break;
            default:
              break;
          }
        } else {
          errorMessage = `${error}`;
        }
      }
      toast({
        position: 'top',
        variant: 'top-accent',
        status: 'error',
        duration: null,
        isClosable: true,
        description: errorMessage,
      });
    },
    [toast]
  );
};
