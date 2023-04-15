import { Component, OnInit } from '@angular/core';
import { from, concatMap, finalize, Observable } from 'rxjs';
import { FileUpload } from 'src/app/models/FileUpload';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-upload-v2',
  templateUrl: './file-upload-v2.component.html',
  styleUrls: ['./file-upload-v2.component.scss']
})
export class FileUploadV2Component implements OnInit {

  public files: FileUpload[] = [];
  public hasFileOver: boolean = false;

  constructor(
    private fileUploadService: FileUploadService
  ) {

  }

  ngOnInit(): void {
  }

  get allFilesFailedToUpload(): boolean {
    return this.files.every(x => x.error != null);
  }

  onFileSelect(event: Event): void {
    const files = (event.target as HTMLInputElement).files;

    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.files.push({
        name: file.name,
        progress: 0,
        error: null,
        file: file
      });
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.files.push({
        name: file.name,
        progress: 0,
        error: null,
        file: file
      });
    }

    this.hasFileOver = false;
  }

  onDragOver(event: Event): void {
    event.preventDefault();
    this.hasFileOver = true;
  }

  onDragLeave(event: Event): void {
    this.hasFileOver = false;
  }

  uploadFiles(files: FileUpload[]): void {
    this.files.forEach(file => {
      file.progress = 0;
      file.error = null;
    });

    from(files).pipe(
      concatMap(file => this.uploadFile(file)),
      finalize(() => console.log(this.files))
    ).subscribe();
  }

  uploadFile(file: FileUpload): Observable<void> {
    return this.fileUploadService.uploadFile(file);
  }

  retryFile(file: FileUpload): void {
    this.uploadFiles([file]);
  }

  retryAll(): void {
    this.uploadFiles(this.files);
  }

  removeFileFromQueue(index: number): void {
    this.files.splice(index, 1);
  }
}

