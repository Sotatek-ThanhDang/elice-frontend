import { PayloadAction } from '@reduxjs/toolkit';

import { FileData } from '@/types/file';

type InitialState = {
  files: FileData[];
  rootFoldername: string;
};

type UpdateFilePayload = PayloadAction<{ fileName: string; data: string }>;

type SaveFilePayload = PayloadAction<InitialState>;

export type { InitialState, SaveFilePayload, UpdateFilePayload };
