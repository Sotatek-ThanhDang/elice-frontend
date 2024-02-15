import Tree from '@/components/Tree';
import { useMutationFile } from '@/hooks/useMutationFile';
import { useAppSelector } from '@/store';
import {
  selectFilesTree,
  selectRawFilesState,
  selectRootFileName,
} from '@/store/files/files.selector';
import { FileTreeNode } from '@/types/file';
import { getFileNameWithoutExtension } from '@/utils/file';

import { TreeContainer as StyledTreeContainer } from '../index.styles';

const TreeHeader = () => {
  const rootFilename = useAppSelector(selectRootFileName);

  return (
    <h3 style={{ padding: '1rem 0 0.5rem 0' }}>
      {getFileNameWithoutExtension(rootFilename.toUpperCase())}
    </h3>
  );
};

const TreeBody = () => {
  const { viewFileFromTree } = useMutationFile();
  const filesTree = useAppSelector(selectFilesTree);
  const rawFiles = useAppSelector(selectRawFilesState);

  const handlerClickFile = (rawData: FileTreeNode) => {
    const currentFile = rawFiles.find((item) => item.name === rawData.path);

    viewFileFromTree(
      rawData.path,
      rawData.value,
      currentFile?.arrayBuffer || new ArrayBuffer(0),
      currentFile?.isBinary ?? false
    );
  };

  return <Tree data={filesTree} onFileClick={handlerClickFile} />;
};

export default function TreeContainer() {
  return (
    <StyledTreeContainer>
      <TreeHeader />
      <TreeBody />
    </StyledTreeContainer>
  );
}
