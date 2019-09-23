import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { ApiTypes, masterBackend, ContentService } from '../src/index';
import { backendNock, toBool, toString, toStringList } from './MockHelpers';
import { Writable } from 'stream';

use(chaiAsPromised);

describe('ContentService', () => {
    const requests = {
        AddLiveStream: <ContentService.Request.AddLiveStream>{
            FileName: 'AddLiveStream'
        },
        AddRecordingLiveStream: <ContentService.Request.AddRecordingLiveStream>{
            RecordedId: 1
        },
        AddVideoLiveStream: <ContentService.Request.AddVideoLiveStream>{
            Id: 1
        },
        DownloadFile: <ContentService.Request.DownloadFile>{
            StorageGroup: 'x',
            URL: 'x'
        },
        GetAlbumArt: <ContentService.Request.GetAlbumArt>{
            Id: 2
        },
        GetFile: <ContentService.Request.GetFile>{
            StorageGroup: 'sg',
            FileName: 'f'
        },
        GetFileList: <ContentService.Request.GetFileList>{
            StorageGroup: 'sg'
        },
        GetDirList: <ContentService.Request.GetDirList>{
            StorageGroup: 'sg'
        },
        GetHash: <ContentService.Request.GetHash>{
            StorageGroup: 'sg',
            FileName: 'fn'
        },
        GetImageFile: <ContentService.Request.GetImageFile>{
            FileName: 'fn'
        },
        GetLiveStream: <ContentService.Request.GetLiveStream>{
            Id: 3
        },
        GetLiveStreamList: <ContentService.Request.GetLiveStreamList>{
            FileName: 'x'
        },
        GetMusic: <ContentService.Request.GetMusic>{
            Id: 3
        },
        GetPreviewImage: <ContentService.Request.GetPreviewImage>{
            RecordedId: 5
        },
        GetProgramArtworkList: <ContentService.Request.GetProgramArtworkList>{
            Inetref: 'x'
        },
        GetRecording: <ContentService.Request.GetRecording>{
            RecordedId: 5
        },
        GetRecordingArtwork: <ContentService.Request.GetRecordingArtwork>{
            Inetref: 'ra'
        },
        GetRecordingArtworkList: <ContentService.Request.GetRecordingArtworkList>{
            RecordedId: 7
        },
        GetVideo: <ContentService.Request.GetVideo>{
            Id: 6
        },
        GetVideoArtwork: <ContentService.Request.GetVideoArtwork>{
            Id: 6
        },
        RemoveLiveStream: <ContentService.Request.RemoveLiveStream>{
            Id: 7
        },
        StopLiveStream: <ContentService.Request.StopLiveStream>{
            Id: 8
        }
    }
    const responses = {
        AddLiveStream: <Partial<ApiTypes.LiveStreamInfo>>{
            Id: 1,
            FullURL: 'x'
        },
        AddRecordingLiveStream: <Partial<ApiTypes.LiveStreamInfo>>{
            Id: 2,
            FullURL: 'x'
        },
        AddVideoLiveStream: <Partial<ApiTypes.LiveStreamInfo>>{
            Id: 3,
            FullURL: 'x'
        },
        GetAlbumArt: 'GetAlbumArt',
        GetDirList: ['a', 'b'],
        GetFile: 'GetFile',
        GetFileList: ['a', 'b'],
        GetHash: 'GetHash',
        GetImageFile: 'GetImageFile',
        GetLiveStream: <Partial<ApiTypes.LiveStreamInfo>>{
            Id: 4,
            FullURL: 'x'
        },
        GetLiveStreamList: <Partial<ApiTypes.LiveStreamInfo>[]>[{
            Id: 4,
            FullURL: 'x'
        }],
        GetMusic: 'GetMusic',
        GetPreviewImage: 'GetPreviewImage',
        GetProgramArtworkList: <Partial<ApiTypes.ArtworkInfo>[]>[{
            FileName: 'art'
        }],
        GetRecording: 'GetRecording',
        GetRecordingArtwork: 'GetRecordingArtwork',
        GetRecordingArtworkList: <Partial<ApiTypes.ArtworkInfo>[]>[{
            FileName: 'recart'
        }],
        GetVideo: 'GetVideo',
        GetVideoArtwork: 'GetVideoArtwork',
        StopLiveStream: <Partial<ApiTypes.LiveStreamInfo>>{
            Id: 5,
            FullURL: 'x'
        }
    }
    before(() => {
        backendNock('Content')
            .get("/AddLiveStream")
            .query(requests.AddLiveStream)
            .reply(200, {
                LiveStreamInfo: responses.AddLiveStream
            })
            .get("/AddRecordingLiveStream")
            .query(requests.AddRecordingLiveStream)
            .reply(200, {
                LiveStreamInfo: responses.AddRecordingLiveStream
            })
            .get("/AddVideoLiveStream")
            .query(requests.AddVideoLiveStream)
            .reply(200, {
                LiveStreamInfo: responses.AddVideoLiveStream
            })
            .post("/DownloadFile")
            .query(requests.DownloadFile)
            .reply(200, toBool(true))
            .get("/GetAlbumArt")
            .query(requests.GetAlbumArt)
            .reply(200, responses.GetAlbumArt)
            .get("/GetDirList")
            .query(requests.GetDirList)
            .reply(200, toStringList(responses.GetDirList))
            .get("/GetFile")
            .query(requests.GetFile)
            .reply(200, responses.GetFile)
            .get("/GetFileList")
            .query(requests.GetFileList)
            .reply(200, toStringList(responses.GetFileList))
            .get("/GetHash")
            .query(requests.GetHash)
            .reply(200, toString(responses.GetHash))
            .get("/GetImageFile")
            .query(requests.GetImageFile)
            .reply(200, responses.GetImageFile)
            .get("/GetLiveStream")
            .query(requests.GetLiveStream)
            .reply(200, {
                LiveStreamInfo: responses.GetLiveStream
            })
            .get("/GetLiveStreamList")
            .query(requests.GetLiveStreamList)
            .reply(200, {
                LiveStreamInfoList: {
                    LiveStreamInfos: responses.GetLiveStreamList
                }
            })
            .get("/GetMusic")
            .query(requests.GetMusic)
            .reply(200, responses.GetMusic)
            .get("/GetPreviewImage")
            .query(requests.GetPreviewImage)
            .reply(200, responses.GetPreviewImage)
            .get("/GetProgramArtworkList")
            .query(requests.GetProgramArtworkList)
            .reply(200, {
                ArtworkInfoList: {
                    ArtworkInfos: responses.GetProgramArtworkList
                }
            })
            .get("/GetRecording")
            .query(requests.GetRecording)
            .reply(200, responses.GetRecording)
            .get("/GetRecordingArtwork")
            .query(requests.GetRecordingArtwork)
            .reply(200, responses.GetRecordingArtwork)
            .get("/GetRecordingArtworkList")
            .query(requests.GetRecordingArtworkList)
            .reply(200, {
                ArtworkInfoList: {
                    ArtworkInfos: responses.GetRecordingArtworkList
                }
            })
            .get("/GetVideo")
            .query(requests.GetVideo)
            .reply(200, responses.GetVideo)
            .get("/GetVideoArtwork")
            .query(requests.GetVideoArtwork)
            .reply(200, responses.GetVideoArtwork)
            .get("/RemoveLiveStream")
            .query(requests.RemoveLiveStream)
            .reply(200, toBool(true))
            .get("/StopLiveStream")
            .query(requests.StopLiveStream)
            .reply(200, {
                LiveStreamInfo: responses.StopLiveStream
            })
    })
    it('AddLiveStream', async () => {
        await expect(masterBackend.contentService.AddLiveStream(requests.AddLiveStream))
            .to.eventually.eql(responses.AddLiveStream)
    })
    it('AddRecordingLiveStream', async () => {
        await expect(masterBackend.contentService.AddRecordingLiveStream(requests.AddRecordingLiveStream))
            .to.eventually.eql(responses.AddRecordingLiveStream)
    })
    it('AddVideoLiveStream', async () => {
        await expect(masterBackend.contentService.AddVideoLiveStream(requests.AddVideoLiveStream))
            .to.eventually.eql(responses.AddVideoLiveStream)
    })
    it('DownloadFile', async () => {
        await masterBackend.contentService.DownloadFile(requests.DownloadFile)
    })
    it('GetAlbumArt', async () => {
        await masterBackend.contentService.GetAlbumArt(requests.GetAlbumArt, createWritable(responses.GetAlbumArt))
    })
    it('GetDirList', async () => {
        await expect(masterBackend.contentService.GetDirList(requests.GetDirList))
            .to.eventually.eql(responses.GetDirList)
    })
    it('GetFile', async () => {
        await masterBackend.contentService.GetFile(requests.GetFile, createWritable(responses.GetFile))
    })
    it('GetFileList', async () => {
        await expect(masterBackend.contentService.GetFileList(requests.GetFileList))
            .to.eventually.eql(responses.GetFileList)
    })
    it('GetHash', async () => {
        await expect(masterBackend.contentService.GetHash(requests.GetHash))
            .to.eventually.eql(responses.GetHash)
    })
    it('GetImageFile', async () => {
        await masterBackend.contentService.GetImageFile(requests.GetImageFile, createWritable(responses.GetImageFile))
    })
    it('GetLiveStream', async () => {
        await expect(masterBackend.contentService.GetLiveStream(requests.GetLiveStream))
            .to.eventually.eql(responses.GetLiveStream)
    })
    it('GetLiveStreamList', async () => {
        await expect(masterBackend.contentService.GetLiveStreamList(requests.GetLiveStreamList))
            .to.eventually.eql(responses.GetLiveStreamList)
    })
    it('GetMusic', async () => {
        await masterBackend.contentService.GetMusic(requests.GetMusic, createWritable(responses.GetMusic))
    })
    it('GetPreviewImage', async () => {
        await masterBackend.contentService.GetPreviewImage(requests.GetPreviewImage, createWritable(responses.GetPreviewImage))
    })
    it('GetProgramArtworkList', async () => {
        await expect(masterBackend.contentService.GetProgramArtworkList(requests.GetProgramArtworkList))
            .to.eventually.eql(responses.GetProgramArtworkList)
    })
    it('GetRecording', async () => {
        await masterBackend.contentService.GetRecording(requests.GetRecording, createWritable(responses.GetRecording))
    })
    it('GetRecordingArtwork', async () => {
        await masterBackend.contentService.GetRecordingArtwork(requests.GetRecordingArtwork, createWritable(responses.GetRecordingArtwork))
    })
    it('GetRecordingArtworkList', async () => {
        await expect(masterBackend.contentService.GetRecordingArtworkList(requests.GetRecordingArtworkList))
            .to.eventually.eql(responses.GetRecordingArtworkList)
    })
    it('GetVideo', async () => {
        await masterBackend.contentService.GetVideo(requests.GetVideo, createWritable(responses.GetVideo))
    })
    it('GetVideoArtwork', async () => {
        await masterBackend.contentService.GetVideoArtwork(requests.GetVideoArtwork, createWritable(responses.GetVideoArtwork))
    })
    it('RemoveLiveStream', async () => {
        await masterBackend.contentService.RemoveLiveStream(requests.RemoveLiveStream)
    })
    it('StopLiveStream', async () => {
        await expect(masterBackend.contentService.StopLiveStream(requests.StopLiveStream))
            .to.eventually.eql(responses.StopLiveStream)
    })

    function createWritable(expected: string): ValidatingWritable {
        return new ValidatingWritable(expected)
    }
})

class ValidatingWritable extends Writable {
    constructor(readonly expected: string) {
        super()
    }
    _write(chunk: Buffer, encoding: string, callback: (error?: Error | null) => void): void {
        const resp = chunk.toString()
        if (resp === this.expected) {
            callback(null);
        } else {
            callback(new Error(resp + "!=" + this.expected))
        }
    }
}
