import styled from 'styled-components';

import { getFileIconFromName } from '@/utils/file';

type Props = {
  fileName: string;
  onClick: () => void;
};

const TreeFile = (props: Props) => {
  return (
    <StyledFile onClick={props.onClick}>
      {getFileIconFromName(props.fileName)}
      <StyledFileName title={props.fileName}>{props.fileName}</StyledFileName>
    </StyledFile>
  );
};

export const StyledFile = styled.div`
  display: flex;
  padding-left: calc(var(--svg-width) + var(--icon-gap));
  gap: var(--icon-gap);
`;

const StyledFileName = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default TreeFile;
