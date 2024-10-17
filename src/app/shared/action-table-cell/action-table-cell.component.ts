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

import { Component, Input } from '@angular/core';

import { GeneralEntity } from '../../core/entities/general-entity';

@Component({
    selector: 'app-action-table-cell',
    standalone: true,
    imports: [],
    templateUrl: './action-table-cell.component.html',
    styleUrl: './action-table-cell.component.css',
    host: {
        '[style.display]': '"table-cell"',
        '[style.height]': '"100%"',
        '[style.verticalAlign]': '"middle"'
    }
})
export class ActionTableCellComponent {
    @Input() public entity?: GeneralEntity = undefined;
    @Input() public removeAction: ((id: number) => void) | undefined;
    @Input() public navigateToForm: ((id: number | undefined) => void) | undefined;
}
