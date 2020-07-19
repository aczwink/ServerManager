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

import { Component, RenderNode, JSX_CreateElement, LineEdit } from "acfrontend";

export class ObjectEditorComponent extends Component
{
    input!: {
        object: any;
        onObjectUpdated?: () => void;
    }

    protected Render(): RenderNode
    {
        return this.AddObjectMembers(this.input.object);
    }

    //Private methods
    private AddObject(obj: any, key: string)
    {
        return <fragment>
            <h2>{key}</h2>
            {this.AddObjectMembers(obj[key])}
        </fragment>
    }

    private AddObjectMembers(obj: any)
    {
        const rows = [];
        const subsections = [];

        const keys = Object.keys(obj).sort();
        for (const key of keys)
        {
            const value = obj[key];

            if(typeof value === "string")
            {
                rows.push(<tr>
                    <th>{key}</th>
                    <td><LineEdit value={value} onChanged={this.OnChangeValue.bind(this, obj, key)} /></td>
                </tr>);
            }
            else
            {
                subsections.push(this.AddObject(obj, key));
            }
        }

        return <fragment>
            <table class="keyValue">
                {...rows}
            </table>
            {...subsections}
        </fragment>;
    }

    //Event handlers
    private OnChangeValue(obj: any, key: string, newValue: any)
    {
        obj[key] = newValue;
        if(this.input.onObjectUpdated !== undefined)
            this.input.onObjectUpdated();
    }
}