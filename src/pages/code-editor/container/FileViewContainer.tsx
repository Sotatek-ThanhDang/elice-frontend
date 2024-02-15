import { lazy, Suspense, useCallback } from 'react';

import { useMutationFile } from '@/hooks/useMutationFile';
import { useAppSelector } from '@/store';
import { selectAppTheme } from '@/store/common/common.selector';
import { selectActiveFile } from '@/store/fileEditor/fileEditor.selector';
import { isImage, isVideo } from '@/utils/file';

import { StyledFileViewContainer } from '../index.styles';

const Editor = lazy(() => import('@/components/Editor'));

export default function FileViewContainer() {
  const file = useAppSelector(selectActiveFile);
  const { saveDraftFile, saveCurrentFile } = useMutationFile();
  const theme = useAppSelector(selectAppTheme);

  const handlerSaveFile = useCallback(
    (currVal: string) => {
      saveCurrentFile(file?.path ?? '', currVal);
    },
    [file?.path]
  );

  if (!file) return null;

  if (isVideo(file.path)) {
    return (
      <StyledFileViewContainer>
        <video src={URL.createObjectURL(new Blob([file.arrayBuffer]))} controls>
          Your browser does not support the video tag.
        </video>
      </StyledFileViewContainer>
    );
  }

  if (isImage(file.path)) {
    return (
      <StyledFileViewContainer>
        <img src={URL.createObjectURL(new Blob([file.arrayBuffer]))} />
      </StyledFileViewContainer>
    );
  }

  return (
    <StyledFileViewContainer>
      <Suspense fallback={<>Loading...</>}>
        <Editor
          value={file?.draftValue ?? ''}
          language={file?.lang ?? ''}
          onChange={(text: string) => {
            saveDraftFile(text);
          }}
          onSave={handlerSaveFile}
          debounceMs={100}
          theme={theme}
        />
      </Suspense>
    </StyledFileViewContainer>
  );
}
