import styled from 'styled-components';

import TreeFile, { StyledFile } from '@/components/Tree/File';
import TreeFolder, { StyledFolder } from '@/components/Tree/Folder';
import { FileTreeNode } from '@/types/file';
import { getSortedTreeNode } from '@/utils/fileTree';

type FileClickEvent = (rawData: FileTreeNode, name: string, key: string) => void;

type Props = {
  data: FileTreeNode[];
  onFileClick: FileClickEvent;
};

const renderTree = ({
  data,
  onFileClick,
}: {
  data: FileTreeNode[];
  onFileClick: FileClickEvent;
}) => {
  return data.map((item: FileTreeNode) => {
    if (!item.isFolder) {
      return (
        <TreeFile
          key={item.path}
          fileName={item.name}
          onClick={() => {
            onFileClick(item, item.name, item.path);
          }}
        />
      );
    }

    return (
      <TreeFolder key={item.path} text={item.name}>
        {item.children?.length
          ? renderTree({
              data: getSortedTreeNode(item.children),
              onFileClick,
            })
          : null}
      </TreeFolder>
    );
  });
};

const Tree = (props: Props) => {
  return (
    <TreeContainer>
      {renderTree({ data: props.data, onFileClick: props.onFileClick })}
    </TreeContainer>
  );
};

const TreeContainer = styled.div`
  --icon-gap: 1rem;
  --svg-width: 1.6rem;

  svg {
    width: var(--svg-width);
    height: var(--svg-width);
    flex-shrink: 0;
  }

  ${StyledFile}:hover,${StyledFolder}:hover {
    background-color: ${({ theme }) => theme.backgroundFolderHover};
  }

  ${StyledFile},${StyledFolder} {
    cursor: pointer;
  }
`;

export default Tree;
