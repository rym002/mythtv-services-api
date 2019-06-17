import { StringGet, StringList } from "./CommonTypes";
import { AbstractService } from './Communication';

interface GetSettingRequest {
    Key: string;
    HostName?: string;
    Default?: string
}

const api = 'Myth';
export class MythService extends AbstractService {

    async GetHostName(): Promise<string> {
        return StringGet(this.serviceProvider, api, 'GetHostName');
    }

    async GetHosts(filterInvalid: boolean = true): Promise<string[]> {
        const value = await this.serviceProvider.get<StringList>(api, 'GetHosts');
        let hosts = value.StringList;
        if (filterInvalid) {
            hosts = hosts.filter(host => {
                return host != "."
                    && host != ""
                    && host != "localhost";
            })
        }
        return hosts;
    }

    async GetSetting(req: GetSettingRequest): Promise<string> {
        return StringGet(this.serviceProvider, api, 'GetSetting', req);
    }
}