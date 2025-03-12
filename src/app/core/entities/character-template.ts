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

import { CharacterTemplateDto } from '../dtos/character-template.dto';

import { Rarity } from './rarity';
import { GeneralEntity } from './general-entity';
import { ExternalFile } from './external-file';
import { World } from './world';

export class CharacterTemplate implements GeneralEntity {
    public id?: number;
    public name?: string;
    public description?: string;
    public quote?: string;
    public isRollable?: boolean;
    public rarity?: Rarity;
    public fullImage?: ExternalFile;
    public setting?: World;

    public toDto(): CharacterTemplateDto {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            quote: this.quote,
            isRollable: this.isRollable,
            rarityId: this.rarity?.id,
            fullImageId: this.fullImage?.id,
            settingId: this.setting?.id
        };
    }
}
