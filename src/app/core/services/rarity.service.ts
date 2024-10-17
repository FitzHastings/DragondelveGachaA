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
import { Rarity } from '../entities/rarity';
import { RarityDto } from '../dtos/rarity.dto';

/**
 * Service to handle Rarity entity operations.
 */
@Injectable({
    providedIn: 'root'
})
export class RarityService {
    private fetchRarityUrl = `${apiUrl}/rarity`;

    public constructor(private http: HttpClient) {
    }

    /**
     * Fetches a paginated list of Rarity entities.
     *
     * @param {number} [page] - Optional page number for pagination.
     * @param {number} [limit] - Optional limit on the number of items per page.
     * @return {Observable<PagedEntities<Rarity>>} An observable containing the paginated list of Rarity entities.
     */
    public fetchRarities(page?: number, limit?: number): Observable<PagedEntities<Rarity>> {
        const params = new HttpParams();

        if (page) params.set('page', page);
        if (limit) params.set('limit', limit);

        return this.http.get<PagedEntities<Rarity>>(this.fetchRarityUrl, { params });
    }

    /**
     * Fetches the rarity details by the given ID.
     *
     * @param {number} id - The unique identifier for the rarity.
     * @return {Observable<Rarity>} An Observable that emits the rarity details.
     */
    public fetchRarityById(id: number): Observable<Rarity> {
        return this.http.get<Rarity>(`${this.fetchRarityUrl}/${id}`);
    }

    /**
     * Creates a new rarity entry by sending a POST request.
     *
     * @param rarity - The data transfer object containing the rarity details to be created.
     * @return An Observable emitting the created Rarity object.
     */
    public createRarity(rarity: RarityDto): Observable<Rarity> {
        return this.http.post<Rarity>(this.fetchRarityUrl, rarity);
    }

    /**
     * Updates the rarity of an item.
     *
     * @param {RarityDto} rarity - The data transfer object containing updated rarity information.
     * @return {Observable<Rarity>} - An observable containing the updated rarity data.
     */
    public updateRarity(rarity: RarityDto): Observable<Rarity> {
        return this.http.patch<Rarity>(`${this.fetchRarityUrl}/${rarity.id}`, rarity);
    }

    /**
     * Deletes a rarity entry by its ID.
     *
     * @param {number} id - The unique identifier of the rarity entry to delete.
     * @return {Observable<never>} An observable which completes when the deletion is successful.
     */
    public deleteRarity(id: number): Observable<never> {
        return this.http.delete(`${this.fetchRarityUrl}/${id}`) as Observable<never>;
    }
}
