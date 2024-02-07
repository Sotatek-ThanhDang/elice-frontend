import { Editor } from '@/components/Editor';
import { useMutationFile } from '@/hooks/useMutationFile';
import { useAppSelector } from '@/store';
import { selectActiveFile } from '@/store/fileEditor/fileEditor.selector';
import { isImage, isVideo } from '@/utils/file';

import { StyledFileViewContainer } from '../index.styles';

export default function FileViewContainer() {
  const file = useAppSelector(selectActiveFile);
  const { saveDraftFile, saveCurrentFile } = useMutationFile();

  const handlerSaveFile = (filePath: string) => {
    return (currVal: string) => {
      saveCurrentFile(filePath, currVal);
    };
  };

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
      <Editor
        value={file?.value ?? ''}
        language={file?.lang ?? ''}
        onChange={(text: string) => {
          saveDraftFile(text);
        }}
        onSave={handlerSaveFile(file?.path ?? '')}
        debounceMs={100}
      />
    </StyledFileViewContainer>
  );
}
