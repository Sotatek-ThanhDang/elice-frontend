import { Editor } from '@/components/Editor';
import { useMutationFile } from '@/hooks/useMutationFile';
import { useAppSelector } from '@/store';
import { selectActiveFile } from '@/store/fileEditor/fileEditor.selector';

import { EditerContainer as StyledEditerContainer } from '../index.styles';

export default function EditerContainer() {
  const file = useAppSelector(selectActiveFile);
  const { saveDraftFile, saveCurrentFile } = useMutationFile();

  const handlerSaveFile = (filePath: string) => {
    return (currVal: string) => {
      console.warn(filePath);
      saveCurrentFile(filePath, currVal);
    };
  };

  return (
    <StyledEditerContainer isHidden={!file}>
      <Editor
        value={file?.value ?? ''}
        language={file?.lang ?? ''}
        onChange={(text: string) => {
          saveDraftFile(text);
        }}
        onSave={handlerSaveFile(file?.path ?? '')}
        debounceMs={100}
      />
    </StyledEditerContainer>
  );
}
