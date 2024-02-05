import { ChangeEvent } from 'react';

import { Editor } from '@/components/Editor';
import Tree from '@/components/Tree';
import { useZipFile } from '@/hooks/useZipFile';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFilesTree, selectRootFileName } from '@/store/files/files.selector';
import { saveFiles } from '@/store/files/files.slice';
import { FileData, FileTreeNode } from '@/types/file';
import { getFileNameWithoutExtension } from '@/utils/file';

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
        dispatch(
          saveFiles({ files: data, rootFoldername: getFileNameWithoutExtension(zipFile.name) })
        );
      }
    });
  };

  const handlerClickFile = (_: any, a: any, b: any) => {
    alert('click' + a);
  };

  return (
    <PageLayout>
      <FileExplorer>
        <ActionHeader>
          <input type="file" onChange={(e) => onChangeFile(e)}></input>
        </ActionHeader>
        <TreeContainer>
          <Tree data={filesTree} onFileClick={handlerClickFile} />
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
