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

@Injectable({
    providedIn: 'root'
})
export class WorldService {
    private fetchWorldUrl = `${apiUrl}/world`;

    public constructor(private http: HttpClient) {
    }

    public fetchWorlds(page?: number, limit?: number): Observable<PagedEntities<World>> {
        const params = new HttpParams();

        if (page) params.set('page', page);
        if (limit) params.set('limit', limit);

        return this.http.get<PagedEntities<World>>(this.fetchWorldUrl, { params });
    }

    public fetchWorldById(id: number): Observable<World> {
        return this.http.get<World>(`${this.fetchWorldUrl}/${id}`);
    }

    public createWorld(world: WorldDto): Observable<World> {
        return this.http.post<World>(this.fetchWorldUrl, world);
    }

    public updateWorld(world: WorldDto): Observable<World> {
        return this.http.patch<World>(`${this.fetchWorldUrl}/${world.id}`, world);
    }

    public deleteWorld(id: number): Observable<never> {
        return this.http.delete(`${this.fetchWorldUrl}/${id}`) as Observable<never>;
    }
}
