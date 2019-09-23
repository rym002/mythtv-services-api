import { BoolPost, IntPost, StringGet, StringListGet, LongGet, BoolGet, IntGet, InternalTypes } from "./CommonTypes";
import { AbstractService } from "./Communication";
import ApiTypes from './ApiTypes'

export namespace DvrService {
    export namespace Request {
        export interface GetRecordedList extends Partial<ApiTypes.ListRequest> {
            Descending?: boolean;
            TitleRegEx?: string;
            RecGroup?: string;
            StorageGroup?: string
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
        export interface RemoveRecorded {
            RecordedId: number
            ChanId: number
            StartTime: Date
            ForceDelete: boolean
            AllowRerecord: boolean
        }
        export interface SetSavedBookmark {
            RecordedId: number
            ChanId: number
            StartTime: Date
            OffsetType: string
            Offset: number
        }
        export interface StopRecording {
            RecordedId: number
        }
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
        export interface UpdateRecordedWatchedStatus {
            RecordedId: number
            ChanId: number
            StartTime: Date
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
        export interface GetOldRecordedList extends ApiTypes.SortedListRequest {
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
        export interface GetRecordScheduleList extends ApiTypes.SortedListRequest {
        }
        export type GetRecorded = InternalTypes.RecordingKey

        export interface GetRecordedCommBreak {
            RecordedId: number
            ChanId: number
            StartTime: Date
            OffsetType: string
        }
        export interface GetRecordedCutList {
            RecordedId: number
            ChanId: number
            StartTime: Date
            OffsetType: string
        }
        export interface GetRecordedSeek {
            RecordedId: number
            OffsetType: 'BYTES' | 'DURATION'
        }
        export interface GetSavedBookmark {
            RecordedId: number
            ChanId: number
            StartTime: Date
            OffsetType: string
        }
        export interface GetTitleList {
            RecGroup: string
        }
        export interface GetUpcomingList extends Partial<ApiTypes.ListRequest> {
            ShowAll?: boolean
            RecordId?: number
            RecStatus?: number
        }
        export interface ReactivateRecording {
            RecordedId: number
        }
        export interface RecStatusToDescription {
            RecStatus: number
            RecType: number
            StartTime: Date
        }
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
    const api = 'Dvr';
    export class Service extends AbstractService {
        async GetEncoderList(): Promise<ApiTypes.Encoder[]> {
            const ret = await this.serviceProvider.get<Response.EncoderList>(api, 'GetEncoderList');
            return ret.EncoderList.Encoders;
        }

        async GetRecordedList(req: Request.GetRecordedList): Promise<ApiTypes.ProgramList> {
            const ret = await this.serviceProvider.get<Response.ProgramList>(api, 'GetRecordedList', req);
            return ret.ProgramList;
        }

        async GetUpcomingList(req: Request.GetUpcomingList): Promise<ApiTypes.ProgramList> {
            const ret = await this.serviceProvider.get<Response.ProgramList>(api, 'GetUpcomingList', req);
            return ret.ProgramList;
        }
        async AddDontRecordSchedule(req: Request.AddDontRecordSchedule) {
            return BoolGet(this.serviceProvider, api, 'AddDontRecordSchedule', req);
        }
        async AddRecordSchedule(req: Request.AddRecordSchedule) {
            return IntPost(this.serviceProvider, api, 'AddRecordSchedule', req);
        }
        async DeleteRecording(req: Request.DeleteRecording) {
            return BoolPost(this.serviceProvider, api, 'DeleteRecording', req);
        }
        async DisableRecordSchedule(req: Request.DisableRecordSchedule) {
            return BoolPost(this.serviceProvider, api, 'DisableRecordSchedule', req);
        }
        async DupInToDescription(req: Request.DupInToDescription) {
            return StringGet(this.serviceProvider, api, 'DupInToDescription', req);
        }
        async DupInToString(req: Request.DupInToString) {
            return StringGet(this.serviceProvider, api, 'DupInToString', req);
        }
        async DupMethodToDescription(req: Request.DupMethodToDescription) {
            return StringGet(this.serviceProvider, api, 'DupMethodToDescription', req);
        }
        async DupMethodToString(req: Request.DupMethodToString) {
            return StringGet(this.serviceProvider, api, 'DupMethodToString', req);
        }
        async EnableRecordSchedule(req: Request.EnableRecordSchedule) {
            return BoolPost(this.serviceProvider, api, 'EnableRecordSchedule', req);
        }
        async GetConflictList(req: Request.GetConflictList): Promise<ApiTypes.ProgramList> {
            const ret = await this.serviceProvider.get<Response.ProgramList>(api, 'GetConflictList', req);
            return ret.ProgramList;
        }
        async GetExpiringList(req: Request.GetExpiringList): Promise<ApiTypes.ProgramList> {
            const ret = await this.serviceProvider.get<Response.ProgramList>(api, 'GetExpiringList', req);
            return ret.ProgramList;
        }
        async GetInputList(): Promise<ApiTypes.Input[]> {
            const ret = await this.serviceProvider.get<Response.InputList>(api, 'GetInputList');
            return ret.InputList.Inputs;
        }
        async GetOldRecordedList(req: Request.GetOldRecordedList): Promise<ApiTypes.ProgramList> {
            const ret = await this.serviceProvider.get<Response.ProgramList>(api, 'GetOldRecordedList', req);
            return ret.ProgramList;
        }
        async GetPlayGroupList() {
            return StringListGet(this.serviceProvider, api, 'GetPlayGroupList');
        }
        async GetRecGroupList() {
            return StringListGet(this.serviceProvider, api, 'GetRecGroupList');
        }
        async GetRecRuleFilterList(): Promise<ApiTypes.RecRuleFilterList> {
            const ret = await this.serviceProvider.get<Response.RecRuleFilterList>(api, 'GetRecRuleFilterList');
            return ret.RecRuleFilterList;
        }
        async GetRecStorageGroupList() {
            return StringListGet(this.serviceProvider, api, 'GetRecStorageGroupList');
        }
        async GetRecordSchedule(req: Request.GetRecordSchedule): Promise<ApiTypes.RecRule> {
            const ret = await this.serviceProvider.get<Response.RecRule>(api, 'GetRecordSchedule', req);
            return ret.RecRule;
        }
        async GetRecordScheduleList(req: Request.GetRecordScheduleList): Promise<ApiTypes.RecRuleList> {
            const ret = await this.serviceProvider.get<Response.RecRuleList>(api, 'GetRecordScheduleList', req);
            return ret.RecRuleList;
        }
        async GetRecorded(req: Request.GetRecorded): Promise<ApiTypes.Program> {
            const ret = await this.serviceProvider.get<Response.Program>(api, 'GetRecorded', req);
            return ret.Program;
        }
        async GetRecordedCommBreak(req: Request.GetRecordedCommBreak): Promise<ApiTypes.Cutting[]> {
            const ret = await this.serviceProvider.get<Response.CutList>(api, 'GetRecordedCommBreak', req);
            return ret.CutList.Cuttings;
        }
        async GetRecordedCutList(req: Request.GetRecordedCutList): Promise<ApiTypes.Cutting[]> {
            const ret = await this.serviceProvider.get<Response.CutList>(api, 'GetRecordedCutList', req);
            return ret.CutList.Cuttings;
        }
        async GetRecordedSeek(req: Request.GetRecordedSeek): Promise<ApiTypes.Cutting[]> {
            const ret = await this.serviceProvider.get<Response.CutList>(api, 'GetRecordedSeek', req);
            return ret.CutList.Cuttings;
        }
        async GetSavedBookmark(req: Request.GetSavedBookmark) {
            return LongGet(this.serviceProvider, api, 'GetSavedBookmark', req);
        }
        async GetTitleInfoList(): Promise<ApiTypes.TitleInfo[]> {
            const ret = await this.serviceProvider.get<Response.TitleInfoList>(api, 'GetTitleInfoList');
            return ret.TitleInfoList.TitleInfos;
        }
        async GetTitleList(req: Request.GetTitleList) {
            return StringListGet(this.serviceProvider, api, 'GetTitleList', req);
        }
        async ReactivateRecording(req: Request.ReactivateRecording) {
            return BoolGet(this.serviceProvider, api, 'ReactivateRecording', req);
        }
        async RecStatusToDescription(req: Request.RecStatusToDescription) {
            return StringGet(this.serviceProvider, api, 'RecStatusToDescription', req);
        }
        async RecStatusToString(req: Request.RecStatusToString) {
            return StringGet(this.serviceProvider, api, 'RecStatusToString', req);
        }
        async RecTypeToDescription(req: Request.RecTypeToDescription) {
            return StringGet(this.serviceProvider, api, 'RecTypeToDescription', req);
        }
        async RecTypeToString(req: Request.RecTypeToString) {
            return StringGet(this.serviceProvider, api, 'RecTypeToString', req);
        }
        async RecordedIdForPathname(req: Request.RecordedIdForPathname) {
            return IntGet(this.serviceProvider, api, 'RecordedIdForPathname', req);
        }
        async RemoveRecordSchedule(req: Request.RemoveRecordSchedule) {
            return BoolPost(this.serviceProvider, api, 'RemoveRecordSchedule', req);
        }
        async RemoveRecorded(req: Request.RemoveRecorded) {
            return BoolPost(this.serviceProvider, api, 'RemoveRecorded', req);
        }
        async RescheduleRecordings() {
            return BoolGet(this.serviceProvider, api, 'RescheduleRecordings');
        }
        async SetSavedBookmark(req: Request.SetSavedBookmark) {
            return BoolPost(this.serviceProvider, api, 'SetSavedBookmark', req);
        }
        async StopRecording(req: Request.StopRecording) {
            return BoolGet(this.serviceProvider, api, 'StopRecording', req);
        }
        async UnDeleteRecording(req: Request.UnDeleteRecording) {
            return BoolGet(this.serviceProvider, api, 'UnDeleteRecording', req);
        }
        async UpdateRecordSchedule(req: Request.UpdateRecordSchedule) {
            return BoolPost(this.serviceProvider, api, 'UpdateRecordSchedule', req);
        }
        async UpdateRecordedWatchedStatus(req: Request.UpdateRecordedWatchedStatus) {
            return BoolPost(this.serviceProvider, api, 'UpdateRecordedWatchedStatus', req);
        }
    }
}