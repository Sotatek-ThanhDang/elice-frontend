import ActionHeaderContainer from './container/ActionHeaderContainer';
import FileViewContainer from './container/FileViewContainer';
import TabContainer from './container/TabContainer';
import TreeContainer from './container/TreeContainer';
import { FileExplorer, FileView, PageLayout } from './index.styles';

export default function CodeEditor() {
  return (
    <PageLayout>
      <FileExplorer>
        <ActionHeaderContainer />
        <TreeContainer />
      </FileExplorer>
      <FileView>
        <TabContainer />
        <FileViewContainer />
      </FileView>
    </PageLayout>
  );
}
