import { combineReducers, configureStore } from '@reduxjs/toolkit'
import playerSlice from './playerSlice'

export const store = configureStore({
  reducer: combineReducers({
    currentPlayer: playerSlice.reducer,
  }),
})

export type RootState = ReturnType<typeof store.getState>
