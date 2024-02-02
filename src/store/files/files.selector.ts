import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store';

const selectFilesState = (state: RootState) => state.files;

const selectRootFileName = createSelector(selectFilesState, (state) => state.rootFoldername);

const selectFilesTree = createSelector(selectFilesState, (state) => state.files);

export { selectFilesTree,selectRootFileName };
