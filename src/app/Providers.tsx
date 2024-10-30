'use client';

import { ReactNode } from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '../theme';
import {
  BattleProvider,
  MapProvider,
  ModalStateProvider,
  PlayerProvider,
} from '../providers';
import { Provider } from 'react-redux';
import { store } from '../redux';
import TutorialProvider from '../providers/TutorialProvider';
import SoundProvider from '../providers/SoundProvider';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <SoundProvider>
        <ChakraProvider theme={theme}>
          <ModalStateProvider>
            <Provider store={store}>
              <PlayerProvider>
                <BattleProvider>
                  <MapProvider>
                    <TutorialProvider>{children}</TutorialProvider>
                  </MapProvider>
                </BattleProvider>
              </PlayerProvider>
            </Provider>
          </ModalStateProvider>
        </ChakraProvider>
      </SoundProvider>
    </>
  );
};

export default Providers;
