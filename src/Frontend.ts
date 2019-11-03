import { AbstractService } from './Communication';
import { BoolPost, StringListGet, InternalTypes } from './CommonTypes'
import ApiTypes from './ApiTypes';

export namespace Frontend {
    namespace Response {
        export interface FrontendStatus {
            FrontendStatus: ApiTypes.FrontendStatus
        }
        export interface FrontendActionList {
            FrontendActionList: ApiTypes.FrontendActionList
        }
    }
    export namespace Request {
        export interface GetActionList {
            Context?: string
        }
        export interface SendMessage {
            Message: string
        }

        export interface SendAction {
            Action: string
            Value?: string
            Width?: number
            Height?: number
        }
        export interface SendKey {
            Key: string
        }

        export interface PlayVideo {
            Id: string
            UseBookmark?: boolean
        }
        export interface SendNotification {
            Message: string
            Error?: boolean,
            Type?: NotificationType
            Origin?: string,
            Description?: string,
            Image?: string,
            Extra?: string,
            ProgressText?: string,
            Progress?: number,
            Timeout?: number,
            Fullscreen?: boolean,
            Visibility?: VisibilityType,
            Priority?: PriorityType
        }
        export type PlayRecording = InternalTypes.RecordingKey
        export enum NotificationType {
            normal = 'normal',
            error = 'error',
            warning = 'warning',
            check = 'check',
            busy = 'busy'
        }
        export enum PriorityType {
            default = 0,
            low = 1,
            medium = 2,
            high = 3,
            higher = 4,
            highest = 5
        }
        export enum VisibilityType {
            video_playback = 1 << 0,
            settings = 1 << 1,
            setup_wizard = 1 << 2,
            video_library = 1 << 3,
            music = 1 << 4,
            recordings_library = 1 << 5
        }

    }
    export class Service extends AbstractService {
        constructor(baseUrl: URL, private readonly _hostname: string) {
            super(baseUrl, 'Frontend')
        }
        async GetActionList(req: Request.GetActionList): Promise<ApiTypes.StringKeyValue> {
            const status = await this.serviceProvider.get<Response.FrontendActionList>('GetActionList', req);
            return status.FrontendActionList.ActionList;
        }

        async GetStatus(): Promise<ApiTypes.FrontendStatus> {
            const status = await this.serviceProvider.get<Response.FrontendStatus>('GetStatus');
            return status.FrontendStatus;
        }

        async SendMessage(req: Request.SendMessage): Promise<void> {
            return BoolPost(this.serviceProvider, 'SendMessage', req);
        }

        async SendAction(req: Request.SendAction, ignoreError: boolean = false): Promise<void> {
            await BoolPost(this.serviceProvider, 'SendAction', req, !ignoreError);
        }

        async SendKey(req: Request.SendKey): Promise<void> {
            return BoolPost(this.serviceProvider, 'SendKey', req);
        }

        async PlayRecording(req: Request.PlayRecording): Promise<void> {
            return BoolPost(this.serviceProvider, 'PlayRecording', req);
        }
        async PlayVideo(req: Request.PlayVideo): Promise<void> {
            return BoolPost(this.serviceProvider, 'PlayVideo', req);
        }
        async GetContextList(): Promise<string[]> {
            return StringListGet(this.serviceProvider, 'GetContextList')
        }
        async SendNotification(req: Request.SendNotification): Promise<void> {
            return BoolPost(this.serviceProvider, 'SendNotification', req);
        }
        hostname(): string {
            return this._hostname;
        }
    }
}