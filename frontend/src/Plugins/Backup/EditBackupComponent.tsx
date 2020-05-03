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
import { Injectable, Component, RenderNode, JSX_CreateElement, Router } from "acfrontend";

import { BackupFormComponent } from "./BackupFormComponent";

@Injectable
export class EditBackupComponent extends Component
{
    constructor(router: Router)
    {
        super();

        this.backupName = router.state.Get().routeParams.backupName!;
    }

    //Protected methods
    protected Render(): RenderNode
    {
        return <fragment>
            <h1>Backup: {this.backupName}</h1>
            <BackupFormComponent backupName={this.backupName} />
        </fragment>;
    }

    //Private members
    private backupName: string;
}