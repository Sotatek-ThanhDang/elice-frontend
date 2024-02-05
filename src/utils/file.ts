const getFileNameWithoutExtension = (fileName: string) => {
  return fileName.replace(/\.[^/.]+$/, '');
};

export { getFileNameWithoutExtension };
