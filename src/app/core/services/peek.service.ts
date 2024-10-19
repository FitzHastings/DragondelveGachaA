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

import { PeekDto } from '../dtos/peek.dto';
import { apiUrl } from '../../shared/utils/api-url';

/**
 * PeekService is responsible for making HTTP requests to peek at data based on a given slug.
 * This service is provided at the root level, ensuring a single instance is used throughout the application.
 */
@Injectable({
    providedIn: 'root'
})
export class PeekService {
    public constructor(private http: HttpClient) {
    }

    /**
     * Fetches a list of PeekDto objects associated with the given peekSlug.
     *
     * @param peekSlug - A string representing the identifier slug for the desired type of peek data.
     * @return An Observable emitting an array of PeekDto objects.
     */
    public peekAt(peekSlug: string): Observable<PeekDto[]> {
        const peekUrl = `${apiUrl}/${peekSlug}/peek`;
        return this.http.get<PeekDto[]>(peekUrl);
    }
}
