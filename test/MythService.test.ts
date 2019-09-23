import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { masterBackend, MythService, ApiTypes } from '../src/index';
import { backendNock, toString, toStringList, toBool, convertDateParams, toDateTime } from './MockHelpers';

use(chaiAsPromised);

describe('MythService', () => {
    const requests = {
        GetSetting: <MythService.Request.GetSetting>{
            Key: 'Test',
            Default: 'defaultValue'
        },
        AddStorageGroupDir: <MythService.Request.AddStorageGroupDir>{
            DirName: 'a',
            GroupName: 'b',
            HostName: 'c'
        },
        ChangePassword: <MythService.Request.ChangePassword>{
            UserName: 'u',
            OldPassword: 'op',
            NewPassword: 'np'
        },
        CheckDatabase: <MythService.Request.CheckDatabase>{
            Repair: true
        },
        GetConnectionInfo: <MythService.Request.GetConnectionInfo>{
            Pin: '123'
        },
        GetFormatDate: <MythService.Request.GetFormatDate>{
            Date: new Date(),
            ShortDate: false
        },
        GetFormatDateTime: <MythService.Request.GetFormatDateTime>{
            DateTime: new Date(),
            ShortDate: false
        },
        GetFormatTime: <MythService.Request.GetFormatTime>{
            Time: new Date(),
            ShortDate: false
        },
        GetFrontends: <MythService.Request.GetFrontends>{
            OnLine: false
        },
        GetLogs: <MythService.Request.GetLogs>{
            Application: '',
            Filename: '',
            FromTime: new Date(),
            Function: '',
            HostName: '',
            Level: '',
            Line: 1,
            MsgContains: '',
            PID: 1,
            TID: 1,
            Thread: '',
            ToTime: new Date()
        },
        GetSettingList: <MythService.Request.GetSettingList>{
            HostName: 'a'
        },
        GetStorageGroupDirs: <MythService.Request.GetStorageGroupDirs>{
            HostName: 'a',
            GroupName: 'b'
        },
        ParseISODateString: <MythService.Request.ParseISODateString>{
            DateTime:'2019'
        },
        PutSetting: <MythService.Request.PutSetting>{
            HostName:'',
            Key:'',
            Value:''
        },
        RemoveStorageGroupDir: <MythService.Request.RemoveStorageGroupDir>{
            HostName:'',
            DirName:'',
            GroupName:''
        },
        SendMessage: <MythService.Request.SendMessage>{
            Message:'msg'
        },
        SendNotification: <MythService.Request.SendNotification>{
            Message:'notif'
        },
        TestDBSettings: <MythService.Request.TestDBSettings>{
            DBName:'',
            HostName:'',
            Password:'',
            UserName:'',
            dbPort:1
        }
    }
    const responses = {
        GetHostName: 'myhost',
        GetHosts: ['myhost', "localhost", "", "."],
        GetSetting: '123',
        GetBackendInfo: <ApiTypes.BackendInfo>{
            Build: {
                LibDNS_SD: true,
                LibX264: true,
                Version: '12'
            },
            Env: {
                HOME: '',
                LANG: '',
                LCALL: '',
                LCCTYPE: '',
                MYTHCONFDIR: ''
            },
            Log: {
                LogArgs: ''
            }
        },
        GetConnectionInfo: <Partial<ApiTypes.ConnectionInfo>>{
            WOL: {
                Command: '',
                Enabled: false,
                Reconnect: 1,
                Retry: 1
            }
        },
        GetFormatDate: '2019-11',
        GetFormatDateTime: '2019-10',
        GetFormatTime: '10:10',
        GetFrontends: <Partial<ApiTypes.Frontend>[]>[{
            OnLine: 1,
            Name: 'f'
        }],
        GetKeys: ['a', 'c'],
        GetLogs: <Partial<ApiTypes.LogMessageList>>{
            Applications: [],
            HostNames: [],
            LogMessages: []
        },
        GetSettingList: <Partial<ApiTypes.SettingList>>{
            HostName: 'b',
            a: 'a'
        },
        GetStorageGroupDirs: <Partial<ApiTypes.StorageGroupDir>[]>[{
            DirName: '',
            HostName: 'a'
        }],
        GetTimeZone: <Partial<ApiTypes.TimeZoneInfo>>{
            CurrentDateTime: new Date(),
            UTCOffset: -5
        },
        ParseISODateString:  new Date(10000),
    }
    before(() => {
        backendNock('Myth')
            .get("/GetHostName")
            .reply(200, toString(responses.GetHostName))
            .get('/GetHosts')
            .reply(200, toStringList(responses.GetHosts))
            .get('/GetSetting')
            .query(requests.GetSetting)
            .reply(200, toString(responses.GetSetting))
            .post('/AddStorageGroupDir')
            .query(requests.AddStorageGroupDir)
            .reply(200, toBool(true))
            .post('/BackupDatabase')
            .reply(200, toBool(true))
            .post('/ChangePassword')
            .query(requests.ChangePassword)
            .reply(200, toBool(true))
            .post('/CheckDatabase')
            .query(requests.CheckDatabase)
            .reply(200, toBool(true))
            .get('/GetBackendInfo')
            .reply(200, {
                BackendInfo: responses.GetBackendInfo
            })
            .get('/GetConnectionInfo')
            .query(requests.GetConnectionInfo)
            .reply(200, {
                ConnectionInfo: responses.GetConnectionInfo
            })
            .get('/GetFormatDate')
            .query({
                ...requests.GetFormatDate,
                ...convertDateParams(requests.GetFormatDate, ['Date'])
            })
            .reply(200, toString(responses.GetFormatDate))
            .get('/GetFormatDateTime')
            .query({
                ...requests.GetFormatDateTime,
                ...convertDateParams(requests.GetFormatDateTime, ['DateTime'])
            })
            .reply(200, toString(responses.GetFormatDateTime))
            .get('/GetFormatTime')
            .query({
                ...requests.GetFormatTime,
                ...convertDateParams(requests.GetFormatTime, ['Time'])
            })
            .reply(200, toString(responses.GetFormatTime))
            .get('/GetFrontends')
            .query(requests.GetFrontends)
            .reply(200, {
                FrontendList: {
                    Frontends: responses.GetFrontends
                }
            })
            .get('/GetKeys')
            .reply(200, toStringList(responses.GetKeys))
            .get('/GetLogs')
            .query({
                ...requests.GetLogs,
                ...convertDateParams(requests.GetLogs, ['FromTime', 'ToTime'])
            })
            .reply(200, {
                LogMessageList:
                    responses.GetLogs
            })
            .get('/GetSettingList')
            .query(requests.GetSettingList)
            .reply(200, {
                SettingList: responses.GetSettingList
            })
            .get('/GetStorageGroupDirs')
            .query(requests.GetStorageGroupDirs)
            .reply(200, {
                StorageGroupDirList: {
                    StorageGroupDirs: responses.GetStorageGroupDirs
                }
            })
            .get('/GetTimeZone')
            .reply(200, {
                TimeZoneInfo: responses.GetTimeZone
            })
            .get('/ParseISODateString')
            .query(requests.ParseISODateString)
            .reply(200, toDateTime(responses.ParseISODateString))
            .post('/ProfileDelete')
            .reply(200, toBool(true))
            .post('/ProfileSubmit')
            .reply(200, toBool(true))
            .get('/ProfileText')
            .reply(200, toString('test'))
            .get('/ProfileURL')
            .reply(200, toString('test'))
            .get('/ProfileUpdated')
            .reply(200, toString('test'))
            .post('/PutSetting')
            .query(requests.PutSetting)
            .reply(200, toBool(true))
            .post('/RemoveStorageGroupDir')
            .query(requests.RemoveStorageGroupDir)
            .reply(200, toBool(true))
            .post('/SendMessage')
            .query(requests.SendMessage)
            .reply(200, toBool(true))
            .post('/SendNotification')
            .query(requests.SendNotification)
            .reply(200, toBool(true))
            .post('/TestDBSettings')
            .query(requests.TestDBSettings)
            .reply(200, toBool(true))
    })
    it('GetHostName', async () => {
        await expect(masterBackend.mythService.GetHostName())
            .to.eventually.equal(responses.GetHostName);
    })
    it("GetHosts", async () => {
        await expect(masterBackend.mythService.GetHosts())
            .to.eventually.eql(responses.GetHosts);
    })
    it("GetSetting", async () => {
        await expect(masterBackend.mythService.GetSetting(requests.GetSetting))
            .to.eventually.equal(responses.GetSetting);
    })
    it('AddStorageGroupDir', async () => {
        await masterBackend.mythService.AddStorageGroupDir(requests.AddStorageGroupDir);
    })
    it('BackupDatabase', async () => {
        await masterBackend.mythService.BackupDatabase();
    })
    it('ChangePassword', async () => {
        await masterBackend.mythService.ChangePassword(requests.ChangePassword);
    })
    it('CheckDatabase', async () => {
        await masterBackend.mythService.CheckDatabase(requests.CheckDatabase);
    })
    it('GetBackendInfo', async () => {
        await expect(masterBackend.mythService.GetBackendInfo())
            .to.eventually.eql(responses.GetBackendInfo);
    })
    it('GetConnectionInfo', async () => {
        await expect(masterBackend.mythService.GetConnectionInfo(requests.GetConnectionInfo))
            .to.eventually.eql(responses.GetConnectionInfo);
    })
    it('GetFormatDate', async () => {
        await expect(masterBackend.mythService.GetFormatDate(requests.GetFormatDate))
            .to.eventually.eql(responses.GetFormatDate);
    })
    it('GetFormatDateTime', async () => {
        await expect(masterBackend.mythService.GetFormatDateTime(requests.GetFormatDateTime))
            .to.eventually.eql(responses.GetFormatDateTime);
    })
    it('GetFormatTime', async () => {
        await expect(masterBackend.mythService.GetFormatTime(requests.GetFormatTime))
            .to.eventually.eql(responses.GetFormatTime);
    })
    it('GetFrontends', async () => {
        await expect(masterBackend.mythService.GetFrontends(requests.GetFrontends))
            .to.eventually.eql(responses.GetFrontends);
    })
    it('GetKeys', async () => {
        await expect(masterBackend.mythService.GetKeys())
            .to.eventually.eql(responses.GetKeys);
    })
    it('GetLogs', async () => {
        await expect(masterBackend.mythService.GetLogs(requests.GetLogs))
            .to.eventually.eql(responses.GetLogs);
    })
    it('GetSettingList', async () => {
        await expect(masterBackend.mythService.GetSettingList(requests.GetSettingList))
            .to.eventually.eql(responses.GetSettingList);
    })
    it('GetStorageGroupDirs', async () => {
        await expect(masterBackend.mythService.GetStorageGroupDirs(requests.GetStorageGroupDirs))
            .to.eventually.eql(responses.GetStorageGroupDirs);
    })
    it('GetTimeZone', async () => {
        await expect(masterBackend.mythService.GetTimeZone())
            .to.eventually.eql(responses.GetTimeZone);
    })
    it('ParseISODateString', async () => {
        await expect(masterBackend.mythService.ParseISODateString(requests.ParseISODateString))
            .to.eventually.eql(responses.ParseISODateString);
    })
    it('ProfileDelete', async () => {
        await masterBackend.mythService.ProfileDelete();
    })
    it('ProfileSubmit', async () => {
        await masterBackend.mythService.ProfileSubmit();
    })
    it('ProfileText', async () => {
        await masterBackend.mythService.ProfileText();
    })
    it('ProfileURL', async () => {
        await masterBackend.mythService.ProfileURL();
    })
    it('ProfileUpdated', async () => {
        await masterBackend.mythService.ProfileUpdated();
    })
    it('PutSetting', async () => {
        await masterBackend.mythService.PutSetting(requests.PutSetting);
    })
    it('RemoveStorageGroupDir', async () => {
        await masterBackend.mythService.RemoveStorageGroupDir(requests.RemoveStorageGroupDir);
    })
    it('SendMessage', async () => {
        await masterBackend.mythService.SendMessage(requests.SendMessage);
    })
    it('SendNotification', async () => {
        await masterBackend.mythService.SendNotification(requests.SendNotification);
    })
    it('TestDBSettings', async () => {
        await masterBackend.mythService.TestDBSettings(requests.TestDBSettings);
    })
})