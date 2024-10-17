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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiUrl } from '../../shared/utils/api-url';

/**
 * UserService is responsible for user-related operations such as registration.
 * It communicates with the backend API to perform these tasks.
 *
 * Injectable as a singleton service within the root injector.
 */
@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    private createUserUrl = `${apiUrl}/user/register`;

    public constructor(private http: HttpClient) {
    }

    /**
     * Registers a new user with the provided username and password.
     *
     * @param {string} username - The username of the new user.
     * @param {string} password - The password of the new user.
     * @return {Observable<void>} - An observable that completes when the registration process is finished.
     */
    public register(username: string, password: string): Observable<void> {
        return this.http.post<void>(this.createUserUrl, { username, password });
    }
}
