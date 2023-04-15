import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { FileUpload } from '../models/FileUpload';
import { environment } from 'src/environments/environment';

const BASE_API_URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadFile(file: FileUpload) {
    const formData = new FormData();

    formData.append('files', file.file, file.name);

    return this.httpClient.post(`${BASE_API_URL}/File/upload-v2`, formData, { reportProgress: true, observe: 'events' }).pipe(
      map((event: HttpEvent<any>, index: number) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total !== undefined) {
            const progress = Math.round(100 * (event.loaded / event.total));
            file.progress = progress;
          }
        } else if (event.type === HttpEventType.Response)
          console.log('Files uploaded successfully!', event.body);
        else if (event.type === HttpEventType.Sent)
          console.log('Upload started!');
        else if (event.type === HttpEventType.ResponseHeader)
          console.log('Response header received!');
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("ERROR OCCURED WHILE UPLOADING");
        file.error = error.message;
        throw new Error(error.message);
      })
    );

  }

}
