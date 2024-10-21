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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';

import { PeekDto } from '../../core/dtos/peek.dto';

@Component({
    selector: 'app-peek-selection',
    templateUrl: './peek-selection.component.html',
    styleUrls: ['./peek-selection.component.css'],
    imports: [
        NgForOf
    ],
    standalone: true
})
export class PeekSelectionComponent {
    @Input() public items: PeekDto[] = [];
    @Input() public selectedValue?: PeekDto;
    @Output() public valueChanged = new EventEmitter<PeekDto>();

    protected onSelectionChange(event: Event): void {
        const selectedId = Number((event.target as HTMLSelectElement).value);
        const selectedItem = this.items.find((item) => item.id === selectedId);
        if (selectedItem && selectedItem !== this.selectedValue) 
            this.valueChanged.emit(selectedItem);
        
        this.selectedValue = selectedItem;
    }
}
