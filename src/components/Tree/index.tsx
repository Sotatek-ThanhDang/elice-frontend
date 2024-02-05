import styled from 'styled-components';

import { FileTreeNode } from '@/types/file';

import TreeFile from './File';
import TreeFolder from './Folder';

type FileClickEvent = (rawData: FileTreeNode, value: string, key: string) => void;

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
          text={item.name}
          onClick={() => {
            onFileClick(item, item.name, 'item.key');
          }}
        />
      );
    }

    return (
      <TreeFolder key={item.path} text={item.name}>
        {item.children?.length ? renderTree({ data: item.children, onFileClick }) : null}
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
  }
`;

export default Tree;
