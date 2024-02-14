import { PropsWithChildren, useState } from 'react';
import { FaChevronDown, FaChevronRight, FaFolder, FaFolderOpen } from 'react-icons/fa';
import { styled, useTheme } from 'styled-components';

type Props = {
  text: string;
};

const TreeFolder = ({ text, children }: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <StyledFolder onClick={() => setOpen((pre) => !pre)}>
        {open ? (
          <>
            <FaChevronDown fill="currentColor" />
            <FaFolderOpen fill="#6C22A6" />
          </>
        ) : (
          <>
            <FaChevronRight fill="currentColor" />
            <FaFolder fill="#64CCC5" />
          </>
        )}

        <p>{text}</p>
      </StyledFolder>

      {open && (
        <div style={{ paddingLeft: '1rem', borderLeft: `1px solid ${theme.border}` }}>
          {children}
        </div>
      )}
    </>
  );
};

export const StyledFolder = styled.div`
  display: flex;
  gap: var(--icon-gap);
`;

export default TreeFolder;
