import { BoolPost, IntPost, IntGet, StringListGet } from "./CommonTypes";
import { AbstractService } from "./Communication";
import ApiTypes from './ApiTypes'
export namespace ChannelService {

    export namespace Request {
        export interface GetChannelInfoList extends Partial<ApiTypes.ListRequest> {
            SourceID: number;
            OnlyVisible?: boolean;
            Details?: boolean;
            OrderByName?: boolean;
            GroupByCallsign?: boolean;
        }
        export interface AddDBChannel {
            MplexID: number
            SourceID: number
            ChannelID: number
            CallSign: string
            ChannelName: string
            ChannelNumber: string
            ServiceID: number
            ATSCMajorChannel: number
            ATSCMinorChannel: number
            UseEIT: boolean
            Visible: boolean
            FrequencyID: string
            Icon: string
            Format: string
            XMLTVID: string
            DefaultAuthority: string
        }
        export interface AddVideoSource {
            SourceName: string
            Grabber: string
            UserId: string
            FreqTable: string
            LineupId: string
            Password: string
            UseEIT: boolean
            ConfigPath: string
            NITId: number
        }
        export interface FetchChannelsFromSource {
            SourceId: number
            CardId: number
            WaitForFinish: boolean
        }
        export interface GetDDLineupList {
            Source: string
            UserId: string
            Password: string
        }
        export interface GetVideoMultiplex {
            MplexID: number
        }
        export interface GetVideoSource {
            SourceID: number
        }
        export interface GetXMLTVIdList {
            SourceID: number
        }
        export interface RemoveDBChannel {
            ChannelID: number
        }
        export interface RemoveVideoSource {
            SourceID: number
        }
        export interface UpdateDBChannel {
            MplexID: number
            SourceID: number
            ChannelID: number
            CallSign: string
            ChannelName: string
            ChannelNumber: string
            ServiceID: number
            ATSCMajorChannel: number
            ATSCMinorChannel: number
            UseEIT: boolean
            Visible: boolean
            FrequencyID: string
            Icon: string
            Format: string
            XMLTVID: string
            DefaultAuthority: string
        }
        export interface UpdateVideoSource {
            SourceID: number
            SourceName: string
            Grabber: string
            UserId: string
            FreqTable: string
            LineupId: string
            Password: string
            UseEIT: boolean
            ConfigPath: string
            NITId: number
        }
        export interface GetVideoMultiplexList extends Partial<ApiTypes.ListRequest> {
            SourceID: number
        }
        export interface GetChannelInfo {
            ChanID: number
        }
    }
    namespace Response {
        export interface ChannelInfo {
            ChannelInfo: ApiTypes.ChannelInfo
        }
        export interface LineupList {
            LineupList: ApiTypes.LineupList
        }
        export interface VideoMultiplexList {
            VideoMultiplexList: ApiTypes.VideoMultiplexList
        }
        export interface VideoSourceList {
            VideoSourceList: ApiTypes.VideoSourceList
        }
        export interface VideoMultiplex {
            VideoMultiplex: ApiTypes.VideoMultiplex
        }
        export interface ChannelInfoList {
            ChannelInfoList: ApiTypes.ChannelInfoList
        }
        export interface VideoSource {
            VideoSource: ApiTypes.VideoSource
        }
    }


    const api = 'Channel';
    export class Service extends AbstractService {
        async GetChannelInfo(req: Request.GetChannelInfo): Promise<ApiTypes.ChannelInfo> {
            const value = await this.serviceProvider.get<Response.ChannelInfo>(api, 'GetChannelInfo', req);
            return value.ChannelInfo;
        }

        async GetVideoSourceList(): Promise<ApiTypes.VideoSourceList> {
            const value = await this.serviceProvider.get<Response.VideoSourceList>(api, 'GetVideoSourceList');
            return value.VideoSourceList;
        }

        async GetChannelInfoList(req: Request.GetChannelInfoList): Promise<ApiTypes.ChannelInfoList> {
            const value = await this.serviceProvider.get<Response.ChannelInfoList>(api, 'GetChannelInfoList', req);
            return value.ChannelInfoList;
        }
        async AddDBChannel(req: Request.AddDBChannel) {
            return BoolPost(this.serviceProvider, api, 'AddDBChannel', req);
        }
        async AddVideoSource(req: Request.AddVideoSource) {
            return IntPost(this.serviceProvider, api, 'AddVideoSource', req);
        }
        async FetchChannelsFromSource(req: Request.FetchChannelsFromSource) {
            return IntGet(this.serviceProvider, api, 'FetchChannelsFromSource', req);
        }
        async GetDDLineupList(req: Request.GetDDLineupList): Promise<ApiTypes.Lineup[]> {
            const value = await this.serviceProvider.get<Response.LineupList>(api, 'GetDDLineupList', req);
            return value.LineupList.Lineups;
        }
        async GetVideoMultiplex(req: Request.GetVideoMultiplex): Promise<ApiTypes.VideoMultiplex> {
            const value = await this.serviceProvider.get<Response.VideoMultiplex>(api, 'GetVideoMultiplex', req);
            return value.VideoMultiplex;
        }
        async GetVideoMultiplexList(req: Partial<Request.GetVideoMultiplexList>): Promise<ApiTypes.VideoMultiplexList> {
            const value = await this.serviceProvider.get<Response.VideoMultiplexList>(api, 'GetVideoMultiplexList', req);
            return value.VideoMultiplexList;
        }
        async GetVideoSource(req: Request.GetVideoSource): Promise<ApiTypes.VideoSource> {
            const value = await this.serviceProvider.get<Response.VideoSource>(api, 'GetVideoSource', req);
            return value.VideoSource;
        }
        async GetXMLTVIdList(req: Request.GetXMLTVIdList) {
            return StringListGet(this.serviceProvider, api, 'GetXMLTVIdList', req);
        }
        async RemoveDBChannel(req: Request.RemoveDBChannel) {
            return BoolPost(this.serviceProvider, api, 'RemoveDBChannel', req);
        }
        async RemoveVideoSource(req: Request.RemoveVideoSource) {
            return BoolPost(this.serviceProvider, api, 'RemoveVideoSource', req);
        }
        async UpdateDBChannel(req: Request.UpdateDBChannel) {
            return BoolPost(this.serviceProvider, api, 'UpdateDBChannel', req);
        }
        async UpdateVideoSource(req: Request.UpdateVideoSource) {
            return BoolPost(this.serviceProvider, api, 'UpdateVideoSource', req);
        }
    }
}
