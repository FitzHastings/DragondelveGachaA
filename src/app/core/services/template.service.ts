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
import { CharacterTemplate } from '../entities/character-template';
import { CharacterTemplateDto } from '../dtos/character-template.dto';

/**
 * Service to handle Template entity operations.
 */
@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    private fetchTemplateUrl = `${apiUrl}/template`;

    public constructor(private http: HttpClient) {
    }

    /**
     * Fetches a paginated list of Template entities.
     *
     * @param {number} [page] - Optional page number for pagination.
     * @param {number} [limit] - Optional limit on the number of items per page.
     * @return {Observable<PagedEntities<Template>>} An observable containing the paginated list of Template entities.
     */
    public fetchTemplates(page?: number, limit?: number): Observable<PagedEntities<CharacterTemplate>> {
        const params = new HttpParams();

        if (page) params.set('page', page);
        if (limit) params.set('limit', limit);

        return this.http.get<PagedEntities<CharacterTemplate>>(this.fetchTemplateUrl, { params });
    }

    /**
     * Fetches the template details by the given ID.
     *
     * @param {number} id - The unique identifier for the template.
     * @return {Observable<Template>} An Observable that emits the template details.
     */
    public fetchTemplateById(id: number): Observable<CharacterTemplate> {
        return this.http.get<CharacterTemplate>(`${this.fetchTemplateUrl}/${id}`);
    }

    /**
     * Creates a new template entry by sending a POST request.
     *
     * @param template - The data transfer object containing the template details to be created.
     * @return An Observable emitting the created Template object.
     */
    public createTemplate(template: CharacterTemplateDto): Observable<CharacterTemplate> {
        return this.http.post<CharacterTemplate>(this.fetchTemplateUrl, template);
    }

    /**
     * Updates the template of an item.
     *
     * @param {CharacterTemplateDto} template - The data transfer object containing updated template information.
     * @return {Observable<Template>} - An observable containing the updated template data.
     */
    public updateTemplate(template: CharacterTemplateDto): Observable<CharacterTemplate> {
        return this.http.patch<CharacterTemplate>(`${this.fetchTemplateUrl}/${template.id}`, template);
    }

    /**
     * Deletes a template entry by its ID.
     *
     * @param {Number} id - The unique identifier of the template entry to delete.
     * @return {Observable<never>} An observable which completes when the deletion is successful.
     */
    public deleteTemplate(id: number): Observable<never> {
        return this.http.delete(`${this.fetchTemplateUrl}/${id}`) as Observable<never>;
    }
}
