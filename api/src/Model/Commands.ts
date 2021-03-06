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

import { SUBMSG_LIST } from "../Messages";

const MSG_COMMANDS = "/Commands/";

export interface CommandOverviewData
{
    pid: number;
    commandline: string;
    exitCode?: number;
}

export interface CommandData
{
    pid: number;
    exitCode?: number;
    stderr: string;
    stdout: string;
}

export namespace Api
{
    export namespace CommandData
    {
        export const message = MSG_COMMANDS + "Data";

        export type BackendSendData = CommandData;
    }

    export namespace ListCommands
    {
        export const message = MSG_COMMANDS + SUBMSG_LIST;

        export type BackendSendData = CommandOverviewData[];
    }

    export namespace InputData
    {
        export const message = MSG_COMMANDS + "Input";

        export interface BackendExpectData
        {
            pid: number;
            data: string;
        }
    }

    export namespace SubscribeCommand
    {
        export const message = MSG_COMMANDS + "Subscribe";

        export type RequestData = number;
        export type ResultData = CommandData;
    }

    export namespace UnsubscribeCommand
    {
        export const message = MSG_COMMANDS + "Unsubscribe";
        
        export type BackendExpectData = number;
    }
}