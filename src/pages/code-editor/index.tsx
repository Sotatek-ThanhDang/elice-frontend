import { DragAndDrop } from '@/components/DragAndDrop';
import { useZipFile } from '@/hooks/useZipFile';
import { useAppDispatch } from '@/store';
import { saveFiles } from '@/store/files/files.slice';
import { FileData } from '@/types/file';

import ActionHeaderContainer from './container/ActionHeaderContainer';
import FileViewContainer from './container/FileViewContainer';
import TabContainer from './container/TabContainer';
import TreeContainer from './container/TreeContainer';
import { FileExplorer, FileView, PageLayout } from './index.styles';

export default function CodeEditor() {
  const { extractZipToFile } = useZipFile();
  const dispatch = useAppDispatch();

  const handlerDropFile = (zipFile: File) => {
    extractZipToFile(zipFile)
      .then((data: FileData[]) => {
        dispatch(saveFiles({ files: data, rootFoldername: zipFile.name }));
      })
      .catch(() => {
        alert('Invalid extract zip to file');
      });
  };

  return (
    <DragAndDrop width="45%" height="45%" handlerDropFile={handlerDropFile}>
      <PageLayout>
        <FileExplorer>
          <ActionHeaderContainer />
          <TreeContainer />
        </FileExplorer>
        <FileView>
          <TabContainer />
          <FileViewContainer />
        </FileView>
      </PageLayout>
    </DragAndDrop>
  );
}
