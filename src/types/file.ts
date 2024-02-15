type FileData = {
  name: string;
  isFolder: boolean;
  dataText: string;
  arrayBuffer: ArrayBuffer;
  isBinary: boolean;
};

type FileTreeNode = {
  name: string;
  path: string;
  isFolder: boolean;
  value: string;
  children?: FileTreeNode[];
};

export type { FileData, FileTreeNode };
