/**
 * ServerManager
 * Copyright (C) 2019-2021 Amir Czwink (amir130@hotmail.de)
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
import { Injectable } from "acfrontend";

import { Module } from "srvmgr-api";

import { WebSocketService } from "./WebSocketService";
import { ApiProperty } from "../API/ApiProperty";

@Injectable
export class ModuleService
{
    constructor(private webSocketService: WebSocketService)
    {
        this._modules = new ApiProperty<Module.Module[]>(Module.API.List.message, webSocketService);
    }

    //Properties
    public get modules()
    {
        return this._modules;
    }

    //Public methods
    public Install(moduleName: Module.ModuleName)
    {
        return this.webSocketService.SendRequest(Module.API.Install.message, moduleName);
    }

    public async IsModuleInstalled(moduleName: Module.ModuleName)
    {
        const modules = await this.modules.Get();
        return modules.find( mod => (mod.name == moduleName) && mod.installed ) !== undefined;
    }

    public Uninstall(moduleName: Module.ModuleName)
    {
        return this.webSocketService.SendRequest(Module.API.Uninstall.message, moduleName);
    }

    //Private members
    private _modules: ApiProperty<Module.Module[]>;
}