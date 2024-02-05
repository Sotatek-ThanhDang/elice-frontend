import JSZip from 'jszip';

import { FileData } from '@/types/file';

export const useZipFile = () => {
  const getFiles = async (zipData: JSZip): Promise<FileData[]> => {
    let files: FileData[] = [];

    try {
      const fileDataPromise = Object.keys(zipData.files).map((fileName) => {
        const file = zipData.files[fileName];
        return file.async('string').then((value) => ({
          dataText: value,
          name: file.name,
          isFolder: file.dir,
          rawData: JSON.stringify(file),
        }));
      });

      files = await Promise.all(fileDataPromise);
    } catch (error) {
      console.warn('Read file error');
    }

    files.sort((a, b) => a.name.localeCompare(b.name));

    return files;
  };

  const extractZipToFile = (files: File): Promise<FileData[] | null> => {
    const zip = new JSZip();
    return zip.loadAsync(files).then(
      (zipData) => getFiles(zipData),
      () => {
        alert('Not a valid zip file');
        return null;
      }
    );
  };

  const convertFilesToZip = () => {};

  return {
    extractZipToFile,
    convertFilesToZip,
  };
};
