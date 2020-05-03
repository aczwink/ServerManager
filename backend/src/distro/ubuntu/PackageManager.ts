/**
 * ServerManager
 * Copyright (C) 2019-2020 Amir Czwink (amir130@hotmail.de)
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
import { ModuleName } from "srvmgr-api";

import { DistroPackageManager } from "../../Model/DistroPackageManager";
import { CommandExecutor } from "../../services/CommandExecutor";
import { Injectable } from "../../Injector";
import { ApiSessionInfo } from "../../Api";

@Injectable
class UbuntuPackageManager implements DistroPackageManager
{
    constructor(private commandExecutor: CommandExecutor)
    {
    }

    //Public methods
    public async Install(moduleName: ModuleName, session: ApiSessionInfo): Promise<boolean>
    {
        await this.commandExecutor.ExecuteCommand("apt -y install " + this.MapModuleToPackageList(moduleName).join(" "), session);
        return true;
    }

    public async IsModuleInstalled(moduleName: ModuleName, session: ApiSessionInfo): Promise<boolean>
    {
        const packages = this.MapModuleToPackageList(moduleName);
        const allPackages = await this.FetchInstalledPackages(session);
        for (let index = 0; index < packages.length; index++)
        {
            const packageName = packages[index];
            if(allPackages.indexOf(packageName) === -1)
                return false;
        }
        return true;
    }

    //Private methods
    private async FetchInstalledPackages(session: ApiSessionInfo)
    {
        const aptResult = await this.commandExecutor.ExecuteCommand("apt list --installed", session);
        const lines = aptResult.stdout.split("\n");

        const result = [];
        for (let index = 0; index < lines.length; index++)
        {
            const line = lines[index];
            const parts = line.split("/");
            if(parts.length > 0)
                result.push(parts[0].trim());
        }
        return result;
    }

    private MapModuleToPackageList(moduleName: ModuleName)
    {
        switch(moduleName)
        {
            case "mariadb":
                return ["mariadb-server"];
            case "openvpn":
                return ["openvpn"];
            case "samba":
                return ["samba"];
        }
    }
}

export default UbuntuPackageManager;