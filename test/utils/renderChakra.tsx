import { render, RenderOptions } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const renderChakra = (
  ui: ReactNode,
  options?: Omit<RenderOptions, 'queries'> | undefined
) => {
  const renderResult = render(<ChakraProvider>{ui}</ChakraProvider>, options);
  return {
    ...renderResult,
    rerender: (ui: ReactNode) =>
      renderResult.rerender(<ChakraProvider>{ui}</ChakraProvider>),
  };
};
