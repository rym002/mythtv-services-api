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
    export interface RecordedIdRequest {
        RecordedId: number
    }

    export interface ChanIdRequest {
        ChanId: number
        StartTime: Date
    }
    export type RecordingKey = RecordedIdRequest | ChanIdRequest
}

export async function BoolPost(serviceProvider: ServiceProvider, service: string, params?: any, failOnFalse: boolean = true, data?: any): Promise<void> {
    const resp = await serviceProvider.post<InternalTypes.Bool>(service, params, data);
    if (failOnFalse && !resp.bool) {
        throw new Error('Failed api:' + serviceProvider.api + ' service:' + service);
    }
}

export async function BoolGet(serviceProvider: ServiceProvider, service: string, params?: any, failOnFalse: boolean = true): Promise<void> {
    const resp = await serviceProvider.get<InternalTypes.Bool>(service, params);
    if (failOnFalse && !resp.bool) {
        throw new Error('Failed api:' + serviceProvider.api + ' service:' + service);
    }
}
export async function StringGet(serviceProvider: ServiceProvider, service: string, params?: any): Promise<string> {
    const resp = await serviceProvider.get<InternalTypes.String>(service, params);
    return resp.String;
}
export async function StringListGet(serviceProvider: ServiceProvider, service: string, params?: any): Promise<string[]> {
    const resp = await serviceProvider.get<InternalTypes.StringList>(service, params);
    return resp.StringList;
}

export async function IntGet(serviceProvider: ServiceProvider, service: string, params?: any): Promise<number> {
    const resp = await serviceProvider.get<InternalTypes.Int>(service, params);
    if (resp.int == -1) {
        throw 'Failed api:' + serviceProvider.api + ' service:' + service;
    }
    return resp.int;
}
export async function IntPost(serviceProvider: ServiceProvider, service: string, params?: any): Promise<number> {
    const resp = await serviceProvider.post<InternalTypes.Int>(service, params);
    if (resp.int == -1) {
        throw 'Failed api:' + serviceProvider.api + ' service:' + service;
    }
    return resp.int;
}
export async function LongGet(serviceProvider: ServiceProvider, service: string, params?: any): Promise<number> {
    const resp = await serviceProvider.get<InternalTypes.Long>(service, params);
    if (resp.long == -1) {
        throw 'Failed api:' + serviceProvider.api + ' service:' + service;
    }
    return resp.long;
}
