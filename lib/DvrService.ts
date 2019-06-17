import { Program } from "./CommonTypes";
import { AbstractService } from "./Communication";

interface Encoder {
    Id: number;
    Recording: Program;
    Connected: boolean;
    HostName: string;
}
interface Encoders {
    Encoders: Encoder[]
}
interface EncoderList {
    EncoderList: Encoders
}

interface ProgramList {
    StartIndex: number;
    Count: number;
    TotalAvailable: number;
    AsOf: Date;
    Version: string;
    ProtoVer: string;
    Programs: Program[]
}

interface ProgramListResponse {
    ProgramList: ProgramList
}

interface GetRecordedListRequest {
    GetRecordedList?: boolean;
    StartIndex?: number;
    Count?: number;
    TitleRegEx?: string;
    RecGroup?: string;
    StorageGroup?: string
}
const api = 'Dvr';
export class DvrService extends AbstractService {
    async GetEncoderList(): Promise<Encoder[]> {
        const ret = await this.serviceProvider.get<EncoderList>(api, 'GetEncoderList');
        return ret.EncoderList.Encoders;
    }

    async GetRecordedList(req: GetRecordedListRequest): Promise<ProgramList> {
        const ret = await this.serviceProvider.get<ProgramListResponse>(api, 'GetRecordedList', req);
        return ret.ProgramList;
    }
}