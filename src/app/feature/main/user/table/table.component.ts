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
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';

import { PagedEntities } from '../../../../core/entities/paged-entities';
import { User } from '../../../../core/entities/user';
import { UserService } from '../../../../core/services/user.service';
import { ActionTableCellComponent } from '../../../../shared/action-table-cell/action-table-cell.component';
import { ActionTableHeaderComponent } from '../../../../shared/action-table-header/action-table-header.component';
import { ImageTableCellComponent } from '../../../../shared/image-table-cell/image-table-cell.component';

@Component({
    selector: 'app-users-table',
    standalone: true,
    imports: [
        ActionTableCellComponent,
        ActionTableHeaderComponent,
        NgForOf,
        ImageTableCellComponent
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class UserTableComponent {
    public users: User[] = [];

    public constructor(private userService: UserService, private router: Router) {
    }

    public ngOnInit(): void {
        this.loadUsers();
    }

    public deleteUser = (id: number): void => {
        this.userService.deleteUser(id).subscribe(
            () => {
                this.loadUsers();
            },
            (error: unknown) => {
                console.error('There was an error retrieving the worlds!', error);
            }
        );
    };

    public navigateToForm = (id: number | undefined = undefined): void => {
        if (id) 
            this.router.navigate(['/users/form', id]);
        else 
            this.router.navigate(['/users/form']);
    };

    private loadUsers(): void {
        this.userService.fetchUsers().subscribe(
            (data: PagedEntities<User>) => {
                this.users = data.entities;
            },
            (error: unknown) => {
                console.error('There was an error retrieving the worlds!', error);
            }
        );
    }
}
