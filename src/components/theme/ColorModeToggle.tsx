import { Box, IconButton, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { ColorMode } from '../../theme'

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box>
      Color mode:
      <IconButton
        marginLeft="0.25rem"
        aria-label="Toggle color mode"
        icon={colorMode === ColorMode.Light ? <FaSun /> : <FaMoon />}
        onClick={toggleColorMode}
      />
    </Box>
  )
}

export default ColorModeToggle
