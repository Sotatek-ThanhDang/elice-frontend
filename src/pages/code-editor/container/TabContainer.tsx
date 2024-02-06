import FileTab from '@/components/FileTab';
import { useMutationFile } from '@/hooks/useMutationFile';
import { useAppSelector } from '@/store';
import { selectCurrentFilePath, selectFileTabs } from '@/store/fileEditor/fileEditor.selector';

import { TabContainer as StyledContainer } from '../index.styles';

export default function TabContainer() {
  const tabs = useAppSelector(selectFileTabs);
  const selectedFilePath = useAppSelector(selectCurrentFilePath);
  const { viewFileFromTab, closeFileFromTab } = useMutationFile();

  return (
    <StyledContainer>
      {tabs.map((item) => {
        return (
          <FileTab
            isChange={item.isEditing}
            key={`tabs_${item.path}`}
            path={item.path}
            name={item.name ?? ''}
            isActive={item.path === selectedFilePath}
            onClick={viewFileFromTab}
            onClose={closeFileFromTab}
          />
        );
      })}
    </StyledContainer>
  );
}
