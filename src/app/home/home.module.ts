import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home.component';
import { RouterModule } from '@angular/router';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { FileUploadDialogComponent } from '../components/file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadModule } from 'ng2-file-upload';
import { FileSizePipe } from '../pipes/file-size.pipe';
import { FileUploadV2Component } from '../components/file-upload-v2/file-upload-v2.component';

const routes = [
  {
    path: '',
    component: HomeComponent
  },
]

@NgModule({
  declarations: [
    HomeComponent,
    FileUploadComponent,
    FileUploadDialogComponent,
    FileSizePipe,
    FileUploadV2Component

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    MatIconModule,
    FileUploadModule
  ]
})
export class HomeModule { }
