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
      <p>{props.fileName}</p>
    </StyledFile>
  );
};

const StyledFile = styled.div`
  display: flex;
  padding-left: calc(var(--svg-width) + var(--icon-gap));
  gap: var(--icon-gap);

  &:hover {
    background-color: lightblue;
  }
`;

export default TreeFile;
