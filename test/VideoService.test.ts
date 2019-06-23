import { expect } from 'chai';
import 'mocha';
import { backend } from '../src/index'
import { backendNock } from './MockHelpers'

describe('VideoService', () => {
    before(() => {
        backendNock('Video')
            .get("/GetVideoList").reply(200, () => {
                return {
                    VideoMetadataInfoList: {
                        Count: 1
                    }
                }
            })
    })

    it('GetVideoList', async () => {
        expect(await backend.videoService.GetVideoList({})).to.have.property('Count', 1);
    })

})