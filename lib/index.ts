import { ChannelService } from './ChannelService';
import { HostConfig } from './Communication';
import { DvrService } from './DvrService';
import { Frontend } from './Frontend';
import { MythService } from './MythService';
import { VideoService } from './VideoService';

export * from './ChannelService';
export * from './CommonTypes';
export * from './Communication';
export * from './DvrService';
export * from './Frontend';
export * from './MythService';

const DEFAULT_FE_PORT = '6547';
const DEFAULT_BE_PORT = 6544;
const DEFAULT_PROTOCOL = 'http';
const DEFAULT_BACKEND_HOST = 'localhost';

export class BackendServices {
    readonly mythService: MythService;
    readonly dvrService: DvrService;
    readonly channelService: ChannelService;
    readonly videoService: VideoService;
    constructor(hc: HostConfig) {
        this.mythService = new MythService(hc);
        this.dvrService = new DvrService(hc);
        this.channelService = new ChannelService(hc);
        this.videoService = new VideoService(hc)
    }
}

export let backend = new BackendServices({
    hostname: DEFAULT_BACKEND_HOST,
    port: DEFAULT_BE_PORT,
    protocol: DEFAULT_PROTOCOL
});

export function backendSettings(hc:HostConfig){
    backend = new BackendServices(hc);
}
export async function frontend(host: string): Promise<Frontend> {
    const port = await backend.mythService.GetSetting({
        Key: 'FrontendStatusPort',
        HostName: host,
        Default: DEFAULT_FE_PORT
    }
    );
    const theme = await backend.mythService.GetSetting({
        Key: 'Theme',
        HostName: host
    });
    if (!theme) {
        throw 'Invalid Frontend ' + host;
    }
    return new Frontend({ hostname: host, port: parseInt(port), protocol: DEFAULT_PROTOCOL });
}
