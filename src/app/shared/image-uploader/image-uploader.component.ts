import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

import { apiUrl } from '../utils/api-url';
import { FileService } from '../../core/services/file.service';
import { ExternalFile } from '../../core/entities/external-file';

@Component({
    selector: 'app-image-uploader',
    standalone: true,
    imports: [
        NgIf
    ],
    templateUrl: './image-uploader.component.html',
    styleUrl: './image-uploader.component.css'
})
export class ImageUploaderComponent {
    @Input() public image?: ExternalFile;
    @Output() public imageChanged = new EventEmitter<ExternalFile>();
    protected fileUploadError: string | null = null;

    public constructor(private readonly fileService: FileService) {
    }

    public onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.fileService.uploadImage(file).subscribe({
                next: (response) => {
                    this.fileUploadError = null;
                    this.image = response;
                    this.imageChanged.emit(this.image);
                },
                error: () => this.fileUploadError = 'Failed to upload the file. Please try again.'
            });
        }
    }

    public removeImage():void {
        this.image = undefined;
        this.imageChanged.emit(this.image);
    }

    public get imagePath(): string {
        return `${apiUrl}/${this.image?.path}`;
    }
}
