import { combineReducers, configureStore } from '@reduxjs/toolkit'
import playerSlice from './playerSlice'
import battleSlice from './battleSlice'

export const store = configureStore({
  reducer: combineReducers({
    currentPlayer: playerSlice.reducer,
    battleState: battleSlice.reducer,
  }),
})

export type RootState = ReturnType<typeof store.getState>
