# Elice frontend
A repository for implementing a code editor using Monaco Editor.

## Project architecture

- assets: Assets that the bundler will compile.
- components: Components serve as the building blocks of the UI and are utilized to eliminate duplicate code, ensuring users have a consistent experience. They should exclusively implement UI features.
- hooks: Reusable hooks utilized by the components.
- lib: Configuration files within this directory affect the application's behavior.
- pages: This directory contains React.js pages, with each page representing a unique URL path within the application.
- store: The store manages client-side data and should accurately reflect the current state of the application.
- theme: This folder houses the application's theme and code-editor settings.
- types: The directory contains all types relevant to the application.
- utils: Reserved for utility functions.
- workers: Configuration directory for web workers.

## Feature
- Upload zip file include drag & drop functionality.
- Download edited files, download zip files.
- Support viewing binary files (images, videos).
- Monaco editor feature:
  - Undo/redo.
  - Support multi-model editor.
  - Support syntax highlight based on file extenstion.
  - Theme support (Currently, only the dark/light theme has been implemented).
  - Auto-completion support.

## Optimization
- Optimize for reading large zip files using Web Workers.
- Debounce/Throttle to reduce the number of times the state is saved when the user types.
- Controlled & Uncontrolled Components: The logic does not affect the UI.
- Reselect (Redux Toolkit) & code splitting: Reduce the number of renders and the rendering of unrelated components.
- Using dynamic imports to reduce bundle size.

## Todo
- Add some settings to improve UX/UI:
  - Add loading indicators when uploading or downloading files.
  - Display a warning when the user attempts to close a file without saving after making edits.
  - Allow closing the current tab with Ctrl + W.
- Add retry functionality for reading file data in case of errors (using Promise.allSettled instead of Promise.all).
- Add/remove file and folder features.
- Move zip file download logic to a web worker if there are any performance issues.
- Write unit tests and end-to-end tests.
- Refactor the source code and structure for a cleaner version.

## Code description
I explain the source code by adding comments directly into the code and by explicitly naming functions, their parameters, and file names.

- Parse zip file (src/workers/readFileWorker.ts)
```typescript
// We send the uploaded zip file to the web worker to reduce CPU usage for parsing both the zip file and its data
import JSZip from 'jszip';

import { FileData } from '@/types/file';
import { isTextFile } from '@/utils/file';

const getFiles = async (zipData: JSZip): Promise<[FileData[], unknown]> => {
  let files: FileData[] = [];
  let error;

  try {
    // Convert the files to promises and use Promise.all to asynchronously read all file data
    const fileDataPromise = Object.keys(zipData.files).map(async (fileName) => {
      const file = zipData.files[fileName];
      const isFolder = file.dir;

      let arrayBuffer = new ArrayBuffer(0);
      let dataText = '';
      let isBinaryFile = false;

      // If the current file is a folder, its data is not included.
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

  // After retrieving the files and their data, we sort all file data by name in ascending order to ensure the correct sequence.
  files.sort((a, b) => a.name.localeCompare(b.name));

  return [files, error];
};

self.onmessage = async (event) => {
  const { files } = event.data;
  const zip = new JSZip();
  try {
    // Parsing the zip file into a zip file object using JSZip.
    const rawZipData = await zip.loadAsync(files);
    // Retrieve or convert file data from the zip file object.
    const extractedFiles = await getFiles(rawZipData);

    //Then, we return the sorted file data to the application.
    self.postMessage(extractedFiles);
  } catch (error) {
    self.postMessage([[], error]);
  }
};
```


- Convert raw data from store to tree data (FileData[] -> FileTreeNode[])
```typescript
const createTreeTructure = (files: FileData[]) => {
  const fileTree: FileTreeNode[] = [];  // variable after converting from FileData[] -> FileTreeNode[]. Used in the renderTree function below
  const filePaths = new Map<string, FileTreeNode>(); // Temporary variable to store tree nodes by key is file path
  // Using Object References, updating `filePaths` also automatically updates `fileTree`.


  /* Create files and folders. As mentioned above, files are already organized so we will always create folders before creating files.
    Eg:
   /RootFolder/
   /RootFolder/folder 1/
   /RootFolder/folder 1/ChildFile.tsx
   /RootFolder/folder 2/
   /RootFolder/index.tsx
  */
  files.forEach((item) => {
    createFileAndFolder(fileTree, filePaths, item);
  });

  return fileTree;
};

const createFileAndFolder = (
  rootFile: FileTreeNode[],
  filePaths: Map<string, FileTreeNode>,
  file: FileData
) => {
  let folders = [];

  const filePathWithoutEndSplash = file.isFolder ? file.name.slice(0, -1) : file.name;
  const lastSplashIndex = filePathWithoutEndSplash.lastIndexOf('/');
  const parentPaths = file.name.substring(0, lastSplashIndex + 1);
  const fileName = filePathWithoutEndSplash.substring(lastSplashIndex + 1);
  const isRootFolder = lastSplashIndex === -1;

  const currentFile: FileTreeNode = {
    name: fileName,
    path: file.name,
    isFolder: file.isFolder,
    children: [],
    value: file.dataText,
  };

  if (isRootFolder) {
    // If the current file is the root folder, the folders containing it will be the `fileTree` variable and equal to []
    folders = rootFile;
  } else if (filePaths.get(parentPaths)) {
    // If the current file has a parent in filePaths, the folders containing it will be filePaths.get(parentPaths)!.children
    folders = filePaths.get(parentPaths)!.children!;
  }

  // Create a link between paths and filedata. The key is the file path and the value will be the current file
  filePaths.set(file.name, currentFile);
  // Add the current file to the directory containing it
  folders.push(currentFile);
};
```


- Create subsequent tree:
```typescript
  const renderTree = ({
  data,
  onFileClick,
}: {
  data: FileTreeNode[];
  onFileClick: FileClickEvent;
}) => {
  // The data has been arranged in order, so we will render that data directly. 
  return data.map((item: FileTreeNode) => {
    // If `item` is a file, we will return the `TreeFile` component.
    if (!item.isFolder) {
      return (
        <TreeFile
          key={item.path}
          fileName={item.name}
          onClick={() => {
            onFileClick(item, item.name, item.path);
          }}
        />
      );
    }

    // If it is a folder, we will return the `TreeFolder` component and recursively use the `renderTree` function to render its children.
    return (
      <TreeFolder key={item.path} text={item.name}>
        {item.children?.length
          ? renderTree({
              // Sort the data again according to the folder structure first, then the file next, then according to the letters a-z
              data: getSortedTreeNode(item.children),
              onFileClick,
            })
          : null}
      </TreeFolder>
    );
  });
};
```


- Determine whether a file is binary or editable.
```typescript
const isTextFile = (buffer: ArrayBuffer): boolean => {
  const view = new Uint8Array(buffer);
  const length = Math.min(view.length, 1024); // Read up to the first 1024 bytes

  // Check each byte to see if it is within the ASCII range
  for (let i = 0; i < length; i++) {
    const byte = view[i];
    if ((byte < 32 || byte > 126) && byte !== 10 && byte !== 13) {
      // If the byte is not in the ASCII range and is not a carriage return or newline return character, then the file is not text.
      return false;
    }
  }

  return true;
};
```
