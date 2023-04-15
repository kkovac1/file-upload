export interface FileUpload {
    name: string;
    file: File;
    progress: number;
    error: string | null;
  }
  