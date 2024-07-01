export type FileListT = FileList & {
  kind: 'FileList';
};

export type StringT = {
  kind: 'string';
  value?: string;
};
