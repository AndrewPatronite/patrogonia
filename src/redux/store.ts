import { combineReducers, configureStore } from '@reduxjs/toolkit';
import playerSlice from './playerSlice';
import battleSlice from './battleSlice';
import mapSlice from './mapSlice';

export const store = configureStore({
  reducer: combineReducers({
    currentPlayer: playerSlice.reducer,
    battleState: battleSlice.reducer,
    mapState: mapSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
