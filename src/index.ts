import { CaptureService } from './CaptureService';
import { ChannelService } from './ChannelService';
import { ContentService } from './ContentService';
import { DvrService } from './DvrService';
import { Frontend } from './Frontend';
import { GuideService } from './GuideService';
import { MythService } from './MythService';
import { VideoService } from './VideoService';

export { default as ApiTypes } from './ApiTypes';
export * from './CaptureService';
export * from './ChannelService';
export * from './Communication';
export * from './ContentService';
export * from './DvrService';
export * from './Frontend';
export * from './GuideService';
export * from './MythService';

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
    constructor(private readonly baseUrl: URL) {
        this.mythService = new MythService.Service(baseUrl);
        this.dvrService = new DvrService.Service(baseUrl);
        this.channelService = new ChannelService.Service(baseUrl);
        this.videoService = new VideoService.Service(baseUrl)
        this.captureService = new CaptureService.Service(baseUrl)
        this.contentService = new ContentService.Service(baseUrl)
        this.guideService = new GuideService.Service(baseUrl)
    }
    get hostname(){
        return this.baseUrl.host
    }
    get port(){
        return this.baseUrl.port
    }
    get protocol(){
        return this.baseUrl.protocol
    }
}

export let masterBackend = new BackendServices(new URL(DEFAULT_PROTOCOL + '://' + DEFAULT_BACKEND_HOST + ':' + DEFAULT_BE_PORT))

export function masterBackendSettings(baseUrl: URL) {
    masterBackend = new BackendServices(baseUrl);
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
    return new Frontend.Service(new URL(DEFAULT_PROTOCOL + '://' + host + ':' + port), fehostname);
}
