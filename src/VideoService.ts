import { AbstractService } from './Communication';
import { BoolPost } from './CommonTypes';
import ApiTypes from './ApiTypes'

export namespace VideoService {
    export namespace Request {
        export interface GetVideoList extends Partial<ApiTypes.SortedListRequest<'added' | 'released' | 'title' | 'director'
            | 'studio' | 'plot' | 'rating' | 'year' | 'releasedate' | 'userrating' | 'length' | 'playcount' | 'filename'
            | 'hash' | 'showlevel' | 'coverfile' | 'inetref' | 'collectionref' | 'homepage' | 'childid' | 'browse' | 'watched'
            | 'playcommand' | 'category' | 'intid' | 'trailer' | 'screenshot' | 'banner' | 'fanart' | 'subtitle'
            | 'tagline' | 'season' | 'episode' | 'host' | 'insertdate' | 'processed' | 'contenttype'>> {
            Folder?: string
        }
        export interface AddVideo {
            FileName: string
            HostName: string
        }
        export interface GetBluray {
            Path: string
        }
        export interface GetVideo {
            Id: number
        }
        export interface GetVideoByFileName {
            FileName: string
        }
        export interface LookupVideo {
            Title: string
            Subtitle?: string
            Inetref?: string
            Season?: number
            Episode?: number
            GrabberType?: string
            AllowGeneric?: boolean
        }
        export interface RemoveVideoFromDB {
            Id: number
        }
        export interface UpdateVideoMetadata {
            Id: number
            Title?: string
            SubTitle?: string
            TagLine?: string
            Director?: string
            Studio?: string
            Plot?: string
            Rating?: string
            Inetref?: string
            CollectionRef?: number
            HomePage?: string
            Year?: number
            ReleaseDate?: Date
            UserRating?: number
            Length?: number
            PlayCount?: number
            Season?: number
            Episode?: number
            ShowLevel?: number
            FileName?: string
            Hash?: string
            CoverFile?: string
            ChildID?: number
            Browse?: boolean
            Watched?: boolean
            Processed?: boolean
            PlayCommand?: string
            Category?: number
            Trailer?: string
            Host?: string
            Screenshot?: string
            Banner?: string
            Fanart?: string
            InsertDate?: Date
            ContentType?: string
            Genres?: string
            Cast?: string
            Countries?: string
        }
        export interface UpdateVideoWatchedStatus {
            Id: number
            Watched: boolean
        }
    }
    namespace Response {
        export interface VideoMetadataInfoList {
            VideoMetadataInfoList: ApiTypes.VideoMetadataInfoList
        }
        export interface BlurayInfo {
            BlurayInfo: ApiTypes.BlurayInfo
        }
        export interface VideoMetadataInfo {
            VideoMetadataInfo: ApiTypes.VideoMetadataInfo
        }
        export interface VideoLookupList {
            VideoLookupList: ApiTypes.VideoLookupList
        }
    }
    const api = 'Video';
    export class Service extends AbstractService {
        async GetVideoList(req: Request.GetVideoList): Promise<ApiTypes.VideoMetadataInfoList> {
            const ret = await this.serviceProvider.get<Response.VideoMetadataInfoList>(api, 'GetVideoList', req);
            return ret.VideoMetadataInfoList;
        }
        async AddVideo(req: Request.AddVideo) {
            return BoolPost(this.serviceProvider, api, 'AddVideo', req);
        }
        async GetBluray(req: Request.GetBluray): Promise<ApiTypes.BlurayInfo> {
            const ret = await this.serviceProvider.get<Response.BlurayInfo>(api, 'GetBluray', req);
            return ret.BlurayInfo;
        }
        async GetVideo(req: Request.GetVideo): Promise<ApiTypes.VideoMetadataInfo> {
            const ret = await this.serviceProvider.get<Response.VideoMetadataInfo>(api, 'GetVideo', req);
            return ret.VideoMetadataInfo;
        }
        async GetVideoByFileName(req: Request.GetVideoByFileName): Promise<ApiTypes.VideoMetadataInfo> {
            const ret = await this.serviceProvider.get<Response.VideoMetadataInfo>(api, 'GetVideoByFileName', req);
            return ret.VideoMetadataInfo;
        }
        async LookupVideo(req: Request.LookupVideo): Promise<ApiTypes.VideoLookupList> {
            const ret = await this.serviceProvider.get<Response.VideoLookupList>(api, 'LookupVideo', req);
            return ret.VideoLookupList;
        }
        async RemoveVideoFromDB(req: Request.RemoveVideoFromDB) {
            return BoolPost(this.serviceProvider, api, 'RemoveVideoFromDB', req);
        }
        async UpdateVideoMetadata(req: Request.UpdateVideoMetadata) {
            return BoolPost(this.serviceProvider, api, 'UpdateVideoMetadata', req);
        }
        async UpdateVideoWatchedStatus(req: Request.UpdateVideoWatchedStatus) {
            return BoolPost(this.serviceProvider, api, 'UpdateVideoWatchedStatus', req);
        }
    }
}
