import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { masterBackend, ChannelService, ApiTypes } from '../src/index'
import { backendNock, toBool, toInt, toStringList } from './MockHelpers'
import { DataMatcherMap } from 'nock'

use(chaiAsPromised);

describe('ChannelService', () => {
    const requests = {
        GetChannelInfoList: <ChannelService.Request.GetChannelInfoList & DataMatcherMap>{
            SourceID: 1,
            OnlyVisible: false,
            Details: false
        },
        GetChannelInfo: <ChannelService.Request.GetChannelInfo & DataMatcherMap>{
            ChanID: 123
        },
        AddDBChannel: <ChannelService.Request.AddDBChannel & DataMatcherMap>{
            ATSCMajorChannel: 1,
            ATSCMinorChannel: 1,
            CallSign: 'A',
            ChannelID: 1,
            ChannelName: '',
            ChannelNumber: '',
            DefaultAuthority: '',
            Format: '',
            FrequencyID: '1',
            Icon: '',
            MplexID: 1,
            ServiceID: 1,
            UseEIT: true,
            SourceID: 1,
            Visible: true,
            XMLTVID: ''
        },
        AddVideoSource: <ChannelService.Request.AddVideoSource & DataMatcherMap>{
            ConfigPath: '',
            FreqTable: '',
            Grabber: '',
            LineupId: '',
            NITId: 1,
            Password: '',
            SourceName: '',
            UseEIT: true,
            UserId: ''
        },
        FetchChannelsFromSource: <ChannelService.Request.FetchChannelsFromSource & DataMatcherMap>{
            SourceId: 1,
            CardId: 1,
            WaitForFinish: false
        },
        GetDDLineupList: <ChannelService.Request.GetDDLineupList & DataMatcherMap>{
            Source: '1',
            UserId: '',
            Password: ''
        },
        GetVideoMultiplex: <ChannelService.Request.GetVideoMultiplex & DataMatcherMap>{
            MplexID: 1
        },
        GetVideoMultiplexList: <ChannelService.Request.GetVideoMultiplexList & DataMatcherMap>{
            SourceID: 1
        },
        GetVideoSource: <ChannelService.Request.GetVideoSource & DataMatcherMap>{
            SourceID: 2
        },
        GetXMLTVIdList: <ChannelService.Request.GetXMLTVIdList & DataMatcherMap>{
            SourceID: 3
        },
        RemoveDBChannel: <ChannelService.Request.RemoveDBChannel & DataMatcherMap>{
            ChannelID: 1
        },
        RemoveVideoSource: <ChannelService.Request.RemoveVideoSource & DataMatcherMap>{
            SourceID: 4
        },
        UpdateDBChannel: <ChannelService.Request.UpdateDBChannel & DataMatcherMap>{
            ATSCMajorChannel: 1,
            ATSCMinorChannel: 1,
            CallSign: 'A',
            ChannelID: 1,
            ChannelName: '',
            ChannelNumber: '',
            DefaultAuthority: '',
            Format: '',
            FrequencyID: '1',
            Icon: '',
            MplexID: 1,
            ServiceID: 1,
            UseEIT: true,
            SourceID: 1,
            Visible: true,
            XMLTVID: ''
        },
        UpdateVideoSource: <ChannelService.Request.UpdateVideoSource & DataMatcherMap>{
            ConfigPath: '',
            FreqTable: '',
            Grabber: '',
            LineupId: '',
            NITId: 1,
            Password: '',
            SourceName: '',
            UseEIT: true,
            UserId: '',
            SourceID: 1
        }

    }
    const responses = {
        GetVideoSourceList: <ApiTypes.VideoSourceList>{
            Version: "v1",
            AsOf: new Date(),
            ProtoVer: '',
            VideoSources: []
        },
        GetChannelInfoList: <ApiTypes.ChannelInfoList>{
            Count: 1,
            CurrentPage: 1,
            TotalPages: 1,
            TotalAvailable: 1,
            AsOf: new Date(),
            Version: '',
            ProtoVer: '',
            StartIndex: 1,
            ChannelInfos: []
        },
        GetChannelInfo: <ApiTypes.ChannelInfo>{
            ChanId: 123
        },
        GetDDLineupList: <ApiTypes.Lineup[]>[{
            Device: '',
            DisplayName: '',
            LineupId: '',
            Name: '',
            Postal: '',
            Type: ''
        }],
        GetVideoMultiplex: <Partial<ApiTypes.VideoMultiplex>>{
            Bandwidth: '',
            Constellation: '',
            DefaultAuthority: '',
            FEC: ''
        },
        GetVideoMultiplexList: <Partial<ApiTypes.VideoMultiplexList>>{
            AsOf: new Date(),
            Count: 1,
            VideoMultiplexes: []
        },
        GetVideoSource: <Partial<ApiTypes.VideoSource>>{
            ConfigPath: '',
            Id: 1
        }
    }
    before(() => {
        backendNock('Channel')
            .get("/GetVideoSourceList")
            .reply(200, {
                VideoSourceList: responses.GetVideoSourceList
            }).get('/GetChannelInfoList')
            .query(requests.GetChannelInfoList)
            .reply(200, {
                ChannelInfoList: responses.GetChannelInfoList
            }).get('/GetChannelInfo')
            .query(requests.GetChannelInfo)
            .reply(200, {
                ChannelInfo: responses.GetChannelInfo
            }).post('/AddDBChannel')
            .query(requests.AddDBChannel)
            .reply(200, toBool(true))
            .post('/AddVideoSource')
            .query(requests.AddVideoSource)
            .reply(200, toInt(10))
            .get('/FetchChannelsFromSource')
            .query(requests.FetchChannelsFromSource)
            .reply(200, toInt(20))
            .get('/GetDDLineupList')
            .query(requests.GetDDLineupList)
            .reply(200, {
                LineupList: {
                    Lineups: responses.GetDDLineupList
                }
            }).get('/GetVideoMultiplex')
            .query(requests.GetVideoMultiplex)
            .reply(200, {
                VideoMultiplex: responses.GetVideoMultiplex
            }).get('/GetVideoMultiplexList')
            .query(requests.GetVideoMultiplexList)
            .reply(200, {
                VideoMultiplexList: responses.GetVideoMultiplexList
            }).get('/GetVideoSource')
            .query(requests.GetVideoSource)
            .reply(200, {
                VideoSource: responses.GetVideoSource
            }).get('/GetXMLTVIdList')
            .query(requests.GetXMLTVIdList)
            .reply(200, toStringList(['a']))
            .post('/RemoveDBChannel')
            .query(requests.RemoveDBChannel)
            .reply(200, toBool(true))
            .post('/RemoveVideoSource')
            .query(requests.RemoveVideoSource)
            .reply(200, toBool(true))
            .post('/UpdateDBChannel')
            .query(requests.UpdateDBChannel)
            .reply(200, toBool(true))
            .post('/UpdateVideoSource')
            .query(requests.UpdateVideoSource)
            .reply(200, toBool(true))
    })
    it('GetVideoSourceList', async () => {
        await expect(masterBackend.channelService.GetVideoSourceList())
            .to.eventually.eql(responses.GetVideoSourceList);
    })

    it('GetChannelInfoList', async () => {
        await expect(masterBackend.channelService.GetChannelInfoList(requests.GetChannelInfoList))
            .to.eventually.eql(responses.GetChannelInfoList);
    })

    it('GetChannelInfo', async () => {
        await expect(masterBackend.channelService.GetChannelInfo(requests.GetChannelInfo))
            .to.eventually.eql(responses.GetChannelInfo);
    })
    it('AddDBChannel', async () => {
        await masterBackend.channelService.AddDBChannel(requests.AddDBChannel);
    })
    it('AddVideoSource', async () => {
        await expect(masterBackend.channelService.AddVideoSource(requests.AddVideoSource))
            .to.eventually.equal(10);
    })
    it('FetchChannelsFromSource', async () => {
        await expect(masterBackend.channelService.FetchChannelsFromSource(requests.FetchChannelsFromSource))
            .to.eventually.equal(20);
    })
    it('GetDDLineupList', async () => {
        await expect(masterBackend.channelService.GetDDLineupList(requests.GetDDLineupList))
            .to.eventually.eql(responses.GetDDLineupList);
    })
    it('GetVideoMultiplex', async () => {
        await expect(masterBackend.channelService.GetVideoMultiplex(requests.GetVideoMultiplex))
            .to.eventually.eql(responses.GetVideoMultiplex);
    })
    it('GetVideoMultiplexList', async () => {
        await expect(masterBackend.channelService.GetVideoMultiplexList(requests.GetVideoMultiplexList))
            .to.eventually.eql(responses.GetVideoMultiplexList);
    })
    it('GetVideoSource', async () => {
        await expect(masterBackend.channelService.GetVideoSource(requests.GetVideoSource))
            .to.eventually.eql(responses.GetVideoSource);
    })
    it('GetXMLTVIdList', async () => {
        await expect(masterBackend.channelService.GetXMLTVIdList(requests.GetXMLTVIdList))
            .to.eventually.eql(['a']);
    })
    it('RemoveDBChannel', async () => {
        await masterBackend.channelService.RemoveDBChannel(requests.RemoveDBChannel);
    })
    it('RemoveVideoSource', async () => {
        await masterBackend.channelService.RemoveVideoSource(requests.RemoveVideoSource)
    })
    it('UpdateDBChannel', async () => {
        await masterBackend.channelService.UpdateDBChannel(requests.UpdateDBChannel)
    })
    it('UpdateVideoSource', async () => {
        await masterBackend.channelService.UpdateVideoSource(requests.UpdateVideoSource)
    })
})