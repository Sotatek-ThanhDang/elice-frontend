import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './common.type';

const initialState: InitialState = {
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { setTheme } = commonSlice.actions;

export default commonSlice.reducer;
