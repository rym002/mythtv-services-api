import { BoolPost, StringGet, StringListGet } from "./CommonTypes";
import { AbstractService } from './Communication';
import ApiTypes from './ApiTypes'
export namespace MythService {
    export namespace Request {
        export interface GetSetting {
            Key: string;
            HostName?: string;
            Default?: string
        }
        export interface AddStorageGroupDir {
            GroupName: string
            DirName: string
            HostName: string
        }
        export interface ChangePassword {
            UserName: string
            OldPassword: string
            NewPassword: string
        }

        export interface CheckDatabase {
            Repair: boolean
        }
        export interface GetConnectionInfo {
            Pin: string
        }
        export interface GetFormatDate {
            Date: Date
            ShortDate: boolean
        }
        export interface GetFormatDateTime {
            DateTime: Date
            ShortDate: boolean
        }
        export interface GetFormatTime {
            Time: Date
        }
        export interface GetLogs {
            HostName: string
            Application: string
            PID: number
            TID: number
            Thread: string
            Filename: string
            Line: number
            Function: string
            FromTime: Date
            ToTime: Date
            Level: string
            MsgContains: string
        }

        export interface GetSettingList {
            HostName?: string
        }
        export interface PutSetting {
            HostName: string
            Key: string
            Value: string
        }
        export interface RemoveStorageGroupDir {
            GroupName: string
            DirName: string
            HostName: string
        }
        export interface SendMessage {
            Message: string
            Address?: string
            udpPort?: number
            Timeout?: number
        }
        export interface SendNotification {
            Error?: boolean
            Type?: string
            Message: string
            Origin?: string
            Description?: string
            Image?: string
            Extra?: string
            ProgressText?: string
            Progress?: number
            Timeout?: number
            Fullscreen?: boolean
            Visibility?: number
            Priority?: number
            Address?: string
            udpPort?: number
        }
        export interface TestDBSettings {
            HostName: string
            UserName: string
            Password: string
            DBName: string
            dbPort: number
        }
        export interface GetFrontends {
            OnLine: boolean
        }
        export interface GetStorageGroupDirs {
            GroupName: string
            HostName: string
        }
        export interface ParseISODateString {
            DateTime: string
        }
    }
    namespace Response {
        export interface FrontendList {
            FrontendList: ApiTypes.FrontendList
        }
        export interface BackendInfo {
            BackendInfo: ApiTypes.BackendInfo
        }
        export interface ConnectionInfo {
            ConnectionInfo: ApiTypes.ConnectionInfo
        }
        export interface LogMessageList {
            LogMessageList: ApiTypes.LogMessageList
        }
        export interface SettingList {
            SettingList: ApiTypes.SettingList
        }
        export interface StorageGroupDirList {
            StorageGroupDirList: ApiTypes.StorageGroupDirList
        }
        export interface TimeZoneInfo {
            TimeZoneInfo: ApiTypes.TimeZoneInfo
        }
        export interface DateTime {
            DateTime: Date
        }
    }


    export class Service extends AbstractService {
        constructor(baseUrl: URL) {
            super(baseUrl, 'Myth')
        }

        async GetHostName(): Promise<string> {
            return StringGet(this.serviceProvider, 'GetHostName');
        }

        async GetHosts(): Promise<string[]> {
            return await StringListGet(this.serviceProvider, 'GetHosts');
        }

        async GetSetting(req: Request.GetSetting): Promise<string> {
            return StringGet(this.serviceProvider, 'GetSetting', req);
        }
        async GetFrontends(req: Partial<Request.GetFrontends>): Promise<ApiTypes.Frontend[]> {
            const value = await this.serviceProvider.get<Response.FrontendList>('GetFrontends', req)
            return value.FrontendList.Frontends
        }

        async AddStorageGroupDir(req: Request.AddStorageGroupDir): Promise<void> {
            return BoolPost(this.serviceProvider, 'AddStorageGroupDir', req);
        }

        async BackupDatabase() {
            return BoolPost(this.serviceProvider, 'BackupDatabase');
        }
        async ChangePassword(req: Request.ChangePassword) {
            return BoolPost(this.serviceProvider, 'ChangePassword', req);
        }
        async CheckDatabase(req: Request.CheckDatabase) {
            return BoolPost(this.serviceProvider, 'CheckDatabase', req);
        }
        async GetBackendInfo(): Promise<ApiTypes.BackendInfo> {
            const value = await this.serviceProvider.get<Response.BackendInfo>('GetBackendInfo')
            return value.BackendInfo
        }
        async GetConnectionInfo(req: Request.GetConnectionInfo): Promise<ApiTypes.ConnectionInfo> {
            const value = await this.serviceProvider.get<Response.ConnectionInfo>('GetConnectionInfo', req)
            return value.ConnectionInfo
        }
        async GetFormatDate(req: Request.GetFormatDate) {
            return StringGet(this.serviceProvider, 'GetFormatDate', req);
        }
        async GetFormatDateTime(req: Request.GetFormatDateTime) {
            return StringGet(this.serviceProvider, 'GetFormatDateTime', req);
        }
        async GetFormatTime(req: Request.GetFormatTime) {
            return StringGet(this.serviceProvider, 'GetFormatTime', req);
        }
        async GetKeys() {
            return StringListGet(this.serviceProvider, 'GetKeys');
        }
        async GetLogs(req: Partial<Request.GetLogs>): Promise<ApiTypes.LogMessageList> {
            const value = await this.serviceProvider.get<Response.LogMessageList>('GetLogs', req)
            return value.LogMessageList
        }
        async GetSettingList(req: Partial<Request.GetSettingList>): Promise<ApiTypes.SettingList> {
            const value = await this.serviceProvider.get<Response.SettingList>('GetSettingList', req)
            return value.SettingList
        }
        async GetStorageGroupDirs(req: Partial<Request.GetStorageGroupDirs>): Promise<ApiTypes.StorageGroupDir[]> {
            const value = await this.serviceProvider.get<Response.StorageGroupDirList>('GetStorageGroupDirs', req)
            return value.StorageGroupDirList.StorageGroupDirs
        }
        async GetTimeZone(): Promise<ApiTypes.TimeZoneInfo> {
            const value = await this.serviceProvider.get<Response.TimeZoneInfo>('GetTimeZone')
            return value.TimeZoneInfo
        }
        async ParseISODateString(req: Request.ParseISODateString): Promise<Date> {
            const value = await this.serviceProvider.get<Response.DateTime>('ParseISODateString', req)
            return value.DateTime
        }
        async ProfileText() {
            return StringGet(this.serviceProvider, 'ProfileText');
        }
        async ProfileURL() {
            return StringGet(this.serviceProvider, 'ProfileURL');
        }
        async ProfileUpdated() {
            return StringGet(this.serviceProvider, 'ProfileUpdated');
        }
        async ProfileDelete() {
            return BoolPost(this.serviceProvider, 'ProfileDelete');
        }
        async ProfileSubmit() {
            return BoolPost(this.serviceProvider, 'ProfileSubmit');
        }
        async PutSetting(req: Request.PutSetting) {
            return BoolPost(this.serviceProvider, 'PutSetting', req);
        }
        async RemoveStorageGroupDir(req: Request.RemoveStorageGroupDir) {
            return BoolPost(this.serviceProvider, 'RemoveStorageGroupDir', req);
        }
        async SendMessage(req: Request.SendMessage) {
            return BoolPost(this.serviceProvider, 'SendMessage', req);
        }
        async SendNotification(req: Request.SendNotification) {
            return BoolPost(this.serviceProvider, 'SendNotification', req);
        }
        async TestDBSettings(req: Request.TestDBSettings) {
            return BoolPost(this.serviceProvider, 'TestDBSettings', req);
        }
    }
}