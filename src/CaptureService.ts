import { AbstractService } from "./Communication";
import { IntPost, BoolPost } from "./CommonTypes";
import ApiTypes from "ApiTypes";

export namespace CaptureService {
    export namespace Request {
        export interface AddCaptureCard {
            VideoDevice: string
            AudioDevice?: string
            VBIDevice?: string
            CardType: CardType
            AudioRateLimit?: number
            HostName: string
            DVBSWFilter?: number
            DVBSatType?: number
            DVBWaitForSeqStart?: boolean
            SkipBTAudio?: boolean
            DVBOnDemand?: boolean
            DVBDiSEqCType?: number
            FirewireSpeed?: number
            FirewireModel?: string
            FirewireConnection?: number
            SignalTimeout?: number
            ChannelTimeout?: number
            DVBTuningDelay?: number
            Contrast?: number
            Brightness?: number
            Colour?: number
            Hue?: number
            DiSEqCId?: number
            DVBEITScan?: boolean
        }
        export interface AddCardInput {
            CardId: number
            SourceId: number
            InputName: string
            ExternalCommand?: string
            ChangerDevice?: string
            ChangerModel?: string
            HostName: string
            TuneChan?: string
            StartChan?: string
            DisplayName?: string
            DishnetEIT?: boolean
            RecPriority?: number
            Quicktune?: number
            SchedOrder?: number
            LiveTVOrder?: number
        }
        export interface GetCaptureCard {
            CardId: number
        }
        export interface GetCaptureCardList {
            HostName?: string
            CardType?: CardType
        }
        export interface RemoveCaptureCard {
            CardId: number
        }
        export interface RemoveCardInput {
            CardInputId: number
        }
        export interface UpdateCaptureCard {
            CardId: number
            Setting: string
            Value: string
        }
        export interface UpdateCardInput {
            CardInputId: number
            Setting: string
            Value: string

        }
        type CardType = 'QPSK' | 'QAM' | 'OFDM' | 'ATSC' | 'V4L' | 'MPEG' | 'FIREWIRE'
            | 'HDHOMERUN' | 'FREEBOX' | 'HDPVR' | 'DVB_S2' | 'IMPORT' | 'DEMO' | 'ASI'
            | 'CETON' | 'EXTERNAL' | 'VBOX' | 'DVB_T2' | 'V4L2ENC'
    }
    namespace Response {
        export interface CaptureCard {
            CaptureCard: ApiTypes.CaptureCard
        }
        export interface CaptureCardList {
            CaptureCardList: ApiTypes.CaptureCardList
        }
    }

    const api = 'Capture';
    export class Service extends AbstractService {
        async AddCaptureCard(req: Request.AddCaptureCard) {
            return IntPost(this.serviceProvider, api, 'AddCaptureCard', req);
        }
        async AddCardInput(req: Request.AddCardInput) {
            return IntPost(this.serviceProvider, api, 'AddCardInput', req);
        }
        async GetCaptureCard(req: Request.GetCaptureCard): Promise<ApiTypes.CaptureCard> {
            const value = await this.serviceProvider.get<Response.CaptureCard>(api, 'GetCaptureCard', req);
            return value.CaptureCard;
        }
        async GetCaptureCardList(req: Request.GetCaptureCardList): Promise<ApiTypes.CaptureCard[]> {
            const value = await this.serviceProvider.get<Response.CaptureCardList>(api, 'GetCaptureCardList', req);
            return value.CaptureCardList.CaptureCards;
        }
        async RemoveCaptureCard(req: Request.RemoveCaptureCard) {
            return BoolPost(this.serviceProvider, api, 'RemoveCaptureCard', req);
        }
        async RemoveCardInput(req: Request.RemoveCardInput) {
            return BoolPost(this.serviceProvider, api, 'RemoveCardInput', req);
        }
        async UpdateCaptureCard(req: Request.UpdateCaptureCard) {
            return BoolPost(this.serviceProvider, api, 'UpdateCaptureCard', req);
        }
        async UpdateCardInput(req: Request.UpdateCardInput) {
            return BoolPost(this.serviceProvider, api, 'UpdateCardInput', req);
        }
    }
}