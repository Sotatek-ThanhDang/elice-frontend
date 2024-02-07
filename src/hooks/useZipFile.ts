import JSZip from 'jszip';

import { FileData } from '@/types/file';
import { isTextFile } from '@/utils/file';

export const useZipFile = () => {
  const getFiles = async (zipData: JSZip): Promise<FileData[]> => {
    let files: FileData[] = [];

    try {
      const fileDataPromise = Object.keys(zipData.files).map(async (fileName) => {
        const file = zipData.files[fileName];

        const dataText = await file.async('string');
        const arrayBuffer = await file.async('arraybuffer');

        return {
          dataText,
          arrayBuffer,
          name: file.name,
          isFolder: file.dir,
          rawData: JSON.stringify(file),
        };
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

  const convertFilesToZip = async (files: FileData[]) => {
    const zip = new JSZip();

    files.forEach((item) => {
      zip.file(item.name, isTextFile(item.arrayBuffer) ? item.dataText : item.arrayBuffer);
    });

    const data = await zip.generateAsync({ type: 'blob' });

    return data;
  };

  return {
    extractZipToFile,
    convertFilesToZip,
  };
};
