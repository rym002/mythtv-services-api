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


    const api = 'Myth';
    export class Service extends AbstractService {

        async GetHostName(): Promise<string> {
            return StringGet(this.serviceProvider, api, 'GetHostName');
        }

        async GetHosts(): Promise<string[]> {
            return await StringListGet(this.serviceProvider, api, 'GetHosts');
        }

        async GetSetting(req: Request.GetSetting): Promise<string> {
            return StringGet(this.serviceProvider, api, 'GetSetting', req);
        }
        async GetFrontends(req: Partial<Request.GetFrontends>): Promise<ApiTypes.Frontend[]> {
            const value = await this.serviceProvider.get<Response.FrontendList>(api, 'GetFrontends', req)
            return value.FrontendList.Frontends
        }

        async AddStorageGroupDir(req: Request.AddStorageGroupDir): Promise<void> {
            return BoolPost(this.serviceProvider, api, 'AddStorageGroupDir', req);
        }

        async BackupDatabase() {
            return BoolPost(this.serviceProvider, api, 'BackupDatabase');
        }
        async ChangePassword(req: Request.ChangePassword) {
            return BoolPost(this.serviceProvider, api, 'ChangePassword', req);
        }
        async CheckDatabase(req: Request.CheckDatabase) {
            return BoolPost(this.serviceProvider, api, 'CheckDatabase', req);
        }
        async GetBackendInfo(): Promise<ApiTypes.BackendInfo> {
            const value = await this.serviceProvider.get<Response.BackendInfo>(api, 'GetBackendInfo')
            return value.BackendInfo
        }
        async GetConnectionInfo(req: Request.GetConnectionInfo): Promise<ApiTypes.ConnectionInfo> {
            const value = await this.serviceProvider.get<Response.ConnectionInfo>(api, 'GetConnectionInfo', req)
            return value.ConnectionInfo
        }
        async GetFormatDate(req: Request.GetFormatDate) {
            return StringGet(this.serviceProvider, api, 'GetFormatDate', req);
        }
        async GetFormatDateTime(req: Request.GetFormatDateTime) {
            return StringGet(this.serviceProvider, api, 'GetFormatDateTime', req);
        }
        async GetFormatTime(req: Request.GetFormatTime) {
            return StringGet(this.serviceProvider, api, 'GetFormatTime', req);
        }
        async GetKeys() {
            return StringListGet(this.serviceProvider, api, 'GetKeys');
        }
        async GetLogs(req: Partial<Request.GetLogs>): Promise<ApiTypes.LogMessageList> {
            const value = await this.serviceProvider.get<Response.LogMessageList>(api, 'GetLogs', req)
            return value.LogMessageList
        }
        async GetSettingList(req: Partial<Request.GetSettingList>): Promise<ApiTypes.SettingList> {
            const value = await this.serviceProvider.get<Response.SettingList>(api, 'GetSettingList', req)
            return value.SettingList
        }
        async GetStorageGroupDirs(req: Partial<Request.GetStorageGroupDirs>): Promise<ApiTypes.StorageGroupDir[]> {
            const value = await this.serviceProvider.get<Response.StorageGroupDirList>(api, 'GetStorageGroupDirs', req)
            return value.StorageGroupDirList.StorageGroupDirs
        }
        async GetTimeZone(): Promise<ApiTypes.TimeZoneInfo> {
            const value = await this.serviceProvider.get<Response.TimeZoneInfo>(api, 'GetTimeZone')
            return value.TimeZoneInfo
        }
        async ParseISODateString(req: Request.ParseISODateString): Promise<Date> {
            const value = await this.serviceProvider.get<Response.DateTime>(api, 'ParseISODateString', req)
            return value.DateTime
        }
        async ProfileText() {
            return StringGet(this.serviceProvider, api, 'ProfileText');
        }
        async ProfileURL() {
            return StringGet(this.serviceProvider, api, 'ProfileURL');
        }
        async ProfileUpdated() {
            return StringGet(this.serviceProvider, api, 'ProfileUpdated');
        }
        async ProfileDelete() {
            return BoolPost(this.serviceProvider, api, 'ProfileDelete');
        }
        async ProfileSubmit() {
            return BoolPost(this.serviceProvider, api, 'ProfileSubmit');
        }
        async PutSetting(req: Request.PutSetting) {
            return BoolPost(this.serviceProvider, api, 'PutSetting', req);
        }
        async RemoveStorageGroupDir(req: Request.RemoveStorageGroupDir) {
            return BoolPost(this.serviceProvider, api, 'RemoveStorageGroupDir', req);
        }
        async SendMessage(req: Request.SendMessage) {
            return BoolPost(this.serviceProvider, api, 'SendMessage', req);
        }
        async SendNotification(req: Request.SendNotification) {
            return BoolPost(this.serviceProvider, api, 'SendNotification', req);
        }
        async TestDBSettings(req: Request.TestDBSettings) {
            return BoolPost(this.serviceProvider, api, 'TestDBSettings', req);
        }
    }
}