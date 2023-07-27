import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CellCoordinates } from 'types/cell';

type FlagsState = CellCoordinates[]

const flagsSlice = createSlice({
  name: 'flags',
  initialState: [] as FlagsState,
  reducers: {
    addFlag: (state, action: PayloadAction<CellCoordinates>) => {
      state.push(action.payload);
    },
    removeFlag: (state, action: PayloadAction<CellCoordinates>) => {
      const index = state.findIndex(
        (coord: CellCoordinates) => coord.row === action.payload.row && coord.col === action.payload.col
      );

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addFlag, removeFlag } = flagsSlice.actions;
export default flagsSlice.reducer;
