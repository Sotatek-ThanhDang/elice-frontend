import { styled } from 'styled-components';

import { StyledTab } from '@/components/FileTab/index.styles';

const PageLayout = styled.div`
  --header-height: 4rem;

  width: 100vw;
  height: 100vh;

  display: flex;

  font-size: 1.6rem;
`;

const FileExplorer = styled.aside`
  --padding-inline: 0.5rem;
  width: 20%;
  height: 100%;

  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.border};
`;

const ActionHeader = styled.div`
  width: 100%;
  height: var(--header-height);
  padding-inline: var(--padding-inline);

  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const TreeContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-inline: var(--padding-inline);
`;

const FileView = styled.main`
  width: 80%;

  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  width: 100%;
  height: var(--header-height);
  overflow-x: auto;

  display: flex;
  align-items: center;
  flex-direction: row;

  border-bottom: 1px solid ${({ theme }) => theme.border};

  ${StyledTab} {
    flex-shrink: 0;
    border-bottom-width: 0;
  }

  &::-webkit-scrollbar {
    height: 5px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
    }
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 10px;
  }
`;

const StyledFileViewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  flex: 1;
`;

export {
  ActionHeader,
  FileExplorer,
  FileView,
  PageLayout,
  StyledFileViewContainer,
  TabContainer,
  TreeContainer,
};
