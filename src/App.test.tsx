import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import Patrogonia from './Patrogonia'
import {
  BattleProvider,
  MapProvider,
  ModalStateProvider,
  PlayerProvider,
} from './providers'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'

describe('App', () => {
  it('is a collection of Providers wrapping a BrowserRouter to Patrogonia', () => {
    const subject = shallow(<App />)
    const chakraProvider = subject.find(ChakraProvider)
    const modalStateProvider = chakraProvider.find(ModalStateProvider)
    const browserRouter = modalStateProvider.find(BrowserRouter)
    const reduxProvider = browserRouter.find(Provider)
    const playerProvider = reduxProvider.find(PlayerProvider)
    const battleProvider = playerProvider.find(BattleProvider)
    const mapProvider = battleProvider.find(MapProvider)
    const patrogonia = mapProvider.find(Patrogonia)
    expect(patrogonia.exists()).toEqual(true)
  })
})
