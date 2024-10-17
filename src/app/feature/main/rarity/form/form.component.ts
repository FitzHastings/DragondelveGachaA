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
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ImageUploaderComponent } from '../../../../shared/image-uploader/image-uploader.component';
import { ExternalFile } from '../../../../core/entities/external-file';
import { RarityService } from '../../../../core/services/rarity.service';
import { Rarity } from '../../../../core/entities/rarity';

@Component({
    selector: 'rarity-app-form',
    standalone: true,
    imports: [
        FormsModule,
        ImageUploaderComponent,
        NgIf,
        ReactiveFormsModule
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css'
})
export class RarityFormComponent {
    public rarityForm: FormGroup;
    public errorMessage: string | null = null;
    public rarityId: number | null = null;
    protected image?: ExternalFile;

    public constructor(
        private fb: FormBuilder,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly rarityService: RarityService
    ) {
        this.rarityForm = this.fb.group({
            name: ['', [Validators.required]],
            weight: ['', [
                Validators.required,
                Validators.min(0),
                Validators.max(100),
                Validators.pattern(/^[1-9]\d*$/) ]]
        });
    }

    public ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            if (id !== null) {
                this.rarityId = parseInt(id);
                this.rarityService.fetchRarityById(this.rarityId).subscribe((rarity) => {
                    const formValue = {
                        name: rarity.name,
                        weight: rarity.weight
                    };

                    this.rarityForm.patchValue(formValue);
                });
            }
        });
    }

    public onSubmit(): void {
        if (this.rarityForm.valid) {
            const rarity: Rarity = new Rarity();
            rarity.name = this.rarityForm.value['name'];
            rarity.weight = parseInt(this.rarityForm.value['weight']);

            if (this.rarityId) {
                // Edit mode
                rarity.id = this.rarityId;
                this.rarityService.updateRarity(rarity.toDto()).subscribe({
                    next: () => this.router.navigate(['/rarities']),
                    error: () => this.errorMessage = 'Failed to update the rarity. Please try again.'
                });
            } else {
                // Add mode
                this.rarityService.createRarity(rarity.toDto()).subscribe({
                    next: () => this.router.navigate(['/rarities']),
                    error: () => this.errorMessage = 'Failed to add the rarity. Please try again.'
                });
            }
        } else {
            this.errorMessage = 'Please fill in all fields correctly';
        }
    }
}
