import { createSlice } from '@reduxjs/toolkit';

import { getFileLangFromName } from '@/utils/file';

import {
  CloseFileAction,
  InitialState,
  SaveDraftAction,
  SaveFileAction,
  ViewFilePayload,
} from './fileEditor.type';

const initialState: InitialState = {
  files: {},
  currentFile: '',
};

export const fileEditorSlice = createSlice({
  name: 'fileEditor',
  initialState,
  reducers: {
    viewFile: (state, { payload }: ViewFilePayload) => {
      state.currentFile = payload.path;

      if (payload.type === 'tab') {
        return;
      }

      const fileData = {
        path: payload.path,
        data: payload.dataText,
        draftData: payload.dataText,
        lang: getFileLangFromName(payload.path),
        arrayBuffer: payload.arrayBuffer,
        isBinary: payload.isBinary,
      };

      if (!state.files[payload.path]) {
        state.files[payload.path] = fileData;
      }
    },
    closeFile: (state, { payload }: CloseFileAction) => {
      if (state.files[payload]) {
        delete state.files[payload];
      }

      if (payload === state.currentFile) {
        state.currentFile = Object.keys(state.files).at(-1) ?? '';
      }
    },
    saveDraftCurrentFile: (state, { payload }: SaveDraftAction) => {
      state.files[state.currentFile].draftData = payload;
    },
    saveCurrentFile: (state, { payload }: SaveFileAction) => {
      if (state.files[state.currentFile].data !== payload) {
        state.files[state.currentFile].data = state.files[state.currentFile].draftData = payload;
      }
    },
  },
});

export const { viewFile, closeFile, saveDraftCurrentFile, saveCurrentFile } =
  fileEditorSlice.actions;

export default fileEditorSlice.reducer;
