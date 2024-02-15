import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './common.type';

const defaultTheme =
  (localStorage.getItem('theme') as InitialState['theme'] | null) ??
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
localStorage.setItem('theme', defaultTheme);

const initialState: InitialState = {
  theme: defaultTheme,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setTheme: (state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      state.theme = newTheme;
      localStorage.setItem('theme', newTheme);
    },
  },
});

export const { setTheme } = commonSlice.actions;

export default commonSlice.reducer;
