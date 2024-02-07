import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { createTreeTructure } from '@/utils/fileTree';

const selectFilesState = (state: RootState) => state.files;
const selectRawFilesState = createSelector(selectFilesState, (state) => state.files);

const selectRootFileName = createSelector(selectFilesState, (state) => state.rootFoldername);

const selectFilesTree = createSelector(selectFilesState, (state) => {
  const filesTree = createTreeTructure(state.files);

  return filesTree;
});

export { selectFilesTree, selectRawFilesState, selectRootFileName };
