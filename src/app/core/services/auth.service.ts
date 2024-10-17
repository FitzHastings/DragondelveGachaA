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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { apiUrl } from '../../shared/utils/api-url';

/**
 * AuthService is responsible for handling user authentication tasks such as
 * logging in, managing and verifying authentication tokens, and logging out.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly loginUrl = `${apiUrl}/auth/login`;
    private readonly verifyTokenUrl = `${apiUrl}/auth`;
    private readonly tokenKey = 'authToken';

    public constructor(private http: HttpClient) {
    }

    /**
     * Authenticates a user with the provided username and password.
     *
     * @param {string} username - The username of the user attempting to log in.
     * @param {string} password - The password of the user attempting to log in.
     * @return {Observable<{ access_token: string }>} An observable emitting the access token upon successful login.
     */
    public login(username: string, password: string): Observable<{ access_token: string }> {
        const headers = new HttpHeaders().set('X-Skip-Auth', 'true');
        return this.http.post<{ access_token: string }>(this.loginUrl, { username, password }, { headers }).pipe(
            tap((response) => this.setToken(response.access_token))
        );
    }

    /**
     * Stores the provided token in the local storage.
     *
     * @param {string} token - The token to be saved.
     * @return {void}
     */
    public setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    /**
     * Retrieves the token from local storage.
     *
     * @return {string | null} The token if it exists in local storage, otherwise null.
     */
    public getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Checks if the user is authenticated by verifying the token.
     *
     * @return An Observable that emits the username if authenticated, otherwise an empty string.
     */
    public isAuthenticated(): Observable<string> {
        const token = this.getToken();
        if (!token)
            return of('');

        return this.http.get<{ session: { username: string } }>(this.verifyTokenUrl).pipe(
            map((response) => response.session.username),
            catchError(() => of(''))
        );
    }

    /**
     * Logs the user out by removing the authentication token from local storage.
     *
     * @return {void} This method does not return a value.
     */
    public logout(): void {
        localStorage.removeItem(this.tokenKey);
    }
}
