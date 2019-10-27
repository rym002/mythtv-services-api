import axios from 'axios';
import { Agent } from 'http';
import { stringify } from 'qs'
import * as moment from 'moment'
import { Readable, Writable } from 'stream';
const time_header = 'start_time'
let counter = 0;

const jsonAxios = axios.create({
    httpsAgent: new Agent(
        { keepAlive: true }),
    transformResponse: [
        function transformResponse(data) {
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data, mythtvJsonReviver);
                } catch (e) {
                    /* Ignore */
                }
            }
            return data;
        }
    ],
    paramsSerializer: (params: any) => {
        return stringify(params, {
            serializeDate: (d: Date) => {
                return moment.utc(d).format('YYYY-MM-DDTHH:mm:ss')
            },
            arrayFormat: 'comma'
        })
    }
});
jsonAxios.interceptors.request.use((request) => {
    const requestCounter = request.url + ":" + counter++
    console.time(requestCounter)
    request.headers[time_header] = requestCounter
    return request;
});

jsonAxios.interceptors.response.use((response) => {
    console.timeEnd(response.config.headers[time_header])
    return response;
})
const numberParser = new RegExp('^\\d+(?:\.\\d+)?$')
const dateParser = new RegExp('^\\d{4}-[01]\\d-[0-3]\\d(?:T[0-2]\\d(?::[0-5]\\d){2}(?:\.\\d{3})?Z)?$')
const booleanParser = new RegExp('^false$|^true$')
const parserExcludes: string[] = [
    'ProtoVer',
    'FrequencyId',
    'XMLTVID',
    'ChanNum',
    'String',
    'Version'
]

function mythtvJsonReviver(key: any, value: any) {
    if (typeof value === 'string' && !parserExcludes.includes(key)) {
        if (numberParser.test(value)) {
            return Number(value)
        } else if (dateParser.test(value)) {
            return new Date(value)
        } else if (booleanParser.test(value)) {
            return value === 'true'
        }
    }
    if (key === 'StringList') {
        return value.map((arrayVal: any) => {
            if (typeof arrayVal === 'number') {
                return arrayVal + ''
            }
            return arrayVal
        })
    }
    return value;
}
export interface HostConfig {
    hostname: string;
    port: number;
    protocol: string;
}

export class ServiceProvider {
    constructor(readonly config: HostConfig) {
    }
    private getUri(api: string, service: string) {
        return this.config.protocol + '://' + this.config.hostname + ':' + this.config.port + '/' + api + '/' + service;
    }

    async get<T>(api: string, service: string, params?: any): Promise<T> {
        const uri = this.getUri(api, service);
        const value = await jsonAxios.get<T>(uri, { params: params });
        return value.data;
    }
    async post<T>(api: string, service: string, params?: any, data?: any): Promise<T> {
        const uri = this.getUri(api, service);
        const value = await jsonAxios.post<T>(uri, data, { params: params });
        return value.data;
    }
    async stream(api: string, service: string, writable: Writable, params?: any) {
        const uri = this.getUri(api, service);
        const value = await jsonAxios.get<Readable>(uri, {
            params: params,
            responseType: 'stream'
        });
        value.data.pipe(writable)
    }
}
export abstract class AbstractService {
    protected readonly serviceProvider: ServiceProvider;
    constructor(hostConfig: HostConfig) {
        this.serviceProvider = new ServiceProvider(hostConfig);
    }
}