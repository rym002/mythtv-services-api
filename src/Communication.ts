import axios from 'axios';
import { Agent } from 'http';
const time_header = 'start_time'
let counter = 0;

const myAxios = axios.create({
    httpsAgent: new Agent(
        { keepAlive: true })
});
myAxios.interceptors.request.use((request) => {
    const requestCounter = request.url + ":" + counter++
    console.time(requestCounter)
    request.headers[time_header] = requestCounter
    return request;
});

myAxios.interceptors.response.use((response) => {
    console.timeEnd(response.config.headers[time_header])
    return response;
})

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
        let uri = this.getUri(api, service);
        const value = await myAxios.get<T>(uri, { params: params });
        return value.data;
    }
    async post<T>(api: string, service: string, params?: any, data?: any): Promise<T> {
        let uri = this.getUri(api, service);
        const value = await myAxios.post<T>(uri, data, { params: params });
        return value.data;
    }
}
export abstract class AbstractService {
    protected readonly serviceProvider: ServiceProvider;
    constructor(hostConfig: HostConfig) {
        this.serviceProvider = new ServiceProvider(hostConfig);
    }
}