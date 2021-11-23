import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import Patrogonia from './Patrogonia'
import { CharacterPositionProvider, ModalStateProvider } from './context'

describe('App', () => {
  it('is a collection of Providers wrapping a BrowserRouter to Patrogonia', () => {
    const subject = shallow(<App />)
    const characterPositionProvider = subject.find(CharacterPositionProvider)
    const modalStateProvider = characterPositionProvider.find(
      ModalStateProvider
    )
    const browserRouter = modalStateProvider.find(BrowserRouter)
    const patrogonia = browserRouter.find(Patrogonia)
    expect(patrogonia.exists()).toEqual(true)
  })
})
