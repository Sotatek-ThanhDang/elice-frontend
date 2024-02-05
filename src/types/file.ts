type FileData = { name: string; isFolder: boolean; rawData: string; dataText: string };

type FileTreeNode = {
  name: string;
  path: string;
  isFolder: boolean;
  children?: FileTreeNode[];
};

export type { FileData, FileTreeNode };
