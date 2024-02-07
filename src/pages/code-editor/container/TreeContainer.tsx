import Tree from '@/components/Tree';
import { useMutationFile } from '@/hooks/useMutationFile';
import { RootState, store, useAppSelector } from '@/store';
import { selectFilesTree, selectRootFileName } from '@/store/files/files.selector';
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

  const handlerClickFile = (rawData: FileTreeNode) => {
    const rootState: RootState = store.getState();
    const currentFile = rootState.files.files.find((item) => item.name === rawData.path);

    viewFileFromTree(rawData.path, rawData.value, currentFile?.arrayBuffer || new ArrayBuffer(0));
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
