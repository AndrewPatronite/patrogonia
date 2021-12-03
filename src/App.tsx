import React from 'react'
import Patrogonia from './Patrogonia'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import {
  BattleProvider,
  MapProvider,
  ModalStateProvider,
  PlayerProvider,
} from './providers'
import { Provider } from 'react-redux'
import { store } from './redux'
import TutorialProvider from './providers/TutorialProvider'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ModalStateProvider>
        <BrowserRouter>
          <Provider store={store}>
            <PlayerProvider>
              <BattleProvider>
                <MapProvider>
                  <TutorialProvider>
                    <Patrogonia />
                  </TutorialProvider>
                </MapProvider>
              </BattleProvider>
            </PlayerProvider>
          </Provider>
        </BrowserRouter>
      </ModalStateProvider>
    </ChakraProvider>
  )
}

export default App
