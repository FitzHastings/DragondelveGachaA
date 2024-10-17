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

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { apiUrl } from '../../shared/utils/api-url';
import { World } from '../entities/world';
import { PagedEntities } from '../entities/paged-entities';
import { WorldDto } from '../dtos/world.dto';

/**
 * Service for managing world-related operations.
 *
 * This service provides methods to fetch, create, update,
 * and delete worlds from the backend API.
 */
@Injectable({
    providedIn: 'root'
})
export class WorldService {
    private fetchWorldUrl = `${apiUrl}/world`;

    public constructor(private http: HttpClient) {
    }

    /**
     * Fetches a paginated list of worlds.
     *
     * @param {number} [page] - The page number to retrieve. Optional.
     * @param {number} [limit] - The number of worlds per page. Optional.
     * @return {Observable<PagedEntities<World>>} An observable containing the paginated list of worlds.
     */
    public fetchWorlds(page?: number, limit?: number): Observable<PagedEntities<World>> {
        const params = new HttpParams();

        if (page) params.set('page', page);
        if (limit) params.set('limit', limit);

        return this.http.get<PagedEntities<World>>(this.fetchWorldUrl, { params });
    }

    /**
     * Fetches a world object by its unique identifier.
     *
     * @param {number} id - The unique identifier of the world to fetch.
     * @return {Observable<World>} An Observable containing the World object.
     */
    public fetchWorldById(id: number): Observable<World> {
        return this.http.get<World>(`${this.fetchWorldUrl}/${id}`);
    }

    /**
     * Creates a new world using the provided world data transfer object.
     *
     * @param {WorldDto} world - The data transfer object representing the world to be created.
     * @return {Observable<World>} An observable that emits the created world.
     */
    public createWorld(world: WorldDto): Observable<World> {
        return this.http.post<World>(this.fetchWorldUrl, world);
    }

    /**
     * Updates the details of a given world.
     *
     * @param {WorldDto} world - The world object containing updated information.
     * @return {Observable<World>} An observable that emits the updated world object.
     */
    public updateWorld(world: WorldDto): Observable<World> {
        return this.http.patch<World>(`${this.fetchWorldUrl}/${world.id}`, world);
    }

    /**
     * Deletes a world by its unique identifier.
     *
     * @param id - The unique identifier of the world to be deleted.
     * @return An Observable that completes when the deletion operation is done.
     */
    public deleteWorld(id: number): Observable<never> {
        return this.http.delete(`${this.fetchWorldUrl}/${id}`) as Observable<never>;
    }
}
