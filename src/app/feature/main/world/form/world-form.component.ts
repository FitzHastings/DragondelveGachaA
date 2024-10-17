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

import { WorldService } from '../../../../core/services/world.service';
import { World } from '../../../../core/entities/world';
import { ImageUploaderComponent } from '../../../../shared/image-uploader/image-uploader.component';
import { ExternalFile } from '../../../../core/entities/external-file';

@Component({
    selector: 'app-world-form',
    templateUrl: './world-form.component.html',
    styleUrls: ['./world-form.component.css'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        ImageUploaderComponent
    ],
    standalone: true
})
export class WorldFormComponent {
    public worldForm: FormGroup;
    public errorMessage: string | null = null;
    public worldId: number | null = null;
    protected image?: ExternalFile;

    public constructor(
        private fb: FormBuilder,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly worldService: WorldService
    ) {
        this.worldForm = this.fb.group({
            name: ['', [Validators.required]],
            imageId: ['']
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
                        imageId: world.logo?.id
                    };
                    this.image = world.logo;

                    this.worldForm.patchValue(formValue);
                });
            }
        });
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

    public onImageChanged(image: ExternalFile): void {
        this.worldForm.get('imageId')?.setValue(image.id);
    }
}
