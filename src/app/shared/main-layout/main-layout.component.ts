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

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppHeaderComponent } from '../app-header/app-header.component';
import { HomeComponent } from '../../feature/main/home/home.component';
import { AppNavComponent } from '../app-nav/app-nav.component';


@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [
        AppHeaderComponent,
        HomeComponent,
        AppNavComponent,
        RouterOutlet
    ],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
