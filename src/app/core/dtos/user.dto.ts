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

import { GeneralEntity } from '../entities/general-entity';

/**
 * Represents a Data Transfer Object (DTO) for user-related information.
 *
 * Extends the GeneralEntity interface and includes properties for:
 * - `username`: An optional string representing the username of the user.
 * - `password`: An optional string representing the user's password.
 * - `role`: An optional string indicating the role of the user.
 * - `imageId`: An optional number referring to the ID of the user's associated image.
 * - `energy`: An optional number indicating the user's energy level.
 * - `dust`: An optional number representing the user's dust count or level.
 */
export interface UserDto extends GeneralEntity {
    username?: string;
    password?: string;
    role?: string;
    imageId?: number;
    energy?: number;
    dust?: number;
}
