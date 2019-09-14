import { ServiceProvider } from "./Communication";

export interface StringList {
    StringList: string[];
}
export interface String {
    String: string;
}

export interface Bool {
    bool: boolean;
}


export enum RecStatusType {
    Pending = -15,
    Failing = -14,
    MissedFuture = -11,
    Tuning = -10,
    Failed = -9,
    TunerBusy = -8,
    LowDiskSpace = -7,
    Cancelled = -6,
    Missed = -5,
    Aborted = -4,
    Recorded = -3,
    Recording = -2,
    WillRecord = -1,
    Unknown = 0,
    DontRecord = 1,
    PreviousRecording = 2,
    CurrentRecording = 3,
    EarlierShowing = 4,
    TooManyRecordings = 5,
    NotListed = 6,
    Conflict = 7,
    LaterShowing = 8,
    Repeat = 9,
    Inactive = 10,
    NeverRecord = 11,
    Offline = 12
}

export interface RecordingInfo {
    RecordedId: number
    Status: RecStatusType
    Priority: number
    StartTs: Date
    EndTs: Date
    FileSize: number
    FileName: string
    HostName: string
    LastModified: Date
    RecordId: number
    RecGroup: string
    PlayGroup: string
    StorageGroup: string
    RecType: number
    DupInType: number
    DupMethod: number
    EncoderId: number
    EncoderName: string
    Profile: string
}
export interface ChannelInfo {
    ChanId: number
    ChanNum: string
    CallSign: string
    ChannelName: string
    IconURL: string
    MplexId?: number
    ServiceId?: number
    ATSCMajorChan?: number
    ATSCMinorChan?: number
    Format?: string
    FrequencyId?: string
    FineTune?: number
    ChanFilters?: string
    SourceId?: number
    InputId?: number
    CommFree?: boolean
    UseEIT?: boolean
    Visible?: boolean
    XMLTVID?: string
    DefaultAuth?: string
    Programs: Program[]
}
export interface Program {
    StartTime: Date
    EndTime: Date
    Title: string
    SubTitle: string
    Category: string
    CatType: string
    Repeat: boolean
    VideoProps: number
    AudioProps: number
    SubProps: number
    SeriesId: string
    ProgramId: string
    Stars: number
    LastModified: Date
    ProgramFlags: number
    Airdate: Date
    Description: string
    Inetref: string
    Season: number
    Episode: number
    TotalEpisodes: number
    FileSize: number
    FileName: string
    HostName: string
    Channel: ChannelInfo
    Recording: RecordingInfo
    Artwork: ArtworkInfoList
}

export interface ArtworkInfo {
    URL: string
    FileName: string
    StorageGroup: string
    Type: string
}

export interface ArtworkInfoList {
    ArtworkInfos: ArtworkInfo[]
}

export interface CastMemberList {
    CastMembers: CastMember[]
}

export interface CastMember {
    Name: string
    CharacterName: string
    Role: string
    TranslatedRole: string
}

export async function BoolPost(serviceProvider: ServiceProvider, api: string, service: string, params?: any, data?: any): Promise<void> {
    const resp = await serviceProvider.post<Bool>(api, service, params, data);
    if (!resp.bool) {
        throw 'Failed api:' + api + ' service:' + service;
    }
}

export async function StringGet(serviceProvider: ServiceProvider, api: string, service: string, params?: any): Promise<string> {
    const resp = await serviceProvider.get<String>(api, service, params);
    return resp.String;
}