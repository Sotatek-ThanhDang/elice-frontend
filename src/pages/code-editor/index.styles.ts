import { styled } from 'styled-components';

const PageLayout = styled.div`
  --header-height: 2.5rem;

  width: 100vw;
  height: 100vh;

  display: flex;
`;

const FileExplorer = styled.aside`
  width: 20%;
  height: 100%;
  background-color: beige;

  display: flex;
  flex-direction: column;
`;

const ActionHeader = styled.div`
  width: 100%;
  height: var(--header-height);
`;

const TreeContainer = styled.div`
  flex: 1;
  background-color: orangered;
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
