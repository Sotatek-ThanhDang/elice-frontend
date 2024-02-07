import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { getFileNameFromPath } from '@/utils/file';

const selectFileEditorState = (state: RootState) => state.fileEditor;

const selectCurrentFilePath = createSelector(selectFileEditorState, (state) => state.currentFile);

const selectFiles = createSelector(selectFileEditorState, (state) => state.files);

const selectFileTabs = createSelector(selectFiles, (state) => {
  return Object.values(state).map((item) => {
    return {
      name: getFileNameFromPath(item.path),
      path: item.path,
      isEditing: item.data !== item.draftData,
    };
  });
});

const selectActiveRawFile = createSelector([selectFiles, selectCurrentFilePath], (files, id) => {
  const activeFile = files[id];

  if (!activeFile) return null;

  return activeFile;
});

const selectActiveFile = createSelector([selectFiles, selectCurrentFilePath], (files, id) => {
  const activeFile = files[id];

  if (!activeFile) return null;

  return {
    value: activeFile.data,
    lang: activeFile.lang,
    path: activeFile.path,
    arrayBuffer: activeFile.arrayBuffer,
  };
});

export { selectActiveFile, selectActiveRawFile, selectCurrentFilePath, selectFileTabs };
