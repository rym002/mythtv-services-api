import { AbstractService } from './Communication';
interface VideoMetadataInfo {
    Id: number
    Title: string
    SubTitle: string
    Tagline: string
    Director: string
    Studio: string
    Description: string
    Certification: string
    Inetref: string
    Collectionref: number
    HomePage: string
    ReleaseDate: Date
    AddDate: Date
    UserRating: number
    ChildID: number
    Length: number
    PlayCount: number
    Season: string
    Episode: string
    ParentalLevel: number
    Visible: boolean
    Watched: boolean
    Processed: boolean
    ContentType: string
    FileName: string
    Hash: string
    HostName: string
    Coverart: string
    Fanart: string
    Banner: string
    Screenshot: string
    Trailer: string
    Artwork: ArtworkInfos
    Cast: CastMembers
    Genres: GenreList
}
interface ArtworkInfo {
    URL: string
    FileName: string
    StorageGroup: string
    Type: string
}

interface ArtworkInfos {
    ArtworkInfos: ArtworkInfo[]
}

interface CastMember {
    Name: string
    CharacterName: string
    Role: string
    TranslatedRole: string
}

interface CastMembers {
    CastMembers: CastMember[]
}

interface Genre {
    Name: string
}

interface GenreList {
    GenreList: Genre[]
}
interface VideoMetadataInfoList {
    StartIndex: number
    Count: number
    CurrentPage: number
    TotalPages: number
    TotalAvailable: number
    AsOf: Date
    Version: string
    ProtoVer: string
    VideoMetadataInfos: VideoMetadataInfo[]
}

interface VideoMetadataInfoListResp {
    VideoMetadataInfoList: VideoMetadataInfoList
}

interface GetVideoListReq {
    Folder?: string
    Sort?: string
    Descending?: boolean
    StartIndex?: number
    Count?: number
}
const api = 'Video';
export class VideoService extends AbstractService {
    async GetVideoList(req: GetVideoListReq): Promise<VideoMetadataInfoList> {
        const ret = await this.serviceProvider.get<VideoMetadataInfoListResp>(api, 'GetVideoList', req);
        return ret.VideoMetadataInfoList;
    }
}