/**
 * ServerManager
 * Copyright (C) 2020 Amir Czwink (amir130@hotmail.de)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * */
import * as fs from "fs";

import { DirectoryEntry } from "srvmgr-api";

import { ApiSessionInfo } from "../Api";

export interface ExternalConnection
{
    CreateDirectoryTree(dirPath: string): Promise<void>;
    Delete(pathToNode: string): Promise<void>;
    Exists(filePath: string): Promise<boolean>;
    ListDirectoryContents(dirPath: string): Promise<DirectoryEntry[]>;
    ReadFile(filePath: string): Promise<fs.ReadStream>;
    StoreFile(localFilePath: string, remoteFilePath: string, session: ApiSessionInfo): Promise<void>;
}