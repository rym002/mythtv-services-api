import * as nock from 'nock';
import { InternalTypes } from '../src/CommonTypes';
import * as moment from 'moment';

export function backendNock(apiName: string) {
    return nock("http://localhost:6544/" + apiName)
}

export function toStringList(data: string[]): InternalTypes.StringList {
    return {
        StringList: data
    }
}

export function toString(data: string): InternalTypes.String {
    return {
        String: data
    }
}

export function toBool(data: boolean) {
    return {
        bool: data + ''
    }
}
export function toInt(data: number) {
    return {
        int: data + ''
    }
}
export function toLong(data: number) {
    return {
        long: data + ''
    }
}
export function toDateTime(data: Date) {
    return {
        DateTime: moment.utc(data).format()
    }
}
type PickType<O,T> = {
    [K in keyof O]:O[K] extends T?K:never
}[keyof O]

export function convertDateParams<T>(obj:T,fields:PickType<T,Date>[]){
    const ret:any = {};
    fields.forEach(field=>{
        ret[field] = moment.utc(obj[field]).format('YYYY-MM-DDTHH:mm:ss')
    })
    return ret;
}