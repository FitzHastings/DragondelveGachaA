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

import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { World } from '../../../../core/entities/world';
import { WorldService } from '../../../../core/services/world.service';
import { PagedEntities } from '../../../../core/entities/paged-entities';
import { ImageTableCellComponent } from '../../../../shared/image-table-cell/image-table-cell.component';
import { ActionTableCellComponent } from '../../../../shared/action-table-cell/action-table-cell.component';
import { ActionTableHeaderComponent } from '../../../../shared/action-table-header/action-table-header.component';

@Component({
    selector: 'app-world-table',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        ImageTableCellComponent,
        ActionTableCellComponent,
        ActionTableHeaderComponent
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class WorldTableComponent implements OnInit {
    public worlds: World[] = [];

    public constructor(private worldService: WorldService, private router: Router) {
    }

    public ngOnInit(): void {
        this.loadWorlds();
    }

    public deleteWorld = (id: number): void => {
        this.worldService.deleteWorld(id).subscribe(
            () => {
                this.loadWorlds();
            },
            (error: unknown) => {
                console.error('There was an error retrieving the worlds!', error);
            }
        );
    };

    public navigateToForm = (id: number | undefined = undefined): void => {
        if (id)
            this.router.navigate(['/worlds/form', id]);
        else
            this.router.navigate(['/worlds/form']);
    };

    private loadWorlds(): void {
        this.worldService.fetchWorlds().subscribe(
            (data: PagedEntities<World>) => {
                this.worlds = data.entities;
            },
            (error: unknown) => {
                console.error('There was an error retrieving the worlds!', error);
            }
        );
    }
}
