import { FileListT, StringT } from '@/types/api';

export const createFileListT = (fileList: FileList): FileListT => {
  return Object.assign(fileList, { kind: 'FileList' }) as FileListT;
};

export const createStringT = (value: string): StringT => {
  return { kind: 'string', value };
};
