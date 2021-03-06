import axios, { AxiosRequestConfig } from 'axios';
import { Agent } from 'http';
import { stringify } from 'qs'
import * as moment from 'moment'
import { Readable, Writable } from 'stream';

interface TimedAxiosRequestConfig extends AxiosRequestConfig {
    startTime: number
}
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
    const timedRequest = <TimedAxiosRequestConfig>request
    timedRequest.startTime = Date.now()
    return request;
});

jsonAxios.interceptors.response.use((response) => {
    const timedRequest = <TimedAxiosRequestConfig>response.config
    const duration = Date.now() - timedRequest.startTime
    console.log('URL: %s Duration: %d', timedRequest.url, duration)
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

export class ServiceProvider {
    constructor(readonly baseUrl: URL, readonly api: string) {
    }
    private getUri(service: string) {
        return new URL(this.api + '/' + service, this.baseUrl).href
    }

    async get<T>(service: string, params?: any): Promise<T> {
        const uri = this.getUri(service);
        const value = await jsonAxios.get<T>(uri, { params: params });
        return value.data;
    }
    async post<T>(service: string, params?: any, data?: any): Promise<T> {
        const uri = this.getUri(service);
        const value = await jsonAxios.post<T>(uri, data, { params: params });
        return value.data;
    }
    async stream(service: string, writable: Writable, params?: any) {
        const uri = this.getUri(service);
        const value = await jsonAxios.get<Readable>(uri, {
            params: params,
            responseType: 'stream'
        });
        value.data.pipe(writable)
    }
}
export abstract class AbstractService {
    protected readonly serviceProvider: ServiceProvider;
    constructor(baseUrl: URL, api: string) {
        this.serviceProvider = new ServiceProvider(baseUrl, api);
    }
}