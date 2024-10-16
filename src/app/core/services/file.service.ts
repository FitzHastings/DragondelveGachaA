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
import { ExternalFile } from '../entities/external-file';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private uploadFileUrl = `${apiUrl}/file/upload`;

    public constructor(private http: HttpClient) {
    }

    public uploadImage(file: File): Observable<ExternalFile> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<ExternalFile>(this.uploadFileUrl, formData, {
        });
    }
}
