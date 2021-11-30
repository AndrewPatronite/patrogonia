import { createSlice } from '@reduxjs/toolkit'
import Player from '../player/Player'

const getInitialPlayer = (): Player => {
  const storedPlayer = localStorage.getItem('currentPlayer')
  return storedPlayer
    ? JSON.parse(storedPlayer)
    : { loggedIn: false, location: {}, completedLessons: [] }
}

const playerSlice = createSlice({
  name: 'currentPlayer',
  initialState: getInitialPlayer(),
  reducers: {
    setPlayer: (state, { payload }) => ({ ...state, ...payload }),
  },
})

export default playerSlice
