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

    public constructor(private rarityService: RarityService, private router: Router) {}

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
