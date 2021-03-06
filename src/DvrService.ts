import { BoolPost, IntPost, StringGet, StringListGet, LongGet, BoolGet, IntGet, InternalTypes } from "./CommonTypes";
import { AbstractService } from "./Communication";
import ApiTypes from './ApiTypes'

export namespace DvrService {
    export namespace Request {
        export interface GetRecordedList extends Partial<ApiTypes.MultiSortedListRequest<'starttime' | 'title' | 'subtitle' | 'season'
            | 'episode' | 'category' | 'watched' | 'stars' | 'originalairdate' | 'recgroup' | 'storagegroup' | 'channum' | 'callsign' | 'name'>> {
            Descending?: boolean;
            TitleRegEx?: string;
            RecGroup?: string;
            StorageGroup?: string
            Category?: string
        }
        export interface RecTypeToString {
            RecType: string
        }
        export interface RecordedIdForPathname {
            Pathname: string
        }
        export interface RemoveRecordSchedule {
            RecordId: number
        }
        export type RemoveRecorded = InternalTypes.RecordingKey & {
            ForceDelete: boolean
            AllowRerecord: boolean
        }
        export type SetSavedBookmark = OffsetTypeRequest & {
            Offset: number
        }
        export type StopRecording = InternalTypes.RecordedIdRequest
        export type UnDeleteRecording = InternalTypes.RecordingKey

        export interface UpdateRecordSchedule {
            RecordId: number
            Title: string
            Subtitle: string
            Description: string
            Category: string
            StartTime: Date
            EndTime: Date
            SeriesId: string
            ProgramId: string
            ChanId: number
            Station: string
            FindDay: number
            FindTime: Date
            Inactive: boolean
            Season: number
            Episode: number
            Inetref: string
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
        }
        export type UpdateRecordedWatchedStatus = InternalTypes.RecordingKey & {
            Watched: boolean
        }
        export interface RecStatusToString {
            RecStatus: number
        }
        export interface RecTypeToDescription {
            RecType: string
        }
        export interface AddDontRecordSchedule {
            ChanId: number
            StartTime: Date
            NeverRecord: boolean
        }
        export interface AddRecordSchedule {
            Title: string
            Subtitle: string
            Description: string
            Category: string
            StartTime: Date
            EndTime: Date
            SeriesId: string
            ProgramId: string
            ChanId: number
            Station: string
            FindDay: number
            FindTime: Date
            ParentId: number
            Inactive: boolean
            Season: number
            Episode: number
            Inetref: string
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
        }
        export type DeleteRecording = InternalTypes.RecordingKey & {
            ForceDelete?: boolean
            AllowRerecord?: boolean
        }
        export interface DisableRecordSchedule {
            RecordId: number
        }
        export interface DupInToDescription {
            DupIn: string
        }
        export interface DupInToString {
            DupIn: string
        }
        export interface DupMethodToDescription {
            DupMethod: string
        }
        export interface DupMethodToString {
            DupMethod: string
        }
        export interface EnableRecordSchedule {
            RecordId: number
        }
        export interface GetConflictList extends Partial<ApiTypes.ListRequest> {
            RecordId?: number
        }
        export interface GetExpiringList extends Partial<ApiTypes.ListRequest> {
        }
        export interface GetOldRecordedList extends Partial<ApiTypes.SortedListRequest<'starttime' | 'title'>> {
            StartTime?: Date
            EndTime?: Date
            Title?: string
            SeriesId?: string
            RecordId?: number
        }
        export type GetRecordSchedule = (InternalTypes.RecordingKey | {
            RecordId: number
        } | {
            Template?: string
        })
            & {
                MakeOverride?: boolean
            }
        export interface GetRecordScheduleList extends Partial<ApiTypes.SortedListRequest<'lastrecorded' | 'nextrecording' | 'title' | 'priority' | 'type'>> {
        }
        export type GetRecorded = InternalTypes.RecordingKey
        type OffsetType = {
            OffsetType: 'BYTES' | 'DURATION'
        }
        type OffsetTypeRequest = InternalTypes.RecordingKey & OffsetType
        type OffsetTypeRecordedIdRequest = InternalTypes.RecordedIdRequest & OffsetType
        export type GetRecordedCommBreak = OffsetTypeRequest
        export type GetRecordedCutList = OffsetTypeRequest
        export type GetRecordedSeek = OffsetTypeRecordedIdRequest
        export type GetSavedBookmark = OffsetTypeRequest
        export interface GetTitleList {
            RecGroup: string
        }
        export interface GetUpcomingList extends Partial<ApiTypes.ListRequest> {
            ShowAll?: boolean
            RecordId?: number
            RecStatus?: number
        }
        export type ReactivateRecording = InternalTypes.RecordingKey
        export interface RecStatusToDescription {
            RecStatus: number
            RecType: number
            StartTime: Date
        }
        export interface GetProgramCategories {
            OnlyRecorded: boolean
        }
        export type RecordedIdForKey = InternalTypes.ChanIdRequest
    }
    namespace Response {
        export interface EncoderList {
            EncoderList: ApiTypes.EncoderList
        }

        export interface ProgramList {
            ProgramList: ApiTypes.ProgramList
        }
        export interface InputList {
            InputList: ApiTypes.InputList
        }
        export interface RecRuleFilterList {
            RecRuleFilterList: ApiTypes.RecRuleFilterList
        }
        export interface RecRule {
            RecRule: ApiTypes.RecRule
        }
        export interface RecRuleList {
            RecRuleList: ApiTypes.RecRuleList
        }
        export interface Program {
            Program: ApiTypes.Program
        }
        export interface CutList {
            CutList: ApiTypes.CutList
        }
        export interface TitleInfoList {
            TitleInfoList: ApiTypes.TitleInfoList
        }
    }
    export class Service extends AbstractService {
        constructor(baseUrl: URL) {
            super(baseUrl, 'Dvr')
        }
        async GetEncoderList(): Promise<ApiTypes.Encoder[]> {
            const ret = await this.serviceProvider.get<Response.EncoderList>('GetEncoderList');
            return ret.EncoderList.Encoders;
        }

        async GetRecordedList(req: Request.GetRecordedList): Promise<ApiTypes.ProgramList> {
            const ret = await this.serviceProvider.get<Response.ProgramList>('GetRecordedList', req);
            return ret.ProgramList;
        }

        async GetUpcomingList(req: Request.GetUpcomingList): Promise<ApiTypes.ProgramList> {
            const ret = await this.serviceProvider.get<Response.ProgramList>('GetUpcomingList', req);
            return ret.ProgramList;
        }
        async AddDontRecordSchedule(req: Request.AddDontRecordSchedule) {
            return BoolGet(this.serviceProvider, 'AddDontRecordSchedule', req);
        }
        async AddRecordSchedule(req: Request.AddRecordSchedule) {
            return IntPost(this.serviceProvider, 'AddRecordSchedule', req);
        }
        async DeleteRecording(req: Request.DeleteRecording) {
            return BoolPost(this.serviceProvider, 'DeleteRecording', req);
        }
        async DisableRecordSchedule(req: Request.DisableRecordSchedule) {
            return BoolPost(this.serviceProvider, 'DisableRecordSchedule', req);
        }
        async DupInToDescription(req: Request.DupInToDescription) {
            return StringGet(this.serviceProvider, 'DupInToDescription', req);
        }
        async DupInToString(req: Request.DupInToString) {
            return StringGet(this.serviceProvider, 'DupInToString', req);
        }
        async DupMethodToDescription(req: Request.DupMethodToDescription) {
            return StringGet(this.serviceProvider, 'DupMethodToDescription', req);
        }
        async DupMethodToString(req: Request.DupMethodToString) {
            return StringGet(this.serviceProvider, 'DupMethodToString', req);
        }
        async EnableRecordSchedule(req: Request.EnableRecordSchedule) {
            return BoolPost(this.serviceProvider, 'EnableRecordSchedule', req);
        }
        async GetConflictList(req: Request.GetConflictList): Promise<ApiTypes.ProgramList> {
            const ret = await this.serviceProvider.get<Response.ProgramList>('GetConflictList', req);
            return ret.ProgramList;
        }
        async GetExpiringList(req: Request.GetExpiringList): Promise<ApiTypes.ProgramList> {
            const ret = await this.serviceProvider.get<Response.ProgramList>('GetExpiringList', req);
            return ret.ProgramList;
        }
        async GetInputList(): Promise<ApiTypes.Input[]> {
            const ret = await this.serviceProvider.get<Response.InputList>('GetInputList');
            return ret.InputList.Inputs;
        }
        async GetOldRecordedList(req: Request.GetOldRecordedList): Promise<ApiTypes.ProgramList> {
            const ret = await this.serviceProvider.get<Response.ProgramList>('GetOldRecordedList', req);
            return ret.ProgramList;
        }
        async GetPlayGroupList() {
            return StringListGet(this.serviceProvider, 'GetPlayGroupList');
        }
        async GetRecGroupList() {
            return StringListGet(this.serviceProvider, 'GetRecGroupList');
        }
        async GetRecRuleFilterList(): Promise<ApiTypes.RecRuleFilterList> {
            const ret = await this.serviceProvider.get<Response.RecRuleFilterList>('GetRecRuleFilterList');
            return ret.RecRuleFilterList;
        }
        async GetRecStorageGroupList() {
            return StringListGet(this.serviceProvider, 'GetRecStorageGroupList');
        }
        async GetRecordSchedule(req: Request.GetRecordSchedule): Promise<ApiTypes.RecRule> {
            const ret = await this.serviceProvider.get<Response.RecRule>('GetRecordSchedule', req);
            return ret.RecRule;
        }
        async GetRecordScheduleList(req: Request.GetRecordScheduleList): Promise<ApiTypes.RecRuleList> {
            const ret = await this.serviceProvider.get<Response.RecRuleList>('GetRecordScheduleList', req);
            return ret.RecRuleList;
        }
        async GetRecorded(req: Request.GetRecorded): Promise<ApiTypes.Program> {
            const ret = await this.serviceProvider.get<Response.Program>('GetRecorded', req);
            return ret.Program;
        }
        async GetRecordedCommBreak(req: Request.GetRecordedCommBreak): Promise<ApiTypes.Cutting[]> {
            const ret = await this.serviceProvider.get<Response.CutList>('GetRecordedCommBreak', req);
            return ret.CutList.Cuttings;
        }
        async GetRecordedCutList(req: Request.GetRecordedCutList): Promise<ApiTypes.Cutting[]> {
            const ret = await this.serviceProvider.get<Response.CutList>('GetRecordedCutList', req);
            return ret.CutList.Cuttings;
        }
        async GetRecordedSeek(req: Request.GetRecordedSeek): Promise<ApiTypes.Cutting[]> {
            const ret = await this.serviceProvider.get<Response.CutList>('GetRecordedSeek', req);
            return ret.CutList.Cuttings;
        }
        async GetSavedBookmark(req: Request.GetSavedBookmark) {
            return LongGet(this.serviceProvider, 'GetSavedBookmark', req);
        }
        async GetTitleInfoList(): Promise<ApiTypes.TitleInfo[]> {
            const ret = await this.serviceProvider.get<Response.TitleInfoList>('GetTitleInfoList');
            return ret.TitleInfoList.TitleInfos;
        }
        async GetTitleList(req: Request.GetTitleList) {
            return StringListGet(this.serviceProvider, 'GetTitleList', req);
        }
        async ReactivateRecording(req: Request.ReactivateRecording) {
            return BoolGet(this.serviceProvider, 'ReactivateRecording', req);
        }
        async RecStatusToDescription(req: Request.RecStatusToDescription) {
            return StringGet(this.serviceProvider, 'RecStatusToDescription', req);
        }
        async RecStatusToString(req: Request.RecStatusToString) {
            return StringGet(this.serviceProvider, 'RecStatusToString', req);
        }
        async RecTypeToDescription(req: Request.RecTypeToDescription) {
            return StringGet(this.serviceProvider, 'RecTypeToDescription', req);
        }
        async RecTypeToString(req: Request.RecTypeToString) {
            return StringGet(this.serviceProvider, 'RecTypeToString', req);
        }
        async RecordedIdForPathname(req: Request.RecordedIdForPathname) {
            return IntGet(this.serviceProvider, 'RecordedIdForPathname', req);
        }
        async RemoveRecordSchedule(req: Request.RemoveRecordSchedule) {
            return BoolPost(this.serviceProvider, 'RemoveRecordSchedule', req);
        }
        async RemoveRecorded(req: Request.RemoveRecorded) {
            return BoolPost(this.serviceProvider, 'RemoveRecorded', req);
        }
        async RescheduleRecordings() {
            return BoolGet(this.serviceProvider, 'RescheduleRecordings');
        }
        async SetSavedBookmark(req: Request.SetSavedBookmark) {
            return BoolPost(this.serviceProvider, 'SetSavedBookmark', req);
        }
        async StopRecording(req: Request.StopRecording) {
            return BoolGet(this.serviceProvider, 'StopRecording', req);
        }
        async UnDeleteRecording(req: Request.UnDeleteRecording) {
            return BoolGet(this.serviceProvider, 'UnDeleteRecording', req);
        }
        async UpdateRecordSchedule(req: Request.UpdateRecordSchedule) {
            return BoolPost(this.serviceProvider, 'UpdateRecordSchedule', req);
        }
        async UpdateRecordedWatchedStatus(req: Request.UpdateRecordedWatchedStatus) {
            return BoolPost(this.serviceProvider, 'UpdateRecordedWatchedStatus', req);
        }
        async GetProgramCategories(req: Request.GetProgramCategories) {
            return StringListGet(this.serviceProvider, 'GetProgramCategories', req);
        }
        async RecordedIdForKey(req: Request.RecordedIdForKey) {
            return IntGet(this.serviceProvider, 'RecordedIdForKey', req);
        }
    }
}