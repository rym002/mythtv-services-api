import { Program, ChannelInfo } from "./CommonTypes";
import { AbstractService } from "./Communication";

interface ChannelInfoResponse {
    ChannelInfo: DetailedChannelInfo
}

export interface DetailedChannelInfo extends ChannelInfo {
    IconURL: string;
    MplexId?: number;
    ServiceId?: number;
    ATSCMajorChan?: number;
    ATSCMinorChan?: number;
    Format?: string;
    FrequencyId?: string;
    FineTune?: number;
    ChanFilters?: string;
    SourceId?: number;
    InputId?: number;
    CommFree?: boolean;
    UseEIT?: boolean;
    Visible?: boolean;
    XMLTVID?: string;
    DefaultAuth?: string;
    Programs: Program[]
}

interface GetVideoSourceList {
    VideoSourceList: VideoSourceList
}
export interface VideoSourceList {
    AsOf: Date;
    Version: string;
    ProtoVer: string;
    VideoSources: VideoSource[]
}

export interface VideoSource {
    Id: number;
    SourceName: string;
    Grabber: string;
    UserId: string;
    FreqTable: string;
    LineupId: string;
    Password: string;
    UseEIT: boolean;
    ConfigPath: string;
    NITId: string;
}

interface GetChannelInfoList {
    ChannelInfoList: ChannelInfoList
}

export interface ChannelInfoList {
    StartIndex: number;
    Count: number;
    CurrentPage: number;
    TotalPages: number;
    TotalAvailable: number;
    AsOf: Date;
    Version: string;
    ProtoVer: string;
    ChannelInfos: DetailedChannelInfo[];
}

interface GetChannelInfoListRequest {
    SourceID: number;
    OnlyVisible: boolean;
    Details: boolean;
    StartIndex?: number;
    Count?: number;
}
const api = 'Channel';
export class ChannelService extends AbstractService {
    async GetChannelInfo(chanID: number): Promise<DetailedChannelInfo> {
        const value = await this.serviceProvider.get<ChannelInfoResponse>(api, 'GetChannelInfo', { ChanID: chanID });
        return value.ChannelInfo;
    }

    async GetVideoSourceList(): Promise<VideoSourceList> {
        const value = await this.serviceProvider.get<GetVideoSourceList>(api, 'GetVideoSourceList');
        return value.VideoSourceList;
    }

    async GetChannelInfoList(req: GetChannelInfoListRequest): Promise<ChannelInfoList> {
        const value = await this.serviceProvider.get<GetChannelInfoList>(api, 'GetChannelInfoList', req);
        return value.ChannelInfoList;
    }
}