import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'currentPlayer',
  initialState: null,
  reducers: {
    setPlayer: (state, { payload }) => ({ ...(state ?? {}), ...payload }),
  },
});

export default playerSlice;
