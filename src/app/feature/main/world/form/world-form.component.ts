/* Copyright 2024 Prokhor Kalinin

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

import { apiUrl } from '../../../../shared/utils/api-url';
import { WorldService } from '../../../../core/services/world.service';
import { FileService } from '../../../../core/services/file.service';
import { World } from '../../../../core/entities/world';

@Component({
    selector: 'app-world-form',
    templateUrl: './world-form.component.html',
    styleUrls: ['./world-form.component.css'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
    standalone: true
})
export class WorldFormComponent {
    public worldForm: FormGroup;
    public errorMessage: string | null = null;
    public worldId: number | null = null;
    public fileUploadError: string | null = null;

    protected readonly apiUrl = apiUrl;

    public constructor(
        private fb: FormBuilder,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly worldService: WorldService,
        private readonly fileService: FileService
    ) {
        this.worldForm = this.fb.group({
            name: ['', [Validators.required]],
            imageId: [''],
            imagePath: ['']
        });
    }

    public ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            if (id !== null) {
                this.worldId = parseInt(id);
                this.worldService.fetchWorldById(this.worldId).subscribe((world) => {
                    const formValue = {
                        name: world.name,
                        imagePath: world.logo?.path,
                        imageId: world.logo?.id
                    };

                    this.worldForm.patchValue(formValue);
                });
            }
        });
    }

    public onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.fileService.uploadImage(file).subscribe({
                next: (response) => {
                    this.worldForm.get('imageId')?.setValue(response.id);
                    this.fileUploadError = null;
                },
                error: () => this.fileUploadError = 'Failed to upload the file. Please try again.'
            });
        }
    }

    public onSubmit(): void {
        if (this.worldForm.valid) {
            const world: World = new World();
            world.name = this.worldForm.value['name'];
            world.logo = {
                id: this.worldForm.value['imageId'] || undefined,
                path: this.worldForm.value['imagePath']
            };

            if (this.worldId) {
                // Edit mode
                world.id = this.worldId;
                this.worldService.updateWorld(world.toDto()).subscribe({
                    next: () => this.router.navigate(['/worlds']),
                    error: () => this.errorMessage = 'Failed to update the world. Please try again.'
                });
            } else {
                // Add mode
                this.worldService.createWorld(world.toDto()).subscribe({
                    next: () => this.router.navigate(['/worlds']),
                    error: () => this.errorMessage = 'Failed to add the world. Please try again.'
                });
            }
        } else {
            this.errorMessage = 'Please fill in all fields correctly';
        }
    }

    public removeImage():void {
        this.worldForm.patchValue({ imageId: null, imagePath: null });
    }
}
