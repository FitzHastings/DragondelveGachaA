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
import { catchError, map, Observable, of, tap } from 'rxjs';

import { apiUrl } from '../../shared/utils/api-url';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly loginUrl = `${apiUrl}/auth/login`;
    private readonly verifyTokenUrl = `${apiUrl}/auth`;
    private readonly tokenKey = 'authToken';

    public constructor(private http: HttpClient) {
    }

    public login(username: string, password: string): Observable<{ access_token: string }> {
        return this.http.post<{ access_token: string }>(this.loginUrl, { username, password }).pipe(
            tap((response) => this.setToken(response.access_token))
        );
    }

    public setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    public getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    public isAuthenticated(): Observable<string> {
        const token = this.getToken();
        if (!token)
            return of('');


        return this.http.get<{ session: { username: string } }>(this.verifyTokenUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).pipe(
            map((response) => response.session.username),
            catchError(() => of(''))
        );
    }

    public logout(): void {
        localStorage.removeItem(this.tokenKey);
    }
}
