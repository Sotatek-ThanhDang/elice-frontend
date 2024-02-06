import { useAppDispatch } from '@/store';
import {
  closeFile,
  saveCurrentFile as saveFile,
  saveDraftCurrentFile,
  viewFile,
} from '@/store/fileEditor/fileEditor.slice';
import { updateFileTree } from '@/store/files/files.slice';

export const useMutationFile = () => {
  const dispatch = useAppDispatch();

  const viewFileFromTree = (path: string, value: string) => {
    dispatch(viewFile({ type: 'tree', path, data: value }));
  };

  const viewFileFromTab = (filepath: string) => {
    dispatch(viewFile({ type: 'tab', path: filepath }));
  };

  const closeFileFromTab = (path: string) => {
    dispatch(closeFile(path));
  };

  const saveDraftFile = (data: string) => {
    dispatch(saveDraftCurrentFile(data));
  };

  const saveCurrentFile = (path: string, value: string) => {
    dispatch(saveFile(value));
    dispatch(updateFileTree({ fileName: path, data: value }));
  };

  return { viewFileFromTree, saveCurrentFile, viewFileFromTab, closeFileFromTab, saveDraftFile };
};
