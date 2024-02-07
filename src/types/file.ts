type FileData = {
  name: string;
  isFolder: boolean;
  rawData: string;
  dataText: string;
  arrayBuffer: ArrayBuffer;
};

type FileTreeNode = {
  name: string;
  path: string;
  isFolder: boolean;
  value: string;
  children?: FileTreeNode[];
};

export type { FileData, FileTreeNode };
