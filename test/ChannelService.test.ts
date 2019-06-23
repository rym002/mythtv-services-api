import { expect } from 'chai';
import 'mocha';
import { backend } from '../src/index'
import { backendNock } from './MockHelpers'

describe('ChannelService', () => {
    before(() => {
        backendNock('Channel')
            .get("/GetVideoSourceList").reply(200, () => {
                return {
                    VideoSourceList: {
                        Version: "v1"
                    }
                }
            }).get('/GetChannelInfoList')
            .query({
                SourceID: 1,
                OnlyVisible: false,
                Details: false
            }).reply(200, () => {
                return {
                    ChannelInfoList: {
                        Count: 1
                    }
                }
            }).get('/GetChannelInfo')
            .query({
                ChanID: 123
            }).reply(200, () => {
                return {
                    ChannelInfo: {
                        ChanId: 123
                    }
                }
            })
    })
    it('GetVideoSourceList', async () => {
        expect(await backend.channelService.GetVideoSourceList()).to.have.property('Version', 'v1');
    })

    it('GetChannelInfoList', async () => {
        expect(await backend.channelService.GetChannelInfoList({
            SourceID: 1,
            OnlyVisible: false,
            Details: false
        })).to.have.property('Count', 1);
    })

    it('GetChannelInfo', async () => {
        expect(await backend.channelService.GetChannelInfo(123)).to.have.property('ChanId', 123);
    })
})