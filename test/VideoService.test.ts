import { expect, use } from 'chai';
import 'mocha';
import * as chaiAsPromised from 'chai-as-promised';
import { masterBackend, ApiTypes } from '../src/index'
import { backendNock, toBool } from './MockHelpers'
import { VideoService } from '../src/VideoService';
import { DataMatcherMap } from 'nock'

use(chaiAsPromised);

describe('VideoService', () => {
    const requests = {
        GetVideoList: <VideoService.Request.GetVideoList & DataMatcherMap>{
            StartIndex: 1
        },
        AddVideo: <VideoService.Request.AddVideo & DataMatcherMap>{
            FileName:'',
            HostName:''
        },
        GetBluray: <VideoService.Request.GetBluray & DataMatcherMap>{
            Path:''
        },
        GetVideo: <VideoService.Request.GetVideo & DataMatcherMap>{
            Id:1
        },
        GetVideoByFileName: <VideoService.Request.GetVideoByFileName & DataMatcherMap>{
            FileName:''
        },
        LookupVideo: <VideoService.Request.LookupVideo & DataMatcherMap>{
            AllowGeneric:true,
            Episode:0,
            GrabberType:'',
            Inetref:'',
            Season:0,
            Subtitle:'',
            Title:''
        },
        RemoveVideoFromDB: <VideoService.Request.RemoveVideoFromDB & DataMatcherMap>{
            Id:5
        },
        UpdateVideoMetadata: <VideoService.Request.UpdateVideoMetadata & DataMatcherMap>{
            Id:123,
            Year:2001
        },
        UpdateVideoWatchedStatus: <VideoService.Request.UpdateVideoWatchedStatus & DataMatcherMap>{
            Id:1,
            Watched:true
        },
    }
    const responses = {
        GetVideoList: <ApiTypes.VideoMetadataInfoList>{
            Count: 1
        },
        GetBluray: <ApiTypes.BlurayInfo>{
            AltTitle:''
        },
        GetVideo: <ApiTypes.VideoMetadataInfo>{
            AddDate:new Date(),
            FileName:'a'
        },
        GetVideoByFileName: <ApiTypes.VideoMetadataInfo>{
            AddDate:new Date(),
            FileName:'b'
        },
        LookupVideo: <Partial<ApiTypes.VideoLookupList>>{
            AsOf:new Date(),
            VideoLookups:[]
        },
    }
    before(() => {
        backendNock('Video')
            .get("/GetVideoList")
            .query(requests.GetVideoList)
            .reply(200, {
                VideoMetadataInfoList: responses.GetVideoList
            })
            .post("/AddVideo")
            .query(requests.AddVideo)
            .reply(200, toBool(true))
            .get("/GetBluray")
            .query(requests.GetBluray)
            .reply(200, {
                BlurayInfo:responses.GetBluray
            })
            .get("/GetVideo")
            .query(requests.GetVideo)
            .reply(200, {
                VideoMetadataInfo:responses.GetVideo
            })
            .get("/GetVideoByFileName")
            .query(requests.GetVideoByFileName)
            .reply(200, {
                VideoMetadataInfo:responses.GetVideoByFileName
            })
            .get("/LookupVideo")
            .query(requests.LookupVideo)
            .reply(200, {
                VideoLookupList:responses.LookupVideo
            })
            .post("/RemoveVideoFromDB")
            .query(requests.RemoveVideoFromDB)
            .reply(200, toBool(true))
            .post("/UpdateVideoMetadata")
            .query(requests.UpdateVideoMetadata)
            .reply(200, toBool(true))
            .post("/UpdateVideoWatchedStatus")
            .query(requests.UpdateVideoWatchedStatus)
            .reply(200, toBool(true))
    })

    it('GetVideoList', async () => {
        await expect(masterBackend.videoService.GetVideoList(requests.GetVideoList))
            .to.eventually.eql(responses.GetVideoList);
    })

    it('AddVideo', async () => {
        await masterBackend.videoService.AddVideo(requests.AddVideo)
    })
    it('GetBluray', async () => {
        await expect(masterBackend.videoService.GetBluray(requests.GetBluray))
            .to.eventually.eql(responses.GetBluray);
    })
    it('GetVideo', async () => {
        await expect(masterBackend.videoService.GetVideo(requests.GetVideo))
            .to.eventually.eql(responses.GetVideo);
    })
    it('GetVideoByFileName', async () => {
        await expect(masterBackend.videoService.GetVideoByFileName(requests.GetVideoByFileName))
            .to.eventually.eql(responses.GetVideoByFileName);
    })
    it('LookupVideo', async () => {
        await expect(masterBackend.videoService.LookupVideo(requests.LookupVideo))
            .to.eventually.eql(responses.LookupVideo);
    })
    it('RemoveVideoFromDB', async () => {
        await masterBackend.videoService.RemoveVideoFromDB(requests.RemoveVideoFromDB)
    })
    it('UpdateVideoMetadata', async () => {
        await masterBackend.videoService.UpdateVideoMetadata(requests.UpdateVideoMetadata)
    })
    it('UpdateVideoWatchedStatus', async () => {
        await masterBackend.videoService.UpdateVideoWatchedStatus(requests.UpdateVideoWatchedStatus)
    })
})