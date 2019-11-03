import { AbstractService } from "./Communication";
import ApiTypes from "./ApiTypes";
import { BoolPost, StringGet, StringListGet, BoolGet, InternalTypes } from "./CommonTypes";
import { Writable } from "stream";

export namespace ContentService {
    export namespace Request {
        export interface AddLiveStream extends LiveStream {
            StorageGroup?: string
            FileName: string
            HostName?: string
        }
        export type AddRecordingLiveStream = InternalTypes.RecordingKey & LiveStream

        export interface AddVideoLiveStream extends LiveStream {
            Id: number
        }
        interface LiveStream extends ImageFile {
            MaxSegments?: number
            Bitrate?: number
            AudioBitrate?: number
            SampleRate?: number
        }
        export interface DownloadFile {
            URL: string
            StorageGroup: string
        }
        export interface GetAlbumArt extends ImageFile {
            Id: number
        }
        export interface GetDirList {
            StorageGroup: string
        }
        export interface GetFile {
            StorageGroup: string
            FileName: string
        }
        export interface GetFileList {
            StorageGroup: string
        }
        export interface GetHash {
            StorageGroup: string
            FileName: string
        }
        interface ImageFile {
            Width?: number
            Height?: number
        }
        export interface GetImageFile extends ImageFile {
            StorageGroup: string
            FileName: string
        }
        export interface GetLiveStream {
            Id: number
        }
        export interface GetLiveStreamList {
            FileName?: string
        }
        export interface GetMusic {
            Id: number
        }
        export type GetPreviewImage = InternalTypes.RecordingKey
            & ImageFile
            & {
                SecsIn?: number
                Format?: string
            }
        export interface GetProgramArtworkList {
            Inetref: string
            Season?: number
        }
        export type GetRecording = InternalTypes.RecordingKey

        export interface GetRecordingArtwork extends ImageFile {
            Type?: string
            Inetref: string
            Season?: number
        }
        export type GetRecordingArtworkList = InternalTypes.RecordingKey

        export interface GetVideo {
            Id: number
        }
        export interface GetVideoArtwork extends ImageFile {
            Type?: string
            Id: number
        }
        export interface RemoveLiveStream {
            Id: number
        }
        export interface StopLiveStream {
            Id: number
        }
    }
    namespace Response {
        export interface LiveStreamInfo {
            LiveStreamInfo: ApiTypes.LiveStreamInfo
        }
        export interface GetLiveStreamList {
            LiveStreamInfoList: ApiTypes.LiveStreamInfoList
        }
        export interface ArtworkInfoList {
            ArtworkInfoList: ApiTypes.ArtworkInfoList
        }
    }
    export class Service extends AbstractService {
        constructor(baseUrl: URL){
            super(baseUrl,'Content')
        }
        async AddLiveStream(req: Request.AddLiveStream): Promise<ApiTypes.LiveStreamInfo> {
            const value = await this.serviceProvider.get<Response.LiveStreamInfo>('AddLiveStream', req);
            return value.LiveStreamInfo;
        }
        async AddRecordingLiveStream(req: Request.AddRecordingLiveStream): Promise<ApiTypes.LiveStreamInfo> {
            const value = await this.serviceProvider.get<Response.LiveStreamInfo>('AddRecordingLiveStream', req);
            return value.LiveStreamInfo;
        }
        async AddVideoLiveStream(req: Request.AddVideoLiveStream): Promise<ApiTypes.LiveStreamInfo> {
            const value = await this.serviceProvider.get<Response.LiveStreamInfo>('AddVideoLiveStream', req);
            return value.LiveStreamInfo;
        }
        async DownloadFile(req: Request.DownloadFile) {
            return BoolPost(this.serviceProvider, 'DownloadFile', req);
        }
        async GetAlbumArt(req: Request.GetAlbumArt, writable: Writable) {
            await this.serviceProvider.stream('GetAlbumArt', writable, req);
        }
        async GetDirList(req: Request.GetDirList) {
            return StringListGet(this.serviceProvider, 'GetDirList', req);
        }
        async GetFile(req: Request.GetFile, writable: Writable) {
            await this.serviceProvider.stream('GetFile', writable, req);
        }
        async GetFileList(req: Request.GetFileList) {
            return StringListGet(this.serviceProvider, 'GetFileList', req);
        }
        async GetHash(req: Request.GetHash) {
            return StringGet(this.serviceProvider, 'GetHash', req);
        }
        async GetImageFile(req: Request.GetImageFile, writable: Writable) {
            await this.serviceProvider.stream('GetImageFile', writable, req);
        }
        async GetLiveStream(req: Request.GetLiveStream): Promise<ApiTypes.LiveStreamInfo> {
            const value = await this.serviceProvider.get<Response.LiveStreamInfo>('GetLiveStream', req);
            return value.LiveStreamInfo;
        }
        async GetLiveStreamList(req: Request.GetLiveStreamList): Promise<ApiTypes.LiveStreamInfo[]> {
            const value = await this.serviceProvider.get<Response.GetLiveStreamList>('GetLiveStreamList', req);
            return value.LiveStreamInfoList.LiveStreamInfos;
        }
        async GetMusic(req: Request.GetMusic, writable: Writable) {
            await this.serviceProvider.stream('GetMusic', writable, req);
        }
        async GetPreviewImage(req: Request.GetPreviewImage, writable: Writable) {
            await this.serviceProvider.stream('GetPreviewImage', writable, req);
        }
        async GetProgramArtworkList(req: Request.GetProgramArtworkList): Promise<ApiTypes.ArtworkInfo[]> {
            const value = await this.serviceProvider.get<Response.ArtworkInfoList>('GetProgramArtworkList', req);
            return value.ArtworkInfoList.ArtworkInfos;
        }
        async GetRecording(req: Request.GetRecording, writable: Writable) {
            await this.serviceProvider.stream('GetRecording', writable, req);
        }
        async GetRecordingArtwork(req: Request.GetRecordingArtwork, writable: Writable) {
            await this.serviceProvider.stream('GetRecordingArtwork', writable, req);
        }
        async GetRecordingArtworkList(req: Request.GetRecordingArtworkList): Promise<ApiTypes.ArtworkInfo[]> {
            const value = await this.serviceProvider.get<Response.ArtworkInfoList>('GetRecordingArtworkList', req);
            return value.ArtworkInfoList.ArtworkInfos;
        }
        async GetVideo(req: Request.GetVideo, writable: Writable) {
            await this.serviceProvider.stream('GetVideo', writable, req);
        }
        async GetVideoArtwork(req: Request.GetVideoArtwork, writable: Writable) {
            await this.serviceProvider.stream('GetVideoArtwork', writable, req);
        }
        async RemoveLiveStream(req: Request.RemoveLiveStream) {
            return BoolGet(this.serviceProvider, 'RemoveLiveStream', req);
        }
        async StopLiveStream(req: Request.StopLiveStream): Promise<ApiTypes.LiveStreamInfo> {
            const value = await this.serviceProvider.get<Response.LiveStreamInfo>('StopLiveStream', req);
            return value.LiveStreamInfo;
        }
    }
}