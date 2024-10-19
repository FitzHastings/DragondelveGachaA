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

import { WorldDto } from '../dtos/world.dto';

import { ExternalFile } from './external-file';
import { GeneralEntity } from './general-entity';


/**
 * Represents a World entity with unique identification, name, accompanying images, and a logo.
 *
 * @class World
 */
export class World implements GeneralEntity {
    public static readonly slug = 'world';
    public id?: number;
    public name?: string;
    public images?: ExternalFile[];
    public logo?: ExternalFile;

    public toDto(): WorldDto {
        return {
            id: this.id,
            name: this.name,
            imageIds: this.images
                ? this.images.map((image) => image.id)
                : undefined,
            logoId: this.logo?.id || undefined
        };
    }
}
