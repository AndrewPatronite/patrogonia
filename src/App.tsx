import React from 'react'
import Patrogonia from './Patrogonia'
import { BrowserRouter } from 'react-router-dom'
import { CharacterPositionProvider, ModalStateProvider } from './context'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CharacterPositionProvider>
        <ModalStateProvider>
          <BrowserRouter>
            <Patrogonia />
          </BrowserRouter>
        </ModalStateProvider>
      </CharacterPositionProvider>
    </ChakraProvider>
  )
}

export default App
