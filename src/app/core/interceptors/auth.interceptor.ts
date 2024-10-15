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
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    public constructor(private authService: AuthService) {}

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.headers.has('X-Skip-Auth')) {
            const newHeaders = request.headers.delete('X-Skip-Auth');
            const authSkippedRequest = request.clone({ headers: newHeaders });
            return next.handle(authSkippedRequest);
        }

        const token = this.authService.getToken();
        if (token)
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });

        return next.handle(request);
    }
}
