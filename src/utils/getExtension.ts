export const getExtension = (fileName: string): string => {
  const ext = fileName.split('.');
  return ext[ext.length - 1];
};
