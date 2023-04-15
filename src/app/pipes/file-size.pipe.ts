import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(size: number): string {    
    if (size === 0) {
      return '0 MB';
    }
    const sizeInBytes = Math.abs(size);
    const sizeInKB = sizeInBytes / 1024;
    const sizeInMB = sizeInBytes / 1024 / 1024;

    if (sizeInMB < 1) return sizeInKB.toFixed(2) + ' KB';

    return sizeInMB.toFixed(2) + ' MB';
  }
}
