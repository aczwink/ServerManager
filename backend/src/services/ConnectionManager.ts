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
import * as websocket from "websocket";

import { Dictionary } from "acts-util";

import { Injectable } from "../Injector";
import { ApiRequest } from "../Api";

interface JsonMessage
{
    msg: string;
    responseMsg?: string;
    data: any;
}

@Injectable
export class ConnectionManager
{
    constructor()
    {
        this.callbacks = {};
        this.connections = {};
        this.nextConnectionNumber = 0;
    }

    //Public methods
    public Add(connection: websocket.connection)
    {
        const connectionId = this.nextConnectionNumber.toString();
        this.nextConnectionNumber++;

        connection.on("close", () =>
        {
            delete this.connections[connectionId];
        });
        this.connections[connectionId] = connection;

        connection.on("message", this.OnMessageReceived.bind(this, connectionId));
    }

    public Broadcast(message: string, data: any)
    {
        for (const key in this.connections)
        {
            this.Send(key, message, data);
        }
    }

    public RegisterEndpoint(endPoint: string, callback: Function)
    {
        if(endPoint in this.callbacks)
            throw new Error("ENDPOINT ALREADY REGISTERED");
        this.callbacks[endPoint] = callback;
    }

    public Respond(request: ApiRequest, data: any)
    {
        this.Send(request.senderConnectionId, request.responseMsg, data);
    }

    public Send(connectionId: string, route: string, data: any)
    {
        if(!(connectionId in this.connections))
            throw new Error("UNKNOWN CONNECTION ID");

        const message = { route: route, data: data };
        this.connections[connectionId]!.sendUTF(JSON.stringify(message));
    }

    //Private members
    private callbacks: Dictionary<Function>;
    private connections: Dictionary<websocket.connection>;
    private nextConnectionNumber: number;

    //Event handlers
    private OnMessageReceived(connectionId: string, message: websocket.IMessage)
    {
        if(message.type !== "utf8")
            throw new Error("Unknown message type");
        if(message.utf8Data === undefined)
            throw new Error("Illegal message payload");

        const jsonMessage = JSON.parse(message.utf8Data) as JsonMessage;
        if(jsonMessage.msg in this.callbacks)
        {
            const apiCall = { calledRoute: jsonMessage.msg, responseMsg: jsonMessage.responseMsg, senderConnectionId: connectionId };
            this.callbacks[jsonMessage.msg]!(apiCall, jsonMessage.data);
        }
    }
}