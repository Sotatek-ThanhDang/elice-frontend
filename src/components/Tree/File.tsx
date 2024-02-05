import { FaFile } from 'react-icons/fa';
import styled from 'styled-components';

type Props = {
  text: string;
  onClick: () => void;
};

const TreeFile = (props: Props) => {
  return (
    <StyledFile onClick={props.onClick}>
      <FaFile />
      <p>{props.text}</p>
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
