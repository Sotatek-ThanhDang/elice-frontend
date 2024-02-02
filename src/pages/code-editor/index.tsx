import { ChangeEvent } from 'react';

import { Editor } from '@/components/Editor';
import { useZipFile } from '@/hooks/useZipFile';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFilesTree, selectRootFileName } from '@/store/files/files.selector';
import { saveFiles } from '@/store/files/files.slice';
import { FileData } from '@/types/file';

import {
  ActionHeader,
  EditerContainer,
  FileExplorer,
  FileView,
  PageLayout,
  TabContainer,
  TreeContainer,
} from './index.styles';

export default function CodeEditor() {
  const { extractZipToFile } = useZipFile();
  const dispatch = useAppDispatch();
  const rootFilename = useAppSelector(selectRootFileName);
  const filesTree = useAppSelector(selectFilesTree);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const zipFile = event.target.files?.[0];
    if (!zipFile) return;

    extractZipToFile(zipFile).then((data: FileData[] | null) => {
      if (data) {
        console.warn(data);
        dispatch(saveFiles({ files: data, rootFoldername: zipFile.name }));
      }
    });
  };

  return (
    <PageLayout>
      <FileExplorer>
        <ActionHeader>
          <input type="file" onChange={(e) => onChangeFile(e)}></input>
        </ActionHeader>
        <TreeContainer>
          {!filesTree.length ? (
            <>File tree</>
          ) : (
            <>
              <h3>{rootFilename}</h3>
              {filesTree.map((item) => (
                <p>{item.name}</p>
              ))}
            </>
          )}
        </TreeContainer>
      </FileExplorer>
      <FileView>
        <TabContainer>tabs</TabContainer>
        <EditerContainer>
          <Editor />
        </EditerContainer>
      </FileView>
    </PageLayout>
  );
}
