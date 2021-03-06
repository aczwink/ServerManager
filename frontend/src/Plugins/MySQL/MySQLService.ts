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

import { Injectable } from "acfrontend";

import { WebSocketService } from "../../Services/WebSocketService";
import { Messages, MySQL } from "srvmgr-api";

@Injectable
export class MySQLService
{
    constructor(private webSocketService: WebSocketService)
    {
    }

    //Public methods
    public QueryMysqldSettings()
    {
        return this.webSocketService.SendRequest<MySQL.Api.QueryMysqldSettings.ResultData>(MySQL.Api.QueryMysqldSettings.message);
    }

    public SaveMysqldSettings(data: MySQL.Api.SaveMysqldSettings.RequestData)
    {
        return this.webSocketService.SendRequest(MySQL.Api.SaveMysqldSettings.message, data);
    }

    public ShowStatus()
    {
        return this.webSocketService.SendRequest<string>(Messages.MYSQL_SHOW_STATUS, undefined);
    }
}