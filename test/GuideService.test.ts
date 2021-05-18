import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { ApiTypes, masterBackend, GuideService } from '../src/index';
import { backendNock, toBool, toString, toStringList, convertDateParams } from './MockHelpers';
import { DataMatcherMap } from 'nock'

use(chaiAsPromised);

describe('GuideService', () => {
    const requests = {
        AddToChannelGroup: <GuideService.Request.AddToChannelGroup & DataMatcherMap>{
            ChanId: 1,
            ChannelGroupId: 2
        },
        GetChannelGroupList: <GuideService.Request.GetChannelGroupList & DataMatcherMap>{
            IncludeEmpty: false
        },
        GetChannelIcon: <GuideService.Request.GetChannelIcon & DataMatcherMap>{
            ChanId: 2
        },
        GetProgramDetails: <GuideService.Request.GetProgramDetails & DataMatcherMap>{
            ChanId: 3
        },
        GetProgramGuide: <GuideService.Request.GetProgramGuide>{
            StartTime: new Date(),
            EndTime: new Date()
        },
        GetProgramList: <GuideService.Request.GetProgramList & DataMatcherMap>{
            ChanId: 4
        },
        GetStoredSearches: <GuideService.Request.GetStoredSearches & DataMatcherMap>{
            Type: 'x'
        },
        RemoveFromChannelGroup: <GuideService.Request.RemoveFromChannelGroup & DataMatcherMap>{
            ChanId: 3,
            ChannelGroupId: 4
        },
    }
    const responses = {
        GetCategoryList: ['c1', 'c2'],
        GetChannelGroupList: <Partial<ApiTypes.ChannelGroup>[]>[
            {
                GroupId: 1,
                Name: 'n'
            }
        ],
        GetChannelIcon: 'GetChannelIcon',
        GetProgramDetails: <Partial<ApiTypes.Program>>{
            Description: 'GetProgramDetails'
        },
        GetProgramGuide: <Partial<ApiTypes.ProgramGuide>>{
            ProtoVer: 'GetProgramGuide'
        },
        GetProgramList: <Partial<ApiTypes.ProgramList>[]>[
            {
                Version: 'GetProgramList'
            }
        ],
        GetStoredSearches: ['GetStoredSearches', 'GetStoredSearches2']
    }
    before(() => {
        backendNock('Guide')
            .post("/AddToChannelGroup")
            .query(requests.AddToChannelGroup)
            .reply(200, toBool(true))
            .get("/GetCategoryList")
            .reply(200, toStringList(responses.GetCategoryList))
            .get("/GetChannelGroupList")
            .query(requests.GetChannelGroupList)
            .reply(200, {
                ChannelGroupList: {
                    ChannelGroups: responses.GetChannelGroupList
                }
            })
            .get("/GetChannelIcon")
            .query(requests.GetChannelIcon)
            .reply(200, toString(responses.GetChannelIcon))
            .get("/GetProgramDetails")
            .query(requests.GetProgramDetails)
            .reply(200, {
                Program: responses.GetProgramDetails
            })
            .get("/GetProgramGuide")
            .query({
                ...requests.GetProgramGuide,
                ...convertDateParams(requests.GetProgramGuide, ['EndTime', 'StartTime'])
            })
            .reply(200, {
                ProgramGuide: responses.GetProgramGuide
            })
            .get("/GetProgramList")
            .query(requests.GetProgramList)
            .reply(200, {
                ProgramList: responses.GetProgramList
            })
            .get("/GetStoredSearches")
            .query(requests.GetStoredSearches)
            .reply(200, toStringList(responses.GetStoredSearches))
            .post("/RemoveFromChannelGroup")
            .query(requests.RemoveFromChannelGroup)
            .reply(200, toBool(true))
    })
    it('AddToChannelGroup', async () => {
        await masterBackend.guideService.AddToChannelGroup(requests.AddToChannelGroup)
    })
    it('GetCategoryList', async () => {
        await expect(masterBackend.guideService.GetCategoryList())
            .to.eventually.eql(responses.GetCategoryList)
    })
    it('GetChannelGroupList', async () => {
        await expect(masterBackend.guideService.GetChannelGroupList(requests.GetChannelGroupList))
            .to.eventually.eql(responses.GetChannelGroupList)
    })
    it('GetChannelIcon', async () => {
        await expect(masterBackend.guideService.GetChannelIcon(requests.GetChannelIcon))
            .to.eventually.eql(responses.GetChannelIcon)
    })
    it('GetProgramDetails', async () => {
        await expect(masterBackend.guideService.GetProgramDetails(requests.GetProgramDetails))
            .to.eventually.eql(responses.GetProgramDetails)
    })
    it('GetProgramGuide', async () => {
        await expect(masterBackend.guideService.GetProgramGuide(requests.GetProgramGuide))
            .to.eventually.eql(responses.GetProgramGuide)
    })
    it('GetProgramList', async () => {
        await expect(masterBackend.guideService.GetProgramList(requests.GetProgramList))
            .to.eventually.eql(responses.GetProgramList)
    })
    it('GetStoredSearches', async () => {
        await expect(masterBackend.guideService.GetStoredSearches(requests.GetStoredSearches))
            .to.eventually.eql(responses.GetStoredSearches)
    })
    it('RemoveFromChannelGroup', async () => {
        await masterBackend.guideService.RemoveFromChannelGroup(requests.RemoveFromChannelGroup)
    })
})