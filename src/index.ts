import { ChannelService } from './ChannelService';
import { HostConfig } from './Communication';
import { DvrService } from './DvrService';
import { Frontend } from './Frontend';
import { MythService } from './MythService';
import { VideoService } from './VideoService';
import { CaptureService } from './CaptureService'
import { ContentService } from './ContentService'
import { GuideService } from './GuideService'

export { default as ApiTypes } from './ApiTypes'
export * from './ChannelService';
export * from './Communication';
export * from './DvrService';
export * from './Frontend';
export * from './MythService';
export * from './CaptureService'
export * from './ContentService'
export * from './GuideService'

const DEFAULT_FE_PORT = '6547';
const DEFAULT_BE_PORT = 6544;
const DEFAULT_PROTOCOL = 'http';
const DEFAULT_BACKEND_HOST = 'localhost';

export class BackendServices {
    readonly mythService: MythService.Service;
    readonly dvrService: DvrService.Service;
    readonly channelService: ChannelService.Service;
    readonly videoService: VideoService.Service;
    readonly captureService: CaptureService.Service;
    readonly contentService: ContentService.Service;
    readonly guideService: GuideService.Service;
    constructor(hc: HostConfig) {
        this.mythService = new MythService.Service(hc);
        this.dvrService = new DvrService.Service(hc);
        this.channelService = new ChannelService.Service(hc);
        this.videoService = new VideoService.Service(hc)
        this.captureService = new CaptureService.Service(hc)
        this.contentService = new ContentService.Service(hc)
        this.guideService = new GuideService.Service(hc)
    }
}

export let masterBackend = new BackendServices({
    hostname: DEFAULT_BACKEND_HOST,
    port: DEFAULT_BE_PORT,
    protocol: DEFAULT_PROTOCOL
});

export function masterBackendSettings(hc: HostConfig) {
    masterBackend = new BackendServices(hc);
}

export async function getFrontendServices(online: boolean): Promise<Frontend.Service[]> {
    const frontendHosts = await masterBackend.mythService.GetFrontends({
        OnLine: online
    })
    const frontendPromises = frontendHosts.map(async frontendHost => {
        return await frontend(frontendHost.IP, frontendHost.Port, frontendHost.Name)
    })
    return Promise.all(frontendPromises)
}
export async function frontend(host: string, port?: number, fehostname?: string): Promise<Frontend.Service> {
    if (!port) {
        const portValue = await masterBackend.mythService.GetSetting({
            Key: 'FrontendStatusPort',
            HostName: host,
            Default: DEFAULT_FE_PORT
        });
        port = Number(portValue)
    }
    if (!fehostname) {
        fehostname = host
    }
    return new Frontend.Service({ hostname: host, port: port, protocol: DEFAULT_PROTOCOL }, fehostname);
}
