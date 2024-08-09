import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { ErrorLabelColor } from '../theme';

interface InputProps extends ChakraInputProps {
  name: string;
  label: string;
  value: string;
  isRequired: boolean;
  errorMessage?: string;
}

const Input = ({
  name,
  label,
  value,
  isRequired,
  errorMessage,
  ...baseProps
}: InputProps) => {
  const { colorMode } = useColorMode();
  const isInvalid = !!errorMessage;
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={isInvalid}
      variant={isInvalid ? 'error' : undefined}
      {...(isInvalid && {
        sx: {
          label: {
            color: ErrorLabelColor[colorMode],
            span: {
              color: ErrorLabelColor[colorMode],
            },
          },
        },
      })}
    >
      <FormLabel>{label}</FormLabel>
      <ChakraInput {...baseProps} borderRadius={0} name={name} value={value} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default Input;
