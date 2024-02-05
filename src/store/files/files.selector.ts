import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { FileTreeNode } from '@/types/file';

const selectFilesState = (state: RootState) => state.files;

const selectRootFileName = createSelector(selectFilesState, (state) => state.rootFoldername);

const mock = [
  {
    name: 'string',
    path: '',
    isFolder: true,
    children: [
      {
        name: 'string child 1',
        path: 'string/string child 1',
        isFolder: true,
        children: [
          {
            name: 'java.txt',
            path: 'string/string child 1/java.txt',
            isFolder: false,
          },
        ],
      },
      {
        name: 'string child 2.txt',
        path: 'string/string child 2',
        isFolder: false,
      },
    ],
  },
  {
    name: 'string 2.txt',
    path: '',
    isFolder: false,
  },
];

const selectFilesTree = createSelector(selectFilesState, (state) => {
  const files: FileTreeNode[] = mock;
  state.files;

  return files;
});

export { selectFilesTree, selectRootFileName };
