import { ChangeEvent } from 'react';
import { CgDarkMode } from 'react-icons/cg';
import { LuUpload } from 'react-icons/lu';
import { MdOutlineSimCardDownload } from 'react-icons/md';
import { RiFolderDownloadLine } from 'react-icons/ri';
import { styled } from 'styled-components';

import { useMutationFile } from '@/hooks/useMutationFile';
import { useZipFile } from '@/hooks/useZipFile';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectActiveRawFile } from '@/store/fileEditor/fileEditor.selector';
import { selectRawFilesState, selectRootFileName } from '@/store/files/files.selector';
import { saveFiles } from '@/store/files/files.slice';
import { FileData } from '@/types/file';
import { getFileNameFromPath, isTextFile } from '@/utils/file';

import { ActionHeader } from '../index.styles';

export default function ActionHeaderContainer() {
  const { extractZipToFile, convertFilesToZip } = useZipFile();
  const { downloadBlobFile } = useMutationFile();
  const files = useAppSelector(selectRawFilesState);
  const rootFileName = useAppSelector(selectRootFileName);
  const currentFile = useAppSelector(selectActiveRawFile);

  const dispatch = useAppDispatch();

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const zipFile = event.target.files?.[0];
    if (!zipFile) return;

    extractZipToFile(zipFile).then((data: FileData[] | null) => {
      if (data) {
        dispatch(saveFiles({ files: data, rootFoldername: zipFile.name }));
      }
    });
  };

  const handlerDownloadFolder = async () => {
    const blob = await convertFilesToZip(files);
    downloadBlobFile(new Blob([blob]), rootFileName);
  };

  const handlerDownloadFile = () => {
    downloadBlobFile(
      new Blob([
        isTextFile(currentFile!.arrayBuffer) ? currentFile!.data : currentFile!.arrayBuffer,
      ]),
      getFileNameFromPath(currentFile!.path) ?? ''
    );
  };

  return (
    <ActionHeader>
      <div>
        <label htmlFor="uploadFile" title="Upload zip file">
          <LuUpload size={'2rem'} />
        </label>
        <input
          id="uploadFile"
          type="file"
          onChange={(e) => onChangeFile(e)}
          style={{ display: 'none' }}
          accept='.zip'
        />
      </div>
      <div>
        <StyledButton
          title="Download zip file"
          disabled={!files.length}
          onClick={handlerDownloadFolder}
        >
          <RiFolderDownloadLine size={'2rem'} />
        </StyledButton>
      </div>
      <div>
        <StyledButton
          title="Download current file"
          disabled={!currentFile}
          onClick={handlerDownloadFile}
        >
          <MdOutlineSimCardDownload size={'2rem'} />
        </StyledButton>
      </div>

      <div>
        <span title="Select theme">
          <CgDarkMode size={'2rem'} />
        </span>
      </div>
    </ActionHeader>
  );
}

const StyledButton = styled.button<{ disabled: boolean }>`
  all: unset;
  ${({ disabled }) => `color: ${disabled ? 'gray' : 'unset'}`}
`;
