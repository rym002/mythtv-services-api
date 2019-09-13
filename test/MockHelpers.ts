import * as nock from 'nock';
import { StringList, String } from '../src/index';

export function backendNock(apiName: string) {
    return nock("http://localhost:6544/" + apiName)
}

export function toStringList(data: string[]): StringList {
    return {
        StringList: data
    }
}

export function toString(data: string): String {
    return {
        String: data
    }
}

export function toBool(data: boolean) {
    return {
        bool: data + ''
    }
}