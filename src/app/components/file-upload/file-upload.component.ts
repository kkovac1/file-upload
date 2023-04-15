import { Component, OnInit } from '@angular/core';
import { FileItem, FileLikeObject, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  
  public files: FileItem[] = [];
  public hasBaseDropZoneOver: boolean = false;

  public uploader: FileUploader = new FileUploader({
    url: 'https://localhost:44316/api/File/upload',
    autoUpload: false,
    isHTML5: true,
    removeAfterUpload: false,
    // maxFileSize: 10 * 1024 * 1024 // 10 MB
  });

  public recordFileProgress: Record<string, number> = {};

  public allFilesFailedToUpload = false;

  constructor(

  ) {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onProgressItem = (item: FileItem, progress: any) => {
      item.progress = progress;
      if (item.file.name) this.recordFileProgress[item.file.name] = progress;
    };

    this.uploader.onCompleteAll = () => {
      this.allFilesFailedToUpload = true;

      this.uploader.queue.forEach(item => {
        if (!item.isError)
          this.allFilesFailedToUpload = false;
      });
    }
  }

  ngOnInit(): void {
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  uploadFiles() {
    console.log(this.files);
    this.uploader.uploadAll();
  }

  removeFileFromQueue(file: FileItem) {
    this.allFilesFailedToUpload = false;
    if (file.file.name)
      delete this.recordFileProgress[file.file.name];
    this.uploader.removeFromQueue(file);
  }

  retryUploadAll() {
    this.allFilesFailedToUpload = false;

    this.uploader.queue.forEach(item => {
      item.upload();
    });
  }

}
