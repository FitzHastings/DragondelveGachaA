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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

import { UserService } from '../../../core/services/user.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgOptimizedImage
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})
export class SignupComponent {
    public signUpForm: FormGroup;
    public errorMessage: string | null = null;

    public constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
        this.signUpForm = this.fb.group({
            login: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, {
            validator: this.passwordMatchValidator
        });
    }

    public onSubmit(): void {
        if (this.signUpForm.valid) {
            const { login, password } = this.signUpForm.value;

            this.userService.register(login, password).subscribe({
                next: () => {
                    this.router.navigate(['/login']);
                },
                error: () => {
                    this.errorMessage = 'Registration failed. Please try again.';
                }
            });
        } else {
            this.errorMessage = 'Please fill in all fields correctly';
        }
    }

    private passwordMatchValidator(form: FormGroup): void {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ mismatch: true });
        } else if (confirmPassword != null) {
            confirmPassword.setErrors(null);
        }
    }
}
