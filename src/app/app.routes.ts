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

import { Routes } from '@angular/router';

import { LoginComponent } from './feature/auth/login/login.component';
import { SignupComponent } from './feature/auth/signup/signup.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { HomeComponent } from './feature/main/home/home.component';
import { WorldComponent } from './feature/main/world/world.component';
import { WorldFormComponent } from './feature/main/world/form/world-form.component';
import { RarityComponent } from './feature/main/rarity/rarity.component';
import { RarityFormComponent } from './feature/main/rarity/form/form.component';
import { UserComponent } from './feature/main/user/user.component';
import { UserFormComponent } from './feature/main/user/form/form.component';
import { TemplateComponent } from './feature/main/template/template.component';
import { TemplateFormComponent } from './feature/main/template/form/form.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'worlds', component: WorldComponent },
            { path: 'worlds/form/:id', component: WorldFormComponent },
            { path: 'worlds/form', component: WorldFormComponent },
            { path: 'rarities', component: RarityComponent },
            { path: 'rarities/form/:id', component: RarityFormComponent },
            { path: 'rarities/form', component: RarityFormComponent },
            { path: 'users', component: UserComponent },
            { path: 'users/form/:id', component: UserFormComponent },
            { path: 'users/form', component: UserFormComponent },
            { path: 'templates', component: TemplateComponent },
            { path: 'templates/form/:id', component: TemplateFormComponent },
            { path: 'templates/form', component: TemplateFormComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];
