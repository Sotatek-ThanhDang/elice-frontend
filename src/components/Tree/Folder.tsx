import { PropsWithChildren, useState } from 'react';
import { FaChevronDown, FaChevronRight, FaFolder, FaFolderOpen } from 'react-icons/fa';
import { styled } from 'styled-components';

type Props = {
  text: string;
};

const TreeFolder = ({ text, children }: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledFolder onClick={() => setOpen((pre) => !pre)}>
        {open ? (
          <>
            <FaChevronDown fill='#333' />
            <FaFolderOpen fill='#6C22A6'/>
          </>
        ) : (
          <>
            <FaChevronRight fill='#333' />
            <FaFolder fill='#64CCC5' />
          </>
        )}

        <p>{text}</p>
      </StyledFolder>

      {open && (
        <div style={{ paddingLeft: '1rem', borderLeft: '1px solid rgba(0,0,0,0.2)' }}>
          {children}
        </div>
      )}
    </>
  );
};

const StyledFolder = styled.div`
  display: flex;
  gap: var(--icon-gap);

  &:hover {
    background-color: lightblue;
  }
`;

export default TreeFolder;
