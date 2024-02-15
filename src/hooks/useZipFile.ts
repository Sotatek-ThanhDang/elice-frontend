import JSZip from 'jszip';

import { FileData } from '@/types/file';

export const useZipFile = () => {
  const extractZipToFile = (files: File): Promise<FileData[]> => {
    return new Promise((resolve, reject) => {
      const readFileWorker = new Worker(new URL('../workers/readFileWorker.ts', import.meta.url), {
        type: 'module',
      });

      readFileWorker.postMessage({ files });

      readFileWorker.onmessage = (event: MessageEvent<[FileData[], unknown]>) => {
        const [extractedFiles, error] = event.data;
        
        if (error) {
          reject(error);
        }
        resolve(extractedFiles);

        readFileWorker.terminate();
      };
    });
  };

  const convertFilesToZip = async (files: FileData[]) => {
    const zip = new JSZip();

    files.forEach((item) => {
      zip.file(item.name, item.isBinary ? item.arrayBuffer : item.dataText);
    });

    const data = await zip.generateAsync({ type: 'blob' });

    return data;
  };

  return {
    extractZipToFile,
    convertFilesToZip,
  };
};
