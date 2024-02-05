import { FileData, FileTreeNode } from '@/types/file';

const getFileNameWithoutExtension = (fileName: string) => {
  return fileName.replace(/\.[^/.]+$/, '');
};

const createTreeTructure = (files: FileData[]) => {
  const fileTree: FileTreeNode[] = [];
  const filePaths = new Map<string, FileTreeNode>();

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
  };

  if (isRootFolder) {
    folders = rootFile;
  } else if (filePaths.get(parentPaths)) {
    folders = filePaths.get(parentPaths)!.children!;
  }

  filePaths.set(file.name, currentFile);
  folders.push(currentFile);
};

const getSortedTreeNode = (treeNode: FileTreeNode[]): FileTreeNode[Ç] => {
  const files: FileTreeNode[] = [];
  const folders: FileTreeNode[] = [];

  const sortCallback = (firstItem: FileTreeNode, secondItem: FileTreeNode) =>
    firstItem.name.localeCompare(secondItem.name);

    treeNode.forEach((item) => {
    if (item.isFolder) {
      folders.push(item);
    } else {
      files.push(item);
    }
  });

  files.sort(sortCallback);
  folders.sort(sortCallback);

  return [...folders, ...files];
};

export { createTreeTructure, getFileNameWithoutExtension, getSortedTreeNode };
