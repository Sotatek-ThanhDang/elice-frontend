import { createSlice } from '@reduxjs/toolkit';

import { InitialState, SaveFilePayload, UpdateFilePayload } from './files.type';

const initialState: InitialState = {
  files: [],
  rootFoldername: '',
};

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    saveFiles: (state, { payload }: SaveFilePayload) => {
      state.files = payload.files;
      state.rootFoldername = payload.rootFoldername;
    },
    updateFile: (state, { payload }: UpdateFilePayload) => {},
  },
});

export const { saveFiles, updateFile } = filesSlice.actions;

export default filesSlice.reducer;
