import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadV2Component } from './file-upload-v2.component';

describe('FileUploadV2Component', () => {
  let component: FileUploadV2Component;
  let fixture: ComponentFixture<FileUploadV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
