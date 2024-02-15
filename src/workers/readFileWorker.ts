import JSZip from 'jszip';

import { FileData } from '@/types/file';
import { isTextFile } from '@/utils/file';

const getFiles = async (zipData: JSZip): Promise<[FileData[], unknown]> => {
  let files: FileData[] = [];
  let error;

  try {
    const fileDataPromise = Object.keys(zipData.files).map(async (fileName) => {
      const file = zipData.files[fileName];
      const isFolder = file.dir;

      let arrayBuffer = new ArrayBuffer(0);
      let dataText = '';
      let isBinaryFile = false;

      if (!isFolder) {
        arrayBuffer = await file.async('arraybuffer');
        isBinaryFile = !isTextFile(arrayBuffer);
        dataText = isBinaryFile ? '' : await file.async('string');
      }

      return {
        dataText,
        arrayBuffer,
        name: file.name,
        isFolder,
        isBinary: isBinaryFile,
      };
    });

    files = await Promise.all(fileDataPromise);
  } catch (err) {
    error = err;
  }

  files.sort((a, b) => a.name.localeCompare(b.name));

  return [files, error];
};

self.onmessage = async (event) => {
  const { files } = event.data;
  const zip = new JSZip();
  const rawZipData = await zip.loadAsync(files);
  const extractedFiles = await getFiles(rawZipData);

  self.postMessage(extractedFiles);
};
