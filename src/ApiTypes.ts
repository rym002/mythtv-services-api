namespace ApiTypes {

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

    export interface ListRequest {
        StartIndex?: number
        Count?: number
    }
    export interface DescendingListRequest extends ListRequest{
        Descending?: boolean
    }
    export interface SortedListRequest extends ListRequest {
        Sort?: string
    }
    export interface ListResponse extends Required<ListRequest> {
        TotalAvailable: number
        AsOf: Date
        Version: string
        ProtoVer: string
    }
    export interface PageResponse extends ListResponse {
        CurrentPage: number
        TotalPages: number
        TotalAvailable: number
        AsOf: Date
        Version: string
        ProtoVer: string

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


    export interface ChannelInfoList extends PageResponse {
        ChannelInfos: ChannelInfo[];
    }

    export interface Lineup {
        LineupId: string
        Name: string
        DisplayName: string
        Type: string
        Postal: string
        Device: string
    }
    export interface VideoMultiplex {
        MplexId: number
        SourceId: number
        TransportId: number
        NetworkId: number
        Frequency: number
        Inversion: string
        SymbolRate: number
        FEC: string
        Polarity: string
        Modulation: string
        Bandwidth: string
        LPCodeRate: string
        HPCodeRate: string
        TransmissionMode: string
        GuardInterval: string
        Visible: boolean
        Constellation: string
        Hierarchy: string
        ModulationSystem: string
        RollOff: string
        SIStandard: string
        ServiceVersion: number
        UpdateTimeStamp: Date
        DefaultAuthority: string
    }

    export interface VideoMultiplexList extends PageResponse {
        VideoMultiplexes: VideoMultiplex[]
    }
    export interface Encoder {
        Id: number;
        Recording: Program;
        Connected: boolean;
        HostName: string;
    }
    export interface ProgramList extends PageResponse {
        Programs: Program[]
    }
    export interface Input {
        Id: number
        CardId: number
        SourceId: number
        InputName: string
        DisplayName: string
        QuickTune: boolean
        RecPriority: number
        ScheduleOrder: number
        LiveTVOrder: number
    }
    export interface RecRuleFilterList extends PageResponse {
        RecRuleFilters: RecRuleFilter[]
    }
    export interface RecRuleFilter {
        Id: number
        Description: string
    }
    export interface RecRule {
        Id: number
        ParentId: number
        Inactive: boolean
        Title: string
        SubTitle: string
        Description: string
        Season: number
        Episode: number
        Category: string
        StartTime: Date
        EndTime: Date
        SeriesId: string
        ProgramId: string
        Inetref: string
        ChanId: number
        CallSign: string
        FindDay: number
        FindTime: Date
        Type: string
        SearchType: string
        RecPriority: number
        PreferredInput: number
        StartOffset: number
        EndOffset: number
        DupMethod: string
        DupIn: string
        Filter: number
        RecProfile: string
        RecGroup: string
        StorageGroup: string
        PlayGroup: string
        AutoExpire: boolean
        MaxEpisodes: number
        MaxNewest: boolean
        AutoCommflag: boolean
        AutoTranscode: boolean
        AutoMetaLookup: boolean
        AutoUserJob1: boolean
        AutoUserJob2: boolean
        AutoUserJob3: boolean
        AutoUserJob4: boolean
        Transcoder: number
        NextRecording: Date
        LastRecorded: Date
        LastDeleted: Date
        AverageDelay: number
    }
    export interface RecRuleList extends PageResponse {
        RecRules: RecRule[]
    }
    export interface Cutting {
        Mark: number
        Offset: number
    }
    export interface TitleInfo {
        Title: string
        Inetref: string
        Count: number
    }
    export interface FrontendList {
        Frontends: Frontend[]
    }
    export interface Frontend {
        Name: string
        IP: string
        Port: number
        OnLine: number
    }


    export interface BackendInfo {
        Build: BuildInfo
        Env: EnvInfo
        Log: LogInfo
    }
    export interface BuildInfo {
        Version: string
        LibX264: boolean
        LibDNS_SD: boolean
    }
    export interface EnvInfo {
        LANG: string
        LCALL: string
        LCCTYPE: string
        HOME: string
        MYTHCONFDIR: string
    }
    export interface LogInfo {
        LogArgs: string
    }
    export interface ConnectionInfo {
        Version: VersionInfo
        Database: DatabaseInfo
        WOL: WOLInfo
    }
    export interface VersionInfo {
        Version: string
        Branch: string
        Protocol: string
        Binary: string
        Schema: string
    }
    export interface DatabaseInfo {
        Host: string
        Ping: boolean
        Port: number
        UserName: string
        Password: string
        Name: string
        Type: string
        LocalEnabled: boolean
        LocalHostName: string
    }
    export interface WOLInfo {
        Enabled: boolean
        Reconnect: number
        Retry: number
        Command: string
    }
    export interface LogMessageList {
        HostNames: LabelValue[]
        Applications: LabelValue[]
        LogMessages: LogMessage[]
    }
    export interface LabelValue {
        Label: string
        Value: string
        Description: string
        Active: boolean
        Selected: boolean
    }
    export interface LogMessage {
        HostName: string
        Application: string
        PID: number
        TID: number
        Thread: string
        Filename: string
        Line: number
        Function: string
        Time: Date
        Level: string
        Message: string
    }
    export interface SettingList {
        [setting: string]: string
        HostName: string
    }
    export interface StorageGroupDirList {
        StorageGroupDirs: StorageGroupDir[]
    }
    export interface StorageGroupDir {
        Id: number
        GroupName: string
        HostName: string
        DirName: string
        DirRead: boolean
        DirWrite: string
        KiBFree: number
    }
    export interface TimeZoneInfo {
        TimeZoneID: string
        UTCOffset: number
        CurrentDateTime: Date
    }
    export interface VideoMetadataInfo {
        Id: number
        Title: string
        SubTitle: string
        Tagline: string
        Director: string
        Studio: string
        Description: string
        Certification: string
        Inetref: string
        Collectionref: number
        HomePage: string
        ReleaseDate: Date
        AddDate: Date
        UserRating: number
        ChildID: number
        Length: number
        PlayCount: number
        Season: number
        Episode: number
        ParentalLevel: number
        Visible: boolean
        Watched: boolean
        Processed: boolean
        ContentType: string
        FileName: string
        Hash: string
        HostName: string
        Coverart: string
        Fanart: string
        Banner: string
        Screenshot: string
        Trailer: string
        Artwork: ArtworkInfos
        Cast: CastMembers
        Genres: GenreList
    }
    export interface ArtworkInfo {
        URL: string
        FileName: string
        StorageGroup: string
        Type: string
    }

    export interface ArtworkInfos {
        ArtworkInfos: ArtworkInfo[]
    }

    export interface CastMember {
        Name: string
        CharacterName: string
        Role: string
        TranslatedRole: string
    }

    export interface CastMembers {
        CastMembers: CastMember[]
    }

    export interface Genre {
        Name: string
    }

    export interface GenreList {
        GenreList: Genre[]
    }
    export interface VideoMetadataInfoList extends ApiTypes.PageResponse {
        VideoMetadataInfos: VideoMetadataInfo[]
    }

    export interface BlurayInfo {
        Path: string
        Title: string
        AltTitle: string
        DiscLang: string
        DiscNum: number
        TotalDiscNum: number
        TitleCount: number
        ThumbCount: number
        ThumbPath: string
        TopMenuSupported: boolean
        FirstPlaySupported: boolean
        NumHDMVTitles: number
        NumBDJTitles: number
        NumUnsupportedTitles: number
        AACSDetected: boolean
        LibAACSDetected: boolean
        AACSHandled: boolean
        BDPlusDetected: boolean
        LibBDPlusDetected: boolean
        BDPlusHandled: boolean
    }

    export interface VideoLookupList extends ApiTypes.PageResponse {
        VideoLookups: VideoLookup[]
    }
    export interface VideoLookup {
        Title: string
        SubTitle: string
        Season: number
        Episode: number
        Year: number
        Tagline: string
        Description: string
        Certification: string
        Inetref: string
        Collectionref: string
        HomePage: string
        ReleaseDate: Date
        UserRating: number
        Length: number
        Language: string
        Countries: string[]
        Popularity: number
        Budget: number
        Revenue: number
        IMDB: string
        TMSRef: string
        Artwork: ArtworkItem[]
    }
    export interface ArtworkItem {
        Type: string
        Url: string
        Thumbnail: string
        Width: number
        Height: number
    }
    export interface CaptureCard {
        CardId: number
        VideoDevice: string
        AudioDevice: string
        VBIDevice: string
        CardType: string
        AudioRateLimit: number
        HostName: string
        DVBSWFilter: number
        DVBSatType: number
        DVBWaitForSeqStart: boolean
        SkipBTAudio: boolean
        DVBOnDemand: boolean
        DVBDiSEqCType: number
        FirewireSpeed: number
        FirewireModel: string
        FirewireConnection: number
        SignalTimeout: number
        ChannelTimeout: number
        DVBTuningDelay: number
        Contrast: number
        Brightness: number
        Colour: number
        Hue: number
        DiSEqCId: number
        DVBEITScan: boolean
    }
    export interface CaptureCardList {
        CaptureCards: CaptureCard[]
    }
    export interface LiveStreamInfo {
        Id: number
        Width: number
        Height: number
        Bitrate: number
        AudioBitrate: number
        SegmentSize: number
        MaxSegments: number
        StartSegment: number
        CurrentSegment: number
        SegmentCount: number
        PercentComplete: number
        Created: Date
        LastModified: Date
        RelativeURL: string
        FullURL: string
        StatusStr: string
        StatusInt: number
        StatusMessage: string
        SourceFile: string
        SourceHost: string
        SourceWidth: number
        SourceHeight: number
        AudioOnlyBitrate: number
    }
    export interface LiveStreamInfoList {
        LiveStreamInfos: LiveStreamInfo[]
    }
    export interface ChannelGroup {
        GroupId: number
        Name: string
        Password: string
    }
    export interface ChannelGroupList {
        ChannelGroups: ChannelGroup[]
    }
    export interface ProgramGuide extends ListResponse {
        StartTime: Date
        EndTime: Date
        Details: boolean
        Channels: ChannelInfo[]
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
        ActionList: StringKeyValue;
    }
    export interface LineupList {
        Lineups: Lineup[]
    }
    export interface EncoderList {
        Encoders: ApiTypes.Encoder[]
    }
    export interface InputList {
        Inputs: ApiTypes.Input[]
    }
    export interface CutList {
        Cuttings: ApiTypes.Cutting[]
    }
    export interface TitleInfoList {
        TitleInfos: ApiTypes.TitleInfo[]
    }

}

export default ApiTypes;