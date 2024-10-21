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

import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ActionTableCellComponent } from '../../../../shared/action-table-cell/action-table-cell.component';
import { ActionTableHeaderComponent } from '../../../../shared/action-table-header/action-table-header.component';
import { ImageTableCellComponent } from '../../../../shared/image-table-cell/image-table-cell.component';
import { Rarity } from '../../../../core/entities/rarity';
import { RarityService } from '../../../../core/services/rarity.service';
import { PagedEntities } from '../../../../core/entities/paged-entities';

@Component({
    selector: 'app-rarity-table',
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
export class RarityTableComponent {
    public rarities: Rarity[] = [];

    public constructor(private rarityService: RarityService, private router: Router) {
    }

    public ngOnInit(): void {
        this.loadRarities();
    }

    public deleteRarity = (id: number): void => {
        this.rarityService.deleteRarity(id).subscribe(
            () => {
                this.loadRarities();
            },
            (error: unknown) => {
                console.error('There was an error retrieving the worlds!', error);
            }
        );
    };

    public navigateToForm = (id: number | undefined = undefined): void => {
        if (id) 
            this.router.navigate(['/rarities/form', id]);
        else 
            this.router.navigate(['/rarities/form']);
    };

    private loadRarities(): void {
        this.rarityService.fetchRarities().subscribe(
            (data: PagedEntities<Rarity>) => {
                this.rarities = data.entities;
            },
            (error: unknown) => {
                console.error('There was an error retrieving the worlds!', error);
            }
        );
    }
}
