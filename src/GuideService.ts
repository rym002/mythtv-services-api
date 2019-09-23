import ApiTypes from "./ApiTypes";
import { BoolGet, StringGet, StringListGet } from "./CommonTypes";
import { AbstractService } from "./Communication";

export namespace GuideService {
    export namespace Request {
        export interface AddToChannelGroup {
            ChannelGroupId: number
            ChanId: number
        }
        export interface GetChannelGroupList {
            IncludeEmpty?: boolean
        }
        export interface GetChannelIcon {
            ChanId: number
            Width?: number
            Height?: number
        }
        export interface GetProgramDetails {
            ChanId: number
            StartTime: Date
        }
        export interface GetProgramGuide extends Partial<ApiTypes.ListRequest> {
            StartTime: Date
            EndTime: Date
            Details?: boolean
            ChannelGroupId?: number
        }
        export interface GetProgramList extends ApiTypes.SortedListRequest {
            StartTime?: Date
            EndTime?: Date
            ChanId?: number
            TitleFilter?: string
            CategoryFilter?: string
            PersonFilter?: string
            KeywordFilter?: string
            OnlyNew?: boolean
            Details?: boolean
        }
        export interface GetStoredSearches {
            Type: string
        }
        export interface RemoveFromChannelGroup {
            ChannelGroupId: number
            ChanId: number
        }
    }
    namespace Response {
        export interface ChannelGroupList {
            ChannelGroupList: ApiTypes.ChannelGroupList
        }
        export interface Program {
            Program: ApiTypes.Program
        }
        export interface ProgramGuide {
            ProgramGuide: ApiTypes.ProgramGuide
        }
        export interface ProgramList {
            ProgramList: ApiTypes.ProgramList
        }
    }
    const api = 'Guide';
    export class Service extends AbstractService {
        async AddToChannelGroup(req: Request.AddToChannelGroup) {
            return BoolGet(this.serviceProvider, api, 'AddToChannelGroup', req)
        }
        async GetCategoryList() {
            return StringListGet(this.serviceProvider, api, 'GetCategoryList')
        }
        async GetChannelGroupList(req: Request.GetChannelGroupList): Promise<ApiTypes.ChannelGroup[]> {
            const value = await this.serviceProvider.get<Response.ChannelGroupList>(api, 'GetChannelGroupList', req);
            return value.ChannelGroupList.ChannelGroups;
        }
        async GetChannelIcon(req: Request.GetChannelIcon) {
            return StringGet(this.serviceProvider, api, 'GetChannelIcon', req)
        }
        async GetProgramDetails(req: Request.GetProgramDetails): Promise<ApiTypes.Program> {
            const value = await this.serviceProvider.get<Response.Program>(api, 'GetProgramDetails', req);
            return value.Program;
        }
        async GetProgramGuide(req: Request.GetProgramGuide): Promise<ApiTypes.ProgramGuide> {
            const value = await this.serviceProvider.get<Response.ProgramGuide>(api, 'GetProgramGuide', req);
            return value.ProgramGuide;
        }
        async GetProgramList(req: Request.GetProgramList): Promise<ApiTypes.ProgramList> {
            const value = await this.serviceProvider.get<Response.ProgramList>(api, 'GetProgramList', req);
            return value.ProgramList;
        }
        async GetStoredSearches(req: Request.GetStoredSearches) {
            return StringListGet(this.serviceProvider, api, 'GetStoredSearches', req)
        }
        async RemoveFromChannelGroup(req: Request.RemoveFromChannelGroup) {
            return BoolGet(this.serviceProvider, api, 'RemoveFromChannelGroup', req)
        }
    }
}