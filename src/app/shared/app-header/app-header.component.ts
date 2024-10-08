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
import { Observable } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        NgOptimizedImage,
        AsyncPipe
    ],
    templateUrl: './app-header.component.html',
    styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
    public username: Observable<string> = new Observable<string>();

    public constructor(private authService: AuthService, private router: Router) {
    }

    public ngOnInit(): void {
        this.username = this.authService.isAuthenticated();
        this.username.subscribe((isAuthenticated) => {
            if (!isAuthenticated)
                this.router.navigate(['/login']);
        });
    }

    public signOut(): void {
        this.authService.setToken('');
        this.router.navigate(['/login']);
    }
}
