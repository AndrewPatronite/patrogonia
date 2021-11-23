import { Heading, HeadingProps, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { HeadingColor } from '../../theme'

const ThemedHeader = ({ children, ...baseProps }: HeadingProps) => {
  const { colorMode } = useColorMode()
  return (
    <Heading
      as="h1"
      size="md"
      marginBottom="0.75rem"
      color={HeadingColor[colorMode]}
      {...baseProps}
    >
      {children}
    </Heading>
  )
}

export default ThemedHeader
