import { ChangeEvent } from 'react';
import { CgDarkMode } from 'react-icons/cg';
import { LuUpload } from 'react-icons/lu';
import { MdOutlineSimCardDownload } from 'react-icons/md';
import { RiFolderDownloadLine } from 'react-icons/ri';

import { useZipFile } from '@/hooks/useZipFile';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectCurrentFilePath } from '@/store/fileEditor/fileEditor.selector';
import { selectRootFileName } from '@/store/files/files.selector';
import { saveFiles } from '@/store/files/files.slice';
import { FileData } from '@/types/file';
import { getFileNameWithoutExtension } from '@/utils/file';

import { ActionHeader } from '../index.styles';

export default function ActionHeaderContainer() {
  const { extractZipToFile } = useZipFile();
  const rootFile = useAppSelector(selectRootFileName);
  const currentFile = useAppSelector(selectCurrentFilePath);
  const dispatch = useAppDispatch();

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const zipFile = event.target.files?.[0];
    if (!zipFile) return;

    extractZipToFile(zipFile).then((data: FileData[] | null) => {
      if (data) {
        dispatch(
          saveFiles({ files: data, rootFoldername: getFileNameWithoutExtension(zipFile.name) })
        );
      }
    });
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
        />
      </div>
      <div>
        <span title="Download zip file">
          <RiFolderDownloadLine size={'2rem'} fill={!rootFile ? 'gray' : 'unset'} />
        </span>
      </div>
      <div>
        <span title="Download current file">
          <MdOutlineSimCardDownload size={'2rem'} fill={!currentFile ? 'gray' : 'unset'} />
        </span>
      </div>

      <div>
        <span title="Select theme">
          <CgDarkMode size={'2rem'} />
        </span>
      </div>
    </ActionHeader>
  );
}
