type FileData = { name: string; rawData: string; dataText: string };

type FileTreeNode = {
  name: string;
  path: string;
  isFolder: boolean;
  children?: FileTreeNode[];
};

export type { FileData, FileTreeNode };
