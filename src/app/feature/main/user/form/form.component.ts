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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

import { ExternalFile } from '../../../../core/entities/external-file';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/entities/user';
import { ActionTableCellComponent } from '../../../../shared/action-table-cell/action-table-cell.component';
import { ActionTableHeaderComponent } from '../../../../shared/action-table-header/action-table-header.component';
import { ImageUploaderComponent } from '../../../../shared/image-uploader/image-uploader.component';

@Component({
    selector: 'app-users-form',
    standalone: true,
    imports: [
        ActionTableCellComponent,
        ActionTableHeaderComponent,
        NgForOf,
        FormsModule,
        NgIf,
        ReactiveFormsModule,
        ImageUploaderComponent
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css'
})
export class UserFormComponent {
    public userForm: FormGroup;
    public errorMessage: string | null = null;
    public userId: number | null = null;
    protected image?: ExternalFile;

    public constructor(
        private fb: FormBuilder,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly userService: UserService
    ) {
        this.userForm = this.fb.group({
            username: ['', [Validators.required]],
            password: [''],
            role: ['', [Validators.required]],
            imageId: [''],
            energy: ['', [
                Validators.required,
                Validators.min(0),
                Validators.max(100),
                Validators.pattern(/^[1-9]\d*$/)
            ]],
            dust: ['', [
                Validators.required,
                Validators.min(0),
                Validators.max(100),
                Validators.pattern(/^[1-9]\d*$/)
            ]]
        });
    }

    public ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            if (id !== null) {
                this.userId = parseInt(id);
                this.userService.fetchUserById(this.userId).subscribe((user) => {
                    const formValue = {
                        username: user.username,
                        role: user.role,
                        imageId: user.image?.id,
                        energy: user.energy,
                        dust: user.dust
                    };

                    this.userForm.patchValue(formValue);
                });
            }
        });
    }

    public onSubmit(): void {
        if (this.userForm.valid) {
            const user: User = new User();
            user.username = this.userForm.value['username'];
            user.role = this.userForm.value['role'];
            user.energy = parseInt(this.userForm.value['energy']);
            user.dust = parseInt(this.userForm.value['dust']);
            user.image = {
                id: this.userForm.value['imageId'] || undefined,
                path: ''
            };

            if (this.userId) {
                // Edit mode
                user.id = this.userId;
                const dto = user.toDto();

                if (this.userForm.get('password')?.touched && this.userForm.get('password')?.value !== '') 
                    dto.password = this.userForm.get('password')?.value;
                

                this.userService.updateUser(dto).subscribe({
                    next: () => this.router.navigate(['/users']),
                    error: () => this.errorMessage = 'Failed to update the rarity. Please try again.'
                });
            } else {
                // Add mode

                const dto = user.toDto();
                if (this.userForm.get('password')?.touched && this.userForm.get('password')?.value !== '') 
                    dto.password = this.userForm.get('password')?.value;
                

                this.userService.createUser(dto).subscribe({
                    next: () => this.router.navigate(['/users']),
                    error: () => this.errorMessage = 'Failed to add the rarity. Please try again.'
                });
            }
        } else {
            this.errorMessage = 'Please fill in all fields correctly';
        }
    }

    public onImageChanged(image: ExternalFile): void {
        this.userForm.get('imageId')?.setValue(image.id);
    }
}
