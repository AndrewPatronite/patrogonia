import { createSlice } from '@reduxjs/toolkit'
import { Battle } from '../battle/types'

const INITIAL_STATE: { battle?: Battle } = { battle: undefined }
const battleSlice = createSlice({
  name: 'battle',
  initialState: INITIAL_STATE,
  reducers: {
    dismissBattle: () => INITIAL_STATE,
    loadBattle: (state, { payload }) => ({ battle: payload }),
    updateBattle: (state, { payload }) => ({ battle: payload }),
  },
})

export default battleSlice
