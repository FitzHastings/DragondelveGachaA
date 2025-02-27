/* Copyright 2024-2025 Prokhor Kalinin

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
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

import { ActionTableCellComponent } from '../../../../shared/action-table-cell/action-table-cell.component';
import { ActionTableHeaderComponent } from '../../../../shared/action-table-header/action-table-header.component';
import { ImageTableCellComponent } from '../../../../shared/image-table-cell/image-table-cell.component';
import { PagedEntities } from '../../../../core/entities/paged-entities';
import { CharacterTemplate } from '../../../../core/entities/character-template';
import { TemplateService } from '../../../../core/services/template.service';

@Component({
    selector: 'app-template-table',
    standalone: true,
    imports: [
        ActionTableCellComponent,
        ActionTableHeaderComponent,
        ImageTableCellComponent,
        NgForOf
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class TemplateTableComponent {
    public templates: CharacterTemplate[] = [];

    public constructor(private templateService: TemplateService, private router: Router) {
    }

    public ngOnInit(): void {
        this.loadTemplates();
    }

    public deleteTemplate = (id: number): void => {
        this.templateService.deleteTemplate(id).subscribe(
            () => {
                this.loadTemplates();
            }
        );
    };

    public navigateToForm = (id: number | undefined = undefined): void => {
        if (id)
            this.router.navigate(['/templates/form', id]);
        else
            this.router.navigate(['/templates/form']);
    };

    private loadTemplates(): void {
        this.templateService.fetchTemplates().subscribe(
            (data: PagedEntities<CharacterTemplate>) => {
                this.templates = data.entities;
            }
        );
    }
}
