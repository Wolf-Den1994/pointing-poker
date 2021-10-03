export const getExtension = (fileName: string): string => {
  const ext = fileName.split('.');
  const extension = ext[ext.length - 1];
  return extension;
};
