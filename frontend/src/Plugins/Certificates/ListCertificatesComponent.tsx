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

import { Injectable, Component, RenderNode, JSX_CreateElement, RouterButton, MatIcon, ProgressSpinner } from "acfrontend";
import { CertificatesService } from "./CertificatesService";
import { Certificate } from "srvmgr-api";

@Injectable
export class ListCertificatesComponent extends Component
{
    constructor(private certificatesService: CertificatesService)
    {
        super();

        this.data = null;
    }

    protected Render(): RenderNode
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <fragment>
            <h1>Certificates</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Expires</th>
                    <th>Certificate path</th>
                    <th>Private key path</th>
                </tr>
                {...this.data.map(this.RenderCertificate.bind(this))}
            </table>
            <div class="row">
                <RouterButton route="/certs/add"><MatIcon>add</MatIcon></RouterButton>
            </div>
        </fragment>
    }

    //Private members
    private data: Certificate[] | null;

    //Private methods
    private RenderCertificate(certificate: Certificate)
    {
        return <tr>
            <td>{certificate.name}</td>
            <td>{(new Date(certificate.expiryDate)).toLocaleString()}</td>
            <td>{certificate.certificatePath}</td>
            <td>{certificate.privateKeyPath}</td>
        </tr>;
    }

    //Event handlers
    public async OnInitiated()
    {
        this.data = await this.certificatesService.ListCertificates();
    }
}