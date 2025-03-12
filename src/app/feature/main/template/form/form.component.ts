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
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ImageUploaderComponent } from '../../../../shared/image-uploader/image-uploader.component';
import { ExternalFile } from '../../../../core/entities/external-file';
import { TemplateService } from '../../../../core/services/template.service';
import { CharacterTemplate } from '../../../../core/entities/character-template';
import { PeekSelectionComponent } from '../../../../shared/peek-selection/peek-selection.component';
import { PeekDto } from '../../../../core/dtos/peek.dto';
import { Rarity } from '../../../../core/entities/rarity';
import { World } from '../../../../core/entities/world';
import { PeekService } from '../../../../core/services/peek.service';

@Component({
    selector: 'app-template-form',
    standalone: true,
    imports: [
        ImageUploaderComponent,
        NgIf,
        ReactiveFormsModule,
        PeekSelectionComponent
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css'
})
export class TemplateFormComponent {
    public templateForm: FormGroup;
    public errorMessage: string | null = null;
    public templateId: number | null = null;
    protected fullImage?: ExternalFile;
    protected smallImage?: ExternalFile;
    protected rarities: PeekDto[] = [];
    protected settings: PeekDto[] = [];
    protected selectedRarity?: PeekDto;
    protected selectedSetting?: PeekDto;

    public constructor(
        private fb: FormBuilder,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly templateService: TemplateService,
        private readonly peekService: PeekService
    ) {
        this.templateForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            quote: ['', [Validators.required]],
            isRollable: [false, [Validators.required]],
            fullImageId: ['', []],
            rarityId: [null, Validators.required],
            settingId: [null, Validators.required]
        });
    }

    public ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            if (id !== null) {
                this.templateId = parseInt(id);
                this.templateService.fetchTemplateById(this.templateId).subscribe((template) => {
                    const formValue = {
                        name: template.name,
                        description: template.description,
                        quote: template.quote,
                        isRollable: template.isRollable,
                        fullImageId: template.fullImage?.id,
                        rarityId: template.rarity?.id,
                        settingId: template.setting?.id
                    };

                    this.fullImage = template.fullImage;
                    this.selectedSetting = template.setting as PeekDto;
                    this.selectedRarity = template.rarity as PeekDto;

                    this.templateForm.patchValue(formValue);
                });
            }

            this.peekService.peekAt(World.slug).subscribe((settings) => {
                this.settings = settings;
                if (settings?.length > 0)
                    this.templateForm.patchValue({ settingId: settings[0].id });
            });

            this.peekService.peekAt(Rarity.slug).subscribe((rarities) => {
                this.rarities = rarities;
                if (rarities?.length > 0)
                    this.templateForm.patchValue({ rarityId: rarities[0].id });
            });
        });
    }

    public onSubmit(): void {
        if (this.templateForm.valid) {
            const template: CharacterTemplate = new CharacterTemplate();
            template.name = this.templateForm.value['name'];
            template.description = this.templateForm.value['description'];
            template.isRollable = this.templateForm.value['isRollable'];
            template.quote = this.templateForm.value['quote'];
            template.fullImage = { id: this.templateForm.value['fullImageId'], path: '' };
            template.rarity = { id: this.templateForm.value['rarityId'] } as Rarity;
            template.setting = { id: this.templateForm.value['settingId'] } as World;

            if (this.templateId) {
                // Edit mode
                template.id = this.templateId;
                const dto = template.toDto();
                this.templateService.updateTemplate(dto).subscribe({
                    next: () => this.router.navigate(['/templates']),
                    error: () => this.errorMessage = 'Failed to update the rarity. Please try again.'
                });
            } else {
                // Add mode
                const dto = template.toDto();

                this.templateService.createTemplate(dto).subscribe({
                    next: () => this.router.navigate(['/templates']),
                    error: () => this.errorMessage = 'Failed to add the rarity. Please try again.'
                });
            }
        } else {
            this.errorMessage = 'Please fill in all fields correctly';
        }
    }

    public onRarityChanged(newValue: PeekDto): void {
        this.templateForm.get('rarityId')?.setValue(newValue.id);
    }

    public onSettingChanged(newValue: PeekDto): void {
        this.templateForm.get('settingId')?.setValue(newValue.id);
    }

    public onFullImageChanged(image: ExternalFile): void {
        this.templateForm.get('fullImageId')?.setValue(image.id);
    }
}
