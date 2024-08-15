import React from 'react';
import ThemedHeader from './ThemedHeader';
import { Flex, useStyleConfig } from '@chakra-ui/react';
import { FlexProps } from '@chakra-ui/layout/dist/types/flex';

export interface ThemedPanelProps extends FlexProps {
  heading?: string;
  className?: string;
  flexDirection?: 'row' | 'column';
  includeBorder?: boolean;
}

const ThemedPanel = ({
  children,
  heading,
  className,
  height,
  width,
  flexDirection = 'row',
  padding = '1.5rem',
  includeBorder = true,
  sx,
  ...baseProps
}: ThemedPanelProps) => {
  const themeStyles = useStyleConfig('ThemedPanel', { includeBorder });

  return (
    <Flex
      sx={{ ...themeStyles, ...sx }}
      direction={flexDirection}
      justifyContent="space-between"
      className={`themed-panel ${className ? className : ''}`}
      padding={padding}
      height={height}
      width={width}
      {...baseProps}
    >
      {heading && <ThemedHeader>{heading}</ThemedHeader>}
      {children}
    </Flex>
  );
};

export default ThemedPanel;
