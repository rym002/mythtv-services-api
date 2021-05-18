import { expect, use } from 'chai';
import 'mocha';
import * as chaiAsPromised from 'chai-as-promised';
import { masterBackend, DvrService, ApiTypes } from '../src/index';
import { backendNock, toBool, toInt, toString, toStringList, toLong, convertDateParams } from './MockHelpers';
import { DataMatcherMap } from 'nock'

use(chaiAsPromised);

describe('DvrService', () => {
    const requests = {
        GetRecordedList: {
            TitleRegEx: 'ABC'
        },
        GetUpcomingList: {
            ShowAll: true
        },
        AddDontRecordSchedule: <DvrService.Request.AddDontRecordSchedule>{
            ChanId: 1,
            NeverRecord: true,
            StartTime: new Date()
        },
        AddRecordSchedule: <DvrService.Request.AddRecordSchedule>{
            AutoCommflag: false,
            AutoExpire: false,
            AutoMetaLookup: false,
            AutoTranscode: false,
            AutoUserJob1: false,
            AutoUserJob2: false,
            AutoUserJob3: false,
            AutoUserJob4: false,
            Category: '',
            ChanId: 1,
            Description: '',
            DupIn: '',
            DupMethod: '',
            EndOffset: 1,
            EndTime: new Date(),
            Episode: 1,
            Filter: 1,
            FindDay: 1,
            FindTime: new Date(),
            Inactive: true,
            Inetref: '',
            MaxEpisodes: 1,
            MaxNewest: false,
            ParentId: 1,
            PlayGroup: '',
            PreferredInput: 1,
            ProgramId: '',
            RecGroup: '',
            RecPriority: 1,
            RecProfile: '',
            SearchType: '',
            Season: 1,
            SeriesId: '',
            StartOffset: 1,
            StartTime: new Date(),
            Station: '',
            StorageGroup: '',
            Subtitle: '',
            Title: '',
            Transcoder: 1,
            Type: ''
        },
        DeleteRecording: <DvrService.Request.DeleteRecording & DataMatcherMap>{
            AllowRerecord: true,
            ForceDelete: true,
            RecordedId: 1
        },
        DisableRecordSchedule: <DvrService.Request.DisableRecordSchedule & DataMatcherMap>{
            RecordId: 1
        },
        DupInToDescription: <DvrService.Request.DupInToDescription & DataMatcherMap>{
            DupIn: 'des'
        },
        DupInToString: <DvrService.Request.DupInToString & DataMatcherMap>{
            DupIn: 'str'
        },
        DupMethodToDescription: <DvrService.Request.DupMethodToDescription & DataMatcherMap>{
            DupMethod: 'met'
        },
        DupMethodToString: <DvrService.Request.DupMethodToString & DataMatcherMap>{
            DupMethod: 'metst'
        },
        EnableRecordSchedule: <DvrService.Request.EnableRecordSchedule & DataMatcherMap>{
            RecordId: 12
        },
        GetConflictList: <DvrService.Request.GetConflictList & DataMatcherMap>{
            RecordId: 11,
            Count: 1
        },
        GetExpiringList: <DvrService.Request.GetExpiringList & DataMatcherMap>{
            RecordId: 10,
            StartIndex: 1
        },
        GetOldRecordedList: <DvrService.Request.GetOldRecordedList & DataMatcherMap>{
            RecordId: 9,
            StartIndex: 1
        },
        GetRecordSchedule: <DvrService.Request.GetRecordSchedule & DataMatcherMap>{
            RecordId: 1
        },
        GetRecordScheduleList: <DvrService.Request.GetRecordScheduleList & DataMatcherMap>{
            Count: 10
        },
        GetRecorded: <DvrService.Request.GetRecorded & DataMatcherMap>{
            RecordedId: 99
        },
        GetRecordedCommBreak: <DvrService.Request.GetRecordedCommBreak & DataMatcherMap>{
            RecordedId: 98
        },
        GetRecordedCutList: <DvrService.Request.GetRecordedCutList & DataMatcherMap>{
            RecordedId: 97
        },
        GetRecordedSeek: <DvrService.Request.GetRecordedSeek & DataMatcherMap>{
            RecordedId: 96
        },
        GetSavedBookmark: <DvrService.Request.GetSavedBookmark & DataMatcherMap>{
            RecordedId: 95
        },
        GetTitleList: <DvrService.Request.GetTitleList & DataMatcherMap>{
            RecGroup: ''
        },
        ReactivateRecording: <DvrService.Request.ReactivateRecording & DataMatcherMap>{
            RecordedId: 987
        },
        RecStatusToDescription: <DvrService.Request.RecStatusToDescription>{
            RecStatus: 1,
            RecType: 1,
            StartTime: new Date()
        },
        RecStatusToString: <DvrService.Request.RecStatusToString & DataMatcherMap>{
            RecStatus: 2
        },
        RecTypeToDescription: <DvrService.Request.RecTypeToDescription & DataMatcherMap>{
            RecType: 'rt'
        },
        RecTypeToString: <DvrService.Request.RecTypeToString & DataMatcherMap>{
            RecType: 'rt2'
        },
        RecordedIdForPathname: <DvrService.Request.RecordedIdForPathname & DataMatcherMap>{
            Pathname: 'pn'
        },
        RemoveRecordSchedule: <DvrService.Request.RemoveRecordSchedule & DataMatcherMap>{
            RecordId: 60
        },
        RemoveRecorded: <DvrService.Request.RemoveRecorded & DataMatcherMap>{
            RecordedId: 50
        },
        SetSavedBookmark: <DvrService.Request.SetSavedBookmark & DataMatcherMap>{
            RecordedId: 50
        },
        StopRecording: <DvrService.Request.StopRecording & DataMatcherMap>{
            RecordedId: 50
        },
        UnDeleteRecording: <DvrService.Request.UnDeleteRecording & DataMatcherMap>{
            RecordedId: 51
        },
        UpdateRecordSchedule: <DvrService.Request.UpdateRecordSchedule>{
            RecordId: 1,
            AutoCommflag: false,
            AutoExpire: false,
            AutoMetaLookup: false,
            AutoTranscode: false,
            AutoUserJob1: false,
            AutoUserJob2: false,
            AutoUserJob3: false,
            AutoUserJob4: false,
            Category: '',
            ChanId: 1,
            Description: '',
            DupIn: '',
            DupMethod: '',
            EndOffset: 1,
            EndTime: new Date(),
            Episode: 1,
            Filter: 1,
            FindDay: 1,
            FindTime: new Date(),
            Inactive: true,
            Inetref: '',
            MaxEpisodes: 1,
            MaxNewest: false,
            ParentId: 1,
            PlayGroup: '',
            PreferredInput: 1,
            ProgramId: '',
            RecGroup: '',
            RecPriority: 1,
            RecProfile: '',
            SearchType: '',
            Season: 1,
            SeriesId: '',
            StartOffset: 1,
            StartTime: new Date(),
            Station: '',
            StorageGroup: '',
            Subtitle: '',
            Title: '',
            Transcoder: 1,
            Type: ''
        },
        UpdateRecordedWatchedStatus: <DvrService.Request.UpdateRecordedWatchedStatus & DataMatcherMap>{
            RecordedId: 51
        },
        GetProgramCategories: <DvrService.Request.GetProgramCategories & DataMatcherMap>{
            OnlyRecorded: false
        },
        RecordedIdForKey: <DvrService.Request.RecordedIdForKey>{
            ChanId: 1,
            StartTime: new Date()
        }
    }
    const responses = {
        GetEncoderList: <ApiTypes.Encoder[]>[{
            Id: 1
        }],
        GetRecordedList: <Partial<ApiTypes.ProgramList>>{
            AsOf: new Date(),
            Count: 2,
            Programs: []
        },
        GetUpcomingList: <Partial<ApiTypes.ProgramList>>{
            AsOf: new Date(),
            Programs: [],
            Count: 1
        },
        DupInToDescription: 'des',
        DupInToString: 'str',
        DupMethodToDescription: 'met',
        DupMethodToString: 'met',
        GetConflictList: <Partial<ApiTypes.ProgramList>>{
            AsOf: new Date(),
            Programs: [],
            Count: 2
        },
        GetExpiringList: <Partial<ApiTypes.ProgramList>>{
            AsOf: new Date(),
            Programs: [],
            Count: 3
        },
        GetInputList: <Partial<ApiTypes.Input>[]>[
            {
                CardId: 1,
                DisplayName: ''
            }
        ],
        GetOldRecordedList: <Partial<ApiTypes.ProgramList>>{
            AsOf: new Date(),
            Programs: [],
            Count: 4
        },
        GetPlayGroupList: ['p1', 'p2'],
        GetRecGroupList: ['r1', 'r2'],
        GetRecRuleFilterList: <Partial<ApiTypes.RecRuleFilterList>>{
            AsOf: new Date(),
            RecRuleFilters: [],
            Count: 4
        },
        GetRecStorageGroupList: ['s1', 's2'],
        GetRecordSchedule: <Partial<ApiTypes.RecRule>>{
            CallSign: 'ab'
        },
        GetRecordScheduleList: <Partial<ApiTypes.RecRuleList>>{
            AsOf: new Date(),
            RecRules: [],
            Count: 8
        },
        GetRecorded: <Partial<ApiTypes.Program>>{
            Airdate: new Date(),
            AudioProps: 1
        },
        GetRecordedCommBreak: <Partial<ApiTypes.Cutting>[]>[
            {
                Mark: 1,
                Offset: 2
            }
        ],
        GetRecordedCutList: <Partial<ApiTypes.Cutting>[]>[
            {
                Mark: 3,
                Offset: 4
            }
        ],
        GetRecordedSeek: <Partial<ApiTypes.Cutting>[]>[
            {
                Mark: 5,
                Offset: 6
            }
        ],
        GetSavedBookmark: 1,
        GetTitleInfoList: <Partial<ApiTypes.TitleInfo>[]>[
            {
                Count: 10,
                Inetref: '',
                Title: ''
            }
        ],
        GetTitleList: ['t1', 't2'],
        RecStatusToDescription: 'RecStatusToDescription',
        RecStatusToString: 'RecStatusToString',
        RecTypeToDescription: 'RecTypeToDescription',
        RecTypeToString: 'RecTypeToString',
        RecordedIdForPathname: 100,
        GetProgramCategories: [
            'cat1',
            'cat2'
        ],
        RecordedIdForKey: 1
    }
    before(() => {
        backendNock('Dvr')
            .get("/GetEncoderList")
            .reply(200, {
                EncoderList: {
                    Encoders: responses.GetEncoderList
                }
            }).get('/GetRecordedList')
            .query(requests.GetRecordedList)
            .reply(200, {
                ProgramList: responses.GetRecordedList
            }).get('/GetUpcomingList')
            .query(requests.GetUpcomingList)
            .reply(200, () => {
                return {
                    ProgramList: responses.GetUpcomingList
                };
            }).get('/AddDontRecordSchedule')
            .query({ ...requests.AddDontRecordSchedule, ...convertDateParams(requests.AddDontRecordSchedule, ['StartTime']) })
            .reply(200, toBool(true))
            .post('/AddRecordSchedule')
            .query({
                ...requests.AddRecordSchedule,
                ...convertDateParams(requests.AddRecordSchedule, ['EndTime', 'FindTime', 'StartTime'])
            }).reply(200, toInt(1))
            .post('/DeleteRecording')
            .query(requests.DeleteRecording).reply(200, toBool(true))
            .post('/DisableRecordSchedule')
            .query(requests.DisableRecordSchedule)
            .reply(200, toBool(true))
            .get('/DupInToDescription')
            .query(requests.DupInToDescription)
            .reply(200, toString(responses.DupInToDescription))
            .get('/DupInToString')
            .query(requests.DupInToString)
            .reply(200, toString(responses.DupInToString))
            .get('/DupMethodToDescription')
            .query(requests.DupMethodToDescription)
            .reply(200, toString(responses.DupMethodToDescription))
            .get('/DupMethodToString')
            .query(requests.DupMethodToString)
            .reply(200, toString(responses.DupMethodToString))
            .post('/EnableRecordSchedule')
            .query(requests.EnableRecordSchedule)
            .reply(200, toBool(true))
            .get('/GetConflictList')
            .query(requests.GetConflictList)
            .reply(200, {
                ProgramList: responses.GetConflictList
            })
            .get('/GetExpiringList')
            .query(requests.GetExpiringList)
            .reply(200, {
                ProgramList: responses.GetExpiringList
            })
            .get('/GetInputList')
            .reply(200, {
                InputList: {
                    Inputs: responses.GetInputList
                }
            })
            .get('/GetOldRecordedList')
            .query(requests.GetOldRecordedList)
            .reply(200, {
                ProgramList: responses.GetOldRecordedList
            })
            .get('/GetPlayGroupList')
            .reply(200, toStringList(responses.GetPlayGroupList))
            .get('/GetRecGroupList')
            .reply(200, toStringList(responses.GetRecGroupList))
            .get('/GetRecRuleFilterList')
            .reply(200, {
                RecRuleFilterList: responses.GetRecRuleFilterList
            })
            .get('/GetRecStorageGroupList')
            .reply(200, toStringList(responses.GetRecStorageGroupList))
            .get('/GetRecordSchedule')
            .query(requests.GetRecordSchedule)
            .reply(200, {
                RecRule: responses.GetRecordSchedule
            })
            .get('/GetRecordScheduleList')
            .query(requests.GetRecordScheduleList)
            .reply(200, {
                RecRuleList: responses.GetRecordScheduleList
            })
            .get('/GetRecorded')
            .query(requests.GetRecorded)
            .reply(200, {
                Program: responses.GetRecorded
            })
            .get('/GetRecordedCommBreak')
            .query(requests.GetRecordedCommBreak)
            .reply(200, {
                CutList: {
                    Cuttings: responses.GetRecordedCommBreak
                }
            })
            .get('/GetRecordedCutList')
            .query(requests.GetRecordedCutList)
            .reply(200, {
                CutList: {
                    Cuttings: responses.GetRecordedCutList
                }
            })
            .get('/GetRecordedSeek')
            .query(requests.GetRecordedSeek)
            .reply(200, {
                CutList: {
                    Cuttings: responses.GetRecordedSeek
                }
            })
            .get('/GetSavedBookmark')
            .query(requests.GetSavedBookmark)
            .reply(200, toLong(responses.GetSavedBookmark))
            .get('/GetTitleInfoList')
            .reply(200, {
                TitleInfoList: {
                    TitleInfos: responses.GetTitleInfoList
                }
            })
            .get('/GetTitleList')
            .query(requests.GetTitleList)
            .reply(200, toStringList(responses.GetTitleList))
            .get('/ReactivateRecording')
            .query(requests.ReactivateRecording)
            .reply(200, toBool(true))
            .get('/RecStatusToDescription')
            .query({
                ...requests.RecStatusToDescription,
                ...convertDateParams(requests.RecStatusToDescription, ['StartTime'])
            })
            .reply(200, toString(responses.RecStatusToDescription))
            .get('/RecStatusToString')
            .query(requests.RecStatusToString)
            .reply(200, toString(responses.RecStatusToString))
            .get('/RecTypeToDescription')
            .query(requests.RecTypeToDescription)
            .reply(200, toString(responses.RecTypeToDescription))
            .get('/RecTypeToString')
            .query(requests.RecTypeToString)
            .reply(200, toString(responses.RecTypeToString))
            .get('/RecordedIdForPathname')
            .query(requests.RecordedIdForPathname)
            .reply(200, toInt(responses.RecordedIdForPathname))
            .post('/RemoveRecordSchedule')
            .query(requests.RemoveRecordSchedule)
            .reply(200, toBool(true))
            .post('/RemoveRecorded')
            .query(requests.RemoveRecorded)
            .reply(200, toBool(true))
            .get('/RescheduleRecordings')
            .reply(200, toBool(true))
            .post('/SetSavedBookmark')
            .query(requests.SetSavedBookmark)
            .reply(200, toBool(true))
            .get('/StopRecording')
            .query(requests.StopRecording)
            .reply(200, toBool(true))
            .get('/UnDeleteRecording')
            .query(requests.UnDeleteRecording)
            .reply(200, toBool(true))
            .post('/UpdateRecordSchedule')
            .query({
                ...requests.UpdateRecordSchedule,
                ...convertDateParams(requests.UpdateRecordSchedule, ['EndTime', 'FindTime', 'StartTime'])
            })
            .reply(200, toBool(true))
            .post('/UpdateRecordedWatchedStatus')
            .query(requests.UpdateRecordedWatchedStatus)
            .reply(200, toBool(true))
            .get('/GetProgramCategories')
            .query(requests.GetProgramCategories)
            .reply(200, toStringList(responses.GetProgramCategories))
            .get('/RecordedIdForKey')
            .query({
                ...requests.RecordedIdForKey,
                ...convertDateParams(requests.RecordedIdForKey, ['StartTime'])
            })
            .reply(200, toInt(responses.RecordedIdForKey))
    })

    it('GetEncoderList', async () => {
        await expect(masterBackend.dvrService.GetEncoderList())
            .to.eventually.eql(responses.GetEncoderList);
    })

    it('GetRecordedList', async () => {
        await expect(masterBackend.dvrService.GetRecordedList(requests.GetRecordedList))
            .to.eventually.eql(responses.GetRecordedList)
    })

    it('GetUpcomingList', async () => {
        await expect(masterBackend.dvrService.GetUpcomingList(requests.GetUpcomingList))
            .to.eventually.eql(responses.GetUpcomingList)
    })
    it('AddDontRecordSchedule', async () => {
        await masterBackend.dvrService.AddDontRecordSchedule(requests.AddDontRecordSchedule)
    })
    it('AddRecordSchedule', async () => {
        await expect(masterBackend.dvrService.AddRecordSchedule(requests.AddRecordSchedule))
            .to.eventually.eql(1)
    })
    it('DeleteRecording', async () => {
        await masterBackend.dvrService.DeleteRecording(requests.DeleteRecording)
    })
    it('DisableRecordSchedule', async () => {
        await masterBackend.dvrService.DisableRecordSchedule(requests.DisableRecordSchedule)
    })
    it('DupInToDescription', async () => {
        await expect(masterBackend.dvrService.DupInToDescription(requests.DupInToDescription))
            .to.eventually.eql(responses.DupInToDescription)
    })
    it('DupInToString', async () => {
        await expect(masterBackend.dvrService.DupInToString(requests.DupInToString))
            .to.eventually.eql(responses.DupInToString)
    })
    it('DupMethodToDescription', async () => {
        await expect(masterBackend.dvrService.DupMethodToDescription(requests.DupMethodToDescription))
            .to.eventually.eql(responses.DupMethodToDescription)
    })
    it('DupMethodToString', async () => {
        await expect(masterBackend.dvrService.DupMethodToString(requests.DupMethodToString))
            .to.eventually.eql(responses.DupMethodToString)
    })
    it('EnableRecordSchedule', async () => {
        await masterBackend.dvrService.EnableRecordSchedule(requests.EnableRecordSchedule)
    })
    it('GetConflictList', async () => {
        await expect(masterBackend.dvrService.GetConflictList(requests.GetConflictList))
            .to.eventually.eql(responses.GetConflictList)
    })
    it('GetExpiringList', async () => {
        await expect(masterBackend.dvrService.GetExpiringList(requests.GetExpiringList))
            .to.eventually.eql(responses.GetExpiringList)
    })
    it('GetInputList', async () => {
        await expect(masterBackend.dvrService.GetInputList())
            .to.eventually.eql(responses.GetInputList)
    })
    it('GetOldRecordedList', async () => {
        await expect(masterBackend.dvrService.GetOldRecordedList(requests.GetOldRecordedList))
            .to.eventually.eql(responses.GetOldRecordedList)
    })
    it('GetPlayGroupList', async () => {
        await expect(masterBackend.dvrService.GetPlayGroupList())
            .to.eventually.eql(responses.GetPlayGroupList)
    })
    it('GetRecGroupList', async () => {
        await expect(masterBackend.dvrService.GetRecGroupList())
            .to.eventually.eql(responses.GetRecGroupList)
    })
    it('GetRecRuleFilterList', async () => {
        await expect(masterBackend.dvrService.GetRecRuleFilterList())
            .to.eventually.eql(responses.GetRecRuleFilterList)
    })
    it('GetRecStorageGroupList', async () => {
        await expect(masterBackend.dvrService.GetRecStorageGroupList())
            .to.eventually.eql(responses.GetRecStorageGroupList)
    })
    it('GetRecordSchedule', async () => {
        await expect(masterBackend.dvrService.GetRecordSchedule(requests.GetRecordSchedule))
            .to.eventually.eql(responses.GetRecordSchedule)
    })
    it('GetRecordScheduleList', async () => {
        await expect(masterBackend.dvrService.GetRecordScheduleList(requests.GetRecordScheduleList))
            .to.eventually.eql(responses.GetRecordScheduleList)
    })
    it('GetRecorded', async () => {
        await expect(masterBackend.dvrService.GetRecorded(requests.GetRecorded))
            .to.eventually.eql(responses.GetRecorded)
    })
    it('GetRecordedCommBreak', async () => {
        await expect(masterBackend.dvrService.GetRecordedCommBreak(requests.GetRecordedCommBreak))
            .to.eventually.eql(responses.GetRecordedCommBreak)
    })
    it('GetRecordedCutList', async () => {
        await expect(masterBackend.dvrService.GetRecordedCutList(requests.GetRecordedCutList))
            .to.eventually.eql(responses.GetRecordedCutList)
    })
    it('GetRecordedSeek', async () => {
        await expect(masterBackend.dvrService.GetRecordedSeek(requests.GetRecordedSeek))
            .to.eventually.eql(responses.GetRecordedSeek)
    })
    it('GetSavedBookmark', async () => {
        await expect(masterBackend.dvrService.GetSavedBookmark(requests.GetSavedBookmark))
            .to.eventually.eql(responses.GetSavedBookmark)
    })
    it('GetTitleInfoList', async () => {
        await expect(masterBackend.dvrService.GetTitleInfoList())
            .to.eventually.eql(responses.GetTitleInfoList)
    })
    it('GetTitleList', async () => {
        await expect(masterBackend.dvrService.GetTitleList(requests.GetTitleList))
            .to.eventually.eql(responses.GetTitleList)
    })
    it('ReactivateRecording', async () => {
        await masterBackend.dvrService.ReactivateRecording(requests.ReactivateRecording)
    })
    it('RecStatusToDescription', async () => {
        await expect(masterBackend.dvrService.RecStatusToDescription(requests.RecStatusToDescription))
            .to.eventually.eql(responses.RecStatusToDescription)
    })
    it('RecStatusToString', async () => {
        await expect(masterBackend.dvrService.RecStatusToString(requests.RecStatusToString))
            .to.eventually.eql(responses.RecStatusToString)
    })
    it('RecTypeToDescription', async () => {
        await expect(masterBackend.dvrService.RecTypeToDescription(requests.RecTypeToDescription))
            .to.eventually.eql(responses.RecTypeToDescription)
    })
    it('RecTypeToString', async () => {
        await expect(masterBackend.dvrService.RecTypeToString(requests.RecTypeToString))
            .to.eventually.eql(responses.RecTypeToString)
    })
    it('RecordedIdForPathname', async () => {
        await expect(masterBackend.dvrService.RecordedIdForPathname(requests.RecordedIdForPathname))
            .to.eventually.eql(responses.RecordedIdForPathname)
    })
    it('RemoveRecordSchedule', async () => {
        await masterBackend.dvrService.RemoveRecordSchedule(requests.RemoveRecordSchedule)
    })
    it('RemoveRecorded', async () => {
        await masterBackend.dvrService.RemoveRecorded(requests.RemoveRecorded)
    })
    it('RescheduleRecordings', async () => {
        await masterBackend.dvrService.RescheduleRecordings()
    })
    it('SetSavedBookmark', async () => {
        await masterBackend.dvrService.SetSavedBookmark(requests.SetSavedBookmark)
    })
    it('StopRecording', async () => {
        await masterBackend.dvrService.StopRecording(requests.StopRecording)
    })
    it('UnDeleteRecording', async () => {
        await masterBackend.dvrService.UnDeleteRecording(requests.UnDeleteRecording)
    })
    it('UpdateRecordSchedule', async () => {
        await masterBackend.dvrService.UpdateRecordSchedule(requests.UpdateRecordSchedule)
    })
    it('UpdateRecordedWatchedStatus', async () => {
        await masterBackend.dvrService.UpdateRecordedWatchedStatus(requests.UpdateRecordedWatchedStatus)
    })
    it('GetProgramCategories', async () => {
        await expect(masterBackend.dvrService.GetProgramCategories(requests.GetProgramCategories))
            .to.eventually.eql(responses.GetProgramCategories)
    })
    it('RecordedIdForKey', async () => {
        await expect(masterBackend.dvrService.RecordedIdForKey(requests.RecordedIdForKey))
            .to.eventually.eql(responses.RecordedIdForKey)
    })
})