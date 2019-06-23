import { AbstractService } from './Communication';
import { BoolPost, StringList } from './CommonTypes'

interface FrontendStatusResponse {
    FrontendStatus: FrontendStatus
}
export interface StringKeyValue {
    [key: string]: string
}
export interface FrontendStatus {
    Name: string;
    Verions: string;
    State: State;
    ChapterTimes: string;
    SubtitleTracks: StringKeyValue;
    AudioTracks: StringKeyValue;
}
export interface State {
    state: string;
    chanid?: number;
    title?: string;
    playspeed?: string;
    relsecondsplayed?: number;
    reltotalseconds?: number;
    secondsplayed?: number;
    totalseconds?: number;
    programid?: string
}

export interface FrontendActionList {
    FrontendActionList: {
        ActionList: StringKeyValue;
    }
}

export interface SendMessageRequest {
    Message: string
}

export interface SendActionRequest {
    Action: string
}
export interface SendKeyRequest {
    Key: string
}

export interface PlayRecordingRecordedIdReq {
    RecordedId: number
}

export interface PlayRecordingChanIdReq {
    ChanId: number
    StartTime: Date
}

export interface PlayVideoReq {
    Id: string
    UseBookmark: boolean
}
export enum NotificationType {
    normal = 'normal',
    error = 'error',
    warning = 'warning',
    check = 'check',
    busy = 'busy'
}
export enum PriorityType {
    default = 0,
    low = 1,
    medium = 2,
    high = 3,
    higher = 4,
    highest = 5
}
export enum VisibilityType {
    video_playback = 1 << 0,
    settings = 1 << 1,
    setup_wizard = 1 << 2,
    video_library = 1 << 3,
    music = 1 << 4,
    recordings_library = 1 << 5
}
export interface SendNotificationReq {
    Message: string
    Error?: boolean,
    Type?: NotificationType
    Origin?: string,
    Description?: string,
    Image?: string,
    Extra?: string,
    ProgressText?: string,
    Progress?: number,
    Timeout?: number,
    Fullscreen?: boolean,
    Visibility?: VisibilityType,
    Priority?: PriorityType
}
const api = "Frontend";
export class Frontend extends AbstractService {

    async GetActionList(): Promise<StringKeyValue> {
        const status = await this.serviceProvider.get<FrontendActionList>(api, 'GetActionList', {});
        return status.FrontendActionList.ActionList;
    }

    async GetStatus(): Promise<FrontendStatus> {
        const status = await this.serviceProvider.get<FrontendStatusResponse>(api, 'GetStatus', {});
        return status.FrontendStatus;
    }

    async SendMessage(req: SendMessageRequest): Promise<void> {
        return BoolPost(this.serviceProvider, api, 'SendMessage', req);
    }

    async SendAction(req: SendActionRequest, ignoreError?: boolean): Promise<void> {
        try {
            await BoolPost(this.serviceProvider, api, 'SendAction', req);
        } catch (err) {
            if (!ignoreError) {
                throw err;
            }
        }
    }

    async SendKey(req: SendKeyRequest): Promise<void> {
        return BoolPost(this.serviceProvider, api, 'SendKey', req);
    }

    async PlayRecording(req: PlayRecordingRecordedIdReq | PlayRecordingChanIdReq): Promise<void> {
        return BoolPost(this.serviceProvider, api, 'PlayRecording', req);
    }
    async PlayVideo(req: PlayVideoReq): Promise<void> {
        return BoolPost(this.serviceProvider, api, 'PlayVideo', req);
    }
    async GetContextList(): Promise<string[]> {
        const status = await this.serviceProvider.get<StringList>(api, 'GetContextList', {});
        return status.StringList;
    }
    async SendNotification(req: SendNotificationReq): Promise<void> {
        return BoolPost(this.serviceProvider, api, 'SendNotification', req);
    }
    hostname(): string {
        return this.serviceProvider.config.hostname;
    }
}