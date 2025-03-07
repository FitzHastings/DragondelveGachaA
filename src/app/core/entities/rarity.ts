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

import { RarityDto } from '../dtos/rarity.dto';

import { GeneralEntity } from './general-entity';

/**
 * Class representing a Rarity entity that implements the GeneralEntity interface.
 */
export class Rarity implements GeneralEntity {
    public static readonly slug = 'rarity';
    public id?: number;
    public name?: string;
    public weight?: number;

    public toDto(): RarityDto {
        return {
            id: this.id,
            name: this.name,
            weight: this.weight
        };
    }
}
