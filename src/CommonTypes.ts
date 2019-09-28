import { ServiceProvider } from "./Communication";

export namespace InternalTypes {
    export interface StringList {
        StringList: string[];
    }
    export interface String {
        String: string;
    }

    export interface Bool {
        bool: boolean;
    }

    export interface Int {
        int: number
    }

    export interface Long {
        long: number
    }
    interface RecordedIdRequest {
        RecordedId: number
    }

    interface ChanIdRequest {
        ChanId: number
        StartTime: Date
    }
    export type RecordingKey = RecordedIdRequest | ChanIdRequest
}

export async function BoolPost(serviceProvider: ServiceProvider, api: string, service: string, params?: any, failOnFalse: boolean = true, data?: any): Promise<void> {
    const resp = await serviceProvider.post<InternalTypes.Bool>(api, service, params, data);
    if (failOnFalse && !resp.bool) {
        throw 'Failed api:' + api + ' service:' + service;
    }
}

export async function BoolGet(serviceProvider: ServiceProvider, api: string, service: string, params?: any): Promise<void> {
    const resp = await serviceProvider.get<InternalTypes.Bool>(api, service, params);
    if (!resp.bool) {
        throw 'Failed api:' + api + ' service:' + service;
    }
}
export async function StringGet(serviceProvider: ServiceProvider, api: string, service: string, params?: any): Promise<string> {
    const resp = await serviceProvider.get<InternalTypes.String>(api, service, params);
    return resp.String;
}
export async function StringListGet(serviceProvider: ServiceProvider, api: string, service: string, params?: any): Promise<string[]> {
    const resp = await serviceProvider.get<InternalTypes.StringList>(api, service, params);
    return resp.StringList;
}

export async function IntGet(serviceProvider: ServiceProvider, api: string, service: string, params?: any): Promise<number> {
    const resp = await serviceProvider.get<InternalTypes.Int>(api, service, params);
    if (resp.int == -1) {
        throw 'Failed api:' + api + ' service:' + service;
    }
    return resp.int;
}
export async function IntPost(serviceProvider: ServiceProvider, api: string, service: string, params?: any): Promise<number> {
    const resp = await serviceProvider.post<InternalTypes.Int>(api, service, params);
    if (resp.int == -1) {
        throw 'Failed api:' + api + ' service:' + service;
    }
    return resp.int;
}
export async function LongGet(serviceProvider: ServiceProvider, api: string, service: string, params?: any): Promise<number> {
    const resp = await serviceProvider.get<InternalTypes.Long>(api, service, params);
    if (resp.long == -1) {
        throw 'Failed api:' + api + ' service:' + service;
    }
    return resp.long;
}
