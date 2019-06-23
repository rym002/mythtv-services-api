import { expect } from 'chai';
import 'mocha';
import { backend, StringList, String } from '../src/index'
import { backendNock, toStringList, toString } from './MockHelpers'

const GetHostsFiltered = ["localhost", "", "."]
const GetHostsAll = ["myhost", ...GetHostsFiltered]
const GetHostsResponse: StringList = toStringList(GetHostsAll);
const GetHostNameResponse: String = toString("myhost");
const GetSetingsResponse: String = toString("mysetting");

describe('MythService', () => {
    before(() => {
        backendNock('Myth').get("/GetHostName").reply(200, () => {
            return GetHostNameResponse
        }).get('/GetHosts').twice().reply(200, () => {
            return GetHostsResponse;
        }).get('/GetSetting')
            .query({
                Key: 'Test',
                Default: 'defaultValue'
            }).reply(200, () => {
                return GetSetingsResponse;
            })
    })
    it('GetHostName', async () => {
        expect(await backend.mythService.GetHostName()).to.equal('myhost');
    })
    it("GetHosts Filtered", async () => {
        expect(await backend.mythService.GetHosts()).to.not.have.members(GetHostsFiltered);
    })
    it("GetHosts Unfiltered", async () => {
        expect(await backend.mythService.GetHosts(false)).to.have.members(GetHostsAll);
    })
    it("GetSetting", async () => {
        expect(await backend.mythService.GetSetting({ Key: 'Test', Default: 'defaultValue' })).to.equal('mysetting');
    })
})