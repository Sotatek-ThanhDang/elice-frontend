import ActionHeaderContainer from './container/ActionHeaderContainer';
import EditerContainer from './container/EditerContainer';
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
        <EditerContainer />
      </FileView>
    </PageLayout>
  );
}
