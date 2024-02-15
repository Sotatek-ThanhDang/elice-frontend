import { PayloadAction } from '@reduxjs/toolkit';

import { FileData } from '@/types/file';

type FileDetail = Pick<FileData, 'arrayBuffer' | 'isBinary'> & {
  path: string;
  data: string;
  draftData: string;
  lang: string;
};

type InitialState = {
  files: {
    [key: string]: FileDetail;
  };
  currentFile: string;
};

type ViewFileFromTree = Pick<FileData, 'arrayBuffer' | 'isBinary' | 'dataText'> & {
  type: 'tree';
  path: string;
};

type ViewFileFromTab = Pick<ViewFileFromTree, 'path'> & {
  type: 'tab';
};

type CloseFileAction = PayloadAction<string>;
type SaveDraftAction = PayloadAction<string>;
type SaveFileAction = PayloadAction<string>;

type ViewFilePayload = PayloadAction<ViewFileFromTab | ViewFileFromTree>;

export type { CloseFileAction, InitialState, SaveDraftAction, SaveFileAction, ViewFilePayload };
