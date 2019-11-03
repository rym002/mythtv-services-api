import ApiTypes from "./ApiTypes";
import { BoolPost, StringGet, StringListGet } from "./CommonTypes";
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
        export interface GetProgramList extends Partial<ApiTypes.SortedListRequest<'starttime' | 'title' | 'channel' | 'duration'>> {
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
    export class Service extends AbstractService {
        constructor(baseUrl: URL){
            super(baseUrl,'Guide')
        }
        async AddToChannelGroup(req: Request.AddToChannelGroup) {
            return BoolPost(this.serviceProvider, 'AddToChannelGroup', req)
        }
        async GetCategoryList() {
            return StringListGet(this.serviceProvider, 'GetCategoryList')
        }
        async GetChannelGroupList(req: Request.GetChannelGroupList): Promise<ApiTypes.ChannelGroup[]> {
            const value = await this.serviceProvider.get<Response.ChannelGroupList>('GetChannelGroupList', req);
            return value.ChannelGroupList.ChannelGroups;
        }
        async GetChannelIcon(req: Request.GetChannelIcon) {
            return StringGet(this.serviceProvider, 'GetChannelIcon', req)
        }
        async GetProgramDetails(req: Request.GetProgramDetails): Promise<ApiTypes.Program> {
            const value = await this.serviceProvider.get<Response.Program>('GetProgramDetails', req);
            return value.Program;
        }
        async GetProgramGuide(req: Request.GetProgramGuide): Promise<ApiTypes.ProgramGuide> {
            const value = await this.serviceProvider.get<Response.ProgramGuide>('GetProgramGuide', req);
            return value.ProgramGuide;
        }
        async GetProgramList(req: Request.GetProgramList): Promise<ApiTypes.ProgramList> {
            const value = await this.serviceProvider.get<Response.ProgramList>('GetProgramList', req);
            return value.ProgramList;
        }
        async GetStoredSearches(req: Request.GetStoredSearches) {
            return StringListGet(this.serviceProvider, 'GetStoredSearches', req)
        }
        async RemoveFromChannelGroup(req: Request.RemoveFromChannelGroup) {
            return BoolPost(this.serviceProvider, 'RemoveFromChannelGroup', req)
        }
    }
}