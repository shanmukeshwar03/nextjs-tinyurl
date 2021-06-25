import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'utils',
  initialState: {
    errors: [],
  },
  reducers: {
    pushError: (state, action) => {
      state.errors.push(action.payload);
    },
    popError: (state, action) => {
      state.errors.pop();
    },
  },
});

export const { pushError, popError } = slice.actions;
export default slice.reducer;
