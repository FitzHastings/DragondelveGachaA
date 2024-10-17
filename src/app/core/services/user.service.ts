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
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiUrl } from '../../shared/utils/api-url';
import { PagedEntities } from '../entities/paged-entities';
import { User } from '../entities/user';
import { UserDto } from '../dtos/user.dto';

/**
 * Service to handle User entity operations.
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private fetchUserUrl = `${apiUrl}/user`;

    public constructor(private http: HttpClient) {
    }

    /**
     * Fetches a paginated list of User entities.
     *
     * @param {number} [page] - Optional page number for pagination.
     * @param {number} [limit] - Optional limit on the number of items per page.
     * @return {Observable<PagedEntities<User>>} An observable containing the paginated list of User entities.
     */
    public fetchUsers(page?: number, limit?: number): Observable<PagedEntities<User>> {
        const params = new HttpParams();

        if (page) params.set('page', page);
        if (limit) params.set('limit', limit);

        return this.http.get<PagedEntities<User>>(this.fetchUserUrl, { params });
    }

    /**
     * Fetches the user details by the given ID.
     *
     * @param {number} id - The unique identifier for the user.
     * @return {Observable<User>} An Observable that emits the user details.
     */
    public fetchUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.fetchUserUrl}/${id}`);
    }

    /**
     * Creates a new user entry by sending a POST request.
     *
     * @param user - The data transfer object containing the user details to be created.
     * @return An Observable emitting the created User object.
     */
    public createUser(user: UserDto): Observable<User> {
        return this.http.post<User>(this.fetchUserUrl, user);
    }

    /**
     * Updates the user of an item.
     *
     * @param {UserDto} user - The data transfer object containing updated user information.
     * @return {Observable<User>} - An observable containing the updated user data.
     */
    public updateUser(user: UserDto): Observable<User> {
        return this.http.patch<User>(`${this.fetchUserUrl}/${user.id}`, user);
    }

    /**
     * Deletes a user entry by its ID.
     *
     * @param {number} id - The unique identifier of the user entry to delete.
     * @return {Observable<never>} An observable which completes when the deletion is successful.
     */
    public deleteUser(id: number): Observable<never> {
        return this.http.delete(`${this.fetchUserUrl}/${id}`) as Observable<never>;
    }
}
