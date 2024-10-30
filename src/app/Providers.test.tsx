import React from 'react';
import { shallow } from 'enzyme';
import {
  BattleProvider,
  MapProvider,
  ModalStateProvider,
  PlayerProvider,
  SoundProvider,
  TutorialProvider,
} from '../providers';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import Providers from './Providers';

jest.mock('axios', () => ({
  create: jest.fn(),
}));

describe('Providers', () => {
  it('is a collection of Providers wrapping a BrowserRouter to Patrogonia', () => {
    const subject = shallow(<Providers>Stuff n Things</Providers>);
    const soundProvider = subject.find(SoundProvider);
    const chakraProvider = soundProvider.find(ChakraProvider);
    const modalStateProvider = chakraProvider.find(ModalStateProvider);
    const reduxProvider = modalStateProvider.find(Provider);
    const playerProvider = reduxProvider.find(PlayerProvider);
    const battleProvider = playerProvider.find(BattleProvider);
    const mapProvider = battleProvider.find(MapProvider);
    const tutorialProvider = mapProvider.find(TutorialProvider);
    expect(tutorialProvider.render().html()).toEqual('Stuff n Things');
  });
});
