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
import { Property, PropertyObserver } from "acts-util-core";

import { WebSocketService } from "../Services/WebSocketService";

export class ApiObservable<T>
{
    constructor(value: T, updateMessage: string, webSocketService: WebSocketService)
    {
        this.property = new Property<T>(value);

        webSocketService.RegisterApiListenerHandler(updateMessage, (data: T) => this.property.Set(data));
        webSocketService.SendMessage(updateMessage);
    }

    //Public methods
    public Subscribe(observer: PropertyObserver<T>)
    {
        return this.property.Subscribe(observer);
    }

    //Private members
    private property: Property<T>;
}