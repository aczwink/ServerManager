/**
 * ServerManager
 * Copyright (C) 2021 Amir Czwink (amir130@hotmail.de)
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

import { Injectable } from "acts-util-node";
import { Processes } from "srvmgr-api";
import { WebSocketAPIEndpoint, ApiRequest } from "../Api";
import { ProcessesManager } from "../services/ProcessesManager";

@Injectable
class API
{
    constructor(private processesManager: ProcessesManager)
    {
    }

    @WebSocketAPIEndpoint({ route: Processes.API.QueryProcessesList.message })
    public async QueryProcessesList(request: ApiRequest): Promise<Processes.API.QueryProcessesList.ResultData>
    {
        return this.processesManager.QueryProcessesSnapshot(request.session);
    }
}

export default API;