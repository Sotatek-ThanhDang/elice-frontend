import { PayloadAction } from '@reduxjs/toolkit';

type FileDetail = {
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

type ViewFileFromTree = {
  type: 'tree';
  path: string;
  data: string;
};

type ViewFileFromTab = Pick<ViewFileFromTree, 'path'> & {
  type: 'tab';
};

type CloseFileAction = PayloadAction<string>;
type SaveDraftAction = PayloadAction<string>;
type SaveFileAction = PayloadAction<string>;

type ViewFilePayload = PayloadAction<ViewFileFromTab | ViewFileFromTree>;

export type { CloseFileAction, InitialState, SaveDraftAction, SaveFileAction, ViewFilePayload };
