import React from 'react'
import Patrogonia from './Patrogonia'
import { BrowserRouter } from 'react-router-dom'
import { CharacterPositionProvider, ModalStateProvider } from './context'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import { PlayerProvider } from './providers'
import { Provider } from 'react-redux'
import { store } from './redux'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CharacterPositionProvider>
        <ModalStateProvider>
          <BrowserRouter>
            <Provider store={store}>
              <PlayerProvider>
                <Patrogonia />
              </PlayerProvider>
            </Provider>
          </BrowserRouter>
        </ModalStateProvider>
      </CharacterPositionProvider>
    </ChakraProvider>
  )
}

export default App
