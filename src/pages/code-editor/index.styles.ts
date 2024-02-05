import { styled } from 'styled-components';

const PageLayout = styled.div`
  --header-height: 2.5rem;

  width: 100vw;
  height: 100vh;

  display: flex;

  font-size: 1.6rem;
  color: #333;
`;

const FileExplorer = styled.aside`
  width: 20%;
  height: 100%;

  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

const ActionHeader = styled.div`
  width: 100%;
  height: var(--header-height);
`;

const TreeContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const FileView = styled.main`
  flex: 1;
  background-color: blue;
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  width: 100%;
  height: var(--header-height);
  background-color: green;
`;

const EditerContainer = styled.div`
  width: 100%;
  flex: 1;
  background-color: pink;
`;

export {
  ActionHeader,
  EditerContainer,
  FileExplorer,
  FileView,
  PageLayout,
  TabContainer,
  TreeContainer,
};
