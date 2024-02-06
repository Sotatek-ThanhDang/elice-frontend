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
    updateFileTree: (state, { payload }: UpdateFilePayload) => {
      const index = state.files.findIndex((item) => item.name === payload.fileName);
      console.warn(payload);

      if (index !== -1) {
        state.files[index].dataText = payload.data;
      }
    },
  },
});

export const { saveFiles, updateFileTree } = filesSlice.actions;

export default filesSlice.reducer;
