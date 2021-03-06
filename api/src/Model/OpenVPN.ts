/**
 * ServerManager
 * Copyright (C) 2020-2021 Amir Czwink (amir130@hotmail.de)
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

import { SUBMSG_ADD, SUBMSG_DELETE, SUBMSG_LIST, SUBMSG_QUERY, SUBMSG_SET } from "../Messages";

const MSG_OPENVPN = "/OpenVPN/";
const MSG_OPENVPN_CADIRS = MSG_OPENVPN + "CADirs/";
const MSG_OPENVPN_CADIR_CLIENTS = MSG_OPENVPN_CADIRS + "Clients/";
const MSG_OPENVPN_CONFIGS = MSG_OPENVPN + "Configs/";

export interface CertKeyFiles
{
    caCertPath: string;
    certPath: string;
    keyPath: string;
}

export interface OpenVPNServerConfig
{
    name: string;
    port: number;
    protocol: "tcp" | "udp";
    virtualServerAddress: string;
    virtualServerSubnetMask: string;
    cipher: "AES-256-CBC";
    verbosity: number;
    authenticationAlgorithm: "SHA256";

    certKeyFiles: CertKeyFiles & { dhPath: string; };
}

export namespace OpenVPNApi
{
    export namespace AddCA
    {
        export const message = MSG_OPENVPN_CADIRS + SUBMSG_ADD;

        interface X509Subject_Traditional
        {
            countryCode: string;
            province: string;
            city: string;
            organization: string;
            email: string;
            organizationalUnit: string;
        }

        export interface RequestData
        {
            name: string;
            keySize: number;
            domainName: string;
        }
    }

    export namespace AddClient
    {
        export const message = MSG_OPENVPN_CADIR_CLIENTS + SUBMSG_ADD;

        export interface RequestData
        {
            caDirName: string;
            clientName: string;
        }
    }

    export namespace AddConfig
    {
        export const message = MSG_OPENVPN_CONFIGS + SUBMSG_ADD;

        export type RequestData = OpenVPNServerConfig;
    }

    export namespace DeleteCADir
    {
        export const message = MSG_OPENVPN_CADIRS + SUBMSG_DELETE;

        export type RequestData = string;
    }

    export namespace DeleteConfig
    {
        export const message = MSG_OPENVPN_CONFIGS + SUBMSG_DELETE;

        export type RequestData = string;
    }

    export namespace DownloadClientConfig
    {
        export const message = MSG_OPENVPN_CONFIGS + "clientConfig";

        export interface RequestData
        {
            configName: string;
            clientName: string;
            dnsRedirectAddress: string | undefined;
        }

        export interface ResultData
        {
            config: string;
        }
    }

    export namespace ListCADirs
    {
        export const message = MSG_OPENVPN_CADIRS + SUBMSG_LIST;

        export type ResultData = string[];
    }

    export namespace ListClients
    {
        export const message = MSG_OPENVPN_CADIR_CLIENTS + SUBMSG_LIST;

        export type RequestData = string;
        export type ResultData = string[];
    }

    export namespace ListConfigs
    {
        export const message = MSG_OPENVPN_CONFIGS + SUBMSG_LIST;

        export type ResultData = string[];
    }

    export namespace QueryCADirOfConfig
    {
        export const message = MSG_OPENVPN_CONFIGS + "cadir";

        export interface RequestData
        {
            name: string;
        }

        export type ResultData = string;
    }

    export namespace QueryConfig
    {
        export const message = MSG_OPENVPN_CONFIGS + SUBMSG_QUERY;

        export interface RequestData
        {
            name: string;
        }

        export type ResultData = OpenVPNServerConfig;
    }

    export namespace QueryNewConfigTemplate
    {
        export const message = MSG_OPENVPN_CONFIGS + "template";

        export interface RequestData
        {
            caDirName: string;
        }

        export type ResultData = OpenVPNServerConfig;
    }

    export namespace UpdateConfig
    {
        export const message = MSG_OPENVPN_CONFIGS + SUBMSG_SET;

        export interface RequestData
        {
            name: string;
            config: OpenVPNServerConfig;
        }

        export interface ResultData
        {
        }
    }
}